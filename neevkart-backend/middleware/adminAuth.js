const adminAuthMiddleware = async (req, res, next) => {
  // Temporary pass-through auth middleware since Clerk is removed
  req.user = {
    name: "Temporary Admin",
    email: "admin@neevkart.com",
    role: "admin",
  };
  next();
};

export default adminAuthMiddleware;
