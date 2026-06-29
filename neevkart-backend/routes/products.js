import express from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productsController.js";
import adminAuthMiddleware from "../middleware/adminAuth.js";

const router = express.Router();

// Get all products
router.get("/", adminAuthMiddleware, getProducts);

// Get product by ID
router.get("/:id", adminAuthMiddleware, getProductById);

// Create product
router.post("/", adminAuthMiddleware, createProduct);

// Update product
router.put("/:id", adminAuthMiddleware, updateProduct);

// Delete product
router.delete("/:id", adminAuthMiddleware, deleteProduct);

export default router;
