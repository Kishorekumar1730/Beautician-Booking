// backend/routes/service.js
import { Router } from "express";
import { listServices, seed } from "../controllers/serviceController.js";
const router = Router();
router.get("/", listServices);
router.post("/seed", seed); // dev only
export default router;
