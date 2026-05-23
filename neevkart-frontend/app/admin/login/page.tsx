"use client";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/admin/dashboard");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[#8b2e5f] to-[#c41e3a] font-sans">
      <div className="bg-white p-10 rounded-xl shadow-2xl w-full max-w-[400px] text-center">
        <h1 className="text-[#8b2e5f] text-3xl mb-2 font-bold">NeevKart Admin</h1>
        <p className="text-gray-600 mb-6 text-sm">Login is temporarily bypassed (Clerk Removed)</p>
        <button
          onClick={handleLogin}
          className="inline-block bg-gradient-to-r from-[#8b2e5f] to-[#c41e3a] text-white px-8 py-3 rounded-lg font-semibold transition hover:scale-105 hover:shadow-[0_10px_20px_rgba(139,46,95,0.3)] duration-300"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}
