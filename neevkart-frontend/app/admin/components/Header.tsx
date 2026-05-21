"use client";
import Link from "next/link";
import "./header.css";

export default function Header({ admin }: { admin: any }) {
  return (
    <header className="admin-header">
      <div className="header-content">
        <h1>Admin Panel</h1>
        <div className="header-right">
          <div className="admin-info">
            <span className="admin-name">{admin?.name || "Admin"}</span>
            <span className="admin-email">{admin?.email}</span>
          </div>
          <div className="admin-avatar">{admin?.name?.charAt(0).toUpperCase()}</div>
        </div>
      </div>
    </header>
  );
}
