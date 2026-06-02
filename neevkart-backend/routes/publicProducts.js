import express from "express";
import { getProducts, getProductBySlug } from "../controllers/publicProductsController.js";

const router = express.Router();

// Public routes for fetching products
router.get("/", getProducts);
router.get("/:slug", getProductBySlug);

export default router;
