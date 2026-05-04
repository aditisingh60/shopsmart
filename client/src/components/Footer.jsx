import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-black text-white mb-6">
              Shop<span className="text-primary">Smart</span>
            </h3>
            <p className="text-sm leading-relaxed mb-6">
              Your one-stop destination for the latest in beauty, fashion, and lifestyle. 
              We bring you high-quality products from top brands worldwide.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-primary transition-colors"><Facebook size={20} /></a>
              <a href="#" className="hover:text-primary transition-colors"><Twitter size={20} /></a>
              <a href="#" className="hover:text-primary transition-colors"><Instagram size={20} /></a>
              <a href="#" className="hover:text-primary transition-colors"><Youtube size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-sm tracking-widest">Categories</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/products?category=beauty" className="hover:text-primary transition-colors">Beauty & Makeup</Link></li>
              <li><Link to="/products?category=fashion" className="hover:text-primary transition-colors">Fashion & Apparel</Link></li>
              <li><Link to="/products?category=wellness" className="hover:text-primary transition-colors">Wellness & Care</Link></li>
              <li><Link to="/products?category=home" className="hover:text-primary transition-colors">Home & Living</Link></li>
            </ul>
          </div>

          {/* Help & Support */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-sm tracking-widest">Help & Support</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="#" className="hover:text-primary transition-colors">Track Your Order</Link></li>
              <li><Link to="#" className="hover:text-primary transition-colors">Shipping Policy</Link></li>
              <li><Link to="#" className="hover:text-primary transition-colors">Returns & Refunds</Link></li>
              <li><Link to="#" className="hover:text-primary transition-colors">FAQs</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-sm tracking-widest">Contact Us</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-primary" />
                <span>+1 (800) SMART-SHOP</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-primary" />
                <span>support@shopsmart.com</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-primary mt-1" />
                <span>123 Commerce Way, <br />Future City, FC 56789</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>© 2026 ShopSmart. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
