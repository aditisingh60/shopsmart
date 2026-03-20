import React, { useState, useEffect } from 'react';
import { Package, Truck, CheckCircle, ChevronRight, Search } from 'lucide-react';
import api from '../services/api';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.getOrders();
        setOrders(res.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="container mx-auto px-4 lg:px-8 py-12 animate-fade-in max-w-5xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tight">Purchase History</h1>
          <p className="text-gray-500 font-medium mt-1">Manage and track your recent orders</p>
        </div>
        <div className="relative w-full md:w-64">
          <input 
            type="text" 
            placeholder="Search orders..." 
            className="w-full bg-white border border-gray-200 rounded-lg py-2 px-4 pl-10 text-sm focus:ring-2 focus:ring-primary outline-none"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
        </div>
      </div>

      <div className="space-y-6">
        {loading ? (
          [...Array(3)].map((_, i) => (
            <div key={i} className="h-40 bg-gray-100 animate-pulse rounded-2xl" />
          ))
        ) : orders.length > 0 ? (
          orders.map((order) => (
            <div key={order.id} className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-gray-50/50 p-6 md:px-8 border-b border-gray-50 flex flex-wrap justify-between items-center gap-4">
                <div className="flex gap-8">
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Order ID</p>
                    <p className="text-sm font-bold text-gray-900">{order.id}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Date</p>
                    <p className="text-sm font-bold text-gray-900">{new Date(order.date).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Total</p>
                    <p className="text-sm font-bold text-primary">₹{order.total}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                    order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {order.status === 'Delivered' ? <CheckCircle size={12} /> : <Truck size={12} />}
                    {order.status}
                  </span>
                  <button className="text-xs font-black text-primary hover:underline border-l border-gray-200 pl-3">VIEW DETAILS</button>
                </div>
              </div>

              <div className="p-6 md:p-8 flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-gray-50 rounded-lg flex items-center justify-center p-2">
                    <Package size={32} className="text-gray-300" />
                  </div>
                  <div>
                    <h3 className="font-black text-gray-800 uppercase tracking-wide">Shipment containing {order.items} items</h3>
                    <p className="text-xs text-gray-400 font-medium mt-1">Package successfully {order.status.toLowerCase()}</p>
                  </div>
                </div>
                <ChevronRight size={24} className="text-gray-300" />
              </div>
            </div>
          ))
        ) : (
          <div className="py-20 text-center bg-gray-50/50 rounded-3xl border border-dashed border-gray-200">
            <Package size={48} className="text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 font-bold">No orders found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
