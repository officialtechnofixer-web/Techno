import React from 'react';
import { Target, Eye, Award, MapPin } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-20 bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-slate-900 dark:to-black transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 slide-in-top">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">About Techno Fixer</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Professional hardware, networking, and IT solutions provider based in Ahmedabad, Gujarat.
            We deliver reliable, secure, and innovative technology support for individuals and businesses.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div className="group bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg slide-in-left hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 cursor-pointer relative overflow-hidden">
            {/* Hover Background Overlay - Dark Theme like Advanced Solutions */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

            {/* Shimmer Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

            {/* Content Container */}
            <div className="relative z-10">
              <div className="flex items-center mb-6">
                <div className="bg-blue-100 p-3 rounded-lg mr-4 group-hover:bg-blue-200 transition-all duration-300">
                  <Eye className="h-8 w-8 text-blue-600 group-hover:text-blue-700" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-white transition-colors duration-500">Our Vision</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed group-hover:text-gray-200 transition-colors duration-500">
                To become India's most trusted and innovative technology partner, delivering complete IT solutions
                that enhance performance, security, and growth for both individuals and businesses.
              </p>

              {/* Hover Indicator */}
              <div className="absolute top-4 right-4 w-3 h-3 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-150 group-hover:bg-green-400"></div>
            </div>

            {/* Border Glow Effect */}
            <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-400/50 transition-all duration-500"></div>
          </div>

          <div className="group bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg slide-in-right hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 cursor-pointer relative overflow-hidden">
            {/* Hover Background Overlay - Dark Theme like Advanced Solutions */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

            {/* Shimmer Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

            {/* Content Container */}
            <div className="relative z-10">
              <div className="flex items-center mb-6">
                <div className="bg-green-100 p-3 rounded-lg mr-4 group-hover:bg-green-200 transition-all duration-300">
                  <Target className="h-8 w-8 text-green-600 group-hover:text-green-700" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-white transition-colors duration-500">Our Mission</h3>
              </div>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li className="flex items-start space-x-2 group-hover:text-gray-200 transition-colors duration-500">
                  <span className="text-green-500 mt-1 group-hover:text-green-400">•</span>
                  <span>Deliver fast, reliable, and cost-effective repair services</span>
                </li>
                <li className="flex items-start space-x-2 group-hover:text-gray-200 transition-colors duration-500">
                  <span className="text-green-500 mt-1 group-hover:text-green-400">•</span>
                  <span>Provide custom-built, high-performance systems</span>
                </li>
                <li className="flex items-start space-x-2 group-hover:text-gray-200 transition-colors duration-500">
                  <span className="text-green-500 mt-1 group-hover:text-green-400">•</span>
                  <span>Build scalable networks, hosting, and cloud solutions</span>
                </li>
                <li className="flex items-start space-x-2 group-hover:text-gray-200 transition-colors duration-500">
                  <span className="text-green-500 mt-1 group-hover:text-green-400">•</span>
                  <span>Empower businesses with IT support and security</span>
                </li>
              </ul>

              {/* Hover Indicator */}
              <div className="absolute top-4 right-4 w-3 h-3 bg-green-500 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-150 group-hover:bg-green-400"></div>
            </div>

            {/* Border Glow Effect */}
            <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-green-400/50 transition-all duration-500"></div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="group text-center bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg slide-in-bottom hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 cursor-pointer relative overflow-hidden">
            {/* Hover Background Overlay - Dark Theme like Advanced Solutions */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

            {/* Shimmer Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

            {/* Content Container */}
            <div className="relative z-10">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-all duration-300">
                <Award className="h-8 w-8 text-blue-600 group-hover:text-blue-700" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-white transition-colors duration-500">Certified Experts</h3>
              <p className="text-gray-600 dark:text-gray-300 group-hover:text-gray-200 transition-colors duration-500">
                Our team holds industry certifications and stays updated with the latest technologies
              </p>

              {/* Hover Indicator */}
              <div className="absolute top-4 right-4 w-3 h-3 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-150 group-hover:bg-green-400"></div>
            </div>

            {/* Border Glow Effect */}
            <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-400/50 transition-all duration-500"></div>
          </div>

          <div className="group text-center bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg slide-in-bottom hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 cursor-pointer relative overflow-hidden">
            {/* Hover Background Overlay - Dark Theme like Advanced Solutions */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

            {/* Shimmer Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

            {/* Content Container */}
            <div className="relative z-10">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-all duration-300">
                <MapPin className="h-8 w-8 text-green-600 group-hover:text-green-700" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-white transition-colors duration-500">Local Presence</h3>
              <p className="text-gray-600 dark:text-gray-300 group-hover:text-gray-200 transition-colors duration-500">
                Based in Ahmedabad, Gujarat, serving clients across India with personalized service
              </p>

              {/* Hover Indicator */}
              <div className="absolute top-4 right-4 w-3 h-3 bg-green-500 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-150 group-hover:bg-green-400"></div>
            </div>

            {/* Border Glow Effect */}
            <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-green-400/50 transition-all duration-500"></div>
          </div>

          <div className="group text-center bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg slide-in-bottom hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 cursor-pointer relative overflow-hidden">
            {/* Hover Background Overlay - Dark Theme like Advanced Solutions */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

            {/* Shimmer Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

            {/* Content Container */}
            <div className="relative z-10">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-all duration-300">
                <Target className="h-8 w-8 text-purple-600 group-hover:text-purple-700" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-white transition-colors duration-500">Complete Solutions</h3>
              <p className="text-gray-600 dark:text-gray-300 group-hover:text-gray-200 transition-colors duration-500">
                From repairs to enterprise IT infrastructure - your one-stop technology partner
              </p>

              {/* Hover Indicator */}
              <div className="absolute top-4 right-4 w-3 h-3 bg-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-150 group-hover:bg-green-400"></div>
            </div>

            {/* Border Glow Effect */}
            <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-purple-400/50 transition-all duration-500"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;