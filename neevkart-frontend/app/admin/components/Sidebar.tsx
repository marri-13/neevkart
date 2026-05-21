"use client";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import "./sidebar.css";

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
    <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <div className="sidebar-header">
        <h2>NeevKart</h2>
        <button
          className="toggle-sidebar"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      <nav className="sidebar-nav">
        <Link
          href="/admin/dashboard"
          className={`nav-item ${isActive("/dashboard") ? "active" : ""}`}
        >
          <span className="icon">📊</span>
          <span className="label">Dashboard</span>
        </Link>
        <Link
          href="/admin/products"
          className={`nav-item ${isActive("/products") ? "active" : ""}`}
        >
          <span className="icon">📦</span>
          <span className="label">Products</span>
        </Link>
        <Link
          href="/admin/orders"
          className={`nav-item ${isActive("/orders") ? "active" : ""}`}
        >
          <span className="icon">🛒</span>
          <span className="label">Orders</span>
        </Link>
        <Link
          href="/admin/settings"
          className={`nav-item ${isActive("/settings") ? "active" : ""}`}
        >
          <span className="icon">⚙️</span>
          <span className="label">Settings</span>
        </Link>
      </nav>

      <div className="sidebar-footer">
        <button className="logout-btn" onClick={handleLogout}>
          <span className="icon">🚪</span>
          <span className="label">Logout</span>
        </button>
      </div>
    </aside>
  );
}
