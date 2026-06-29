import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Save, ArrowLeft, Upload } from 'lucide-react';
import { Link } from 'react-router-dom';
import { API_BASE_URL, getAuthHeaders, getImageUrl } from '../lib/api';

const categories = ["Silk Sarees", "Cotton Sarees", "Wedding Collection", "Festive Wear", "New Arrivals", "Dress Materials"];
const fabrics = ["Silk Blend", "Cotton", "Organza Blend", "Brocade", "Banarasi Silk", "Crepe", "Tissue", "Chiffon Blend", "Rayon Blend", "Linen", "Kota", "Khadi", "Pattu", "Chiffon", "Georgette Blend"];
const occasions = ["Wedding", "Festive", "Daily Wear", "Party Wear", "Casual", "Bridal", "Celebration", "Summer Celebration", "Engagement", "Reception", "Haldi"];
const colors = ["Red", "Blue", "Green", "Ivory", "Pastel", "Black", "Gold", "Peach", "Navy", "Yellow", "Purple", "White", "Magenta", "Multicoloured"];
const tags = ["Bestseller", "New Arrivals", "Limited", "Sold Out", "Online Exclusive", "Premium", "Festive", "New", ""];

const AddProduct = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    originalPrice: '',
    description: '',
    category: categories[0],
    fabric: fabrics[0],
    occasion: occasions[0],
    color: colors[0],
    stock: '10',
    tag: '',
    image: '',
    images: '',
    collections: '',
    details: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const readFileAsDataUrl = (file: File) => new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please choose an image file.');
      return;
    }

    setUploading(true);
    try {
      const dataUrl = await readFileAsDataUrl(file);
      const res = await axios.post(
        `${API_BASE_URL}/api/admin/upload-image`,
        { fileName: file.name, dataUrl },
        { headers: getAuthHeaders() },
      );

      setFormData(prev => ({
        ...prev,
        image: res.data.url,
        images: [prev.images, res.data.url].filter(Boolean).join(', '),
      }));
    } catch (error: any) {
      alert(error.response?.data?.message || 'Failed to upload image.');
    } finally {
      setUploading(false);
      event.target.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...formData,
        price: Number(formData.price),
        originalPrice: formData.originalPrice ? Number(formData.originalPrice) : undefined,
        stock: Number(formData.stock),
        images: formData.images.split(',').map(s => s.trim()).filter(Boolean),
        collections: formData.collections.split(',').map(s => s.trim()).filter(Boolean),
        details: formData.details.split('\n').map(s => s.trim()).filter(Boolean),
      };

      await axios.post(`${API_BASE_URL}/api/admin/products`, payload, { headers: getAuthHeaders() });
      alert('Product added successfully!');
      navigate('/products');
    } catch (error: any) {
      console.error('Failed to add product:', error);
      alert(error.response?.data?.message || 'Failed to add product. Please check your connection and login status.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4">
        <Link to="/products" className="p-2 hover:bg-[#f0e2d8] rounded-full transition-colors text-[#56463e]">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-[#56463e]">Add New Product</h1>
          <p className="text-[#84736a] mt-1">Fill in the details to add a new saree to your catalog.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-xl shadow-sm border border-[#f0e2d8]">
        {/* Basic Info */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-[#56463e] border-b border-[#f0e2d8] pb-2">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-[#56463e] mb-1">Product Name *</label>
              <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-2 border border-[#f0e2d8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a51d49]/20 focus:border-[#a51d49]" placeholder="e.g. Banarasi Silk Saree" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-[#56463e] mb-1">Description *</label>
              <textarea required name="description" value={formData.description} onChange={handleChange} rows={4} className="w-full px-4 py-2 border border-[#f0e2d8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a51d49]/20 focus:border-[#a51d49]" placeholder="Detailed product description..."></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#56463e] mb-1">Price (Rs.) *</label>
              <input required type="number" name="price" value={formData.price} onChange={handleChange} className="w-full px-4 py-2 border border-[#f0e2d8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a51d49]/20 focus:border-[#a51d49]" placeholder="e.g. 2499" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#56463e] mb-1">Original Price (Rs.)</label>
              <input type="number" name="originalPrice" value={formData.originalPrice} onChange={handleChange} className="w-full px-4 py-2 border border-[#f0e2d8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a51d49]/20 focus:border-[#a51d49]" placeholder="Optional, for discounts" />
            </div>
          </div>
        </div>

        {/* Categories & Filters */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-[#56463e] border-b border-[#f0e2d8] pb-2">Categories & Filters</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#56463e] mb-1">Category *</label>
              <select name="category" value={formData.category} onChange={handleChange} className="w-full px-4 py-2 border border-[#f0e2d8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a51d49]/20 focus:border-[#a51d49]">
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#56463e] mb-1">Fabric *</label>
              <select name="fabric" value={formData.fabric} onChange={handleChange} className="w-full px-4 py-2 border border-[#f0e2d8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a51d49]/20 focus:border-[#a51d49]">
                {fabrics.map(f => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#56463e] mb-1">Occasion *</label>
              <select name="occasion" value={formData.occasion} onChange={handleChange} className="w-full px-4 py-2 border border-[#f0e2d8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a51d49]/20 focus:border-[#a51d49]">
                {occasions.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#56463e] mb-1">Color *</label>
              <select name="color" value={formData.color} onChange={handleChange} className="w-full px-4 py-2 border border-[#f0e2d8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a51d49]/20 focus:border-[#a51d49]">
                {colors.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#56463e] mb-1">Tag (Badge)</label>
              <select name="tag" value={formData.tag} onChange={handleChange} className="w-full px-4 py-2 border border-[#f0e2d8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a51d49]/20 focus:border-[#a51d49]">
                {tags.map(t => <option key={t} value={t}>{t || 'None'}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#56463e] mb-1">Stock Quantity *</label>
              <input required type="number" name="stock" value={formData.stock} onChange={handleChange} className="w-full px-4 py-2 border border-[#f0e2d8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a51d49]/20 focus:border-[#a51d49]" />
            </div>
          </div>
        </div>

        {/* Media & Extras */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-[#56463e] border-b border-[#f0e2d8] pb-2">Media & Extras</h2>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#56463e] mb-1">Main Product Image *</label>
              <div className="upload-row">
                <label className="upload-button">
                  <Upload size={18} />
                  {uploading ? 'Uploading...' : 'Choose local image'}
                  <input type="file" accept="image/png,image/jpeg,image/webp" onChange={handleImageUpload} disabled={uploading} />
                </label>
                <input required type="text" name="image" value={formData.image} onChange={handleChange} className="w-full px-4 py-2 border border-[#f0e2d8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a51d49]/20 focus:border-[#a51d49]" placeholder="Uploaded image URL appears here" />
              </div>
              {formData.image && (
                <img src={getImageUrl(formData.image)} alt="Product preview" className="mt-3 h-36 w-28 rounded-lg object-cover border border-[#f0e2d8]" />
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-[#56463e] mb-1">Additional Images (auto-filled after upload, comma separated)</label>
              <input type="text" name="images" value={formData.images} onChange={handleChange} className="w-full px-4 py-2 border border-[#f0e2d8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a51d49]/20 focus:border-[#a51d49]" placeholder="url1.jpg, url2.jpg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#56463e] mb-1">Collections (Comma separated)</label>
              <input type="text" name="collections" value={formData.collections} onChange={handleChange} className="w-full px-4 py-2 border border-[#f0e2d8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a51d49]/20 focus:border-[#a51d49]" placeholder="e.g. heirloom, summer" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#56463e] mb-1">Product Details (One per line)</label>
              <textarea name="details" value={formData.details} onChange={handleChange} rows={4} className="w-full px-4 py-2 border border-[#f0e2d8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a51d49]/20 focus:border-[#a51d49]" placeholder="Dry clean only&#10;Comes with unstitched blouse piece"></textarea>
            </div>
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button 
            type="submit" 
            disabled={loading}
            className="flex items-center gap-2 px-6 py-3 bg-[#a51d49] text-white rounded-lg font-medium hover:bg-[#8a183d] transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <Save size={20} />
            {loading ? 'Saving...' : 'Save Product'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
