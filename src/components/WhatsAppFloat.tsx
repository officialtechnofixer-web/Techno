import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

const WhatsAppFloat = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleWhatsAppClick = () => {
    const phoneNumber = "919265627252";
    const message = "Hi! I'm interested in Techno Fixer's IT services. Can you help me?";
    const webUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    const appUrl = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

    const win = window.open(webUrl, '_blank');
    if (!win) {
      window.location.href = appUrl;
      setTimeout(() => {
        if (document.visibilityState === 'visible') {
          window.location.href = webUrl;
        }
      }, 400);
    }
  };

  const handleExpandClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isExpanded && (
        <div className="mb-4 bg-white rounded-2xl shadow-2xl border border-gray-200 p-4 min-w-[280px]">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-bold text-gray-800">Quick Contact</h3>
            <button
              onClick={handleExpandClick}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="space-y-3">
            <button
              onClick={handleWhatsAppClick}
              className="w-full bg-green-500 hover:bg-green-600 text-white p-3 rounded-xl flex items-center space-x-3 transition-all duration-200 transform hover:scale-105"
            >
              <MessageCircle className="h-5 w-5" />
              <span className="font-semibold">Chat on WhatsApp</span>
            </button>
            
            <button
              onClick={() => {
                navigator.clipboard.writeText('+91 9265627252').then(() => {
                  console.log('Phone number copied to clipboard');
                  window.location.href = 'tel:+919265627252';
                }).catch(err => {
                  console.error('Failed to copy phone number:', err);
                  window.location.href = 'tel:+919265627252';
                });
              }}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-xl flex items-center space-x-3 transition-all duration-200 transform hover:scale-105"
            >
              <div className="h-5 w-5 bg-white rounded-full flex items-center justify-center">
                <span className="text-blue-500 text-xs font-bold">📞</span>
              </div>
              <span className="font-semibold">Call Now</span>
            </button>
            
            <div className="bg-red-50 border border-red-200 rounded-xl p-3">
              <p className="text-red-800 text-sm font-medium text-center">
                🚨 Emergency Support Available 24/7
              </p>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={handleExpandClick}
        className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 border-2 border-white"
        aria-label="Quick contact options"
      >
        {isExpanded ? (
          <X className="h-8 w-8" />
        ) : (
          <MessageCircle className="h-8 w-8" />
        )}
      </button>
      
      <div className="pointer-events-none absolute inset-0 bg-green-400 rounded-full animate-ping opacity-20 -z-10"></div>
    </div>
  );
};

export default WhatsAppFloat;