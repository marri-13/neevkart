import Product from "../models/Product.js";

// Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ products });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

// Create product
export const createProduct = async (req, res) => {
  try {
    const { 
      name, price, category, description, image,
      fabric, occasion, color, originalPrice, stock, tag, collections, details, images 
    } = req.body;

    const slug = name.toLowerCase().replace(/\s+/g, "-");

    const product = new Product({
      name, price, category, description, image, slug,
      fabric, occasion, color, originalPrice, stock, tag, collections, details, images
    });

    await product.save();
    res.status(201).json({ product, message: "Product created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to create product", error: error.message });
  }
};

// Get product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ product });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch product" });
  }
};

// Update product
export const updateProduct = async (req, res) => {
  try {
    const { 
      name, price, category, description, image,
      fabric, occasion, color, originalPrice, stock, tag, collections, details, images 
    } = req.body;

    const updates = { 
      name, price, category, description, image,
      fabric, occasion, color, originalPrice, stock, tag, collections, details, images 
    };
    if (name) {
      updates.slug = name.toLowerCase().replace(/\s+/g, "-");
    }

    const product = await Product.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    });

    res.json({ product, message: "Product updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update product" });
  }
};

// Delete product
export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete product" });
  }
};
