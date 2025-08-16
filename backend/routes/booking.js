// backend/routes/booking.js
import { Router } from "express";
import auth from "../middleware/auth.js";
import { searchAvailability, createPreBooking, confirmBooking, myBookings } from "../controllers/bookingController.js";

const router = Router();
router.get("/search", searchAvailability);            // ?serviceId=&date=
router.post("/", auth, createPreBooking);             // pre-book (pending)
router.post("/:id/confirm", confirmBooking);          // admin/owner action
router.get("/mine", auth, myBookings);                // track my bookings
export default router;
