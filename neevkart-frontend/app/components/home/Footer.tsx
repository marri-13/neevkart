import Link from "next/link";
import {
  FaInstagram,
  FaFacebookF,
  FaWhatsapp,
  FaEnvelope,
} from "react-icons/fa";

export default function Footer() {

  const collections = [
    { name: "Sarees", href: "/sarees" },
    { name: "Wedding Collection", href: "/sarees?category=wedding" },
    { name: "Festive Wear", href: "/sarees?category=festive" },
    { name: "New Arrivals", href: "/sarees?category=new" },
  ];

  const policies = [
    { name: "Shipping", href: "/shipping" },
    { name: "Payment Policy", href: "/policies" },
    { name: "No Return Policy", href: "/no-return" },
    { name: "Privacy Policy", href: "/privacy" },
  ];

  const about = [
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Store Locator", href: "/stores" },
    { name: "Blogs", href: "/blogs" },
  ];

  return (

    <footer className="bg-[#1f1712] text-gray-300 mt-20">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-16">

          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-white mb-6">Collections</h3>
            <ul className="space-y-3">
              {collections.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-gray-400 hover:text-[#f4d995] transition duration-200">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-white mb-6">Policies</h3>
            <ul className="space-y-3">
              {policies.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-gray-400 hover:text-[#f4d995] transition duration-200">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-white mb-6">About</h3>
            <ul className="space-y-3">
              {about.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-gray-400 hover:text-[#f4d995] transition duration-200">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-white mb-6">Contact</h3>
            <div className="space-y-4 text-sm">
              <p>
                <a href="tel:1800-XXX-XXXX" className="text-gray-400 hover:text-[#f4d995] transition duration-200">
                  1800-XXX-XXXX
                </a>
              </p>
              <p>
                <a href="mailto:support@neevkart.com" className="text-gray-400 hover:text-[#f4d995] transition duration-200">
                  support@neevkart.com
                </a>
              </p>
            </div>
            <div className="mt-6 flex gap-4">
              <a href="#" className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#2b211b] text-gray-300 hover:bg-[#a51d49] hover:text-white transition duration-200">
                <FaInstagram size={16} />
              </a>
              <a href="#" className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#2b211b] text-gray-300 hover:bg-[#a51d49] hover:text-white transition duration-200">
                <FaFacebookF size={16} />
              </a>
              <a href="#" className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#2b211b] text-gray-300 hover:bg-[#a51d49] hover:text-white transition duration-200">
                <FaWhatsapp size={16} />
              </a>
              <a href="#" className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#2b211b] text-gray-300 hover:bg-[#a51d49] hover:text-white transition duration-200">
                <FaEnvelope size={16} />
              </a>
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-[#2b211b]"></div>

        {/* Bottom Footer */}
        <div className="py-8 text-center text-sm text-gray-500">
          <p>© 2026 NeevKart. All Rights Reserved.</p>
        </div>
      </div>
    </footer>

  );

}