import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShoppingCart, 
  Heart, 
  User, 
  Menu, 
  X, 
  Search,
  ChevronDown
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import SearchBar from './SearchBar';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { cartCount } = useCart();
  const { wishlistItems } = useWishlist();
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Beauty', path: '/products?category=beauty' },
    { name: 'Fashion', path: '/products?category=fashion' },
    { name: 'Home', path: '/products?category=home' },
    { name: 'Wellness', path: '/products?category=wellness' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* Logo & Mobile Menu Toggle */}
          <div className="flex items-center gap-4">
            <button 
              className="md:hidden p-2 hover:bg-gray-100 rounded-full"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="w-6 h-6 text-gray-700" />
            </button>
            <Link to="/" className="flex items-center">
              <span className="text-2xl md:text-2xl font-black text-primary tracking-tighter">
                Shop<span className="text-gray-900">Smart</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                className="text-sm font-bold text-gray-700 hover:text-primary transition-colors uppercase tracking-wider"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Search Bar (Desktop) */}
          <SearchBar />

          {/* Right Icons */}
          <div className="flex items-center gap-1 md:gap-4">
            <button 
              className="md:hidden p-2 hover:bg-gray-100 rounded-full"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="w-5 h-5 text-gray-700" />
            </button>

            <Link to="/wishlist" className="p-2 hover:bg-gray-100 rounded-full relative group">
              <Heart className="w-5 h-5 text-gray-700 group-hover:text-primary transition-colors" />
              {wishlistItems.length > 0 && (
                <span className="absolute top-1 right-1 bg-primary text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            <Link to="/cart" className="p-2 hover:bg-gray-100 rounded-full relative group">
              <ShoppingCart className="w-5 h-5 text-gray-700 group-hover:text-primary transition-colors" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-primary text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>

            <Link to="/profile" className="hidden sm:flex items-center gap-1 p-2 hover:bg-gray-100 rounded-full group">
              <User className="w-5 h-5 text-gray-700 group-hover:text-primary transition-colors" />
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Search Overlay */}
      {isSearchOpen && (
        <div className="absolute inset-0 bg-white z-50 flex items-center px-4 md:hidden animate-fade-in">
          <SearchBar mobile onClose={() => setIsSearchOpen(false)} />
        </div>
      )}

      {/* Mobile Drawer */}
      {isMenuOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-[60] md:hidden"
            onClick={() => setIsMenuOpen(false)}
          />
          <div className="fixed top-0 left-0 bottom-0 w-64 bg-white z-[70] shadow-2xl md:hidden transform transition-transform duration-300 animate-slide-right">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <span className="text-xl font-black text-primary">ShopSmart</span>
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="py-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center px-6 py-4 text-sm font-semibold text-gray-700 hover:bg-pink-50 hover:text-primary"
                >
                  {link.name}
                </Link>
              ))}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <Link 
                  to="/profile" 
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center px-6 py-4 text-sm font-semibold text-gray-700 hover:bg-pink-50 hover:text-primary"
                >
                  My Profile
                </Link>
                <Link 
                  to="/orders" 
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center px-6 py-4 text-sm font-semibold text-gray-700 hover:bg-pink-50 hover:text-primary"
                >
                  My Orders
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
