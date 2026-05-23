import Admin from "../models/Admin.js";

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
