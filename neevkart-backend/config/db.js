import dns from "node:dns";
dns.setServers(["8.8.8.8"]);

import mongoose from "mongoose";
import Product from "../models/Product.js";
import { seedProducts } from "./seedData.js";

const connectDB = async () => {
  mongoose.connection.on("connected", async () => {
    console.log(" Database connected");

    // Check if products exist, seed if not
    try {
      const productCount = await Product.countDocuments();
      if (productCount === 0) {
        console.log("Product collection is empty. Starting database seeding...");
        await Product.insertMany(seedProducts);
        console.log("Seeding completed! 18 premium products successfully seeded.");
      } else {
        // console.log(`Database already seeded with ${productCount} products.`);
      }
    } catch (err) {
      console.error(" Failed to seed database:", err);
    }
  });
  console.log("MONGODB_URI:", process.env.MONGODB_URI);
  await mongoose.connect(`${process.env.MONGODB_URI}/neevkart`);
};

export default connectDB; 