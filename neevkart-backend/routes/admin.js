import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { randomUUID } from "crypto";
import { checkRole, getStats, login } from "../controllers/adminController.js";
import adminAuthMiddleware from "../middleware/adminAuth.js";

const router = express.Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadsDir = path.join(__dirname, "../public/uploads");

router.post("/login", login);
router.get("/check-role", adminAuthMiddleware, checkRole);
router.get("/stats", adminAuthMiddleware, getStats);

router.post("/upload-image", adminAuthMiddleware, async (req, res) => {
  try {
    const { fileName, dataUrl } = req.body;
    const match = /^data:(image\/(?:jpeg|jpg|png|webp));base64,(.+)$/.exec(dataUrl || "");

    if (!match) {
      return res.status(400).json({ message: "Please upload a JPG, PNG, or WEBP image." });
    }

    const extension = match[1].split("/")[1].replace("jpeg", "jpg");
    const safeBaseName = path
      .parse(fileName || "product-image")
      .name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 40) || "product-image";
    const storedFileName = `${safeBaseName}-${randomUUID()}.${extension}`;

    await fs.promises.mkdir(uploadsDir, { recursive: true });
    await fs.promises.writeFile(path.join(uploadsDir, storedFileName), Buffer.from(match[2], "base64"));

    const baseUrl = `${req.protocol}://${req.get("host")}`;
    res.status(201).json({
      url: `${baseUrl}/uploads/${storedFileName}`,
      path: `/uploads/${storedFileName}`,
    });
  } catch (error) {
    console.error("Upload image error:", error);
    res.status(500).json({ message: "Failed to upload image" });
  }
});

export default router;

