// backend/models/Service.js
import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  name: { type:String, required:true, unique:true },
  durationMins: { type:Number, required:true },   // e.g. 60
  price: { type:Number, default:0 }
}, { timestamps:true });

export default mongoose.model("Service", serviceSchema);
