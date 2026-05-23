"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createAdminApi, checkAdminRole } from "@/lib/adminAuth";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

interface Order {
  _id: string;
  customerName: string;
  customerEmail: string;
  totalAmount: number;
  status: string;
  paymentStatus: string;
  items: any[];
  createdAt: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const router = useRouter();

  useEffect(() => {
    const initPage = async () => {
      try {
        await checkAdminRole();
        fetchOrders();
      } catch (err) {
        console.error("Admin check failed:", err);
        router.push("/");
      }
    };
    initPage();
  }, [router]);

  const fetchOrders = async () => {
    try {
      const api = createAdminApi();
      const response = await api.get("/api/admin/orders");
      setOrders(response.data.orders || []);
    } catch (err) {
      console.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const api = createAdminApi();
      await api.patch(`/api/admin/orders/${orderId}`, { status: newStatus });
      fetchOrders();
    } catch (err) {
      console.error("Failed to update order");
    }
  };

  const updatePaymentStatus = async (orderId: string, paymentStatus: string) => {
    try {
      const api = createAdminApi();
      await api.patch(`/api/admin/orders/${orderId}/payment`, { paymentStatus });
      fetchOrders();
    } catch (err) {
      console.error("Failed to update payment status");
    }
  };

  const filteredOrders =
    filter === "all"
      ? orders
      : orders.filter((order) =>
          filter === "pending"
            ? order.status === "pending"
            : filter === "completed"
            ? order.status === "completed"
            : order.paymentStatus === "pending"
        );

  const getStatusColorClass = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-[#fff3cd] text-[#856404]";
      case "processing":
        return "bg-[#cce5ff] text-[#004085]";
      case "shipped":
        return "bg-[#d1ecf1] text-[#0c5460]";
      case "completed":
        return "bg-[#d4edda] text-[#155724]";
      case "cancelled":
      case "failed":
        return "bg-[#f8d7da] text-[#721c24]";
      default:
        return "bg-gray-100 text-gray-700";
    }
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
            <h1 className="text-gray-805 text-3xl font-bold max-md:text-2xl">Orders Management</h1>
            <div className="flex gap-2 flex-wrap max-md:w-full">
              <button
                className={`px-4 py-2 border-2 rounded-lg cursor-pointer font-semibold transition-all duration-300 ${
                  filter === "all"
                    ? "border-transparent bg-gradient-to-r from-[#8b2e5f] to-[#c41e3a] text-white"
                    : "border-gray-200 bg-white text-gray-500 hover:border-[#8b2e5f] hover:text-[#8b2e5f]"
                }`}
                onClick={() => setFilter("all")}
              >
                All Orders
              </button>
              <button
                className={`px-4 py-2 border-2 rounded-lg cursor-pointer font-semibold transition-all duration-300 ${
                  filter === "pending"
                    ? "border-transparent bg-gradient-to-r from-[#8b2e5f] to-[#c41e3a] text-white"
                    : "border-gray-200 bg-white text-gray-500 hover:border-[#8b2e5f] hover:text-[#8b2e5f]"
                }`}
                onClick={() => setFilter("pending")}
              >
                Pending
              </button>
              <button
                className={`px-4 py-2 border-2 rounded-lg cursor-pointer font-semibold transition-all duration-300 ${
                  filter === "completed"
                    ? "border-transparent bg-gradient-to-r from-[#8b2e5f] to-[#c41e3a] text-white"
                    : "border-gray-200 bg-white text-gray-500 hover:border-[#8b2e5f] hover:text-[#8b2e5f]"
                }`}
                onClick={() => setFilter("completed")}
              >
                Completed
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.06)] overflow-hidden overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="p-4 font-semibold text-gray-700 whitespace-nowrap">Order ID</th>
                  <th className="p-4 font-semibold text-gray-700 whitespace-nowrap">Customer</th>
                  <th className="p-4 font-semibold text-gray-700 whitespace-nowrap">Amount</th>
                  <th className="p-4 font-semibold text-gray-700 whitespace-nowrap">Order Status</th>
                  <th className="p-4 font-semibold text-gray-700 whitespace-nowrap">Payment Status</th>
                  <th className="p-4 font-semibold text-gray-700 whitespace-nowrap">Date</th>
                  <th className="p-4 font-semibold text-gray-700 whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <tr key={order._id} className="hover:bg-gray-50 transition duration-150">
                      <td className="p-4 border-b border-gray-100 text-gray-600 font-semibold text-[#8b2e5f]">
                        #{order._id.slice(0, 8)}
                      </td>
                      <td className="p-4 border-b border-gray-100 text-gray-600">
                        <div>
                          <p className="font-semibold text-gray-800 m-0">{order.customerName}</p>
                          <p className="text-gray-400 text-xs mt-1 m-0">{order.customerEmail}</p>
                        </div>
                      </td>
                      <td className="p-4 border-b border-gray-100 text-[#2e7d32] font-semibold text-[1.05rem]">
                        ₹{order.totalAmount}
                      </td>
                      <td className="p-4 border-b border-gray-100">
                        <select
                          className={`p-2 border border-gray-300 rounded-md text-xs cursor-pointer focus:outline-none focus:border-[#8b2e5f] focus:ring-2 focus:ring-[#8b2e5f]/10 transition duration-300 font-semibold ${getStatusColorClass(
                            order.status
                          )}`}
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="p-4 border-b border-gray-100">
                        <select
                          className={`p-2 border border-gray-300 rounded-md text-xs cursor-pointer focus:outline-none focus:border-[#8b2e5f] focus:ring-2 focus:ring-[#8b2e5f]/10 transition duration-300 font-semibold ${getStatusColorClass(
                            order.paymentStatus
                          )}`}
                          value={order.paymentStatus}
                          onChange={(e) => updatePaymentStatus(order._id, e.target.value)}
                        >
                          <option value="pending">Pending</option>
                          <option value="completed">Completed</option>
                          <option value="failed">Failed</option>
                        </select>
                      </td>
                      <td className="p-4 border-b border-gray-100 text-gray-500 text-[0.9rem]">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-4 border-b border-gray-100">
                        <a
                          href={`/admin/orders/${order._id}`}
                          className="inline-block px-3 py-1.5 bg-[#e3f2fd] text-[#1976d2] rounded-md font-semibold text-xs transition hover:bg-[#bbdefb] duration-300"
                        >
                          View
                        </a>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="text-center text-gray-400 py-12">
                      No orders found
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
