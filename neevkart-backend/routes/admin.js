import express from "express";
import { checkRole, getStats } from "../controllers/adminController.js";
import adminAuthMiddleware from "../middleware/adminAuth.js";

const router = express.Router();

router.get("/check-role", checkRole);
router.get("/stats", adminAuthMiddleware, getStats);

export default router;
