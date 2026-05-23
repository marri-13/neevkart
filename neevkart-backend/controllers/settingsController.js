import Settings from "../models/Settings.js";

// Get settings
export const getSettings = async (req, res) => {
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
};

// Update settings
export const updateSettings = async (req, res) => {
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
};
