import Link from "next/link";

export default function Materials() {
  const materials = [
    {
      name: "Silk Dress Materials",
      description: "Luxurious silk dress materials for special occasions",
      href: "/dress-materials?material=silk",
      color: "from-amber-900 via-amber-700 to-transparent",
      icon: "✨",
    },
    {
      name: "Cotton Dress Materials",
      description: "Comfortable cotton dress materials for everyday wear",
      href: "/dress-materials?material=cotton",
      color: "from-orange-900 via-orange-700 to-transparent",
      icon: "☀️",
    },
    {
      name: "Festive Dress Materials",
      description: "Rich dress materials curated for festive styling",
      href: "/dress-materials?occasion=festive",
      color: "from-yellow-900 via-yellow-700 to-transparent",
      icon: "🌾",
    },
    {
      name: "Wedding Dress Materials",
      description: "Elegant dress materials selected for wedding occasions",
      href: "/dress-materials?occasion=wedding",
      color: "from-red-900 via-red-700 to-transparent",
      icon: "🧵",
    },
  ];

  return (
    <section id="materials" className="bg-white py-32 md:py-44">
      <div className="luxury-container">

        <div className="mx-auto mb-24 max-w-2xl text-center">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#a51d49]">
            Dress Material Collection
          </p>
          <h2 className="text-3xl md:text-4xl font-display font-medium text-[#1f1712] mb-4">
            Dress Materials, Curated Beautifully
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            A calmer, more premium way to explore fine dress materials by fabric, occasion, and styling mood.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {materials.map((material) => (
            <Link
              key={material.name}
              href={material.href}
              className="group relative min-h-64 overflow-hidden rounded-[1.6rem] border border-[#efe3d8] bg-gradient-to-br from-[#fffaf5] to-white p-8 shadow-[0_18px_45px_rgba(43,33,27,0.06)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(43,33,27,0.12)]"
            >
              <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition duration-300" />

              <div className="relative z-10">
                <div className="mb-7 grid h-14 w-14 place-items-center rounded-full bg-white text-3xl shadow-[0_12px_30px_rgba(43,33,27,0.08)]">
                  {material.icon}
                </div>
                <h3 className="mb-3 font-display text-2xl font-medium text-[#1f1712]">
                  {material.name}
                </h3>
                <p className="mb-8 text-sm leading-7 text-[#7f6758]">
                  {material.description}
                </p>

                <div className="inline-flex items-center justify-center rounded-full border border-[#a51d49]/25 px-6 py-2.5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#a51d49] transition group-hover:border-[#a51d49] group-hover:bg-[#a51d49] group-hover:text-white">
                  Explore
                </div>
              </div>

              <div className={`absolute inset-0 bg-gradient-to-r ${material.color} opacity-0 group-hover:opacity-5 transition duration-300 -z-0`} />
            </Link>
          ))}
        </div>

        <div className="mt-32 flex justify-center gap-2">
          <span className="h-px w-16 bg-[#8c8178]" />
          <span className="h-px w-8 bg-[#d8c8bd]" />
        </div>

      </div>
    </section>
  );
}
