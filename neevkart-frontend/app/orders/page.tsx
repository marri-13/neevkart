"use client";

import Link from "next/link";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/home/Footer";

export default function OrdersPage() {
  // This will be connected to backend later
  const orders: never[] = [];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        {/* Breadcrumb */}
        <div className="border-b border-[#eadfd6]">
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
        <div className="border-b border-[#eadfd6]">
          <div className="luxury-container py-8">
            <h1 className="text-3xl font-medium text-[#1f1712] md:text-4xl">My Orders</h1>
            <p className="mt-2 text-[#8a7062]">View and track your orders</p>
          </div>
        </div>

        <div className="luxury-container py-12">
          {orders.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="text-6xl mb-4">📦</div>
              <h2 className="mb-2 text-2xl font-medium text-[#1f1712]">No orders yet</h2>
              <p className="mb-8 text-[#8a7062]">Start shopping to see your orders here</p>
              <Link
                href="/sarees"
                className="rounded bg-[#a51d49] px-8 py-3 font-medium text-white hover:bg-[#8a1c39]"
              >
                Shop Now
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Orders will be rendered here */}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
