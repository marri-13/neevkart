import "./globals.css";

export const metadata = {
  title: "NeevKart | Premium Sarees & Ethnic Fashion",
  description: "Curated sarees and festive fashion with secure online payments.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
