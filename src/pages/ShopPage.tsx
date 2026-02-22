import React from 'react';
import { ShoppingBag, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const ShopPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 flex items-center justify-center p-4">
      <div className="text-center max-w-md mx-auto">
        <div className="mb-8 flex justify-center">
          <div className="bg-blue-100 dark:bg-blue-900/30 p-6 rounded-full animate-bounce">
            <ShoppingBag className="w-16 h-16 text-blue-600 dark:text-blue-400" />
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Coming Soon
        </h1>

        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          We are working hard to build an amazing shopping experience for you. Stay tuned for updates!
        </p>

        <Link
          to="/"
          className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full transition-colors duration-300"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </div>
    </div>
  );
};

export default ShopPage;