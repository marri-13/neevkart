import { useState, useEffect } from 'react';
import axios from 'axios';
import { Search } from 'lucide-react';
import { API_BASE_URL, getAuthHeaders } from '../lib/api';

const Orders = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/admin/orders`, { headers: getAuthHeaders() });
      setOrders(res.data.orders || []);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await axios.patch(`${API_BASE_URL}/api/admin/orders/${id}`, { status: newStatus }, { headers: getAuthHeaders() });
      fetchOrders(); // refresh
    } catch (error) {
      console.error('Failed to update order status:', error);
      alert('Failed to update status.');
    }
  };

  const filteredOrders = orders.filter(o => 
    o.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    o._id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#56463e]">Orders</h1>
          <p className="text-[#84736a] mt-1">Manage and track customer orders.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-[#f0e2d8] overflow-hidden">
        <div className="p-4 border-b border-[#f0e2d8]">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#84736a]" size={18} />
            <input 
              type="text" 
              placeholder="Search by customer name or order ID..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-[#f0e2d8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a51d49]/20 focus:border-[#a51d49] bg-[#fbf8f4]"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-[#fbf8f4] text-xs uppercase tracking-wider text-[#84736a]">
                <th className="px-6 py-4 font-semibold">Order Details</th>
                <th className="px-6 py-4 font-semibold">Customer</th>
                <th className="px-6 py-4 font-semibold">Items</th>
                <th className="px-6 py-4 font-semibold">Total Amount</th>
                <th className="px-6 py-4 font-semibold">Payment Status</th>
                <th className="px-6 py-4 font-semibold text-right">Order Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0e2d8]">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-[#84736a]">Loading orders...</td>
                </tr>
              ) : filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-[#fbf8f4] transition">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-[#56463e] font-mono">{order._id.substring(order._id.length - 8)}</div>
                      <div className="text-xs text-[#84736a]">{new Date(order.createdAt).toLocaleDateString()}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-[#56463e]">{order.customerName}</div>
                      <div className="text-xs text-[#84736a]">{order.customerEmail}</div>
                      <div className="text-xs text-[#84736a]">{order.customerPhone}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-[#56463e] max-w-[200px] truncate">
                        {order.items?.map((item: any) => `${item.quantity}x ${item.name}`).join(', ')}
                      </div>
                      <div className="text-xs text-[#84736a]">{order.items?.length || 0} item(s)</div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-[#56463e]">Rs. {order.totalAmount?.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                        ${order.paymentStatus === 'completed' ? 'bg-[#f3fcd4] text-[#4b7a13]' : 
                          order.paymentStatus === 'failed' ? 'bg-[#ffe4e6] text-[#e11d48]' :
                          'bg-[#fef3c7] text-[#b45309]'}`}
                      >
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <select 
                        value={order.status}
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        className={`text-sm font-medium rounded-lg px-3 py-1.5 border capitalize cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#a51d49]/20
                          ${order.status === 'completed' ? 'bg-[#f3fcd4] border-[#d9f99d] text-[#4b7a13]' : 
                            order.status === 'processing' ? 'bg-[#e0f2fe] border-[#bae6fd] text-[#0284c7]' :
                            order.status === 'shipped' ? 'bg-[#f5f3ff] border-[#ddd6fe] text-[#6d28d9]' :
                            order.status === 'cancelled' ? 'bg-[#ffe4e6] border-[#fecdd3] text-[#e11d48]' :
                            'bg-[#fef3c7] border-[#fde68a] text-[#b45309]'}`}
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-[#84736a]">
                    No orders found.
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

export default Orders;
