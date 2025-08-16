// backend/controllers/bookingController.js
import Booking from "../models/Booking.js";
import Service from "../models/Service.js";
import Beautician from "../models/Beautician.js";
import { mailer } from "../utils/mailer.js";

// helper: generate time slots within work hours, step 30m
function* slots(start="10:00", end="18:00", step=30){
  const [sH,sM] = start.split(":").map(Number);
  const [eH,eM] = end.split(":").map(Number);
  let mins = sH*60 + sM;
  const endMins = eH*60 + eM;
  while(mins + step <= endMins){
    const h = String(Math.floor(mins/60)).padStart(2,"0");
    const m = String(mins%60).padStart(2,"0");
    yield `${h}:${m}`;
    mins += step;
  }
}

// 2) SEARCH: return available start times for each beautician for a service on a date
export const searchAvailability = async (req,res)=>{
  const { serviceId, date } = req.query; // date = "YYYY-MM-DD"
  if(!serviceId || !date) return res.status(400).json({message:"serviceId and date required"});
  const service = await Service.findById(serviceId);
  if(!service) return res.status(404).json({message:"Service not found"});

  const beauticians = await Beautician.find();
  const bookings = await Booking.find({ date, status: { $in:["pending","confirmed"] } });

  const result = beauticians.map(b=>{
    const taken = bookings.filter(k=>String(k.beautician)===String(b._id))
                          .map(k=>({start:k.startTime,end:k.endTime}));
    const available = [];
    for (const start of slots(b.workStart, b.workEnd, 30)){
      // compute end by duration
      const [h,m] = start.split(":").map(Number);
      const endMins = h*60 + m + service.durationMins;
      const end = `${String(Math.floor(endMins/60)).padStart(2,"0")}:${String(endMins%60).padStart(2,"0")}`;

      // overlap check
      const overlaps = taken.some(t => !(end <= t.start || start >= t.end));
      if(!overlaps) available.push(start);
    }
    return { beauticianId:b._id, beautician:b.name, available };
  });

  res.json({ service:{ id:service._id, name:service.name, durationMins:service.durationMins }, date, result });
};

// 3) PRE-BOOK: create booking as "pending"
export const createPreBooking = async (req,res)=>{
  try{
    const { serviceId, beauticianId, date, startTime } = req.body;
    if(!serviceId || !beauticianId || !date || !startTime)
      return res.status(400).json({message:"Missing fields"});

    const service = await Service.findById(serviceId);
    const [h,m] = startTime.split(":").map(Number);
    const endMins = h*60 + m + service.durationMins;
    const endTime = `${String(Math.floor(endMins/60)).padStart(2,"0")}:${String(endMins%60).padStart(2,"0")}`;

    // prevent double-booking
    const clash = await Booking.findOne({
      beautician: beauticianId, date,
      status: { $in:["pending","confirmed"] },
      $expr: {
        $not: {
          $or: [
            { $lte: [ "$endTime", startTime ] },
            { $gte: [ "$startTime", endTime ] }
          ]
        }
      }
    });
    if(clash) return res.status(409).json({message:"Slot not available"});

    const booking = await Booking.create({
      user: req.userId, service: serviceId, beautician: beauticianId,
      date, startTime, endTime, status:"pending"
    });

    res.status(201).json({ message:"Pre-booked (pending confirmation)", bookingId: booking._id });
  }catch(e){ res.status(500).json({message:e.message}); }
};

// 4) CONFIRM booking: set confirmed and send email
export const confirmBooking = async (req,res)=>{
  try{
    const { id } = req.params; // booking id
    const booking = await Booking.findByIdAndUpdate(id, { status:"confirmed" }, { new:true })
                                 .populate("service")
                                 .populate("beautician")
                                 .populate("user");
    if(!booking) return res.status(404).json({message:"Booking not found"});

    // send email
    const tx = mailer();
    await tx.sendMail({
      from: process.env.FROM_EMAIL,
      to: booking.user.email,
      subject: "Your Beauty Parlour Booking is Confirmed",
      html: `
        <h3>Booking Confirmed ✅</h3>
        <p>Hi ${booking.user.username}, your booking has been confirmed.</p>
        <ul>
          <li>Service: ${booking.service.name}</li>
          <li>Beautician: ${booking.beautician.name}</li>
          <li>Date: ${booking.date}</li>
          <li>Time: ${booking.startTime} - ${booking.endTime}</li>
        </ul>
        <p>See you soon!</p>
      `
    });

    res.json({ message:"Booking confirmed & email sent", booking });
  }catch(e){ res.status(500).json({message:e.message}); }
};

// 5) Track my bookings
export const myBookings = async (req,res)=>{
  const items = await Booking.find({ user: req.userId })
    .populate("service")
    .populate("beautician")
    .sort({ date:1, startTime:1 });
  res.json(items);
};
