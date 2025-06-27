'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/contexts/LanguageContext'
import {
  Coffee,
  Store,
  BarChart2,
  Users,
  DollarSign,
  Clock,
  Smile,
  TrendingUp,
  CheckCircle,
} from 'lucide-react'

export default function Home() {
  const { language } = useLanguage()

  const translations = {
    vi: {
      hero: {
        title: "Quản lý menu quán cà phê dễ dàng",
        subtitle: "Tối ưu lợi nhuận, tiết kiệm thời gian",
        description: "Giải pháp đơn giản, thân thiện giúp chủ quán cà phê nhỏ và vừa kiểm soát chi phí, định giá món và phát triển kinh doanh.",
        ctaPrimary: "Bắt đầu miễn phí",
        ctaSecondary: "Xem demo",
      },
      features: {
        title: "Tính năng nổi bật cho quán cà phê của bạn",
        items: [
          {
            icon: <Coffee className="w-6 h-6 sm:w-8 sm:h-8 text-[#6F4E37] mx-auto" />,
            title: "Định giá món tự động",
            description: "Tính giá bán hợp lý dựa trên chi phí nguyên liệu và lợi nhuận mong muốn.",
          },
          {
            icon: <BarChart2 className="w-6 h-6 sm:w-8 sm:h-8 text-[#A3B18A] mx-auto" />,
            title: "Phân tích lợi nhuận",
            description: "Xem báo cáo lãi/lỗ từng món, từng ngày, từng tháng dễ hiểu.",
          },
          {
            icon: <Store className="w-6 h-6 sm:w-8 sm:h-8 text-[#FFB347] mx-auto" />,
            title: "Quản lý nguyên liệu",
            description: "Theo dõi tồn kho, cảnh báo khi sắp hết, kiểm soát chi phí hiệu quả.",
          },
          {
            icon: <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-[#6F4E37] mx-auto" />,
            title: "Tiết kiệm thời gian",
            description: "Giao diện đơn giản, thao tác nhanh, phù hợp cho chủ quán bận rộn.",
          },
          {
            icon: <Smile className="w-6 h-6 sm:w-8 sm:h-8 text-[#A3B18A] mx-auto" />,
            title: "Dễ sử dụng",
            description: "Không cần kiến thức kế toán, ai cũng dùng được.",
          },
          {
            icon: <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-[#FFB347] mx-auto" />,
            title: "Hỗ trợ phát triển",
            description: "Gợi ý món bán chạy, tối ưu menu để tăng doanh thu.",
          },
        ],
      },
      stats: {
        title: "Được tin tưởng bởi cộng đồng cà phê",
        items: [
          { icon: <Users className="w-5 h-5 sm:w-7 sm:h-7 text-[#6F4E37] mx-auto" />, value: "1,200+", label: "Chủ quán sử dụng" },
          { icon: <CheckCircle className="w-5 h-5 sm:w-7 sm:h-7 text-[#A3B18A] mx-auto" />, value: "98%", label: "Hài lòng & giới thiệu" },
          { icon: <DollarSign className="w-5 h-5 sm:w-7 sm:h-7 text-[#FFB347] mx-auto" />, value: "20%+", label: "Tăng lợi nhuận trung bình" },
        ],
      },
      cta: {
        title: "Sẵn sàng phát triển quán cà phê của bạn?",
        description: "Đăng ký miễn phí, trải nghiệm ngay giải pháp quản lý menu hiện đại, thân thiện cho chủ quán nhỏ và vừa.",
        primary: "Dùng thử miễn phí",
        secondary: "Liên hệ tư vấn",
        trust: "Không cần thẻ tín dụng • Hỗ trợ tiếng Việt • Hủy bất cứ lúc nào",
      },
    },
    en: {
      hero: {
        title: "Easy menu management for your coffee shop",
        subtitle: "Boost profits, save time",
        description: "A simple, friendly solution for small/medium coffee shop owners to control costs, price items, and grow their business.",
        ctaPrimary: "Get started free",
        ctaSecondary: "Watch demo",
      },
      features: {
        title: "Key features for your coffee shop",
        items: [
          {
            icon: <Coffee className="w-6 h-6 sm:w-8 sm:h-8 text-[#6F4E37] mx-auto" />,
            title: "Automatic menu pricing",
            description: "Set smart prices based on ingredient costs and desired profit.",
          },
          {
            icon: <BarChart2 className="w-6 h-6 sm:w-8 sm:h-8 text-[#A3B18A] mx-auto" />,
            title: "Profit analytics",
            description: "See clear profit/loss reports by item, day, or month.",
          },
          {
            icon: <Store className="w-6 h-6 sm:w-8 sm:h-8 text-[#FFB347] mx-auto" />,
            title: "Ingredient management",
            description: "Track inventory, get low-stock alerts, and control costs easily.",
          },
          {
            icon: <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-[#6F4E37] mx-auto" />,
            title: "Save time",
            description: "Simple interface, fast actions, perfect for busy owners.",
          },
          {
            icon: <Smile className="w-6 h-6 sm:w-8 sm:h-8 text-[#A3B18A] mx-auto" />,
            title: "Easy to use",
            description: "No accounting knowledge needed, anyone can use it.",
          },
          {
            icon: <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-[#FFB347] mx-auto" />,
            title: "Growth support",
            description: "Get best-seller suggestions, optimize your menu for more sales.",
          },
        ],
      },
      stats: {
        title: "Trusted by the coffee community",
        items: [
          { icon: <Users className="w-5 h-5 sm:w-7 sm:h-7 text-[#6F4E37] mx-auto" />, value: "1,200+", label: "Owners use it" },
          { icon: <CheckCircle className="w-5 h-5 sm:w-7 sm:h-7 text-[#A3B18A] mx-auto" />, value: "98%", label: "Satisfied & recommend" },
          { icon: <DollarSign className="w-5 h-5 sm:w-7 sm:h-7 text-[#FFB347] mx-auto" />, value: "20%+", label: "Avg. profit increase" },
        ],
      },
      cta: {
        title: "Ready to grow your coffee shop?",
        description: "Sign up free and experience a modern, friendly menu management solution for small/medium shop owners.",
        primary: "Start free trial",
        secondary: "Contact sales",
        trust: "No credit card • Vietnamese support • Cancel anytime",
      },
    }
  }

  const t = translations[language]

  return (
    <div className="min-h-screen font-sans relative">
      {/* Background image with sepia overlay */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1500&q=80"
          alt="Cozy coffee shop background"
          fill
          className="object-cover object-center"
          style={{ filter: "sepia(0.25) brightness(0.85)" }}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#F5E9DA]/80 via-[#F5E9DA]/60 to-[#6F4E37]/60" />
      </div>

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 md:pt-24 pb-12 sm:pb-16 text-center">
        <div className="flex flex-col items-center gap-3 sm:gap-4">
          <Coffee className="w-12 h-12 sm:w-16 sm:h-16 text-[#6F4E37] drop-shadow-lg" />
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#6F4E37] drop-shadow-sm mb-1 sm:mb-2 leading-tight">
            {t.hero.title}
          </h1>
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#ff0347] mb-3 sm:mb-4">
            {t.hero.subtitle}
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-[#4B3A2F] mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
            {t.hero.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center w-full sm:w-auto">
            <Link
              href="/dashboard"
              className="bg-gradient-to-r from-[#A3B18A] to-[#6F4E37] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg shadow-md hover:scale-105 transition-all duration-200 text-center"
            >
              {t.hero.ctaPrimary}
            </Link>
            <Link
              href="/demo"
              className="border-2 border-[#6F4E37] text-[#6F4E37] px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-[#6F4E37] hover:text-white transition-all duration-200 text-center"
            >
              {t.hero.ctaSecondary}
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          <div className="md:col-span-2 lg:col-span-3 mb-6 sm:mb-8 text-center">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#6F4E37] mb-2">
              {t.features.title}
            </h2>
          </div>
          {t.features.items.map((feature, idx) => (
            <div
              key={idx}
              className="bg-white/80 rounded-xl shadow p-4 sm:p-6 flex flex-col items-center text-center border border-[#E6D3C5] hover:shadow-lg transition-all"
            >
              {feature.icon}
              <h3 className="mt-3 sm:mt-4 text-base sm:text-lg font-semibold text-[#6F4E37]">{feature.title}</h3>
              <p className="text-[#4B3A2F] mt-2 text-sm sm:text-base leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="bg-white/90 rounded-2xl shadow-lg p-6 sm:p-8 border border-[#E6D3C5]">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
            <div className="flex-1 text-center lg:text-left mb-6 lg:mb-0">
              <h3 className="text-lg sm:text-xl font-bold text-[#6F4E37] mb-2">
                {t.stats.title}
              </h3>
            </div>
            <div className="flex-1 flex flex-col sm:flex-row justify-center gap-6 sm:gap-8">
              {t.stats.items.map((stat, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  {stat.icon}
                  <div className="text-xl sm:text-2xl font-bold text-[#6F4E37] mt-1">{stat.value}</div>
                  <div className="text-[#4B3A2F] text-xs sm:text-sm text-center">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-center">
        <div className="bg-gradient-to-r from-[#A3B18A] to-[#6F4E37] rounded-2xl shadow-xl p-6 sm:p-8 lg:p-10">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4 leading-tight">
            {t.cta.title}
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-[#F5E9DA] mb-6 sm:mb-8 leading-relaxed">
            {t.cta.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-4">
            <Link
              href="/signup"
              className="bg-white text-[#6F4E37] px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg shadow hover:bg-[#F5E9DA] hover:text-[#A3B18A] transition-all duration-200 text-center"
            >
              {t.cta.primary}
            </Link>
            <Link
              href="/contact"
              className="border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-white hover:text-[#6F4E37] transition-all duration-200 text-center"
            >
              {t.cta.secondary}
            </Link>
          </div>
          <p className="text-[#F5E9DA] mt-2 text-xs sm:text-sm leading-relaxed">{t.cta.trust}</p>
        </div>
      </section>
    </div>
  )
}
