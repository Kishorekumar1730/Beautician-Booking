// backend/server.js
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import authRoutes from "./routes/auth.js";
import serviceRoutes from "./routes/service.js";
import bookingRoutes from "./routes/booking.js";

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(()=>console.log("✅ MongoDB connected"))
  .catch(err=>console.error("Mongo error:", err.message));

app.get("/", (_req,res)=>res.send("API up"));
app.use("/api/auth", authRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/bookings", bookingRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>console.log(`✅ API running on :${PORT}`));
