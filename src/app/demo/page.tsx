"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";
import { Play, ArrowRight, Coffee, BarChart2, Store, Clock } from "lucide-react";

export default function DemoPage() {
  const { language } = useLanguage();

  const translations = {
    vi: {
      hero: {
        title: "Xem MenuCalc hoạt động",
        subtitle: "Trải nghiệm trực tiếp cách quản lý menu hiệu quả",
        description: "Xem demo ngắn để hiểu cách MenuCalc giúp quán cà phê của bạn tối ưu lợi nhuận và tiết kiệm thời gian.",
      },
      demo: {
        title: "Demo tương tác",
        description: "Khám phá các tính năng chính của MenuCalc",
        videoPlaceholder: "Video demo sẽ được hiển thị ở đây",
        features: [
          {
            icon: <Coffee className="w-6 h-6 text-[#6F4E37]" />,
            title: "Tạo menu mới",
            description: "Thêm món, định giá, quản lý công thức",
          },
          {
            icon: <BarChart2 className="w-6 h-6 text-[#A3B18A]" />,
            title: "Phân tích lợi nhuận",
            description: "Xem báo cáo chi tiết và biểu đồ",
          },
          {
            icon: <Store className="w-6 h-6 text-[#FFB347]" />,
            title: "Quản lý kho",
            description: "Theo dõi nguyên liệu và cảnh báo",
          },
          {
            icon: <Clock className="w-6 h-6 text-[#6F4E37]" />,
            title: "Tiết kiệm thời gian",
            description: "Giao diện nhanh và dễ sử dụng",
          },
        ],
      },
      cta: {
        title: "Sẵn sàng bắt đầu?",
        description: "Đăng ký miễn phí và trải nghiệm đầy đủ MenuCalc",
        primary: "Dùng thử miễn phí",
        secondary: "Liên hệ tư vấn",
      },
    },
    en: {
      hero: {
        title: "See MenuCalc in action",
        subtitle: "Experience firsthand how to manage your menu effectively",
        description: "Watch a short demo to understand how MenuCalc helps your coffee shop optimize profits and save time.",
      },
      demo: {
        title: "Interactive Demo",
        description: "Explore MenuCalc's key features",
        videoPlaceholder: "Demo video will be displayed here",
        features: [
          {
            icon: <Coffee className="w-6 h-6 text-[#6F4E37]" />,
            title: "Create new menu",
            description: "Add items, set prices, manage recipes",
          },
          {
            icon: <BarChart2 className="w-6 h-6 text-[#A3B18A]" />,
            title: "Profit analytics",
            description: "View detailed reports and charts",
          },
          {
            icon: <Store className="w-6 h-6 text-[#FFB347]" />,
            title: "Inventory management",
            description: "Track ingredients and get alerts",
          },
          {
            icon: <Clock className="w-6 h-6 text-[#6F4E37]" />,
            title: "Time saving",
            description: "Fast and user-friendly interface",
          },
        ],
      },
      cta: {
        title: "Ready to get started?",
        description: "Sign up for free and experience MenuCalc fully",
        primary: "Start free trial",
        secondary: "Contact sales",
      },
    },
  };

  const t = translations[language];

  return (
    <div className="min-h-screen bg-[#F5E9DA]">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-12 sm:pb-16">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#6F4E37] mb-4">
            {t.hero.title}
          </h1>
          <h2 className="text-xl sm:text-2xl font-semibold text-[#ff0347] mb-4">
            {t.hero.subtitle}
          </h2>
          <p className="text-lg text-[#4B3A2F] max-w-3xl mx-auto">
            {t.hero.description}
          </p>
        </div>
      </section>

      {/* Demo Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Video Demo */}
          <div className="order-2 lg:order-1">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#6F4E37] mb-4">
              {t.demo.title}
            </h2>
            <p className="text-[#4B3A2F] mb-6 leading-relaxed">
              {t.demo.description}
            </p>
            
            {/* Video Placeholder */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-[#E6D3C5]">
              <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                <div className="text-center">
                  <Play className="w-16 h-16 text-[#6F4E37] mx-auto mb-4" />
                  <p className="text-[#4B3A2F] font-medium">
                    {t.demo.videoPlaceholder}
                  </p>
                </div>
              </div>
              <div className="flex justify-center">
                <button className="bg-gradient-to-r from-[#A3B18A] to-[#6F4E37] text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center">
                  <Play className="w-5 h-5 mr-2" />
                  {language === "vi" ? "Xem Demo" : "Watch Demo"}
                </button>
              </div>
            </div>
          </div>

          {/* Features List */}
          <div className="order-1 lg:order-2">
            <div className="space-y-6">
              {t.demo.features.map((feature, idx) => (
                <div key={idx} className="bg-white rounded-xl shadow-lg p-6 border border-[#E6D3C5] hover:shadow-xl transition-all">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-4">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[#6F4E37] mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-[#4B3A2F] leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Demo Steps */}
      <section className="bg-white/80 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#6F4E37] text-center mb-12">
            {language === "vi" ? "Các bước demo" : "Demo Steps"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-[#6F4E37] text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4">
                1
              </div>
              <h3 className="text-lg font-semibold text-[#6F4E37] mb-2">
                {language === "vi" ? "Đăng ký tài khoản" : "Create Account"}
              </h3>
              <p className="text-[#4B3A2F]">
                {language === "vi" 
                  ? "Tạo tài khoản miễn phí trong 30 giây" 
                  : "Create a free account in 30 seconds"
                }
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-[#A3B18A] text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4">
                2
              </div>
              <h3 className="text-lg font-semibold text-[#6F4E37] mb-2">
                {language === "vi" ? "Thêm menu" : "Add Menu"}
              </h3>
              <p className="text-[#4B3A2F]">
                {language === "vi" 
                  ? "Nhập món và nguyên liệu của bạn" 
                  : "Enter your items and ingredients"
                }
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-[#FFB347] text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4">
                3
              </div>
              <h3 className="text-lg font-semibold text-[#6F4E37] mb-2">
                {language === "vi" ? "Xem kết quả" : "See Results"}
              </h3>
              <p className="text-[#4B3A2F]">
                {language === "vi" 
                  ? "Phân tích lợi nhuận và tối ưu" 
                  : "Analyze profits and optimize"
                }
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="bg-gradient-to-r from-[#A3B18A] to-[#6F4E37] rounded-2xl shadow-xl p-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            {t.cta.title}
          </h2>
          <p className="text-[#F5E9DA] mb-8 text-lg">
            {t.cta.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup"
              className="bg-white text-[#6F4E37] px-8 py-3 rounded-lg font-semibold hover:bg-[#F5E9DA] transition-all flex items-center justify-center"
            >
              {t.cta.primary}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link
              href="/contact"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#6F4E37] transition-all"
            >
              {t.cta.secondary}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
} 