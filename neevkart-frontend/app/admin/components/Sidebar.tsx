"use client";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminData");
    router.push("/admin/login");
  };

  const isActive = (path: string) => pathname.includes(path);

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-gradient-to-br from-[#8b2e5f] to-[#c41e3a] text-white flex flex-col transition-all duration-300 z-[1000] overflow-y-auto ${
        isOpen ? "w-[250px]" : "w-[80px]"
      } max-md:w-[80px]`}
    >
      <div className="p-6 border-b border-white/20 flex justify-between items-center">
        <h2 className={`text-xl font-bold m-0 whitespace-nowrap overflow-hidden text-ellipsis ${!isOpen ? "hidden" : "block"} max-md:hidden`}>
          NeevKart
        </h2>
        <button
          className="bg-none border-none text-white text-2xl cursor-pointer p-0 hidden max-md:block"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      <nav className="flex-1 py-6">
        <Link
          href="/admin/dashboard"
          className={`flex items-center px-6 py-4 text-white/80 no-underline transition-all duration-300 border-l-4 border-transparent hover:bg-white/10 hover:border-white ${
            isActive("/dashboard") ? "bg-white/15 text-white border-white font-semibold" : ""
          }`}
        >
          <span className="text-[1.3rem] mr-4 min-w-[1.5rem]">📊</span>
          <span className={`whitespace-nowrap overflow-hidden text-ellipsis ${!isOpen ? "hidden" : "block"} max-md:hidden`}>
            Dashboard
          </span>
        </Link>
        <Link
          href="/admin/products"
          className={`flex items-center px-6 py-4 text-white/80 no-underline transition-all duration-300 border-l-4 border-transparent hover:bg-white/10 hover:border-white ${
            isActive("/products") ? "bg-white/15 text-white border-white font-semibold" : ""
          }`}
        >
          <span className="text-[1.3rem] mr-4 min-w-[1.5rem]">📦</span>
          <span className={`whitespace-nowrap overflow-hidden text-ellipsis ${!isOpen ? "hidden" : "block"} max-md:hidden`}>
            Products
          </span>
        </Link>
        <Link
          href="/admin/orders"
          className={`flex items-center px-6 py-4 text-white/80 no-underline transition-all duration-300 border-l-4 border-transparent hover:bg-white/10 hover:border-white ${
            isActive("/orders") ? "bg-white/15 text-white border-white font-semibold" : ""
          }`}
        >
          <span className="text-[1.3rem] mr-4 min-w-[1.5rem]">🛒</span>
          <span className={`whitespace-nowrap overflow-hidden text-ellipsis ${!isOpen ? "hidden" : "block"} max-md:hidden`}>
            Orders
          </span>
        </Link>
        <Link
          href="/admin/settings"
          className={`flex items-center px-6 py-4 text-white/80 no-underline transition-all duration-300 border-l-4 border-transparent hover:bg-white/10 hover:border-white ${
            isActive("/settings") ? "bg-white/15 text-white border-white font-semibold" : ""
          }`}
        >
          <span className="text-[1.3rem] mr-4 min-w-[1.5rem]">⚙️</span>
          <span className={`whitespace-nowrap overflow-hidden text-ellipsis ${!isOpen ? "hidden" : "block"} max-md:hidden`}>
            Settings
          </span>
        </Link>
      </nav>

      <div className="p-6 border-t border-white/20">
        <button
          className="w-full bg-white/10 text-white border border-white/30 p-3 rounded-lg font-semibold transition hover:bg-white/20 hover:border-white flex items-center justify-center gap-2"
          onClick={handleLogout}
        >
          <span className="text-lg">🚪</span>
          <span className={`whitespace-nowrap overflow-hidden text-ellipsis ${!isOpen ? "hidden" : "block"} max-md:hidden`}>
            Logout
          </span>
        </button>
      </div>
    </aside>
  );
}
