import "./admin.css";

export const metadata = {
  title: "NeevKart | Admin Dashboard",
  description: "Admin panel for managing NeevKart products and orders.",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-layout">
      {children}
    </div>
  );
}
