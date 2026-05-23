"use client";
import Link from "next/link";

export default function Header({ admin }: { admin?: any }) {
  return (
    <header className="bg-white shadow-md py-6 px-8 ml-[250px] transition-all duration-300 sticky top-0 z-40 max-md:ml-[80px] max-md:p-4">
      <div className="flex justify-between items-center max-w-[1400px] mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 m-0 max-md:text-lg">Admin Panel</h1>
        <div className="flex items-center gap-6">
          <div className="flex flex-col items-end max-md:hidden">
            <span className="font-semibold text-gray-800">{admin?.name || "Admin"}</span>
            <span className="text-gray-400 text-sm">{admin?.email}</span>
          </div>
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#8b2e5f] to-[#c41e3a] text-white flex items-center justify-center font-bold text-lg max-md:w-10 max-md:h-10 max-md:text-base">
            {(admin?.name || "A").charAt(0).toUpperCase()}
          </div>
        </div>
      </div>
    </header>
  );
}
