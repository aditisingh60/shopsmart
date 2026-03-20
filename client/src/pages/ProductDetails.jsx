import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Star, 
  ShoppingCart, 
  Heart, 
  Truck, 
  RotateCcw, 
  ShieldCheck, 
  ChevronRight,
  Plus,
  Minus
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';
import SkeletonLoading from '../components/SkeletonLoading';
import api from '../services/api';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    const fetchProductData = async () => {
      setLoading(true);
      try {
        const res = await api.getProductById(id);
        setProduct(res.data);
        
        const relatedRes = await api.getProductsByCategory(res.data.category);
        setRelatedProducts(relatedRes.data.filter(p => p.id !== parseInt(id)).slice(0, 4));
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProductData();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="aspect-[3/4] bg-gray-200 animate-pulse rounded-lg" />
          <div className="space-y-6">
            <div className="h-4 bg-gray-200 rounded w-1/4" />
            <div className="h-8 bg-gray-200 rounded w-3/4" />
            <div className="h-6 bg-gray-200 rounded w-1/2" />
            <div className="h-24 bg-gray-200 rounded w-full" />
            <div className="h-12 bg-gray-200 rounded w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) return <div className="text-center py-20 font-bold">Product not found</div>;

  const isLiked = isInWishlist(product.id);

  return (
    <div className="container mx-auto px-4 lg:px-8 py-8 md:py-12 animate-fade-in">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase tracking-widest mb-8 overflow-x-auto whitespace-nowrap">
        <button onClick={() => navigate('/')} className="hover:text-primary">Home</button>
        <ChevronRight size={12} />
        <button onClick={() => navigate(`/products?category=${product.category.toLowerCase()}`)} className="hover:text-primary">
          {product.category}
        </button>
        <ChevronRight size={12} />
        <span className="text-gray-900">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">
        {/* Product Image */}
        <div className="relative group">
          <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-gray-50 border border-gray-100">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <button 
            onClick={() => toggleWishlist(product)}
            className="absolute top-6 right-6 p-3 bg-white rounded-full shadow-lg hover:scale-110 transition-transform"
          >
            <Heart className={`w-6 h-6 ${isLiked ? 'fill-primary text-primary' : 'text-gray-400'}`} />
          </button>
        </div>

        {/* Product Details */}
        <div className="flex flex-col">
          <h2 className="text-primary font-black uppercase tracking-[0.2em] text-sm mb-4">
            {product.category}
          </h2>
          <h1 className="text-3xl lg:text-4xl font-black text-gray-900 mb-4 leading-tight">
            {product.name}
          </h1>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center bg-green-600 text-white px-2 py-1 rounded font-bold text-sm">
              {product.rating} <Star className="w-3 h-3 ml-1 fill-current" />
            </div>
            <span className="text-sm font-bold text-gray-400 border-l border-gray-200 pl-4">
              {product.reviews} Verified Reviews
            </span>
          </div>

          <div className="flex items-baseline gap-4 mb-8">
            <span className="text-4xl font-black text-gray-900">₹{product.price}</span>
            {product.originalPrice && (
              <span className="text-xl text-gray-400 line-through">₹{product.originalPrice}</span>
            )}
            {product.discount && (
              <span className="text-xl font-bold text-primary">({product.discount})</span>
            )}
          </div>

          <p className="text-gray-600 leading-relaxed mb-8 text-lg">
            {product.description}
          </p>

          {/* Quantity and Actions */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <div className="flex items-center border border-gray-200 rounded-lg p-1 bg-gray-50 h-14 w-full sm:w-32 justify-between">
              <button 
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="p-2 hover:bg-white rounded-md transition-colors"
                disabled={quantity <= 1}
              >
                <Minus size={18} />
              </button>
              <span className="font-bold text-lg w-8 text-center">{quantity}</span>
              <button 
                onClick={() => setQuantity(q => q + 1)}
                className="p-2 hover:bg-white rounded-md transition-colors"
              >
                <Plus size={18} />
              </button>
            </div>

            <button 
              onClick={() => addToCart(product, quantity)}
              className="flex-1 h-14 bg-primary text-white font-black rounded-lg flex items-center justify-center gap-3 hover:bg-primary-dark transition-all transform active:scale-95 shadow-lg shadow-pink-100"
            >
              <ShoppingCart size={20} />
              ADD TO BAG
            </button>
          </div>

          {/* Features / Benefits */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t border-gray-100">
            <div className="flex items-center gap-3">
              <Truck size={24} className="text-primary shrink-0" />
              <div className="text-xs">
                <p className="font-black text-gray-900">FREE SHIPPING</p>
                <p className="text-gray-500">On orders above ₹499</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <RotateCcw size={24} className="text-primary shrink-0" />
              <div className="text-xs">
                <p className="font-black text-gray-900">EASY RETURNS</p>
                <p className="text-gray-500">15-day return policy</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck size={24} className="text-primary shrink-0" />
              <div className="text-xs">
                <p className="font-black text-gray-900">AUTH DIRECT</p>
                <p className="text-gray-500">100% genuine products</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Products */}
      <section className="mt-24">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">You Might Also Like</h2>
          <div className="w-16 h-1 bg-primary mx-auto mt-4"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {relatedProducts.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProductDetails;
