"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { createAdminApi, checkAdminRole } from "@/lib/adminAuth";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import "../admin.css";
import "./products.css";

interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
}

export default function ProductsPage() {
  const { getToken } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    const initPage = async () => {
      try {
        const token = await getToken();
        if (!token) {
          router.push("/sign-in");
          return;
        }
        await checkAdminRole(token);
        fetchProducts(token);
      } catch (err) {
        console.error("Admin check failed:", err);
        router.push("/");
      }
    };
    initPage();
  }, [getToken, router]);

  const fetchProducts = async (token: string) => {
    try {
      const api = createAdminApi(token);
      const response = await api.get("/api/admin/products");
      setProducts(response.data.products || []);
    } catch (err) {
      console.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = await getToken();
      if (!token) return;

      const api = createAdminApi(token);
      if (editingId) {
        await api.put(`/api/admin/products/${editingId}`, formData);
      } else {
        await api.post("/api/admin/products", formData);
      }
      fetchProducts(token);
      resetForm();
    } catch (err) {
      console.error("Failed to save product");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      const token = await getToken();
      if (!token) return;

      const api = createAdminApi(token);
      await api.delete(`/api/admin/products/${id}`);
      fetchProducts(token);
    } catch (err) {
      console.error("Failed to delete product");
    }
  };

  const handleEdit = (product: Product) => {
    setFormData({
      name: product.name,
      price: product.price.toString(),
      category: product.category,
      description: product.description,
      image: product.image,
    });
    setEditingId(product._id);
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      price: "",
      category: "",
      description: "",
      image: "",
    });
    setEditingId(null);
    setShowForm(false);
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="admin-dashboard">
      <Sidebar />
      <main className="main-content">
        <Header />

        <div className="products-content">
          <div className="products-header">
            <h1>Products Management</h1>
            <button
              className="btn-primary"
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? "Cancel" : "+ Add New Product"}
            </button>
          </div>

          {showForm && (
            <div className="product-form-container">
              <h2>{editingId ? "Edit Product" : "Add New Product"}</h2>
              <form onSubmit={handleSubmit} className="product-form">
                <div className="form-grid">
                  <div className="form-group">
                    <label>Product Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Price (₹)</label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Category</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Category</option>
                      <option value="sarees">Sarees</option>
                      <option value="wedding">Wedding</option>
                      <option value="festive">Festive</option>
                      <option value="materials">Dress Materials</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={3}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Product Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                    {formData.image && (
                      <img
                        src={formData.image}
                        alt="preview"
                        className="image-preview"
                      />
                    )}
                  </div>
                </div>

                <div className="form-actions">
                  <button type="submit" className="btn-primary">
                    {editingId ? "Update Product" : "Add Product"}
                  </button>
                  <button type="button" className="btn-secondary" onClick={resetForm}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="products-table-container">
            <table className="products-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.length > 0 ? (
                  products.map((product) => (
                    <tr key={product._id}>
                      <td>
                        {product.image && (
                          <img src={product.image} alt={product.name} />
                        )}
                      </td>
                      <td>{product.name}</td>
                      <td>{product.category}</td>
                      <td>₹{product.price}</td>
                      <td className="action-buttons">
                        <button
                          className="btn-edit"
                          onClick={() => handleEdit(product)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn-delete"
                          onClick={() => handleDelete(product._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="empty-state">
                      No products yet. Add your first product!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
