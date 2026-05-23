import express from "express";
import {
  getOrders,
  getOrderById,
  updateOrderStatus,
  updateOrderPaymentStatus,
} from "../controllers/ordersController.js";
import adminAuthMiddleware from "../middleware/adminAuth.js";

const router = express.Router();

// Get all orders
router.get("/", adminAuthMiddleware, getOrders);

// Get single order
router.get("/:id", adminAuthMiddleware, getOrderById);

// Update order status
router.patch("/:id", adminAuthMiddleware, updateOrderStatus);

// Update payment status
router.patch("/:id/payment", adminAuthMiddleware, updateOrderPaymentStatus);

export default router;
