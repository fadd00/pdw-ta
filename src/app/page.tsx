"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      {/* Login Button and Dark Mode Toggle */}
      <div className="fixed top-6 right-6 z-50 flex gap-3">
        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="bg-amber-800 dark:bg-gray-700 text-white p-2 rounded-full font-medium hover:bg-amber-900 dark:hover:bg-gray-600 transition-colors shadow-lg"
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          )}
        </button>
        
        <Link
          href="/login"
          className="bg-amber-800 dark:bg-gray-700 text-white px-6 py-2 rounded-full font-medium hover:bg-amber-900 dark:hover:bg-gray-600 transition-colors shadow-lg"
        >
          Login
        </Link>
      </div>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 py-20">
        <div className="text-center max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-light text-amber-900 dark:text-amber-100 mb-6 tracking-wider transition-colors duration-300">
            ESSENCE
          </h1>
          <p className="text-xl md:text-2xl text-amber-700 dark:text-amber-300 mb-8 font-light transition-colors duration-300">
            Discover the art of fragrance
          </p>
          <div className="w-32 h-px bg-amber-800 dark:bg-amber-400 mx-auto mb-12 transition-colors duration-300"></div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed transition-colors duration-300">
            Where luxury meets sophistication. Each bottle tells a story,
            each scent captures a moment in time.
          </p>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-light text-amber-900 dark:text-amber-100 mb-8 transition-colors duration-300">About Us</h2>
              <div className="w-16 h-px bg-amber-800 dark:bg-amber-400 mb-8 transition-colors duration-300"></div>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-6 transition-colors duration-300">
                For over three decades, we have been crafting exceptional fragrances
                that embody elegance and sophistication. Our perfumes are born from
                the finest ingredients sourced from around the world.
              </p>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-6 transition-colors duration-300">
                Each creation is a masterpiece, meticulously blended by our master
                perfumers who understand that a great fragrance is more than just a scent—
                it's an expression of identity.
              </p>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed transition-colors duration-300">
                We believe in the power of fragrance to evoke memories, inspire confidence,
                and create lasting impressions.
              </p>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-amber-100 to-amber-200 dark:from-gray-700 dark:to-gray-600 rounded-lg h-96 flex items-center justify-center transition-colors duration-300">
                <div className="w-32 h-48 bg-gradient-to-b from-amber-300 to-amber-500 dark:from-amber-400 dark:to-amber-600 rounded-t-full opacity-60 transition-colors duration-300"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-20 px-6 bg-gradient-to-b from-amber-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-amber-900 dark:text-amber-100 mb-8 transition-colors duration-300">Our Products</h2>
            <div className="w-16 h-px bg-amber-800 dark:bg-amber-400 mx-auto mb-8 transition-colors duration-300"></div>
            <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto transition-colors duration-300">
              Discover our curated collection of premium fragrances, each one carefully
              crafted to tell its own unique story.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {/* Product 1 */}
            <div className="text-center group">
              <div className="bg-white dark:bg-gray-700 rounded-lg p-8 shadow-lg hover:shadow-xl dark:shadow-gray-900 transition-all duration-300 mb-6">
                <div className="w-24 h-36 bg-gradient-to-b from-amber-200 to-amber-400 dark:from-amber-300 dark:to-amber-500 rounded-t-full mx-auto mb-4 opacity-70 transition-colors duration-300"></div>
              </div>
              <h3 className="text-2xl font-light text-amber-900 dark:text-amber-100 mb-2 transition-colors duration-300">Golden Hour</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4 transition-colors duration-300">Warm, sensual, and captivating</p>
              <p className="text-amber-800 dark:text-amber-400 font-medium transition-colors duration-300">$150</p>
            </div>

            {/* Product 2 */}
            <div className="text-center group">
              <div className="bg-white dark:bg-gray-700 rounded-lg p-8 shadow-lg hover:shadow-xl dark:shadow-gray-900 transition-all duration-300 mb-6">
                <div className="w-24 h-36 bg-gradient-to-b from-rose-200 to-rose-400 dark:from-rose-300 dark:to-rose-500 rounded-t-full mx-auto mb-4 opacity-70 transition-colors duration-300"></div>
              </div>
              <h3 className="text-2xl font-light text-amber-900 dark:text-amber-100 mb-2 transition-colors duration-300">Midnight Rose</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4 transition-colors duration-300">Mysterious, elegant, and alluring</p>
              <p className="text-amber-800 dark:text-amber-400 font-medium transition-colors duration-300">$180</p>
            </div>

            {/* Product 3 */}
            <div className="text-center group">
              <div className="bg-white dark:bg-gray-700 rounded-lg p-8 shadow-lg hover:shadow-xl dark:shadow-gray-900 transition-all duration-300 mb-6">
                <div className="w-24 h-36 bg-gradient-to-b from-blue-200 to-blue-400 dark:from-blue-300 dark:to-blue-500 rounded-t-full mx-auto mb-4 opacity-70 transition-colors duration-300"></div>
              </div>
              <h3 className="text-2xl font-light text-amber-900 dark:text-amber-100 mb-2 transition-colors duration-300">Ocean Breeze</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4 transition-colors duration-300">Fresh, clean, and invigorating</p>
              <p className="text-amber-800 dark:text-amber-400 font-medium transition-colors duration-300">$120</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-amber-900 dark:bg-gray-900 text-white transition-colors duration-300">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-light mb-8">Get in Touch</h2>
          <div className="w-16 h-px bg-white mx-auto mb-12"></div>

          <div className="grid md:grid-cols-3 gap-12 mb-16">
            <div>
              <h3 className="text-xl font-medium mb-4">Visit Us</h3>
              <p className="text-amber-100 dark:text-gray-300 leading-relaxed transition-colors duration-300">
                123 Fragrance Boulevard<br />
                New York, NY 10001<br />
                United States
              </p>
            </div>
            <div>
              <h3 className="text-xl font-medium mb-4">Call Us</h3>
              <p className="text-amber-100 dark:text-gray-300 leading-relaxed transition-colors duration-300">
                +1 (555) 123-4567<br />
                Mon-Fri: 9AM-6PM<br />
                Sat: 10AM-4PM
              </p>
            </div>
            <div>
              <h3 className="text-xl font-medium mb-4">Email Us</h3>
              <p className="text-amber-100 dark:text-gray-300 leading-relaxed transition-colors duration-300">
                hello@essence.com<br />
                support@essence.com<br />
                orders@essence.com
              </p>
            </div>
          </div>

          <div className="border-t border-amber-800 dark:border-gray-700 pt-12 transition-colors duration-300">
            <p className="text-amber-200 dark:text-gray-300 text-lg mb-6 transition-colors duration-300">
              Experience the essence of luxury. Visit our boutique or contact us
              to discover your perfect fragrance.
            </p>
            <button className="bg-white dark:bg-gray-700 text-amber-900 dark:text-white px-8 py-3 rounded-full font-medium hover:bg-amber-50 dark:hover:bg-gray-600 transition-colors duration-300">
              Schedule a Consultation
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-amber-950 dark:bg-gray-950 text-amber-200 dark:text-gray-300 py-8 px-6 transition-colors duration-300">
        <div className="max-w-6xl mx-auto text-center">
          <p className="mb-4">© 2025 Essence. All rights reserved.</p>
          <p className="text-sm">Crafted with passion for fragrance enthusiasts worldwide.</p>
        </div>
      </footer>
    </div>
  );
}
