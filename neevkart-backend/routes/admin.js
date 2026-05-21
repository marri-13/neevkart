const express = require("express");
const { verifyToken } = require("@clerk/backend");
const Admin = require("../models/Admin");

const router = express.Router();

router.get("/check-role", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = await verifyToken(token, {
      secretKey: process.env.CLERK_SECRET_KEY,
    });

    const clerkUserId = decoded.sub;
    const admin = await Admin.findOne({ clerkUserId });

    if (!admin) {
      return res.status(403).json({ message: "User is not an admin" });
    }

    res.json({
      role: admin.role,
      name: admin.name,
      email: admin.email,
      clerkUserId: admin.clerkUserId,
    });
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
});

module.exports = router;
