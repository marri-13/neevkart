import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    fabric: {
      type: String,
      default: "",
    },
    occasion: {
      type: String,
      default: "",
    },
    color: {
      type: String,
      default: "",
    },
    originalPrice: {
      type: Number,
    },
    image: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      default: [],
    },
    stock: {
      type: Number,
      default: 0,
    },
    tag: {
      type: String,
      default: "",
    },
    collections: {
      type: [String],
      default: [],
    },
    description: {
      type: String,
      required: true,
    },
    details: {
      type: [String],
      default: [],
    },
    slug: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
