import Admin from "../models/Admin.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";

export const checkRole = async (req, res) => {
  try {
    // Find the first admin or return a mock admin since Clerk is removed
    let admin = await Admin.findOne();
    if (!admin) {
      admin = {
        role: "admin",
        name: "Temporary Admin",
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

