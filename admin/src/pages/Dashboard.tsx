import { useState, useEffect } from 'react';
import axios from 'axios';
import { IndianRupee, ShoppingBag, Package, TrendingUp } from 'lucide-react';
import { API_BASE_URL, getAuthHeaders } from '../lib/api';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalEarnings: 0,
    totalOrders: 0,
    totalProductsSold: 0,
  });
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/admin/orders`, { headers: getAuthHeaders() });
        const orders = res.data.orders || [];
        
        let earnings = 0;
        let productsSold = 0;
        
        orders.forEach((order: any) => {
          if (order.status !== 'cancelled') {
            earnings += order.totalAmount || 0;
            if (order.items) {
              order.items.forEach((item: any) => {
                productsSold += item.quantity || 1;
              });
            }
          }
        });

        setStats({
          totalEarnings: earnings,
          totalOrders: orders.length,
          totalProductsSold: productsSold,
        });
        
        setRecentOrders(orders.slice(0, 5));
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center h-64 text-[#a51d49]">Loading dashboard...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#56463e]">Dashboard Overview</h1>
        <p className="text-[#84736a] mt-1">Welcome back. Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-[#f0e2d8] p-6 transition hover:shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-[#84736a]">Total Earnings</h3>
            <div className="w-10 h-10 rounded-full bg-[#f3fcd4] flex items-center justify-center text-[#4b7a13]">
              <IndianRupee size={20} />
            </div>
          </div>
          <p className="text-3xl font-bold text-[#56463e]">Rs. {stats.totalEarnings.toLocaleString()}</p>
          <div className="mt-2 flex items-center text-sm text-[#4b7a13]">
            <TrendingUp size={16} className="mr-1" />
            <span>Updated just now</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-[#f0e2d8] p-6 transition hover:shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-[#84736a]">Total Orders</h3>
            <div className="w-10 h-10 rounded-full bg-[#e0f2fe] flex items-center justify-center text-[#0284c7]">
              <ShoppingBag size={20} />
            </div>
          </div>
          <p className="text-3xl font-bold text-[#56463e]">{stats.totalOrders}</p>
          <div className="mt-2 flex items-center text-sm text-[#84736a]">
            <span>Across all statuses</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-[#f0e2d8] p-6 transition hover:shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-[#84736a]">Sarees Sold</h3>
            <div className="w-10 h-10 rounded-full bg-[#fff1f5] flex items-center justify-center text-[#a51d49]">
              <Package size={20} />
            </div>
          </div>
          <p className="text-3xl font-bold text-[#56463e]">{stats.totalProductsSold}</p>
          <div className="mt-2 flex items-center text-sm text-[#84736a]">
            <span>Total quantity sold</span>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow-sm border border-[#f0e2d8] overflow-hidden">
        <div className="px-6 py-4 border-b border-[#f0e2d8]">
          <h3 className="font-bold text-[#56463e]">Recent Orders</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#fbf8f4] text-xs uppercase tracking-wider text-[#84736a]">
                <th className="px-6 py-4 font-semibold">Order ID</th>
                <th className="px-6 py-4 font-semibold">Customer</th>
                <th className="px-6 py-4 font-semibold">Amount</th>
                <th className="px-6 py-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0e2d8]">
              {recentOrders.length > 0 ? (
                recentOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-[#fbf8f4] transition">
                    <td className="px-6 py-4 text-sm text-[#56463e] font-mono">{order._id.substring(order._id.length - 8)}</td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-[#56463e]">{order.customerName}</div>
                      <div className="text-xs text-[#84736a]">{order.customerEmail}</div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-[#56463e]">Rs. {order.totalAmount.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                        ${order.status === 'completed' ? 'bg-[#f3fcd4] text-[#4b7a13]' : 
                          order.status === 'processing' ? 'bg-[#e0f2fe] text-[#0284c7]' :
                          order.status === 'cancelled' ? 'bg-[#ffe4e6] text-[#e11d48]' :
                          'bg-[#fef3c7] text-[#b45309]'}`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-[#84736a]">
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

export default Dashboard;
