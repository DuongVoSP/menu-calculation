import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { LanguageProvider } from "@/contexts/LanguageContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MenuCalc - Tối Ưu Menu Quán Cà Phê Thông Minh",
  description: "Tối ưu hóa hoạt động quán cà phê với công cụ tính giá menu thông minh, phân tích chi phí và tối ưu lợi nhuận.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LanguageProvider>
          {/* Navigation Header */}
          <nav className="bg-white/95 backdrop-blur-sm shadow-sm border-b border-amber-200 sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
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
                
                <div className="hidden md:flex items-center space-x-8">
                  <Link href="/features" className="text-gray-600 hover:text-amber-600 transition-colors">
                    Tính Năng
                  </Link>
                  <Link href="/pricing" className="text-gray-600 hover:text-amber-600 transition-colors">
                    Giá Cả
                  </Link>
                  <Link href="/demo" className="text-gray-600 hover:text-amber-600 transition-colors">
                    Demo
                  </Link>
                  <Link href="/contact" className="text-gray-600 hover:text-amber-600 transition-colors">
                    Liên Hệ
                  </Link>
                </div>
                
                <div className="flex items-center space-x-4">
                  {/* Language Switcher */}
                  <LanguageSwitcher />
                  
                  <Link 
                    href="/login" 
                    className="text-gray-600 hover:text-amber-600 transition-colors"
                  >
                    Đăng Nhập
                  </Link>
                  <Link 
                    href="/signup" 
                    className="bg-gradient-to-r from-amber-600 to-brown-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                  >
                    Bắt Đầu
                  </Link>
                </div>
              </div>
            </div>
          </nav>
          
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
