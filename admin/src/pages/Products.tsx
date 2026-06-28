import { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { API_BASE_URL, getAuthHeaders, getImageUrl } from '../lib/api';

const Products = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/admin/products`, { headers: getAuthHeaders() });
      setProducts(res.data.products || []);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await axios.delete(`${API_BASE_URL}/api/admin/products/${id}`, { headers: getAuthHeaders() });
      fetchProducts();
    } catch (error) {
      console.error('Failed to delete product:', error);
      alert('Failed to delete product. Please make sure you are logged in as admin.');
    }
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#56463e]">Products</h1>
          <p className="text-[#84736a] mt-1">Manage your store's inventory and catalog.</p>
        </div>
        <Link 
          to="/add-product" 
          className="flex items-center gap-2 px-4 py-2 bg-[#a51d49] text-white rounded-lg hover:bg-[#8a183d] transition-colors"
        >
          <Plus size={18} />
          Add Product
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-[#f0e2d8] overflow-hidden">
        <div className="p-4 border-b border-[#f0e2d8]">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#84736a]" size={18} />
            <input 
              type="text" 
              placeholder="Search products by name or category..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-[#f0e2d8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a51d49]/20 focus:border-[#a51d49] bg-[#fbf8f4]"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-[#fbf8f4] text-xs uppercase tracking-wider text-[#84736a]">
                <th className="px-6 py-4 font-semibold">Product</th>
                <th className="px-6 py-4 font-semibold">Category</th>
                <th className="px-6 py-4 font-semibold">Price</th>
                <th className="px-6 py-4 font-semibold">Stock</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0e2d8]">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-[#84736a]">Loading products...</td>
                </tr>
              ) : filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <tr key={product._id} className="hover:bg-[#fbf8f4] transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-12 bg-gray-100 rounded overflow-hidden">
                          {product.image ? (
                            <img src={getImageUrl(product.image)} alt={product.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">No Img</div>
                          )}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-[#56463e] line-clamp-1">{product.name}</div>
                          <div className="text-xs text-[#84736a]">{product.tag || 'Standard'}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#56463e]">{product.category}</td>
                    <td className="px-6 py-4 text-sm font-medium text-[#56463e]">Rs. {product.price.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`inline-flex px-2 py-1 rounded-md text-xs font-medium ${
                        product.stock > 10 ? 'bg-green-100 text-green-800' :
                        product.stock > 0 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {product.stock || 0} in stock
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/edit-product/${product._id}`}
                          className="p-1.5 text-[#84736a] hover:text-[#a51d49] hover:bg-[#fff1f5] rounded-lg transition-colors"
                        >
                          <Edit size={18} />
                        </Link>
                        <button 
                          onClick={() => handleDelete(product._id)}
                          className="p-1.5 text-[#84736a] hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-[#84736a]">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Products;
