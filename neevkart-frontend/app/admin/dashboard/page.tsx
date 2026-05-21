"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser, useAuth } from "@clerk/nextjs";
import { checkAdminRole } from "@/lib/adminAuth";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import "../admin.css";
import "./dashboard.css";

export default function Dashboard() {
  const { user, isLoaded } = useUser();
  const { getToken } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;

    if (!user) {
      router.push("/sign-in?redirect_url=/admin/dashboard");
      return;
    }

    const checkAdminAccess = async () => {
      try {
        const token = await getToken();
        if (!token) {
          router.push("/sign-in");
          return;
        }

        const adminData = await checkAdminRole(token);
        setIsAdmin(true);
      } catch (err) {
        console.error("Admin check failed:", err);
        router.push("/");
      } finally {
        setLoading(false);
      }
    };

    checkAdminAccess();
  }, [user, isLoaded, router, getToken]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!isAdmin) {
    return <div className="loading">Checking permissions...</div>;
  }

  return (
    <div className="admin-dashboard">
      <Sidebar />
      <main className="main-content">
        <Header admin={user} />

        <div className="dashboard-content">
          <h1>Welcome, {user?.firstName || "Admin"}!</h1>

          <div className="stats-grid">
            <div className="stat-card">
              <h3>Total Products</h3>
              <p className="stat-value">0</p>
            </div>
            <div className="stat-card">
              <h3>Total Orders</h3>
              <p className="stat-value">0</p>
            </div>
            <div className="stat-card">
              <h3>Total Revenue</h3>
              <p className="stat-value">₹0</p>
            </div>
          </div>

          <div className="dashboard-grid">
            <section className="dashboard-section">
              <h2>Quick Actions</h2>
              <div className="quick-actions">
                <a href="/admin/products" className="action-btn primary">
                  + Add New Product
                </a>
                <a href="/admin/products" className="action-btn secondary">
                  Manage Products
                </a>
                <a href="/admin/orders" className="action-btn secondary">
                  View Orders
                </a>
                <a href="/admin/settings" className="action-btn secondary">
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
