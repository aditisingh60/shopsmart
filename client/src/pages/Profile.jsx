import React from 'react';
import { User, Package, MapPin, Settings, LogOut, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Profile = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const menuItems = [
    { icon: <Package size={20} />, title: 'My Orders', desc: 'Track, return or buy things again', path: '/orders' },
    { icon: <MapPin size={20} />, title: 'My Addresses', desc: 'Save addresses for faster checkout', path: '#' },
    { icon: <User size={20} />, title: 'Edit Profile', desc: 'Change your name, email or phone', path: '#' },
    { icon: <Settings size={20} />, title: 'Account Settings', desc: 'Manage your security and preferences', path: '#' },
  ];

  return (
    <div className="container mx-auto px-4 lg:px-8 py-12 animate-fade-in max-w-4xl">
      <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-xl shadow-pink-50/50">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-pink-400 p-8 md:p-12 text-white relative">
          <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white/30 bg-white/10 flex items-center justify-center overflow-hidden">
              <User size={64} className="text-white/80" />
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-black mb-2 uppercase tracking-tight">Aditi Singh</h1>
              <p className="text-white/80 font-medium italic">Premium Member since 2024</p>
              <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-4">
                <span className="bg-white/20 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">aditi@example.com</span>
                <span className="bg-white/20 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">+91 98765 43210</span>
              </div>
            </div>
          </div>
          {/* Decorative Pattern */}
          <div className="absolute top-0 right-0 w-64 h-full bg-white/5 skew-x-12 transform translate-x-24" />
        </div>

        {/* Menu Items */}
        <div className="p-4 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {menuItems.map((item, idx) => (
              <button 
                key={idx}
                onClick={() => item.path !== '#' && navigate(item.path)}
                className="group p-6 rounded-2xl border border-gray-50 bg-gray-50/30 hover:bg-white hover:border-pink-100 hover:shadow-lg transition-all flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-black text-gray-900 leading-none mb-1 uppercase text-sm tracking-wide">{item.title}</h3>
                    <p className="text-xs text-gray-400 font-medium">{item.desc}</p>
                  </div>
                </div>
                <ChevronRight size={18} className="text-gray-300 group-hover:text-primary transition-colors" />
              </button>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-gray-50 flex justify-center">
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 text-gray-400 hover:text-red-500 font-black text-sm uppercase tracking-widest transition-colors"
            >
              <LogOut size={18} /> LOGOUT FROM ACCOUNT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
