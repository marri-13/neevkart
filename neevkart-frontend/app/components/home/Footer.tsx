import Link from "next/link";
import { FaEnvelope, FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";

const collections = [
  { name: "Sarees", href: "/sarees" },
  { name: "Wedding Collection", href: "/sarees?category=wedding" },
  { name: "Festive Wear", href: "/sarees?category=festive" },
  { name: "New Arrivals", href: "/sarees?category=new" },
  { name: "Dress Materials", href: "/dress-materials" },
];

const policies = [
  { name: "Shipping", href: "/shipping" },
  { name: "Payment Policy", href: "/policies" },
  { name: "No Return Policy", href: "/no-return" },
  { name: "Privacy Policy", href: "/privacy" },
];

const company = [
  { name: "About NeevKart", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Care Guide", href: "/care-guide" },
  { name: "Track Order", href: "/orders" },
];

export default function Footer() {
  return (
    <footer className="border-t border-[#eadfd6] bg-[#fff7ef] text-[#4d3d35]">
      <div className="luxury-container py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1.4fr] lg:gap-20">
          <div>
            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.32em] text-[#a51d49]">
              NeevKart Saree House
            </p>
            <h2 className="font-display text-2xl font-medium leading-tight text-[#1f1712] md:text-1xl">
              Heritage sarees, curated with a modern eye.
            </h2>
            <p className="mt-6 max-w-xl text-sm leading-7 text-[#7f6758]">
              Secure Razorpay checkout only. COD is not available. All sales are final with no return or exchange.
            </p>

            <div className="mt-8 flex gap-3">
              {[
                { label: "Instagram", icon: FaInstagram },
                { label: "Facebook", icon: FaFacebookF },
                { label: "WhatsApp", icon: FaWhatsapp },
                { label: "Email", icon: FaEnvelope },
              ].map(({ label, icon: Icon }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="grid h-11 w-11 place-items-center rounded-full border border-[#e6c9d3] bg-white text-[#a51d49] transition hover:-translate-y-0.5 hover:bg-[#a51d49] hover:text-white"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            <FooterColumn title="Shop" items={collections} />
            <FooterColumn title="Help" items={policies} />
            <FooterColumn title="Company" items={company} />
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-[#e8d8ca] pt-7 text-sm text-[#7f6758] md:flex-row md:items-center md:justify-between">
          <p> 2026 NeevKart. All rights reserved.</p>
          <a href="mailto:support@neevkart.com" className="font-medium text-[#a51d49] hover:underline">
            support@neevkart.com
          </a>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, items }: { title: string; items: { name: string; href: string }[] }) {
  return (
    <div>
      <h3 className="mb-5 text-[12px] font-bold uppercase tracking-[0.24em] text-[#a51d49]">{title}</h3>
      <ul className="grid gap-3">
        {items.map((item) => (
          <li key={item.name}>
            <Link href={item.href} className="text-sm leading-6 text-[#5f4c43] transition hover:text-[#a51d49]">
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
