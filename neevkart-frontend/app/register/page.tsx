"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { API_URL } from "@/lib/userAuth";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/home/Footer";

function RegisterContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/api/user/register`, {
        name,
        email,
        password,
      });

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        
        // Redirect back
        router.push(redirect);
        // Force refresh to update navbar
        setTimeout(() => {
          window.location.reload();
        }, 100);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fffaf5] flex flex-col justify-between font-sans">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center py-16 px-4">
        <div className="bg-white p-8 md:p-10 rounded-2xl border border-[#eadfd6] shadow-[0_15px_45px_rgba(43,33,27,0.04)] w-full max-w-[460px]">
          <h1 className="text-2xl md:text-3xl font-semibold text-[#1f1712] mb-2 text-center">
            Create Account
          </h1>
          <p className="text-sm text-[#8a7062] mb-8 text-center">
            Join NeevKart for an exquisite shopping experience.
          </p>

          {error && (
            <div className="mb-6 bg-red-50 text-red-700 p-4 rounded-xl border-l-4 border-red-700 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col">
              <label className="text-xs font-semibold text-[#6f5948] uppercase tracking-[0.12em] mb-2">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="border border-[#d9c6b5] bg-white rounded-lg p-3.5 text-sm text-[#2b211b] focus:outline-none focus:border-[#a51d49] focus:ring-2 focus:ring-[#a51d49]/10 transition duration-300 placeholder:text-[#9a7c67]/50"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-xs font-semibold text-[#6f5948] uppercase tracking-[0.12em] mb-2">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@email.com"
                className="border border-[#d9c6b5] bg-white rounded-lg p-3.5 text-sm text-[#2b211b] focus:outline-none focus:border-[#a51d49] focus:ring-2 focus:ring-[#a51d49]/10 transition duration-300 placeholder:text-[#9a7c67]/50"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-xs font-semibold text-[#6f5948] uppercase tracking-[0.12em] mb-2">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="border border-[#d9c6b5] bg-white rounded-lg p-3.5 text-sm text-[#2b211b] focus:outline-none focus:border-[#a51d49] focus:ring-2 focus:ring-[#a51d49]/10 transition duration-300 placeholder:text-[#9a7c67]/50"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-4 w-full bg-[#a51d49] hover:bg-[#8b1840] text-white p-3.5 rounded-lg font-semibold tracking-[0.12em] uppercase text-xs transition duration-300 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-[#f0e3d9] text-center text-sm text-[#6f5948]">
            Already have an account?{" "}
            <Link
              href={redirect !== "/" ? `/login?redirect=${encodeURIComponent(redirect)}` : "/login"}
              className="font-semibold text-[#a51d49] hover:text-[#8b1840] transition"
            >
              Sign In
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center min-h-screen">Loading...</div>}>
      <RegisterContent />
    </Suspense>
  );
}
