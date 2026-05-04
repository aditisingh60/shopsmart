import React from 'react';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Truck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-32 text-center animate-fade-in">
        <div className="w-24 h-24 bg-pink-50 rounded-full flex items-center justify-center mx-auto mb-8">
          <ShoppingBag size={48} className="text-primary" />
        </div>
        <h2 className="text-3xl font-black text-gray-900 mb-4">Your bag is empty!</h2>
        <p className="text-gray-500 mb-10 max-w-md mx-auto">
          Time to fill it with your favorites. Explore our exclusive collection across beauty, fashion, and more.
        </p>
        <button 
          onClick={() => navigate('/products')}
          className="bg-primary text-white px-10 py-4 rounded-full font-black tracking-wide hover:bg-primary-dark transition-all shadow-lg shadow-pink-100 active:scale-95"
        >
          START SHOPPING
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 lg:px-8 py-12 animate-fade-in">
      <h1 className="text-3xl font-black text-gray-900 mb-10 uppercase">Shopping Bag ({cartItems.length})</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {cartItems.map((item) => (
            <div key={item.id} className="bg-white border border-gray-100 rounded-xl p-4 md:p-6 flex gap-6 hover:shadow-md transition-shadow">
              <div className="w-24 h-32 md:w-32 md:h-40 rounded-lg overflow-hidden shrink-0 bg-gray-50">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{item.category}</p>
                      <h3 className="text-lg font-black text-gray-800 line-clamp-2 md:line-clamp-none leading-snug">{item.name}</h3>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-300 hover:text-red-500 transition-colors p-1"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-3 mt-4">
                    <span className="text-xl font-black text-gray-900">₹{item.price}</span>
                    {item.originalPrice && (
                      <span className="text-sm text-gray-400 line-through">₹{item.originalPrice}</span>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between mt-6">
                  <div className="flex items-center border border-gray-100 rounded p-1 bg-gray-50 shadow-sm">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 hover:bg-white rounded transition-colors"
                      disabled={item.quantity <= 1}
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-10 text-center font-bold text-sm">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 hover:bg-white rounded transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <span className="font-black text-gray-900">Total: ₹{item.price * item.quantity}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-100 rounded-2xl p-8 sticky top-28 shadow-sm">
            <h2 className="text-xl font-black text-gray-900 mb-8 uppercase tracking-tight border-b border-gray-50 pb-4">Order Summary</h2>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-gray-600 font-medium">
                <span>Bag Total</span>
                <span>₹{cartTotal}</span>
              </div>
              <div className="flex justify-between text-gray-600 font-medium">
                <span>Shipping</span>
                <span className="text-green-600 font-black italic">FREE</span>
              </div>
              <div className="flex justify-between text-gray-600 font-medium">
                <span>Processing Fee</span>
                <span>₹29</span>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-6 mb-10">
              <div className="flex justify-between items-center">
                <span className="text-lg font-black text-gray-900 uppercase">Grand Total</span>
                <span className="text-2xl font-black text-primary">₹{cartTotal + 29}</span>
              </div>
            </div>

            <button className="w-full bg-primary text-white py-5 rounded-xl font-black tracking-widest flex items-center justify-center gap-3 hover:bg-primary-dark transition-all transform active:scale-[0.98] shadow-lg shadow-pink-100 mb-6">
              PROCEED TO PAY <ArrowRight size={20} />
            </button>

            <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg border border-green-100">
              <Truck size={20} className="text-green-600" />
              <p className="text-xs text-green-800 font-bold leading-relaxed">
                Yay! You are getting <span className="underline">FREE SHIPPING</span> on this order.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
