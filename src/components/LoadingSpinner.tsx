import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center z-50">
      <div className="relative">
        {/* Main Spinner */}
        <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
        
        {/* Outer Ring */}
        <div className="absolute inset-0 w-20 h-20 border-2 border-indigo-500/20 rounded-full animate-pulse"></div>
        
        {/* Inner Ring */}
        <div className="absolute inset-2 w-12 h-12 border-2 border-cyan-500/30 rounded-full animate-ping"></div>
        
        {/* Loading Text */}
        <div className="mt-6 text-center">
          <p className="text-white text-lg font-semibold">Loading Techno Fixer</p>
          <div className="flex space-x-1 mt-2 justify-center">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-100"></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-200"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
