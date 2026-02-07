"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-linear-to-r from-slate-900/95 via-indigo-900/95 to-slate-900/95 border-b border-indigo-500/20 shadow-lg shadow-indigo-900/20 transition-all duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo Section */}
          <Link 
            href="/" 
            className="group flex items-center space-x-3 transition-transform duration-300 hover:scale-105"
          >
            {/* Icon with Gradient Background */}
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute -inset-1 bg-linear-to-r from-cyan-500 via-blue-500 to-indigo-600 rounded-xl blur-lg opacity-70 group-hover:opacity-100 transition duration-500 animate-pulse"></div>
              
              {/* Icon Container */}
              <div className="relative flex items-center justify-center w-10 h-10 bg-linear-to-br from-cyan-500 via-blue-600 to-indigo-700 rounded-xl shadow-lg transform group-hover:rotate-12 transition-transform duration-300">
                <Sparkles className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
            </div>

            {/* Brand Name */}
            <div className="flex flex-col">
              <span className="text-2xl font-black bg-linear-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent tracking-tight group-hover:tracking-wide transition-all duration-300">
                EduSlide AI
              </span>
              <span className="text-[10px] font-medium text-indigo-400 -mt-1 tracking-wider uppercase">
                Smart Learning
              </span>
            </div>
          </Link>

        </div>
      </div>

      {/* Decorative Bottom Border */}
      <div className="absolute bottom-0 left-0 right-0 h-2px bg-linear-to-r from-cyan-500 via-blue-500 to-indigo-600 opacity-60"></div>
    </nav>
  );
}
