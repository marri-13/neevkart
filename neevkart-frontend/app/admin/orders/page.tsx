"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { createAdminApi, checkAdminRole } from "@/lib/adminAuth";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import "../admin.css";
import "./orders.css";

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
  const { getToken } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const router = useRouter();

  useEffect(() => {
    const initPage = async () => {
      try {
        const token = await getToken();
        if (!token) {
          router.push("/sign-in");
          return;
        }
        await checkAdminRole(token);
        fetchOrders(token);
      } catch (err) {
        console.error("Admin check failed:", err);
        router.push("/");
      }
    };
    initPage();
  }, [getToken, router]);

  const fetchOrders = async (token: string) => {
    try {
      const api = createAdminApi(token);
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
      const token = await getToken();
      if (!token) return;

      const api = createAdminApi(token);
      await api.patch(`/api/admin/orders/${orderId}`, { status: newStatus });
      fetchOrders(token);
    } catch (err) {
      console.error("Failed to update order");
    }
  };

  const updatePaymentStatus = async (orderId: string, paymentStatus: string) => {
    try {
      const token = await getToken();
      if (!token) return;

      const api = createAdminApi(token);
      await api.patch(`/api/admin/orders/${orderId}/payment`, { paymentStatus });
      fetchOrders(token);
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

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="admin-dashboard">
      <Sidebar />
      <main className="main-content">
        <Header />

        <div className="orders-content">
          <div className="orders-header">
            <h1>Orders Management</h1>
            <div className="filter-buttons">
              <button
                className={`filter-btn ${filter === "all" ? "active" : ""}`}
                onClick={() => setFilter("all")}
              >
                All Orders
              </button>
              <button
                className={`filter-btn ${filter === "pending" ? "active" : ""}`}
                onClick={() => setFilter("pending")}
              >
                Pending
              </button>
              <button
                className={`filter-btn ${filter === "completed" ? "active" : ""}`}
                onClick={() => setFilter("completed")}
              >
                Completed
              </button>
            </div>
          </div>

          <div className="orders-table-container">
            <table className="orders-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Amount</th>
                  <th>Order Status</th>
                  <th>Payment Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <tr key={order._id}>
                      <td className="order-id">#{order._id.slice(0, 8)}</td>
                      <td>
                        <div>
                          <p className="customer-name">{order.customerName}</p>
                          <p className="customer-email">{order.customerEmail}</p>
                        </div>
                      </td>
                      <td className="amount">₹{order.totalAmount}</td>
                      <td>
                        <select
                          className={`status-select ${order.status}`}
                          value={order.status}
                          onChange={(e) =>
                            updateOrderStatus(order._id, e.target.value)
                          }
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td>
                        <select
                          className={`payment-select ${order.paymentStatus}`}
                          value={order.paymentStatus}
                          onChange={(e) =>
                            updatePaymentStatus(order._id, e.target.value)
                          }
                        >
                          <option value="pending">Pending</option>
                          <option value="completed">Completed</option>
                          <option value="failed">Failed</option>
                        </select>
                      </td>
                      <td className="date">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td>
                        <a href={`/admin/orders/${order._id}`} className="btn-view">
                          View
                        </a>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="empty-state">
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
