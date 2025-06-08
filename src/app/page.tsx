"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      } else {
        console.error('Failed to fetch products');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const getColorGradient = (color: string) => {
    switch (color) {
      case 'rose':
        return 'from-rose-300 to-rose-500';
      case 'blue':
        return 'from-blue-300 to-blue-500';
      case 'amber':
      default:
        return 'from-amber-300 to-amber-500';
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black transition-colors duration-300">
      {/* Login Button Only */}
      <div className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50">
        <Link
          href="/login"
          className="bg-amber-600 text-black px-3 py-2 sm:px-6 sm:py-2 rounded-full font-medium hover:bg-amber-500 transition-all duration-300 shadow-lg text-sm sm:text-base"
        >
          Login
        </Link>
      </div>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-16 sm:py-20">
        <div className="text-center max-w-4xl">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-light text-amber-400 mb-4 sm:mb-6 tracking-wider transition-colors duration-300">
            ESSENCE
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-amber-300 mb-6 sm:mb-8 font-light transition-colors duration-300">
            Discover the art of fragrance
          </p>
          <div className="w-24 sm:w-32 h-px bg-amber-400 mx-auto mb-8 sm:mb-12 transition-colors duration-300"></div>
          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed transition-colors duration-300 px-4">
            Where luxury meets sophistication. Each bottle tells a story,
            each scent captures a moment in time.
          </p>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 sm:py-20 px-4 sm:px-6 bg-gray-800 transition-colors duration-300">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-16 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl sm:text-4xl font-light text-amber-400 mb-6 sm:mb-8 transition-colors duration-300">About Us</h2>
              <div className="w-12 sm:w-16 h-px bg-amber-400 mb-6 sm:mb-8 transition-colors duration-300"></div>
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-4 sm:mb-6 transition-colors duration-300">
                For over three decades, we have been crafting exceptional fragrances
                that embody elegance and sophistication. Our perfumes are born from
                the finest ingredients sourced from around the world.
              </p>
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-4 sm:mb-6 transition-colors duration-300">
                Each creation is a masterpiece, meticulously blended by our master
                perfumers who understand that a great fragrance is more than just a scent—
                it's an expression of identity.
              </p>
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed transition-colors duration-300">
                We believe in the power of fragrance to evoke memories, inspire confidence,
                and create lasting impressions.
              </p>
            </div>
            <div className="relative order-1 md:order-2">
              <div className="bg-gradient-to-br from-gray-700 to-gray-600 rounded-lg h-64 sm:h-96 flex items-center justify-center transition-colors duration-300">
                <div className="w-24 sm:w-32 h-36 sm:h-48 bg-gradient-to-b from-amber-400 to-amber-600 rounded-t-full opacity-80 transition-colors duration-300"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-16 sm:py-20 px-4 sm:px-6 bg-gradient-to-b from-gray-900 to-black transition-colors duration-300">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-light text-amber-400 mb-6 sm:mb-8 transition-colors duration-300">Our Products</h2>
            <div className="w-12 sm:w-16 h-px bg-amber-400 mx-auto mb-6 sm:mb-8 transition-colors duration-300"></div>
            <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto transition-colors duration-300 px-4">
              Discover our curated collection of premium fragrances, each one carefully
              crafted to tell its own unique story.
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="text-amber-400 text-lg sm:text-xl">Loading products...</div>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-300 text-base sm:text-lg">No products available at the moment.</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
              {products.map((product) => (
                <div key={product.id} className="text-center group">
                  <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 sm:p-8 shadow-xl hover:shadow-2xl hover:border-amber-500 transition-all duration-300 mb-4 sm:mb-6">
                    {product.image ? (
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={100}
                        height={150}
                        className="mx-auto rounded-lg object-cover sm:w-[120px] sm:h-[180px]"
                      />
                    ) : (
                      <div className={`w-20 h-32 sm:w-24 sm:h-36 bg-gradient-to-b ${getColorGradient(product.color)} rounded-t-full mx-auto mb-4 opacity-80 transition-colors duration-300`}></div>
                    )}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-light text-amber-400 mb-2 transition-colors duration-300">{product.name}</h3>
                  <p className="text-gray-300 mb-3 sm:mb-4 transition-colors duration-300 text-sm sm:text-base px-2">{product.description}</p>
                  <p className="text-amber-500 font-medium transition-colors duration-300 text-lg sm:text-xl">${product.price}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 sm:py-20 px-4 sm:px-6 bg-black text-white transition-colors duration-300">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-light text-amber-400 mb-6 sm:mb-8">Get in Touch</h2>
          <div className="w-12 sm:w-16 h-px bg-amber-400 mx-auto mb-8 sm:mb-12"></div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 mb-12 sm:mb-16">
            <div className="text-center sm:text-left">
              <h3 className="text-lg sm:text-xl font-medium mb-3 sm:mb-4 text-amber-300">Visit Us</h3>
              <p className="text-gray-300 leading-relaxed transition-colors duration-300 text-sm sm:text-base">
                123 Fragrance Boulevard<br />
                New York, NY 10001<br />
                United States
              </p>
            </div>
            <div className="text-center sm:text-left">
              <h3 className="text-lg sm:text-xl font-medium mb-3 sm:mb-4 text-amber-300">Call Us</h3>
              <p className="text-gray-300 leading-relaxed transition-colors duration-300 text-sm sm:text-base">
                +1 (555) 123-4567<br />
                Mon-Fri: 9AM-6PM<br />
                Sat: 10AM-4PM
              </p>
            </div>
            <div className="text-center sm:text-left">
              <h3 className="text-lg sm:text-xl font-medium mb-3 sm:mb-4 text-amber-300">Email Us</h3>
              <p className="text-gray-300 leading-relaxed transition-colors duration-300 text-sm sm:text-base">
                hello@essence.com<br />
                support@essence.com<br />
                orders@essence.com
              </p>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8 sm:pt-12 transition-colors duration-300">
            <p className="text-gray-300 text-base sm:text-lg mb-4 sm:mb-6 transition-colors duration-300 px-4">
              Experience the essence of luxury. Visit our boutique or contact us
              to discover your perfect fragrance.
            </p>
            <button className="bg-amber-600 text-black px-6 sm:px-8 py-2 sm:py-3 rounded-full font-medium hover:bg-amber-500 transition-colors duration-300 text-sm sm:text-base">
              Schedule a Consultation
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 text-gray-400 py-6 sm:py-8 px-4 sm:px-6 transition-colors duration-300">
        <div className="max-w-6xl mx-auto text-center">
          <p className="mb-3 sm:mb-4 text-sm sm:text-base">© 2025 <span className="text-amber-400">Essence</span>. All rights reserved.</p>
          <p className="text-xs sm:text-sm">Crafted with passion for fragrance enthusiasts worldwide.</p>
        </div>
      </footer>
    </div>
  );
}
