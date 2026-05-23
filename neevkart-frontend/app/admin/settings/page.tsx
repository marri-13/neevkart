"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createAdminApi, checkAdminRole } from "@/lib/adminAuth";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

interface Settings {
  footerAddress: string;
  footerPhone: string;
  footerEmail: string;
  instagramUrl: string;
  facebookUrl: string;
  twitterUrl: string;
  paymentMethods: string[];
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>({
    footerAddress: "",
    footerPhone: "",
    footerEmail: "",
    instagramUrl: "",
    facebookUrl: "",
    twitterUrl: "",
    paymentMethods: [],
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");
  const router = useRouter();

  useEffect(() => {
    const initPage = async () => {
      try {
        await checkAdminRole();
        fetchSettings();
      } catch (err) {
        console.error("Admin check failed:", err);
        router.push("/");
      }
    };
    initPage();
  }, [router]);

  const fetchSettings = async () => {
    try {
      const api = createAdminApi();
      const response = await api.get("/api/admin/settings");
      setSettings(response.data.settings || settings);
    } catch (err) {
      console.error("Failed to fetch settings");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (method: string) => {
    setSettings((prev) => ({
      ...prev,
      paymentMethods: prev.paymentMethods.includes(method)
        ? prev.paymentMethods.filter((m) => m !== method)
        : [...prev.paymentMethods, method],
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const api = createAdminApi();
      await api.put("/api/admin/settings", settings);
      setSuccess("Settings saved successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-xl text-gray-400 font-sans">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#f5f5f5]">
      <Sidebar />
      <main className="flex-1 ml-[250px] transition-all duration-300 overflow-y-auto max-h-screen max-md:ml-[80px]">
        <Header />

        <div className="p-8 max-w-[1000px] mx-auto max-md:p-4 font-sans">
          <h1 className="text-gray-805 text-3xl font-bold mb-8 max-md:text-2xl max-md:mb-6">
            Website Settings
          </h1>

          {success && (
            <div className="bg-green-50 text-green-800 p-4 rounded-lg border-l-4 border-green-700 mb-8 font-semibold">
              {success}
            </div>
          )}

          <div className="grid gap-8 mb-8">
            <section className="bg-white p-8 rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.06)] max-md:p-6">
              <h2 className="text-gray-800 text-lg font-bold mb-6 pb-4 border-b border-gray-100">
                Footer Information
              </h2>
              <div className="mb-6 flex flex-col">
                <label className="font-semibold text-gray-700 mb-2 text-sm">Address</label>
                <textarea
                  name="footerAddress"
                  value={settings.footerAddress}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Enter your store address"
                  className="border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:border-[#8b2e5f] focus:ring-2 focus:ring-[#8b2e5f]/10 transition duration-300"
                />
              </div>

              <div className="mb-6 flex flex-col">
                <label className="font-semibold text-gray-700 mb-2 text-sm">Phone Number</label>
                <input
                  type="tel"
                  name="footerPhone"
                  value={settings.footerPhone}
                  onChange={handleInputChange}
                  placeholder="+91 XXXXX XXXXX"
                  className="border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:border-[#8b2e5f] focus:ring-2 focus:ring-[#8b2e5f]/10 transition duration-300"
                />
              </div>

              <div className="mb-6 flex flex-col">
                <label className="font-semibold text-gray-700 mb-2 text-sm">Email Address</label>
                <input
                  type="email"
                  name="footerEmail"
                  value={settings.footerEmail}
                  onChange={handleInputChange}
                  placeholder="contact@neevkart.com"
                  className="border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:border-[#8b2e5f] focus:ring-2 focus:ring-[#8b2e5f]/10 transition duration-300"
                />
              </div>
            </section>

            <section className="bg-white p-8 rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.06)] max-md:p-6">
              <h2 className="text-gray-800 text-lg font-bold mb-6 pb-4 border-b border-gray-100">
                Social Media Links
              </h2>
              <div className="mb-6 flex flex-col">
                <label className="font-semibold text-gray-700 mb-2 text-sm">Instagram URL</label>
                <input
                  type="url"
                  name="instagramUrl"
                  value={settings.instagramUrl}
                  onChange={handleInputChange}
                  placeholder="https://instagram.com/neevkart"
                  className="border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:border-[#8b2e5f] focus:ring-2 focus:ring-[#8b2e5f]/10 transition duration-300"
                />
              </div>

              <div className="mb-6 flex flex-col">
                <label className="font-semibold text-gray-700 mb-2 text-sm">Facebook URL</label>
                <input
                  type="url"
                  name="facebookUrl"
                  value={settings.facebookUrl}
                  onChange={handleInputChange}
                  placeholder="https://facebook.com/neevkart"
                  className="border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:border-[#8b2e5f] focus:ring-2 focus:ring-[#8b2e5f]/10 transition duration-300"
                />
              </div>

              <div className="mb-6 flex flex-col">
                <label className="font-semibold text-gray-700 mb-2 text-sm">Twitter URL</label>
                <input
                  type="url"
                  name="twitterUrl"
                  value={settings.twitterUrl}
                  onChange={handleInputChange}
                  placeholder="https://twitter.com/neevkart"
                  className="border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:border-[#8b2e5f] focus:ring-2 focus:ring-[#8b2e5f]/10 transition duration-300"
                />
              </div>
            </section>

            <section className="bg-white p-8 rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.06)] max-md:p-6">
              <h2 className="text-gray-800 text-lg font-bold mb-6 pb-4 border-b border-gray-100">
                Payment Methods
              </h2>
              <div className="flex flex-col gap-4">
                <label className="flex items-center text-sm font-medium text-gray-700 cursor-pointer gap-3">
                  <input
                    type="checkbox"
                    checked={settings.paymentMethods.includes("credit_card")}
                    onChange={() => handleCheckboxChange("credit_card")}
                    className="w-5 h-5 rounded cursor-pointer accent-[#8b2e5f]"
                  />
                  Credit/Debit Card
                </label>
                <label className="flex items-center text-sm font-medium text-gray-700 cursor-pointer gap-3">
                  <input
                    type="checkbox"
                    checked={settings.paymentMethods.includes("upi")}
                    onChange={() => handleCheckboxChange("upi")}
                    className="w-5 h-5 rounded cursor-pointer accent-[#8b2e5f]"
                  />
                  UPI
                </label>
                <label className="flex items-center text-sm font-medium text-gray-700 cursor-pointer gap-3">
                  <input
                    type="checkbox"
                    checked={settings.paymentMethods.includes("net_banking")}
                    onChange={() => handleCheckboxChange("net_banking")}
                    className="w-5 h-5 rounded cursor-pointer accent-[#8b2e5f]"
                  />
                  Net Banking
                </label>
                <label className="flex items-center text-sm font-medium text-gray-700 cursor-pointer gap-3">
                  <input
                    type="checkbox"
                    checked={settings.paymentMethods.includes("wallet")}
                    onChange={() => handleCheckboxChange("wallet")}
                    className="w-5 h-5 rounded cursor-pointer accent-[#8b2e5f]"
                  />
                  Digital Wallet
                </label>
                <label className="flex items-center text-sm font-medium text-gray-700 cursor-pointer gap-3">
                  <input
                    type="checkbox"
                    checked={settings.paymentMethods.includes("cod")}
                    onChange={() => handleCheckboxChange("cod")}
                    className="w-5 h-5 rounded cursor-pointer accent-[#8b2e5f]"
                  />
                  Cash on Delivery
                </label>
              </div>
            </section>
          </div>

          <div className="text-right">
            <button
              className="bg-gradient-to-r from-[#8b2e5f] to-[#c41e3a] text-white px-8 py-3 rounded-lg font-semibold cursor-pointer transition hover:-translate-y-0.5 hover:shadow-[0_8px_16px_rgba(139,46,95,0.3)] duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? "Saving..." : "Save Settings"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
