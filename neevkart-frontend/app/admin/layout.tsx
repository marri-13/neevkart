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
    <div className="min-h-screen bg-[#f5f5f5]">
      {children}
    </div>
  );
}
