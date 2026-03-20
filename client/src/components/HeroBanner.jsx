import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const HeroBanner = () => {
  return (
    <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] bg-[#fdf2f4] overflow-hidden">
      <div className="container mx-auto px-4 h-full flex flex-col md:flex-row items-center justify-between">
        
        {/* Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-xl z-10 text-center md:text-left mt-12 md:mt-0"
        >
          <h4 className="text-primary font-bold tracking-[0.2em] mb-4 uppercase text-sm md:text-base">
            Summer Essentials 2026
          </h4>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-gray-900 leading-tight mb-6">
            Beauty Unleashed, <br /> 
            <span className="text-primary italic">Smartly</span> Picked.
          </h1>
          <p className="text-gray-600 text-base md:text-lg mb-8 max-w-md mx-auto md:mx-0">
            Discover the finest collection of beauty and lifestyle products at unbeatable prices.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
            <Link 
              to="/products" 
              className="bg-primary text-white px-8 py-4 rounded-full font-black tracking-wide hover:shadow-2xl hover:bg-primary-dark transition-all transform active:scale-95"
            >
              SHOP NOW
            </Link>
            <Link 
              to="/products?category=beauty" 
              className="bg-white text-gray-900 border border-gray-200 px-8 py-4 rounded-full font-black tracking-wide hover:bg-gray-50 transition-all shadow-sm"
            >
              EXPLORE MORE
            </Link>
          </div>
        </motion.div>

        {/* Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative h-full w-full md:w-1/2 flex items-end justify-center md:justify-end"
        >
          <img 
            src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=800"
            alt="Hero"
            className="h-[80%] md:h-[90%] object-contain"
          />
          {/* Floating Elements */}
          <div className="absolute top-1/4 left-1/4 bg-white p-3 rounded-lg shadow-xl animate-bounce hidden lg:block">
            <span className="text-primary font-black">50% OFF</span>
          </div>
        </motion.div>
      </div>

      {/* Decorative Circles */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-pink-100 rounded-full blur-3xl opacity-50" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-pink-50 rounded-full blur-3xl opacity-50" />
    </div>
  );
};

export default HeroBanner;
