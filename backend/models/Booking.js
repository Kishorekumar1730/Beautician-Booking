// backend/models/Booking.js
import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref:"User", required:true },
  service: { type: mongoose.Schema.Types.ObjectId, ref:"Service", required:true },
  beautician: { type: mongoose.Schema.Types.ObjectId, ref:"Beautician", required:true },
  date: { type:String, required:true },       // "YYYY-MM-DD"
  startTime: { type:String, required:true },  // "HH:mm"
  endTime: { type:String, required:true },    // computed from duration
  status: { type:String, enum:["pending","confirmed","cancelled"], default:"pending" }
}, { timestamps:true });

export default mongoose.model("Booking", bookingSchema);
