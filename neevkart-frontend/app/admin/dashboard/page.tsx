"use client";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function Dashboard() {
  const user = {
    firstName: "Admin",
    email: "admin@neevkart.com",
    name: "Temporary Admin",
  };

  return (
    <div className="flex min-h-screen bg-[#f5f5f5]">
      <Sidebar />
      <main className="flex-1 ml-[250px] transition-all duration-300 overflow-y-auto max-h-screen max-md:ml-[80px]">
        <Header admin={user} />

        <div className="p-8 max-w-[1400px] mx-auto max-md:p-4">
          <h1 className="text-gray-800 mb-8 text-3xl font-bold max-md:text-2xl max-md:mb-6">
            Welcome, {user?.firstName || "Admin"}!
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)] hover:-translate-y-1 duration-300">
              <h3 className="text-gray-500 text-sm mb-2 font-semibold">Total Products</h3>
              <p className="text-[#8b2e5f] text-3xl font-bold">0</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)] hover:-translate-y-1 duration-300">
              <h3 className="text-gray-500 text-sm mb-2 font-semibold">Total Orders</h3>
              <p className="text-[#8b2e5f] text-3xl font-bold">0</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)] hover:-translate-y-1 duration-300">
              <h3 className="text-gray-500 text-sm mb-2 font-semibold">Total Revenue</h3>
              <p className="text-[#8b2e5f] text-3xl font-bold">₹0</p>
            </div>
          </div>

          <div className="grid gap-8">
            <section className="bg-white p-8 rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.06)] max-md:p-6">
              <h2 className="text-gray-800 mb-6 text-xl font-bold">Quick Actions</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <a
                  href="/admin/products"
                  className="p-4 rounded-lg text-center font-semibold text-white bg-gradient-to-r from-[#8b2e5f] to-[#c41e3a] transition hover:-translate-y-0.5 hover:shadow-[0_8px_16px_rgba(139,46,95,0.3)] duration-300"
                >
                  + Add New Product
                </a>
                <a
                  href="/admin/products"
                  className="p-4 rounded-lg text-center font-semibold text-gray-700 bg-gray-100 border border-gray-300 transition hover:border-[#8b2e5f] hover:text-[#8b2e5f] duration-300"
                >
                  Manage Products
                </a>
                <a
                  href="/admin/orders"
                  className="p-4 rounded-lg text-center font-semibold text-gray-700 bg-gray-100 border border-gray-300 transition hover:border-[#8b2e5f] hover:text-[#8b2e5f] duration-300"
                >
                  View Orders
                </a>
                <a
                  href="/admin/settings"
                  className="p-4 rounded-lg text-center font-semibold text-gray-700 bg-gray-100 border border-gray-300 transition hover:border-[#8b2e5f] hover:text-[#8b2e5f] duration-300"
                >
                  Settings
                </a>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
