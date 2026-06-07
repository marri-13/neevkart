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
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const nameTrimmed = name.trim();
    const emailTrimmed = email.trim();

    if (!nameTrimmed || !emailTrimmed || !password) {
      setError("All fields are mandatory.");
      setLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailTrimmed)) {
      setError("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    if (!passwordRegex.test(password)) {
      setError(
        "Password must be at least 8 characters long, and contain at least one uppercase letter, one lowercase letter, one number, and one special character (e.g., @, $, !, %, *, ?, &, #)."
      );
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/api/user/register`, {
        name: nameTrimmed,
        email: emailTrimmed,
        password,
      });

      if (response.data.success) {
        // Redirect to login page with registration success status and original redirect
        router.push(
          redirect !== "/"
            ? `/login?redirect=${encodeURIComponent(redirect)}&registered=true`
            : "/login?registered=true"
        );
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
              <div className="relative w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full border border-[#d9c6b5] bg-white rounded-lg p-3.5 pr-10 text-sm text-[#2b211b] focus:outline-none focus:border-[#a51d49] focus:ring-2 focus:ring-[#a51d49]/10 transition duration-300 placeholder:text-[#9a7c67]/50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8a7062] hover:text-[#a51d49] transition focus:outline-none"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
                      <path d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
                      <path d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </button>
              </div>
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
