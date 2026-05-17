import Navbar from "./components/navbar/Navbar";
import Hero from "./components/home/Hero";
import Categories from "./components/home/Categories";
import FeaturedProducts from "./components/home/FeaturedProducts";
import Footer from "./components/home/Footer";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden">
      <Navbar />
      <Hero />
      <Categories />
      <FeaturedProducts />
      <Footer />
    </main>
  );
}
