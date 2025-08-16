// backend/models/Beautician.js
import mongoose from "mongoose";

const beauticianSchema = new mongoose.Schema({
  name: { type:String, required:true, unique:true },
  // working hours (simple same-everyday window)
  workStart: { type:String, default:"10:00" }, // 24h HH:mm
  workEnd:   { type:String, default:"18:00" }
}, { timestamps:true });

export default mongoose.model("Beautician", beauticianSchema);
