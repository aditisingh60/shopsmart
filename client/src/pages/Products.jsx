import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import SkeletonLoading from '../components/SkeletonLoading';
import api from '../services/api';
import { Filter, ChevronDown, X } from 'lucide-react';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('category');
  const searchQuery = searchParams.get('search');

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('popularity');
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter States
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let res;
        if (searchQuery) {
          res = await api.searchProducts(searchQuery);
        } else if (category) {
          res = await api.getProductsByCategory(category);
        } else {
          res = await api.getProducts();
        }
        setProducts(res.data);
        setCurrentPage(1); // Reset to first page on new query/category
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
    window.scrollTo(0, 0);
  }, [category, searchQuery]);

  const handlePriceChange = (range) => {
    setSelectedPriceRanges(prev => 
      prev.includes(range) ? prev.filter(r => r !== range) : [...prev, range]
    );
  };

  const handleRatingChange = (rating) => {
    setSelectedRatings(prev => 
      prev.includes(rating) ? prev.filter(r => r !== rating) : [...prev, rating]
    );
  };

  const clearAllFilters = () => {
    setSelectedPriceRanges([]);
    setSelectedRatings([]);
    if (searchQuery || category) {
      setSearchParams({});
    }
    setCurrentPage(1);
  };

  const filterByPrice = (product) => {
    if (selectedPriceRanges.length === 0) return true;
    return selectedPriceRanges.some(range => {
      if (range === 'Under ₹500') return product.price < 500;
      if (range === '₹500 - ₹1000') return product.price >= 500 && product.price <= 1000;
      if (range === '₹1000 - ₹5000') return product.price > 1000 && product.price <= 5000;
      if (range === 'Over ₹5000') return product.price > 5000;
      return true;
    });
  };

  const filterByRating = (product) => {
    if (selectedRatings.length === 0) return true;
    const minRating = Math.min(...selectedRatings);
    return product.rating >= minRating;
  };

  const filteredProducts = products.filter(p => filterByPrice(p) && filterByRating(p));

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0; // default popularity
  });

  // Pagination Logic
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedProducts.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="container mx-auto px-4 lg:px-8 py-8 md:py-12 animate-fade-in font-sans">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-gray-900 uppercase tracking-tight">
            {searchQuery ? `Search results for "${searchQuery}"` : 
             category ? `${category} Collection` : 'All Products'}
          </h1>
          <p className="text-sm text-gray-500 mt-1 font-semibold">{filteredProducts.length} Products found</p>
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2 rounded text-sm font-bold transition-all shrink-0 border ${
              showFilters || selectedPriceRanges.length > 0 || selectedRatings.length > 0 
              ? 'bg-primary text-white border-primary' 
              : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
            }`}
          >
            <Filter size={16} /> FILTERS
          </button>
          
          <div className="relative shrink-0">
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-white border border-gray-200 px-4 py-3 pr-10 rounded-md text-sm font-black text-gray-800 hover:border-primary transition-all outline-none cursor-pointer"
            >
              <option value="popularity">POPULARITY</option>
              <option value="price-low">PRICE: LOW TO HIGH</option>
              <option value="price-high">PRICE: HIGH TO LOW</option>
              <option value="rating">CUSTOMER RATING</option>
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className={`${showFilters ? 'block' : 'hidden'} lg:block lg:w-1/4 space-y-8 animate-fade-in`}>
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm sticky top-24">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-black text-sm uppercase tracking-widest text-gray-900 font-sans">Filters</h2>
              {(selectedPriceRanges.length > 0 || selectedRatings.length > 0) && (
                <button 
                  onClick={clearAllFilters}
                  className="text-[10px] font-black text-primary hover:underline border border-primary px-2 py-1 rounded"
                >
                  CLEAR ALL
                </button>
              )}
            </div>

            <div className="border-b border-gray-100 pb-6 mb-6">
              <h4 className="font-black text-gray-800 mb-4 text-[11px] uppercase tracking-widest">Price Range</h4>
              <div className="space-y-4">
                {['Under ₹500', '₹500 - ₹1000', '₹1000 - ₹5000', 'Over ₹5000'].map(range => (
                  <label key={range} className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      checked={selectedPriceRanges.includes(range)}
                      onChange={() => handlePriceChange(range)}
                      className="w-4 h-4 rounded-sm border-gray-300 text-primary focus:ring-primary accent-primary" 
                    />
                    <span className={`text-sm font-bold transition-colors ${selectedPriceRanges.includes(range) ? 'text-primary' : 'text-gray-600 group-hover:text-primary'}`}>{range}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="pb-2">
              <h4 className="font-black text-gray-800 mb-4 text-[11px] uppercase tracking-widest">Customer Rating</h4>
              <div className="space-y-4">
                {[4, 3, 2].map(star => (
                  <label key={star} className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      checked={selectedRatings.includes(star)}
                      onChange={() => handleRatingChange(star)}
                      className="w-4 h-4 rounded-sm border-gray-300 text-primary focus:ring-primary accent-primary" 
                    />
                    <span className={`text-sm font-bold transition-colors ${selectedRatings.includes(star) ? 'text-primary' : 'text-gray-600 group-hover:text-primary'}`}>{star}★ & above</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-grow">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 md:gap-8">
            {loading ? (
              [...Array(6)].map((_, i) => <SkeletonLoading key={i} type="product" />)
            ) : currentItems.length > 0 ? (
              currentItems.map(product => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="col-span-full py-24 text-center bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                <div className="max-w-xs mx-auto">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <X className="w-10 h-10 text-gray-300" />
                  </div>
                  <p className="text-xl text-gray-800 font-black mb-2 uppercase tracking-tight">Oops! No items found</p>
                  <p className="text-sm text-gray-500 mb-8 font-medium">Try adjusting your filters or search terms to find what you're looking for.</p>
                  <button 
                    onClick={clearAllFilters}
                    className="bg-primary text-white px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest hover:shadow-lg transition-all"
                  >
                    Clear All Filters
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Pagination Placeholder */}
          {/* Pagination */}
          {!loading && totalPages > 1 && (
            <div className="mt-20 flex justify-center items-center gap-3">
              {[...Array(totalPages)].map((_, i) => (
                <button 
                  key={i + 1}
                  onClick={() => handlePageChange(i + 1)}
                  className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-sm transition-all ${
                    currentPage === i + 1 
                    ? 'bg-primary text-white shadow-lg shadow-pink-100' 
                    : 'border border-gray-100 hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
