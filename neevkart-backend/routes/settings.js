const express = require("express");
const Settings = require("../models/Settings");
const adminAuthMiddleware = require("../middleware/adminAuth");

const router = express.Router();

// Get settings
router.get("/", adminAuthMiddleware, async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = new Settings();
      await settings.save();
    }
    res.json({ settings });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch settings" });
  }
});

// Update settings
router.put("/", adminAuthMiddleware, async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = new Settings();
    }

    Object.assign(settings, req.body);
    await settings.save();

    res.json({ settings, message: "Settings updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update settings" });
  }
});

module.exports = router;
