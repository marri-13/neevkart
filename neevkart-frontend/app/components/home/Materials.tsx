import Link from "next/link";

export default function Materials() {
  const materials = [
    {
      name: "Silk",
      description: "Luxurious and elegant silk sarees for special occasions",
      color: "from-amber-900 via-amber-700 to-transparent",
      icon: "✨",
    },
    {
      name: "Cotton",
      description: "Comfortable and breathable cotton sarees for everyday wear",
      color: "from-orange-900 via-orange-700 to-transparent",
      icon: "☀️",
    },
    {
      name: "Linen",
      description: "Light and durable linen blend sarees for all seasons",
      color: "from-yellow-900 via-yellow-700 to-transparent",
      icon: "🌾",
    },
    {
      name: "Wool",
      description: "Warm and cozy wool sarees perfect for winter celebrations",
      color: "from-red-900 via-red-700 to-transparent",
      icon: "🧵",
    },
  ];

  return (
    <section id="materials" className="bg-white py-24 md:py-32">
      <div className="luxury-container">
        <div className="mb-16 text-center">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#a51d49]">
            Fabric Collection
          </p>
          <h2 className="text-3xl md:text-4xl font-display font-medium text-[#1f1712] mb-4">
            Shop By Material
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our exquisite collection of sarees crafted from the finest fabrics, each chosen for quality and comfort.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {materials.map((material) => (
            <Link
              key={material.name}
              href={`/sarees?material=${material.name.toLowerCase()}`}
              className="group relative overflow-hidden rounded-lg bg-gradient-to-br from-gray-100 to-gray-50 p-8 transition hover:shadow-lg"
            >
              <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition duration-300" />

              <div className="relative z-10">
                <div className="text-4xl mb-4">{material.icon}</div>
                <h3 className="text-xl font-display font-medium text-[#1f1712] mb-2">
                  {material.name}
                </h3>
                <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                  {material.description}
                </p>

                <div className="inline-flex items-center justify-center rounded-full bg-[#a51d49] px-6 py-2.5 text-xs font-semibold text-white transition group-hover:bg-[#8b1840]">
                  Explore {material.name}
                </div>
              </div>

              <div className={`absolute inset-0 bg-gradient-to-r ${material.color} opacity-0 group-hover:opacity-5 transition duration-300 -z-0`} />
            </Link>
          ))}
        </div>

        {/* Divider */}
        <div className="mt-20 flex justify-center gap-2">
          <span className="h-px w-16 bg-[#8c8178]" />
          <span className="h-px w-8 bg-[#d8c8bd]" />
        </div>
      </div>
    </section>
  );
}
