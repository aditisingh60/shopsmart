import React, { useState, useEffect } from 'react';
import HeroBanner from '../components/HeroBanner';
import CategoryCard from '../components/CategoryCard';
import ProductCard from '../components/ProductCard';
import SkeletonLoading from '../components/SkeletonLoading';
import api from '../services/api';

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const [catRes, prodRes] = await Promise.all([
          api.getCategories(),
          api.getProducts()
        ]);
        setCategories(catRes.data);
        setTrendingProducts(prodRes.data.slice(0, 8));
      } catch (error) {
        console.error('Error fetching home data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchHomeData();
  }, []);

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <HeroBanner />

      {/* Categories Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-4 tracking-tight">SHOP BY CATEGORY</h2>
            <div className="w-20 h-1 bg-primary mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-10">
            {loading ? (
              [...Array(6)].map((_, i) => <SkeletonLoading key={i} type="category" />)
            ) : (
              categories.map(category => (
                <CategoryCard key={category.id} category={category} />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-[#f9f9f9]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-2 tracking-tight uppercase">Trending Now</h2>
              <p className="text-gray-500 text-sm">Most loved picks from our community</p>
            </div>
            <a href="/products" className="text-primary font-bold text-sm hover:underline">VIEW ALL PRODUCTS</a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {loading ? (
              [...Array(4)].map((_, i) => <SkeletonLoading key={i} type="product" />)
            ) : (
              trendingProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Brand Promise / Why ShopSmart */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="p-8 rounded-2xl bg-pink-50 transition-transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              </div>
              <h4 className="text-lg font-black text-gray-900 mb-3">100% Authentic</h4>
              <p className="text-sm text-gray-500">We source products directly from brands or authorized distributors.</p>
            </div>
            <div className="p-8 rounded-2xl bg-pink-50 transition-transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
              </div>
              <h4 className="text-lg font-black text-gray-900 mb-3">Easy Returns</h4>
              <p className="text-sm text-gray-500">Not satisfied? Return within 15 days for a full refund or exchange.</p>
            </div>
            <div className="p-8 rounded-2xl bg-pink-50 transition-transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
              </div>
              <h4 className="text-lg font-black text-gray-900 mb-3">Fast Delivery</h4>
              <p className="text-sm text-gray-500">Free and express shipping available on most orders above ₹499.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
