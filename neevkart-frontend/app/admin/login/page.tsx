"use client";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import "./admin-login.css";

export default function AdminLogin() {
  const { isSignedIn, userId } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!isSignedIn) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/admin/check-role`,
          {
            headers: {
              "X-User-ID": userId,
            },
          }
        );

        if (response.data.isAdmin) {
          setIsAdmin(true);
          router.push("/admin/dashboard");
        } else {
          setError("You don't have admin access. Contact support.");
        }
      } catch (err) {
        setError("Error checking admin status");
      } finally {
        setLoading(false);
      }
    };

    checkAdminStatus();
  }, [isSignedIn, userId, router]);

  if (loading) {
    return (
      <div className="admin-login-container">
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="admin-login-container">
        <div className="admin-login-box">
          <h1>NeevKart Admin</h1>
          <p className="subtitle">Login to manage your store</p>
          <p className="info-text">
            Click the button below to sign in with your credentials
          </p>
          <a href="/sign-in?redirect_url=/admin/login" className="clerk-signin-btn">
            Sign In
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-login-container">
      <div className="admin-login-box">
        {error && <div className="error-message">{error}</div>}
        <p>Checking admin access...</p>
      </div>
    </div>
  );
}
