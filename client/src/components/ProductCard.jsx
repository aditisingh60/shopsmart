import React from 'react';
import { Heart, Star, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const isLiked = isInWishlist(product.id);

  return (
    <div className="group relative bg-white border border-gray-100 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      {/* Wishlist Icon */}
      <button 
        onClick={() => toggleWishlist(product)}
        className="absolute top-3 right-3 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-colors"
      >
        <Heart className={`w-5 h-5 ${isLiked ? 'fill-primary text-primary' : 'text-gray-400'}`} />
      </button>

      {/* Product Image */}
      <Link to={`/product/${product.id}`} className="block aspect-[3/4] overflow-hidden bg-gray-50 relative group">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1554034483-04fac7ae10ef?auto=format&fit=crop&q=80&w=600'; // Neutral minimalist background placeholder
            e.target.onerror = null;
          }}
        />
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.discount && (
            <span className="bg-primary text-white text-[10px] font-bold px-2 py-1 rounded">
              {product.discount}
            </span>
          )}
          {product.isBestSeller && (
            <span className="bg-amber-500 text-white text-[10px] font-bold px-2 py-1 rounded">
              BESTSELLER
            </span>
          )}
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-4">
        <p className="text-xs font-semibold text-gray-400 mb-1 uppercase tracking-wider">{product.category}</p>
        <Link to={`/product/${product.id}`}>
          <h3 className="text-sm font-bold text-gray-800 line-clamp-1 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        
        {/* Rating */}
        <div className="flex items-center gap-1 mt-2">
          <div className="flex items-center bg-green-600 text-white text-[10px] h-5 px-1.5 rounded font-bold">
            {product.rating} <Star className="w-2.5 h-2.5 ml-0.5 fill-current" />
          </div>
          <span className="text-[10px] text-gray-400 font-medium">({product.reviews})</span>
        </div>

        {/* Price */}
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-base font-black text-gray-900">₹{product.price}</span>
          {product.originalPrice && (
            <span className="text-xs text-gray-400 line-through">₹{product.originalPrice}</span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button 
          onClick={() => addToCart(product)}
          className="mt-4 w-full bg-primary text-white py-2 rounded font-bold text-xs flex items-center justify-center gap-2 transition-transform active:scale-95 group-hover:bg-primary-dark"
        >
          <ShoppingCart className="w-3.5 h-3.5" />
          ADD TO CART
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
