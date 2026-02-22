import React from 'react';
import { Wrench, Phone, Mail, MapPin, Linkedin, Instagram, Facebook } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Wrench className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">Techno Fixer</h3>
                <p className="text-gray-400">IT Solutions & Repair Services</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Your trusted technology partner in Ahmedabad. From quick repairs to enterprise IT solutions,
              we deliver reliable, secure, and innovative technology support.
            </p>
            <div className="space-y-3">
              {/* Primary Contact */}
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-400" />
                <div>
                  <span className="text-white font-medium">+91 9265627252</span>
                  <p className="text-xs text-gray-400">Primary Contact</p>
                </div>
              </div>

              {/* Secondary Contact */}
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-green-400" />
                <div>
                  <span className="text-white font-medium">+91 9998258249</span>
                  <p className="text-xs text-gray-400">Secondary Contact</p>
                </div>
              </div>

              {/* Additional Contact */}
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-purple-400" />
                <div>
                  <span className="text-white font-medium">+91 8780424706</span>
                  <p className="text-xs text-gray-400">Additional Contact</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-400" />
                <span>officialtechnofixer@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-blue-400" />
                <span>Ahmedabad, Gujarat, India</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-lg mb-4">Our Services</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#services" className="hover:text-blue-400 transition-colors">Laptop Repair</a></li>
              <li><a href="#services" className="hover:text-blue-400 transition-colors">Computer Repair</a></li>
              <li><a href="#services" className="hover:text-blue-400 transition-colors">Network Setup</a></li>
              <li><a href="#services" className="hover:text-blue-400 transition-colors">Custom PC Build</a></li>
              <li><a href="#services" className="hover:text-blue-400 transition-colors">IT Consulting</a></li>
              <li><a href="#services" className="hover:text-blue-400 transition-colors">Cybersecurity</a></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#home" className="hover:text-blue-400 transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-blue-400 transition-colors">About Us</a></li>
              <li><a href="#services" className="hover:text-blue-400 transition-colors">Services</a></li>
              <li><a href="#contact" className="hover:text-blue-400 transition-colors">Contact</a></li>
            </ul>

            <div className="mt-6">
              <h5 className="font-semibold mb-3">Follow Us</h5>
              <div className="flex space-x-3">
                <a
                  href="https://www.linkedin.com/company/techno-fixer/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800 hover:bg-blue-600 p-2 rounded-lg transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="https://www.instagram.com/techno.fixer/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800 hover:bg-pink-600 p-2 rounded-lg transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="https://www.facebook.com/share/1772gXYzaV/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800 hover:bg-blue-700 p-2 rounded-lg transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 Techno_Fixer. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">Support</a>
            </div>
          </div>

          {/* Made by Techno Fixer */}
          <div className="text-center mt-6 pt-6 border-t border-gray-800">
            <p className="text-gray-500 text-sm">
              Made by{' '}
              <a
                href="https://www.linkedin.com/in/techno-fixer-20565b3b2/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 font-medium transition-colors hover:underline"
              >
                Techno Fixer
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;