// backend/controllers/authController.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const signup = async (req,res)=>{
  try{
    const { username, email, password } = req.body;
    if(!username || !email || !password) return res.status(400).json({message:"Missing fields"});
    const exists = await User.findOne({ $or:[{email},{username}] });
    if(exists) return res.status(400).json({message:"User already exists"});
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashed });
    return res.status(201).json({ message:"Signup successful", user:{ id:user._id, username, email } });
  }catch(e){ return res.status(500).json({message:e.message}); }
};

export const login = async (req,res)=>{
  try{
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if(!user) return res.status(400).json({message:"Invalid credentials"});
    const ok = await bcrypt.compare(password, user.password);
    if(!ok) return res.status(400).json({message:"Invalid credentials"});
    const token = jwt.sign({ id:user._id }, process.env.JWT_SECRET, { expiresIn:"2h" });
    return res.json({ token, user:{ id:user._id, username:user.username, email:user.email } });
  }catch(e){ return res.status(500).json({message:e.message}); }
};
