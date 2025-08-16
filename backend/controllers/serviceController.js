// backend/controllers/serviceController.js
import Service from "../models/Service.js";
import Beautician from "../models/Beautician.js";

export const listServices = async (_req,res)=>{
  const services = await Service.find().sort("name");
  res.json(services);
};

// one-time seed (dev convenience)
export const seed = async (_req,res)=>{
  const base = [
    { name:"Hair Cut", durationMins:45, price:300 },
    { name:"Hair Color", durationMins:90, price:1200 },
    { name:"Facial", durationMins:60, price:800 },
    { name:"Makeup", durationMins:75, price:1500 }
  ];
  const staff = [{name:"Anita"}, {name:"Riya"}, {name:"Sana"}];

  await Service.deleteMany();
  await Beautician.deleteMany();
  await Service.insertMany(base);
  await Beautician.insertMany(staff);

  res.json({ message:"Seeded services & beauticians" });
};
