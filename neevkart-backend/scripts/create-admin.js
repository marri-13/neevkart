const mongoose = require("mongoose");
require("dotenv").config();

const Admin = require("../models/Admin");

const mongoURI = process.env.MONGODB_URI || "mongodb://localhost:27017/neevkart";

async function createAdmin() {
  const [, , clerkUserId, email, name, role = "admin"] = process.argv;

  if (!clerkUserId || !email || !name) {
    console.error(
      "Usage: node create-admin.js <clerkUserId> <email> <name> [role]"
    );
    console.error("Role options: admin (default), superadmin");
    process.exit(1);
  }

  if (!["admin", "superadmin"].includes(role)) {
    console.error("Invalid role. Use 'admin' or 'superadmin'");
    process.exit(1);
  }

  try {
    await mongoose.connect(mongoURI);
    console.log("✅ MongoDB connected");

    const existingAdmin = await Admin.findOne({
      $or: [{ clerkUserId }, { email }],
    });

    if (existingAdmin) {
      console.error("❌ Admin with this clerkUserId or email already exists");
      process.exit(1);
    }

    const admin = new Admin({
      clerkUserId,
      email,
      name,
      role,
    });

    await admin.save();
    console.log(`✅ Admin created successfully`);
    console.log(`   Name: ${admin.name}`);
    console.log(`   Email: ${admin.email}`);
    console.log(`   Role: ${admin.role}`);
    console.log(`   Clerk ID: ${admin.clerkUserId}`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error creating admin:", error.message);
    process.exit(1);
  }
}

createAdmin();
