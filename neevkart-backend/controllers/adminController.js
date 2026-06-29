import Admin from "../models/Admin.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";
import jwt from "jsonwebtoken";

const createToken = (payload) => {
  const secret = process.env.JWT_SECRET || "neevkart-admin-secret";
  return jwt.sign(payload, secret, { expiresIn: "1d" });
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const adminUsername = process.env.ADMIN_USERNAME || "admin";
    const adminPassword = process.env.ADMIN_PASSWORD || "admin";

    if (username !== adminUsername || password !== adminPassword) {
      return res.status(401).json({ message: "Invalid admin credentials" });
    }

    const admin = {
      username: adminUsername,
      role: "admin",
      name: "Neevkart Admin",
    };

    res.json({
      success: true,
      token: createToken(admin),
      admin,
    });
  } catch (error) {
    res.status(500).json({ message: "Admin login failed" });
  }
};

export const checkRole = async (req, res) => {
  try {
    let admin = req.user;
    const storedAdmin = await Admin.findOne();
    if (storedAdmin) {
      admin = storedAdmin;
    }
    if (!admin) {
      admin = {
        role: "admin",
        name: "Neevkart Admin",
        email: "admin@neevkart.com",
      };
    }

    res.json({
      isAdmin: true,
      role: admin.role,
      name: admin.name,
      email: admin.email,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

// Get admin dashboard stats
export const getStats = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();
    
    // Sum total revenue of completed orders
    const completedOrders = await Order.find({ paymentStatus: "completed" });
    const totalRevenue = completedOrders.reduce((sum, order) => sum + order.totalAmount, 0);

    res.json({
      success: true,
      stats: {
        totalProducts,
        totalOrders,
        totalRevenue,
      },
    });
  } catch (error) {
    console.error("Fetch admin stats error:", error);
    res.status(500).json({ message: "Failed to fetch dashboard stats" });
  }
};

