const bcryptjs = require("bcryptjs");
const mongoose = require("mongoose");
const readline = require("readline");
require("dotenv").config();

const Admin = require("../models/Admin");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = (prompt) => {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
};

async function createAdmin() {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/neevkart"
    );
    console.log("✅ Connected to MongoDB");

    const name = await question("Enter admin name: ");
    const email = await question("Enter admin email: ");
    const password = await question("Enter admin password: ");

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      console.log("❌ Admin with this email already exists");
      process.exit(1);
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    const admin = new Admin({
      name,
      email,
      password: hashedPassword,
      role: "admin",
    });

    await admin.save();
    console.log("✅ Admin user created successfully!");
    console.log(`   Email: ${email}`);
    console.log(`   You can now login at: http://localhost:3000/admin/login`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error creating admin:", error.message);
    process.exit(1);
  } finally {
    rl.close();
  }
}

createAdmin();
