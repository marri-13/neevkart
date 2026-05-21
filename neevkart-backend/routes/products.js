const express = require("express");
const Product = require("../models/Product");
const adminAuthMiddleware = require("../middleware/adminAuth");

const router = express.Router();

// Get all products
router.get("/", adminAuthMiddleware, async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ products });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
});

// Create product
router.post("/", adminAuthMiddleware, async (req, res) => {
  try {
    const { name, price, category, description, image } = req.body;

    const slug = name.toLowerCase().replace(/\s+/g, "-");

    const product = new Product({
      name,
      price,
      category,
      description,
      image,
      slug,
    });

    await product.save();
    res.status(201).json({ product, message: "Product created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to create product" });
  }
});

// Update product
router.put("/:id", adminAuthMiddleware, async (req, res) => {
  try {
    const { name, price, category, description, image } = req.body;

    const updates = { name, price, category, description, image };
    if (name) {
      updates.slug = name.toLowerCase().replace(/\s+/g, "-");
    }

    const product = await Product.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    });

    res.json({ product, message: "Product updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update product" });
  }
});

// Delete product
router.delete("/:id", adminAuthMiddleware, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete product" });
  }
});

module.exports = router;
