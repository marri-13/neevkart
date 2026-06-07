"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/home/Footer";
import { createApi } from "@/lib/userAuth";
import { formatPrice } from "@/lib/products";

interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  _id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  address: string;
  items: OrderItem[];
  totalAmount: number;
  status: string;
  paymentStatus: string;
  paymentId?: string;
  createdAt: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setLoading(false);
          return;
        }

        const api = createApi();
        const res = await api.get("/api/user/orders");
        if (res.data && res.data.success) {
          setOrders(res.data.orders);
        }
      } catch (err: any) {
        console.error("Failed to fetch user orders:", err);
        setError("Could not load your orders. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#fffaf5]">
        {/* Breadcrumb */}
        <div className="border-b border-[#eadfd6] bg-white">
          <div className="luxury-container py-4">
            <div className="flex items-center gap-2 text-sm text-[#8a7062]">
              <Link href="/" className="hover:text-[#1f1712]">
                Home
              </Link>
              <span>/</span>
              <span className="text-[#1f1712]">My Orders</span>
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="border-b border-[#eadfd6] bg-white">
          <div className="luxury-container py-12 md:py-16">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.32em] text-[#a51d49]">
              Account Profile
            </p>
            <h1 className="font-display text-4xl font-medium text-[#1f1712] md:text-5xl">My Orders</h1>
            <p className="mt-3 text-sm text-[#8a7062] max-w-xl">
              Track and view detailed logs of your past orders, delivery addresses, and premium items.
            </p>
          </div>
        </div>

        <div className="luxury-container py-16 md:py-20">
          {loading ? (
            <div className="flex justify-center items-center py-20 text-[#8a7062] font-semibold">
              <span className="animate-pulse">Loading orders...</span>
            </div>
          ) : error ? (
            <div className="bg-red-50 text-red-700 p-5 rounded-xl border-l-4 border-red-700 text-sm max-w-lg mx-auto text-center">
              {error}
            </div>
          ) : orders.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center max-w-md mx-auto">
              <div className="text-6xl mb-6 opacity-60">📦</div>
              <h2 className="mb-3 text-2xl font-medium text-[#1f1712]">No orders yet</h2>
              <p className="mb-8 text-[#8a7062]">Your luxury purchase history is currently empty. Explore our sarees or dress materials catalog to place your first order.</p>
              <Link
                href="/sarees"
                className="rounded-full bg-[#a51d49] hover:bg-[#8a1c39] px-10 py-3.5 text-sm font-semibold uppercase tracking-[0.16em] text-white shadow-[0_12px_24px_rgba(165,29,73,0.15)] transition duration-300 hover:-translate-y-0.5"
              >
                Shop Saree Collection
              </Link>
            </div>
          ) : (
            <div className="space-y-8 max-w-4xl mx-auto">
              {orders.map((order) => (
                <div key={order._id} className="border border-[#eadfd6] rounded-2xl overflow-hidden shadow-sm bg-white hover:shadow-md transition duration-300">
                  {/* Card Header */}
                  <div className="bg-[#fffaf5] border-b border-[#eadfd6] p-6 flex flex-wrap justify-between items-center gap-4">
                    <div className="flex flex-wrap gap-x-8 gap-y-3">
                      <div>
                        <p className="text-[10px] text-[#8a7062] font-bold uppercase tracking-wider">Order ID</p>
                        <p className="font-mono text-sm font-semibold text-[#1f1712] mt-1">#{order._id.slice(-12).toUpperCase()}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-[#8a7062] font-bold uppercase tracking-wider">Date Placed</p>
                        <p className="text-sm font-medium text-[#1f1712] mt-1">
                          {new Date(order.createdAt).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] text-[#8a7062] font-bold uppercase tracking-wider">Total Value</p>
                        <p className="text-sm font-bold text-[#a51d49] mt-1">{formatPrice(order.totalAmount)}</p>
                      </div>
                    </div>
                    <div>
                      <span className={`inline-flex px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        order.status === "completed" ? "bg-green-50 text-green-700 border border-green-200" :
                        order.status === "processing" ? "bg-blue-50 text-blue-700 border border-blue-200" :
                        order.status === "shipped" ? "bg-cyan-50 text-cyan-700 border border-cyan-200" :
                        order.status === "cancelled" ? "bg-red-50 text-red-700 border border-red-200" :
                        "bg-yellow-50 text-yellow-700 border border-yellow-200"
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 md:p-8">
                    <div className="grid gap-8 md:grid-cols-3">
                      {/* Products */}
                      <div className="md:col-span-2 space-y-4">
                        <p className="text-[10px] text-[#8a7062] font-bold uppercase tracking-wider border-b border-[#f4e8de] pb-2">
                          Items Purchased
                        </p>
                        <div className="divide-y divide-[#f4e8de]">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex justify-between items-center py-3 first:pt-0 last:pb-0">
                              <div>
                                <p className="font-medium text-[#1f1712] text-sm">{item.name}</p>
                                <p className="text-xs text-[#8a7062] mt-0.5">Quantity: {item.quantity} @ {formatPrice(item.price)}</p>
                              </div>
                              <p className="font-semibold text-sm text-[#1f1712]">{formatPrice(item.price * item.quantity)}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Ship details */}
                      <div className="bg-[#fffdfb] p-6 rounded-xl border border-[#f4e8de] h-fit">
                        <p className="text-[10px] text-[#8a7062] font-bold uppercase tracking-wider border-b border-[#eadfd6] pb-2 mb-4">
                          Shipment Details
                        </p>
                        <p className="text-sm font-semibold text-[#1f1712]">{order.customerName}</p>
                        <p className="text-xs text-[#6f5948] mt-2 whitespace-pre-line leading-relaxed">{order.address}</p>
                        <p className="text-xs text-[#8a7062] mt-3 font-medium">Contact: {order.customerPhone}</p>
                        {order.paymentId && (
                          <div className="mt-4 pt-3 border-t border-[#f4e8de]">
                            <p className="text-[9px] text-[#8a7062] uppercase tracking-wider font-bold">Payment Transaction</p>
                            <p className="font-mono text-[10px] text-[#1f1712] mt-0.5 break-all">{order.paymentId}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
