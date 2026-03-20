import React from 'react';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';
import { Heart, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Wishlist = () => {
  const { wishlistItems } = useWishlist();
  const navigate = useNavigate();

  if (wishlistItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-32 text-center animate-fade-in">
        <div className="w-24 h-24 bg-pink-50 rounded-full flex items-center justify-center mx-auto mb-8">
          <Heart size={48} className="text-primary" />
        </div>
        <h2 className="text-3xl font-black text-gray-900 mb-4">Your wishlist is empty!</h2>
        <p className="text-gray-500 mb-10 max-w-md mx-auto">
          Save items you love and they will appear here. Find your next favorite must-have!
        </p>
        <button 
          onClick={() => navigate('/products')}
          className="bg-primary text-white px-10 py-4 rounded-full font-black tracking-wide hover:bg-primary-dark transition-all shadow-lg shadow-pink-100 active:scale-95"
        >
          EXPLORE PRODUCTS
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 lg:px-8 py-12 animate-fade-in">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-black text-gray-900 uppercase">My Wishlist</h1>
          <p className="text-gray-500 font-bold text-sm mt-1">{wishlistItems.length} Saved Items</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {wishlistItems.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
