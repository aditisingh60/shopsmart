import axios from 'axios';
import { products, categories } from '../data/products';

// This is a mock API service that simulates network requests
// In a real app, this would use axios to call an actual backend

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  getProducts: async () => {
    await delay(800); // Simulate network delay
    return { data: products };
  },

  getProductById: async (id) => {
    await delay(500);
    const product = products.find(p => p.id === parseInt(id));
    if (product) return { data: product };
    throw new Error('Product not found');
  },

  getCategories: async () => {
    await delay(300);
    return { data: categories };
  },

  getProductsByCategory: async (category) => {
    await delay(600);
    const filtered = products.filter(p => p.category.toLowerCase() === category.toLowerCase());
    return { data: filtered };
  },

  searchProducts: async (query) => {
    await delay(500);
    const filtered = products.filter(p => 
      p.name.toLowerCase().includes(query.toLowerCase()) || 
      p.category.toLowerCase().includes(query.toLowerCase())
    );
    return { data: filtered };
  },

  login: async (credentials) => {
    await delay(1000);
    if (credentials.email === 'user@example.com' && credentials.password === 'password') {
      return { data: { id: 1, name: 'Aditi Singh', email: 'user@example.com', token: 'mock-jwt-token' } };
    }
    throw new Error('Invalid credentials');
  },

  getOrders: async () => {
    await delay(800);
    return { data: [
      { id: 'ORD-12345', date: '2026-03-15', total: 5498, status: 'Delivered', items: 2 },
      { id: 'ORD-67890', date: '2026-02-28', total: 12999, status: 'Shipped', items: 1 }
    ]};
  }
};

export default api;
