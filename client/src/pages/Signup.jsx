import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Phone, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      toast.success('Account created successfully!');
      navigate('/login');
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-gray-50 animate-fade-in">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl shadow-pink-100/50 p-8 md:p-12 border border-gray-100">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-black text-gray-900 mb-2 uppercase tracking-tighter">Sign Up</h1>
          <p className="text-gray-500 font-medium italic">Create your ShopSmart account</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-5">
          <div>
            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Full Name</label>
            <div className="relative">
              <input 
                type="text" 
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="e.g. Aditi Singh"
                className="w-full bg-gray-50 border border-gray-100 rounded-xl py-4 px-5 pl-12 focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-medium"
              />
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 w-5 h-5" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Email Address</label>
            <div className="relative">
              <input 
                type="email" 
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="e.g. aditi@example.com"
                className="w-full bg-gray-50 border border-gray-100 rounded-xl py-4 px-5 pl-12 focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-medium"
              />
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 w-5 h-5" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Phone Number</label>
            <div className="relative">
              <input 
                type="tel" 
                required
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                placeholder="+91-XXXXX XXXXX"
                className="w-full bg-gray-50 border border-gray-100 rounded-xl py-4 px-5 pl-12 focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-medium"
              />
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 w-5 h-5" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Password</label>
            <div className="relative">
              <input 
                type="password" 
                required
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                placeholder="••••••••"
                className="w-full bg-gray-50 border border-gray-100 rounded-xl py-4 px-5 pl-12 focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-medium"
              />
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 w-5 h-5" />
            </div>
          </div>

          <p className="text-[10px] text-gray-400 leading-relaxed px-2 text-center">
            By signing up, you agree to our <span className="underline cursor-pointer">Terms of Use</span> and <span className="underline cursor-pointer">Privacy Policy</span>.
          </p>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-5 rounded-2xl font-black tracking-widest flex items-center justify-center gap-3 hover:bg-primary-dark transition-all transform active:scale-[0.98] shadow-lg shadow-pink-100"
          >
            {loading ? 'CREATING...' : 'SIGN UP'} <ArrowRight size={20} />
          </button>
        </form>

        <div className="mt-10 text-center">
          <p className="text-sm text-gray-500 font-medium">
            Already have an account? <Link to="/login" className="text-primary font-black hover:underline">Login Now</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
