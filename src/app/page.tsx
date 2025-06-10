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

  // Helper function untuk gradient berdasarkan warna
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
    <div className="min-h-screen bg-zinc-900 animated-bg-texture transition-colors duration-300">
      {/* Login Button */}
      <div className="fixed top-6 right-6 z-50">
        <Link
          href="/login"
          className="bg-amber-800 text-white px-6 py-2 rounded-full font-medium hover:bg-amber-900 transition-all duration-300 shadow-lg"
        >
          Login
        </Link>
      </div>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 py-20 bg-zinc-900">
        <div className="text-center max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-normal text-amber-100 mb-6 tracking-wider transition-colors duration-300">
            ESSENCE
          </h1>
          <p className="text-xl md:text-2xl text-amber-300 mb-8 font-light transition-colors duration-300">
            Discover the art of fragrance
          </p>
          <div className="w-32 h-px bg-amber-400 mx-auto mb-12 transition-colors duration-300"></div>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed transition-colors duration-300">
            Where luxury meets sophistication. Each bottle tells a story,
            each scent captures a moment in time.
          </p>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 bg-zinc-800 transition-colors duration-300">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-light text-amber-100 mb-8 transition-colors duration-300">About Us</h2>
              <div className="w-16 h-px bg-amber-400 mb-8 transition-colors duration-300"></div>
              <p className="text-gray-300 text-lg leading-relaxed mb-6 transition-colors duration-300">
                For over three decades, we have been crafting exceptional fragrances
                that embody elegance and sophistication. Our perfumes are born from
                the finest ingredients sourced from around the world.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed mb-6 transition-colors duration-300">
                Each creation is a masterpiece, meticulously blended by our master
                perfumers who understand that a great fragrance is more than just a scent—
                it's an expression of identity.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed transition-colors duration-300">
                We believe in the power of fragrance to evoke memories, inspire confidence,
                and create lasting impressions.
              </p>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-zinc-700 to-zinc-600 rounded-lg h-96 flex items-center justify-center transition-colors duration-300">
                <div className="w-32 h-48 bg-gradient-to-b from-amber-400 to-amber-600 rounded-t-full opacity-60 transition-colors duration-300"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-20 px-6 bg-zinc-900 transition-colors duration-300">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-amber-100 mb-8 transition-colors duration-300">Our Products</h2>
            <div className="w-16 h-px bg-amber-400 mx-auto mb-8 transition-colors duration-300"></div>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto transition-colors duration-300">
              Discover our curated collection of premium fragrances, each one carefully
              crafted to tell its own unique story.
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="text-amber-100 text-xl">Loading products...</div>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-300 text-lg">No products available at the moment.</div>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-12">
              {products.map((product) => (
                <div key={product.id} className="text-center group">
                  <div className="bg-zinc-800 rounded-lg p-10 shadow-xl hover:shadow-2xl shadow-black/50 transition-all duration-300 mb-6 group-hover:scale-105">
                    {product.image ? (
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={120}
                        height={180} // This height is for aspect ratio, actual display height controlled by className h-48
                        className="mx-auto rounded-lg object-cover h-48 w-auto" // Consistent height
                      />
                    ) : (
                      <div className={`w-24 h-48 bg-gradient-to-b ${getColorGradient(product.color)} rounded-t-full mx-auto mb-4 opacity-70 transition-colors duration-300 flex items-center justify-center`}>
                        <span className="text-xs text-white/70">No Image</span>
                      </div> // Adjusted placeholder height
                    )}
                  </div>
                  <h3 className="text-2xl font-light text-amber-100 mb-2 transition-colors duration-300">{product.name}</h3>
                  <p className="text-gray-300 mb-4 transition-colors duration-300 h-20 overflow-hidden">{product.description}</p> {/* Fixed height for description */}
                  <p className="text-amber-400 font-medium transition-colors duration-300">${product.price}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-zinc-900 text-white transition-colors duration-300">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-light text-amber-100 mb-8 transition-colors duration-300">Get in Touch</h2>
          <div className="w-16 h-px bg-amber-400 mx-auto mb-12"></div>

          <div className="grid md:grid-cols-3 gap-12 mb-16">
            <div>
              <h3 className="text-xl font-medium mb-4">Visit Us</h3>
              <p className="text-gray-300 leading-relaxed transition-colors duration-300">
                123 Fragrance Boulevard<br />
                New York, NY 10001<br />
                United States
              </p>
            </div>
            <div>
              <h3 className="text-xl font-medium mb-4">Call Us</h3>
              <p className="text-gray-300 leading-relaxed transition-colors duration-300">
                +1 (555) 123-4567<br />
                Mon-Fri: 9AM-6PM<br />
                Sat: 10AM-4PM
              </p>
            </div>
            <div>
              <h3 className="text-xl font-medium mb-4">Email Us</h3>
              <p className="text-gray-300 leading-relaxed transition-colors duration-300">
                hello@essence.com<br />
                support@essence.com<br />
                orders@essence.com
              </p>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-12 transition-colors duration-300">
            <p className="text-gray-300 text-lg mb-6 transition-colors duration-300">
              Experience the essence of luxury. Visit our boutique or contact us
              to discover your perfect fragrance.
            </p>
            <button className="bg-amber-700 text-white px-8 py-3 rounded-full font-medium hover:bg-amber-600 transition-colors duration-300">
              Schedule a Consultation
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-900 text-gray-300 py-8 px-6 transition-colors duration-300 border-t border-zinc-700">
        <div className="max-w-6xl mx-auto text-center">
          <p className="mb-4">© 2025 Essence. All rights reserved.</p>
          <p className="text-sm">Crafted with passion for fragrance enthusiasts worldwide.</p>
        </div>
      </footer>
    </div>
  );
}
