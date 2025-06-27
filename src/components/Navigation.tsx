"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navigation() {
  const { language } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const translations = {
    vi: {
      features: "Tính Năng",
      pricing: "Giá Cả",
      demo: "Demo",
      contact: "Liên Hệ",
      login: "Đăng Nhập",
      signup: "Bắt Đầu",
    },
    en: {
      features: "Features",
      pricing: "Pricing",
      demo: "Demo",
      contact: "Contact",
      login: "Login",
      signup: "Get Started",
    },
  };

  const t = translations[language];

  return (
    <nav className="bg-white/95 backdrop-blur-sm shadow-sm border-b border-amber-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-amber-600 to-brown-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <span className="text-xl font-bold text-gray-900">MenuCalc</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/features" className="text-gray-600 hover:text-amber-600 transition-colors">
              {t.features}
            </Link>
            <Link href="/pricing" className="text-gray-600 hover:text-amber-600 transition-colors">
              {t.pricing}
            </Link>
            <Link href="/demo" className="text-gray-600 hover:text-amber-600 transition-colors">
              {t.demo}
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-amber-600 transition-colors">
              {t.contact}
            </Link>
          </div>
          
          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Switcher */}
            <LanguageSwitcher />
            
            <Link 
              href="/login" 
              className="text-gray-600 hover:text-amber-600 transition-colors"
            >
              {t.login}
            </Link>
            <Link 
              href="/signup" 
              className="bg-gradient-to-r from-[#A3B18A] to-[#6F4E37] text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              {t.signup}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <LanguageSwitcher />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-amber-600 transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white/95 backdrop-blur-sm border-t border-amber-200">
              <Link 
                href="/features" 
                className="block px-3 py-2 text-gray-600 hover:text-amber-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t.features}
              </Link>
              <Link 
                href="/pricing" 
                className="block px-3 py-2 text-gray-600 hover:text-amber-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t.pricing}
              </Link>
              <Link 
                href="/demo" 
                className="block px-3 py-2 text-gray-600 hover:text-amber-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t.demo}
              </Link>
              <Link 
                href="/contact" 
                className="block px-3 py-2 text-gray-600 hover:text-amber-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t.contact}
              </Link>
              <div className="border-t border-amber-200 pt-2 mt-2">
                <Link 
                  href="/login" 
                  className="block px-3 py-2 text-gray-600 hover:text-amber-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t.login}
                </Link>
                <Link 
                  href="/signup" 
                  className="block px-3 py-2 bg-gradient-to-r from-amber-600 to-brown-600 text-white rounded-lg font-medium mx-3 mt-2 text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t.signup}
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
} 