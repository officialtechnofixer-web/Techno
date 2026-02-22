import React from 'react';
import { Shield, Zap, Users, CheckCircle } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="relative bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-800 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-50">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]"></div>
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(99,102,241,0.1),transparent_50%)]"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-indigo-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 slide-in-left">
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                <span className="text-sm font-medium">24/7 Emergency Support Available</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight">
                Your Trusted
                <span className="block bg-gradient-to-r from-blue-300 via-cyan-300 to-indigo-300 bg-clip-text text-transparent">Technology Partner</span>
              </h1>
              <p className="text-xl text-blue-100 leading-relaxed">
                Professional hardware repair, networking, and complete IT solutions in Ahmedabad.
                From laptop repairs to enterprise cybersecurity - we've got you covered.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#contact"
                className="group bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 text-center shadow-lg hover:shadow-xl relative overflow-hidden"
              >
                <span className="relative z-10">Get Free Quote</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </a>
              <a
                href="tel:+919265627252"
                className="group bg-transparent border-2 border-blue-300 hover:bg-blue-300 hover:text-blue-900 text-blue-300 px-8 py-4 rounded-xl font-semibold text-lg transition-all text-center hover:shadow-lg relative overflow-hidden"
              >
                <span className="relative z-10">Emergency Repair</span>
                <div className="absolute inset-0 bg-blue-300/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8">
              <div className="text-center group">
                <div className="bg-gradient-to-br from-blue-500/20 to-indigo-500/20 p-4 rounded-2xl mx-auto mb-3 w-20 h-20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Shield className="h-10 w-10 text-blue-300 group-hover:text-blue-200 transition-colors" />
                </div>
                <p className="font-semibold text-blue-100 group-hover:text-white transition-colors">Certified Experts</p>
              </div>
              <div className="text-center group">
                <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 p-4 rounded-2xl mx-auto mb-3 w-20 h-20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Zap className="h-10 w-10 text-cyan-300 group-hover:text-cyan-200 transition-colors" />
                </div>
                <p className="font-semibold text-cyan-100 group-hover:text-white transition-colors">Fast Service</p>
              </div>
              <div className="text-center group">
                <div className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 p-4 rounded-2xl mx-auto mb-3 w-20 h-20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-10 w-10 text-indigo-300 group-hover:text-indigo-200 transition-colors" />
                </div>
                <p className="font-semibold text-indigo-100 group-hover:text-white transition-colors">24/7 Support</p>
              </div>
            </div>
          </div>

          <div className="relative slide-in-right">
            <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/20 shadow-2xl relative overflow-hidden">
              {/* Shimmer Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 -translate-x-full animate-[shimmer_3s_ease-in-out_infinite]"></div>

              <h3 className="text-2xl font-bold mb-6 text-white">Why Choose Techno Fixer?</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 group">
                  <div className="bg-green-500/20 p-2 rounded-lg group-hover:bg-green-500/30 transition-colors">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  </div>
                  <span className="text-blue-100 group-hover:text-white transition-colors">Complete IT solutions under one roof</span>
                </div>
                <div className="flex items-center space-x-3 group">
                  <div className="bg-green-500/20 p-2 rounded-lg group-hover:bg-green-500/30 transition-colors">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  </div>
                  <span className="text-blue-100 group-hover:text-white transition-colors">Experienced team with latest certifications</span>
                </div>
                <div className="flex items-center space-x-3 group">
                  <div className="bg-green-500/20 p-2 rounded-lg group-hover:bg-green-500/30 transition-colors">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  </div>
                  <span className="text-blue-100 group-hover:text-white transition-colors">Competitive pricing with quality guarantee</span>
                </div>
                <div className="flex items-center space-x-3 group">
                  <div className="bg-green-500/20 p-2 rounded-lg group-hover:bg-green-500/30 transition-colors">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  </div>
                  <span className="text-blue-100 group-hover:text-white transition-colors">Same-day service for most repairs</span>
                </div>
              </div>

              <div className="mt-8 p-6 bg-gradient-to-r from-blue-600/40 to-indigo-600/40 rounded-2xl border border-blue-400/30 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 animate-pulse"></div>
                <div className="relative z-10">
                  <p className="font-semibold text-center text-blue-100 mb-2">🚨 Emergency Hotline</p>
                  <p className="text-2xl font-bold text-center text-white">+91 9265627252</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;