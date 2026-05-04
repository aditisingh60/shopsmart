import React from 'react';

const SkeletonLoading = ({ type = 'product' }) => {
  if (type === 'product') {
    return (
      <div className="bg-white border border-gray-100 rounded-lg overflow-hidden animate-pulse">
        <div className="aspect-[3/4] bg-gray-200" />
        <div className="p-4 space-y-3">
          <div className="h-3 bg-gray-200 rounded w-1/4" />
          <div className="h-4 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
          <div className="h-8 bg-gray-200 rounded w-full mt-2" />
        </div>
      </div>
    );
  }

  if (type === 'category') {
    return (
      <div className="flex flex-col items-center gap-3 animate-pulse">
        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gray-200" />
        <div className="h-3 bg-gray-200 rounded w-16" />
      </div>
    );
  }

  return null;
};

export default SkeletonLoading;
