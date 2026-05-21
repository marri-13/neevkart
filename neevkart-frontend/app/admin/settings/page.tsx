"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { createAdminApi, checkAdminRole } from "@/lib/adminAuth";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import "../admin.css";
import "./settings.css";

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
  const { getToken } = useAuth();
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
        const token = await getToken();
        if (!token) {
          router.push("/sign-in");
          return;
        }
        await checkAdminRole(token);
        fetchSettings(token);
      } catch (err) {
        console.error("Admin check failed:", err);
        router.push("/");
      }
    };
    initPage();
  }, [getToken, router]);

  const fetchSettings = async (token: string) => {
    try {
      const api = createAdminApi(token);
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
      const token = await getToken();
      if (!token) return;

      const api = createAdminApi(token);
      await api.put("/api/admin/settings", settings);
      setSuccess("Settings saved successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="admin-dashboard">
      <Sidebar />
      <main className="main-content">
        <Header />

        <div className="settings-content">
          <h1>Website Settings</h1>

          {success && <div className="success-message">{success}</div>}

          <div className="settings-grid">
            <section className="settings-section">
              <h2>Footer Information</h2>
              <div className="form-group">
                <label>Address</label>
                <textarea
                  name="footerAddress"
                  value={settings.footerAddress}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Enter your store address"
                />
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  name="footerPhone"
                  value={settings.footerPhone}
                  onChange={handleInputChange}
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  name="footerEmail"
                  value={settings.footerEmail}
                  onChange={handleInputChange}
                  placeholder="contact@neevkart.com"
                />
              </div>
            </section>

            <section className="settings-section">
              <h2>Social Media Links</h2>
              <div className="form-group">
                <label>Instagram URL</label>
                <input
                  type="url"
                  name="instagramUrl"
                  value={settings.instagramUrl}
                  onChange={handleInputChange}
                  placeholder="https://instagram.com/neevkart"
                />
              </div>

              <div className="form-group">
                <label>Facebook URL</label>
                <input
                  type="url"
                  name="facebookUrl"
                  value={settings.facebookUrl}
                  onChange={handleInputChange}
                  placeholder="https://facebook.com/neevkart"
                />
              </div>

              <div className="form-group">
                <label>Twitter URL</label>
                <input
                  type="url"
                  name="twitterUrl"
                  value={settings.twitterUrl}
                  onChange={handleInputChange}
                  placeholder="https://twitter.com/neevkart"
                />
              </div>
            </section>

            <section className="settings-section">
              <h2>Payment Methods</h2>
              <div className="checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    checked={settings.paymentMethods.includes("credit_card")}
                    onChange={() => handleCheckboxChange("credit_card")}
                  />
                  Credit/Debit Card
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={settings.paymentMethods.includes("upi")}
                    onChange={() => handleCheckboxChange("upi")}
                  />
                  UPI
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={settings.paymentMethods.includes("net_banking")}
                    onChange={() => handleCheckboxChange("net_banking")}
                  />
                  Net Banking
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={settings.paymentMethods.includes("wallet")}
                    onChange={() => handleCheckboxChange("wallet")}
                  />
                  Digital Wallet
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={settings.paymentMethods.includes("cod")}
                    onChange={() => handleCheckboxChange("cod")}
                  />
                  Cash on Delivery
                </label>
              </div>
            </section>
          </div>

          <div className="settings-actions">
            <button
              className="btn-save"
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
