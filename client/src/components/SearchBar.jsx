import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ mobile = false, onClose }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/products?search=${encodeURIComponent(query)}`);
      if (onClose) onClose();
    }
  };

  return (
    <form 
      onSubmit={handleSearch}
      className={`${mobile ? 'flex w-full' : 'hidden md:flex'} relative items-center flex-1 max-w-md mx-4`}
    >
      <input
        type="text"
        placeholder="Search for products, brands and more"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full bg-gray-100 border-none rounded-md py-2 px-4 pl-10 focus:ring-2 focus:ring-primary focus:bg-white transition-all outline-none text-sm"
      />
      <Search className="absolute left-3 text-gray-400 w-4 h-4" />
      {mobile && (
        <button type="button" onClick={onClose} className="ml-2 p-2">
          <X className="w-5 h-5 text-gray-500" />
        </button>
      )}
    </form>
  );
};

export default SearchBar;
