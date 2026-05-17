export type Product = {
  id: string;
  name: string;
  slug: string;
  category: string;
  fabric: string;
  occasion: string;
  color: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  stock: number;
  tag?: string;
  description: string;
  details: string[];
};

export const products: Product[] = [
  {
    id: "nk-001",
    name: "Royal Kanjivaram Silk Saree",
    slug: "royal-kanjivaram-silk-saree",
    category: "Silk Sarees",
    fabric: "Silk Blend",
    occasion: "Wedding",
    color: "Purple",
    price: 12499,
    originalPrice: 15000,
    image: "/images/product1.jpg",
    images: ["/images/product1.jpg", "/images/silk.jpg", "/images/festive.jpg"],
    stock: 7,
    tag: "Bestseller",
    description:
      "A festive silk saree with jewel tones and rich borders, made for weddings and family celebrations.",
    details: ["Silk blend fabric", "Zari inspired border", "Blouse piece included", "Dry clean recommended"],
  },
  {
    id: "nk-002",
    name: "Banarasi Brocade Wedding Saree",
    slug: "banarasi-brocade-wedding-saree",
    category: "Wedding Collection",
    fabric: "Brocade",
    occasion: "Wedding",
    color: "Red",
    price: 9999,
    originalPrice: 13000,
    image: "/images/wedding.jpg",
    images: ["/images/wedding.jpg", "/images/festive.jpg", "/images/product1.jpg"],
    stock: 0,
    tag: "Sold Out",
    description:
      "A statement red brocade saree styled for bridal events, receptions, and ceremonial occasions.",
    details: ["Brocade weave", "Rich red tone", "Blouse piece included", "No return or exchange"],
  },
  {
    id: "nk-003",
    name: "Chanderi Cotton Day Saree",
    slug: "chanderi-cotton-day-saree",
    category: "Cotton Sarees",
    fabric: "Cotton",
    occasion: "Daily Wear",
    color: "Magenta",
    price: 4299,
    image: "/images/cotton.jpg",
    images: ["/images/cotton.jpg", "/images/hero-heritage.png", "/images/hero-elegance.png"],
    stock: 0,
    tag: "Sold Out",
    description:
      "A lightweight cotton saree for elegant day wear, summer occasions, and intimate gatherings.",
    details: ["Soft cotton feel", "Lightweight drape", "Easy day styling", "Dry in shade"],
  },
  {
    id: "nk-004",
    name: "Patola Inspired Festive Saree",
    slug: "patola-inspired-festive-saree",
    category: "Festive Wear",
    fabric: "Silk Cotton",
    occasion: "Festive",
    color: "Green",
    price: 18999,
    originalPrice: 24000,
    image: "/images/festive.jpg",
    images: ["/images/festive.jpg", "/images/hero-elegance.png", "/images/silk.jpg"],
    stock: 4,
    tag: "Limited",
    description:
      "A festive saree with traditional color blocking and an elevated silk-cotton finish.",
    details: ["Silk cotton fabric", "Festive zari accents", "Blouse piece included", "Dry clean only"],
  },
  {
    id: "nk-005",
    name: "Heritage Floral Saree",
    slug: "heritage-floral-saree",
    category: "New Arrivals",
    fabric: "Organza Blend",
    occasion: "Celebration",
    color: "Ivory",
    price: 7499,
    originalPrice: 8999,
    image: "/images/hero-heritage.png",
    images: ["/images/hero-heritage.png", "/images/hero-elegance.png", "/images/cotton.jpg"],
    stock: 9,
    tag: "New",
    description:
      "A graceful floral saree with soft tones, designed for warm-weather functions and refined gifting.",
    details: ["Organza blend", "Soft floral print", "Light festive feel", "Blouse piece included"],
  },
  {
    id: "nk-006",
    name: "Bridal Red Luxury Saree",
    slug: "bridal-red-luxury-saree",
    category: "Wedding Collection",
    fabric: "Embroidered Silk",
    occasion: "Bridal",
    color: "Red",
    price: 25999,
    originalPrice: 31500,
    image: "/images/hero-bridal.png",
    images: ["/images/hero-bridal.png", "/images/wedding.jpg", "/images/product1.jpg"],
    stock: 3,
    tag: "Premium",
    description:
      "A regal bridal saree with ornate detailing, created for wedding ceremonies and heirloom styling.",
    details: ["Embroidered silk", "Bridal finish", "Premium zari work", "Dry clean only"],
  },
];

export function formatPrice(price: number) {
  return `Rs. ${price.toLocaleString("en-IN")}`;
}

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}
