import jwt from "jsonwebtoken";

const adminAuthMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

    if (!token) {
      return res.status(401).json({ message: "Admin login required" });
    }

    const secret = process.env.JWT_SECRET || "neevkart-admin-secret";
    const decoded = jwt.verify(token, secret);

    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Admin access required" });
    }

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired admin session" });
  }
};

export default adminAuthMiddleware;
