"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createAdminApi, checkAdminRole } from "@/lib/adminAuth";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
}

export default function ProductsPage() {
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
        await checkAdminRole();
        fetchProducts();
      } catch (err) {
        console.error("Admin check failed:", err);
        router.push("/");
      }
    };
    initPage();
  }, [router]);

  const fetchProducts = async () => {
    try {
      const api = createAdminApi();
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
      const api = createAdminApi();
      if (editingId) {
        await api.put(`/api/admin/products/${editingId}`, formData);
      } else {
        await api.post("/api/admin/products", formData);
      }
      fetchProducts();
      resetForm();
    } catch (err) {
      console.error("Failed to save product");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      const api = createAdminApi();
      await api.delete(`/api/admin/products/${id}`);
      fetchProducts();
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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-xl text-gray-400 font-sans">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#f5f5f5]">
      <Sidebar />
      <main className="flex-1 ml-[250px] transition-all duration-300 overflow-y-auto max-h-screen max-md:ml-[80px]">
        <Header />

        <div className="p-8 max-w-[1400px] mx-auto max-md:p-4 font-sans">
          <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
            <h1 className="text-gray-800 text-3xl font-bold max-md:text-2xl">Products Management</h1>
            <button
              className="inline-flex items-center justify-center bg-gradient-to-r from-[#8b2e5f] to-[#c41e3a] text-white px-6 py-3 rounded-lg font-semibold cursor-pointer transition hover:-translate-y-0.5 hover:shadow-[0_8px_16px_rgba(139,46,95,0.3)] duration-300"
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? "Cancel" : "+ Add New Product"}
            </button>
          </div>

          {showForm && (
            <div className="bg-white p-8 rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.06)] mb-8">
              <h2 className="text-gray-800 text-xl font-bold mb-6">
                {editingId ? "Edit Product" : "Add New Product"}
              </h2>
              <form onSubmit={handleSubmit} className="flex flex-col">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="flex flex-col">
                    <label className="font-semibold text-gray-700 mb-2 text-sm">Product Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:border-[#8b2e5f] focus:ring-2 focus:ring-[#8b2e5f]/10 transition duration-300"
                      required
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="font-semibold text-gray-700 mb-2 text-sm">Price (₹)</label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      className="border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:border-[#8b2e5f] focus:ring-2 focus:ring-[#8b2e5f]/10 transition duration-300"
                      required
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="font-semibold text-gray-700 mb-2 text-sm">Category</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:border-[#8b2e5f] focus:ring-2 focus:ring-[#8b2e5f]/10 transition duration-300"
                      required
                    >
                      <option value="">Select Category</option>
                      <option value="sarees">Sarees</option>
                      <option value="wedding">Wedding</option>
                      <option value="festive">Festive</option>
                      <option value="materials">Dress Materials</option>
                    </select>
                  </div>

                  <div className="flex flex-col">
                    <label className="font-semibold text-gray-700 mb-2 text-sm">Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={3}
                      className="border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:border-[#8b2e5f] focus:ring-2 focus:ring-[#8b2e5f]/10 transition duration-300"
                      required
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="font-semibold text-gray-700 mb-2 text-sm">Product Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:border-[#8b2e5f] focus:ring-2 focus:ring-[#8b2e5f]/10 transition duration-300"
                    />
                    {formData.image && (
                      <img
                        src={formData.image}
                        alt="preview"
                        className="max-w-[150px] mt-3 rounded-lg border border-gray-200 shadow-sm"
                      />
                    )}
                  </div>
                </div>

                <div className="flex gap-4 mt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-[#8b2e5f] to-[#c41e3a] text-white px-6 py-3 rounded-lg font-semibold cursor-pointer transition hover:-translate-y-0.5 hover:shadow-[0_8px_16px_rgba(139,46,95,0.3)] duration-300"
                  >
                    {editingId ? "Update Product" : "Add Product"}
                  </button>
                  <button
                    type="button"
                    className="flex-1 bg-gray-100 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold cursor-pointer transition hover:bg-gray-200 duration-300"
                    onClick={resetForm}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="bg-white rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.06)] overflow-hidden overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="p-4 font-semibold text-gray-700 whitespace-nowrap">Image</th>
                  <th className="p-4 font-semibold text-gray-700 whitespace-nowrap">Name</th>
                  <th className="p-4 font-semibold text-gray-700 whitespace-nowrap">Category</th>
                  <th className="p-4 font-semibold text-gray-700 whitespace-nowrap">Price</th>
                  <th className="p-4 font-semibold text-gray-700 whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.length > 0 ? (
                  products.map((product) => (
                    <tr key={product._id} className="hover:bg-gray-50 transition duration-150">
                      <td className="p-4 border-b border-gray-100 text-gray-600">
                        {product.image && (
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-[60px] h-[60px] object-cover rounded-lg border border-gray-200 shadow-sm"
                          />
                        )}
                      </td>
                      <td className="p-4 border-b border-gray-100 text-gray-700 font-medium">
                        {product.name}
                      </td>
                      <td className="p-4 border-b border-gray-100 text-gray-650 capitalize">
                        {product.category}
                      </td>
                      <td className="p-4 border-b border-gray-100 text-[#2e7d32] font-semibold text-[1.05rem]">
                        ₹{product.price}
                      </td>
                      <td className="p-4 border-b border-gray-100">
                        <div className="flex gap-2">
                          <button
                            className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-md font-semibold text-xs transition hover:bg-blue-100 duration-300"
                            onClick={() => handleEdit(product)}
                          >
                            Edit
                          </button>
                          <button
                            className="px-3 py-1.5 bg-red-50 text-red-600 rounded-md font-semibold text-xs transition hover:bg-red-100 duration-300"
                            onClick={() => handleDelete(product._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center text-gray-400 py-12">
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
