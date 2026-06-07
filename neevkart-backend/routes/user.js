import express from "express";
import { registerUser, loginUser, getUserOrders } from "../controllers/userController.js";
import userAuthMiddleware from "../middleware/userAuth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/orders", userAuthMiddleware, getUserOrders);

export default router;
