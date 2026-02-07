"use client";

import Link from "next/link";
import { Sparkles, User, LogOut } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const name = localStorage.getItem("userName");
    setIsLoggedIn(!!token);
    setUserName(name || "User");
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    setIsLoggedIn(false);
    router.push("/");
  };

  // Public navigation links (for non-logged-in users)
  const publicNavLinks = [
    { href: "/", label: "Home" },
    { href: "/templates", label: "Templates" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  // Authenticated navigation links (for logged-in users)
  const authNavLinks = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/templates", label: "Templates" },
    { href: "/upload", label: "Create" },
    { href: "/dashboard/presentations", label: "Presentations" },
  ];

  const navLinks = isLoggedIn ? authNavLinks : publicNavLinks;

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo Section */}
          <Link 
            href="/" 
            className="flex items-center space-x-3 transition-opacity duration-200 hover:opacity-80"
          >
            {/* Icon */}
            <div className="flex items-center justify-center w-10 h-10 bg-indigo-600 rounded-lg shadow-md">
              <Sparkles className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>

            {/* Brand Name */}
            <div className="flex flex-col">
              <span className="text-xl font-bold text-slate-800 tracking-tight">
                EduSlide AI
              </span>
              <span className="text-[10px] font-medium text-indigo-600 -mt-1 tracking-wider uppercase">
                Smart Learning
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  pathname === link.href
                    ? "text-indigo-600 bg-indigo-50"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            {/* Show Login/Signup for non-logged-in users */}
            {!isLoggedIn && (
              <>
                <Link
                  href="/login"
                  className="ml-4 px-6 py-2 rounded-lg border-2 border-indigo-600 text-indigo-600 font-semibold hover:bg-indigo-50 transition-all duration-200"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="px-6 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-all duration-200"
                >
                  Sign Up
                </Link>
              </>
            )}

            {/* Show Profile/Logout for logged-in users */}
            {isLoggedIn && (
              <>
                <Link
                  href="/dashboard/profile"
                  className="ml-4 flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-indigo-600 text-indigo-600 font-semibold hover:bg-indigo-50 transition-all duration-200"
                >
                  <User className="w-4 h-4" />
                  {userName}
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-6 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition-all duration-200"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            {!isLoggedIn ? (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 rounded-lg border border-indigo-600 text-indigo-600 font-semibold text-sm hover:bg-indigo-50 transition-all duration-200"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-700 transition-all duration-200"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/dashboard/profile"
                  className="p-2 rounded-lg border border-indigo-600 text-indigo-600 hover:bg-indigo-50 transition-all duration-200"
                >
                  <User className="w-5 h-5" />
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-all duration-200"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
