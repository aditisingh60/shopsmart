import React from 'react';
import { Link } from 'react-router-dom';

const CategoryCard = ({ category }) => {
  return (
    <Link 
      to={`/products?category=${category.name.toLowerCase()}`}
      className="group flex flex-col items-center gap-3"
    >
      <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-transparent group-hover:border-primary transition-all p-1 shadow-sm">
        <img 
          src={category.image} 
          alt={category.name}
          className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      <span className="text-xs md:text-sm font-bold text-gray-700 group-hover:text-primary transition-colors tracking-wide uppercase">
        {category.name}
      </span>
    </Link>
  );
};

export default CategoryCard;
