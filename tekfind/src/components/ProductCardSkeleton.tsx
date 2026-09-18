import React from 'react';

export const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs flex flex-col overflow-hidden animate-pulse">
      {/* Skeleton Image with subtle shimmer */}
      <div className="aspect-4/3 sm:aspect-1/1 shimmer-bg w-full" />
      
      {/* Skeleton Body */}
      <div className="p-4 flex-1 flex flex-col justify-between gap-3">
        {/* Category & Date */}
        <div className="flex items-center justify-between">
          <div className="h-4 w-16 bg-yellow-100 rounded-md" />
          <div className="h-3 w-14 bg-slate-100 rounded" />
        </div>

        {/* Title */}
        <div className="space-y-2">
          <div className="h-4 w-5/6 bg-slate-200 rounded" />
          <div className="h-3 w-3/4 bg-slate-100 rounded" />
        </div>

        {/* Price */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
          <div className="h-6 w-24 bg-slate-200 rounded" />
          <div className="h-3 w-12 bg-slate-100 rounded" />
        </div>

        {/* Shop Info Box */}
        <div className="bg-slate-50 rounded-xl p-2.5 space-y-2 border border-slate-100">
          <div className="h-3.5 w-1/2 bg-slate-200 rounded" />
          <div className="h-3 w-2/3 bg-slate-100 rounded" />
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-5 gap-2 pt-1">
          <div className="col-span-2 h-9 bg-slate-100 rounded-xl" />
          <div className="col-span-3 h-9 bg-yellow-200/70 rounded-xl" />
        </div>
      </div>
    </div>
  );
};
