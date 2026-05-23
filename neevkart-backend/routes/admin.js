import express from "express";
import { checkRole } from "../controllers/adminController.js";

const router = express.Router();

router.get("/check-role", checkRole);

export default router;
