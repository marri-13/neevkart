import express from "express";
import { getSettings, updateSettings } from "../controllers/settingsController.js";
import adminAuthMiddleware from "../middleware/adminAuth.js";

const router = express.Router();

// Get settings
router.get("/", adminAuthMiddleware, getSettings);

// Update settings
router.put("/", adminAuthMiddleware, updateSettings);

export default router;
