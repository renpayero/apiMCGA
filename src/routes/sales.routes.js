import { Router } from "express";
import { getSales } from "../controllers/sales.controllers.js";

const router = Router();

router.get("/api/sales", getSales);

export default router;