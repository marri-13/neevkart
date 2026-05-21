const express = require("express");
const Order = require("../models/Order");
const adminAuthMiddleware = require("../middleware/adminAuth");

const router = express.Router();

// Get all orders
router.get("/", adminAuthMiddleware, async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json({ orders });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});

// Get single order
router.get("/:id", adminAuthMiddleware, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json({ order });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch order" });
  }
});

// Update order status
router.patch("/:id", adminAuthMiddleware, async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json({ order, message: "Order status updated" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update order" });
  }
});

// Update payment status
router.patch("/:id/payment", adminAuthMiddleware, async (req, res) => {
  try {
    const { paymentStatus } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { paymentStatus },
      { new: true }
    );
    res.json({ order, message: "Payment status updated" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update payment status" });
  }
});

module.exports = router;
