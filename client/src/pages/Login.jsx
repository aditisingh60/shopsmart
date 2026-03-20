import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../services/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.login({ email, password });
      toast.success('Wait! Welcome back, Aditi!');
      navigate('/profile');
    } catch (error) {
      toast.error('Invalid email or password. Try user@example.com / password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-gray-50 animate-fade-in">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl shadow-pink-100/50 p-8 md:p-12 border border-gray-100">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-black text-gray-900 mb-2 uppercase tracking-tighter">Login</h1>
          <p className="text-gray-500 font-medium italic">Welcome back to ShopSmart</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Email Address</label>
            <div className="relative">
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. aditi@example.com"
                className="w-full bg-gray-50 border border-gray-100 rounded-xl py-4 px-5 pl-12 focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-medium"
              />
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 w-5 h-5" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Password</label>
            <div className="relative">
              <input 
                type={showPassword ? 'text' : 'password'} 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-gray-50 border border-gray-100 rounded-xl py-4 px-5 pl-12 focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-medium"
              />
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 w-5 h-5" />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="text-right">
            <Link to="#" className="text-xs font-bold text-primary hover:underline">Forgot password?</Link>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-5 rounded-2xl font-black tracking-widest flex items-center justify-center gap-3 hover:bg-primary-dark transition-all transform active:scale-[0.98] shadow-lg shadow-pink-100"
          >
            {loading ? 'LOGGING IN...' : 'CONTINUE'} <ArrowRight size={20} />
          </button>
        </form>

        <div className="mt-10 text-center">
          <p className="text-sm text-gray-500 font-medium">
            New to ShopSmart? <Link to="/signup" className="text-primary font-black hover:underline">Create Account</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
