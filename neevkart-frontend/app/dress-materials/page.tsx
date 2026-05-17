import Link from "next/link";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/home/Footer";

const materialEdits = [
  { name: "Silk Dress Materials", description: "Lustrous suit sets and unstitched fabrics for refined occasions.", icon: "✦", href: "/dress-materials?material=silk" },
  { name: "Cotton Dress Materials", description: "Breathable everyday fabrics with an elegant, comfortable finish.", icon: "☼", href: "/dress-materials?material=cotton" },
  { name: "Festive Dress Materials", description: "Celebration-ready textures, rich tones, and graceful detailing.", icon: "❋", href: "/dress-materials?occasion=festive" },
  { name: "Wedding Dress Materials", description: "Premium occasion pieces selected for wedding wardrobes.", icon: "◈", href: "/dress-materials?occasion=wedding" },
];

export default function DressMaterialsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#fffaf5]">
        <section className="relative overflow-hidden bg-[#1f1712] py-24 text-white md:py-32">
          <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#a51d49]/25 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[#caa66a]/20 blur-3xl" />
          <div className="luxury-container relative grid gap-12 md:grid-cols-[0.95fr_1.05fr] md:items-center">
            <div>
              <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.34em] text-[#f4d995]">NeevKart Dress Materials</p>
              <h1 className="font-display text-4xl font-medium leading-tight md:text-6xl">Tailored elegance begins with beautiful fabric.</h1>
              <p className="mt-7 max-w-xl text-base leading-8 text-white/78">Explore silk, cotton, festive, and wedding dress materials curated for custom styling, graceful comfort, and premium occasion wear.</p>
              <Link href="#materials" className="mt-10 inline-flex rounded-full bg-white px-9 py-4 text-xs font-bold uppercase tracking-[0.18em] text-[#a51d49] shadow-[0_18px_45px_rgba(0,0,0,0.18)] transition hover:-translate-y-1 hover:bg-[#f4d995] hover:text-[#1f1712]">Explore Edits</Link>
            </div>
            <div className="rounded-[2rem] border border-white/12 bg-white/8 p-6 shadow-[0_30px_90px_rgba(0,0,0,0.24)] backdrop-blur">
              <div className="grid gap-4 sm:grid-cols-2">
                {materialEdits.map((edit) => (
                  <Link key={edit.name} href={edit.href} className="group rounded-[1.5rem] border border-white/12 bg-white/90 p-6 text-[#1f1712] transition duration-500 hover:-translate-y-1 hover:bg-[#fff8f2]">
                    <span className="mb-5 grid h-12 w-12 place-items-center rounded-full bg-[#a51d49] text-xl text-white shadow-[0_12px_30px_rgba(165,29,73,0.22)] transition group-hover:rotate-12">{edit.icon}</span>
                    <h2 className="font-display text-2xl font-medium">{edit.name}</h2>
                    <p className="mt-3 text-sm leading-7 text-[#7f6758]">{edit.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="materials" className="py-24 md:py-32">
          <div className="luxury-container">
            <div className="mx-auto mb-14 max-w-2xl text-center">
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.32em] text-[#a51d49]">Curated Fabric Edits</p>
              <h2 className="font-display text-3xl font-medium text-[#1f1712] md:text-5xl">Dress materials for every styling mood</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-4">
              {materialEdits.map((edit) => (
                <Link key={`card-${edit.name}`} href={edit.href} className="group rounded-[1.6rem] border border-[#eadfd6] bg-white p-7 shadow-[0_18px_45px_rgba(43,33,27,0.06)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(43,33,27,0.12)]">
                  <span className="text-2xl text-[#a51d49]">{edit.icon}</span>
                  <h3 className="mt-6 font-display text-2xl font-medium text-[#1f1712]">{edit.name}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#7f6758]">{edit.description}</p>
                  <span className="mt-7 inline-flex text-[11px] font-bold uppercase tracking-[0.18em] text-[#a51d49]">Explore</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
