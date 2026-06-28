import express from "express";
import cors from "cors";
import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./config/db.js";
import paymentRoutes from "./routes/payment.js";
import adminRoutes from "./routes/admin.js";
import productsRoutes from "./routes/products.js";
import publicProductsRoutes from "./routes/publicProducts.js";
import ordersRoutes from "./routes/orders.js";
import settingsRoutes from "./routes/settings.js";
import userRoutes from "./routes/user.js";

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

// Routes
app.use("/api/payment", paymentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/admin/products", productsRoutes);
app.use("/api/products", publicProductsRoutes);
app.use("/api/admin/orders", ordersRoutes);
app.use("/api/admin/settings", settingsRoutes);
app.use("/api/user", userRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "Backend is running" });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});
