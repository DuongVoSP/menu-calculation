'use client'

import Link from 'next/link'
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
            icon: <Coffee className="w-8 h-8 text-[#6F4E37] mx-auto" />,
            title: "Định giá món tự động",
            description: "Tính giá bán hợp lý dựa trên chi phí nguyên liệu và lợi nhuận mong muốn.",
          },
          {
            icon: <BarChart2 className="w-8 h-8 text-[#A3B18A] mx-auto" />,
            title: "Phân tích lợi nhuận",
            description: "Xem báo cáo lãi/lỗ từng món, từng ngày, từng tháng dễ hiểu.",
          },
          {
            icon: <Store className="w-8 h-8 text-[#FFB347] mx-auto" />,
            title: "Quản lý nguyên liệu",
            description: "Theo dõi tồn kho, cảnh báo khi sắp hết, kiểm soát chi phí hiệu quả.",
          },
          {
            icon: <Clock className="w-8 h-8 text-[#6F4E37] mx-auto" />,
            title: "Tiết kiệm thời gian",
            description: "Giao diện đơn giản, thao tác nhanh, phù hợp cho chủ quán bận rộn.",
          },
          {
            icon: <Smile className="w-8 h-8 text-[#A3B18A] mx-auto" />,
            title: "Dễ sử dụng",
            description: "Không cần kiến thức kế toán, ai cũng dùng được.",
          },
          {
            icon: <TrendingUp className="w-8 h-8 text-[#FFB347] mx-auto" />,
            title: "Hỗ trợ phát triển",
            description: "Gợi ý món bán chạy, tối ưu menu để tăng doanh thu.",
          },
        ],
      },
      stats: {
        title: "Được tin tưởng bởi cộng đồng cà phê",
        items: [
          { icon: <Users className="w-7 h-7 text-[#6F4E37] mx-auto" />, value: "1,200+", label: "Chủ quán sử dụng" },
          { icon: <CheckCircle className="w-7 h-7 text-[#A3B18A] mx-auto" />, value: "98%", label: "Hài lòng & giới thiệu" },
          { icon: <DollarSign className="w-7 h-7 text-[#FFB347] mx-auto" />, value: "20%+", label: "Tăng lợi nhuận trung bình" },
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
            icon: <Coffee className="w-8 h-8 text-[#6F4E37] mx-auto" />,
            title: "Automatic menu pricing",
            description: "Set smart prices based on ingredient costs and desired profit.",
          },
          {
            icon: <BarChart2 className="w-8 h-8 text-[#A3B18A] mx-auto" />,
            title: "Profit analytics",
            description: "See clear profit/loss reports by item, day, or month.",
          },
          {
            icon: <Store className="w-8 h-8 text-[#FFB347] mx-auto" />,
            title: "Ingredient management",
            description: "Track inventory, get low-stock alerts, and control costs easily.",
          },
          {
            icon: <Clock className="w-8 h-8 text-[#6F4E37] mx-auto" />,
            title: "Save time",
            description: "Simple interface, fast actions, perfect for busy owners.",
          },
          {
            icon: <Smile className="w-8 h-8 text-[#A3B18A] mx-auto" />,
            title: "Easy to use",
            description: "No accounting knowledge needed, anyone can use it.",
          },
          {
            icon: <TrendingUp className="w-8 h-8 text-[#FFB347] mx-auto" />,
            title: "Growth support",
            description: "Get best-seller suggestions, optimize your menu for more sales.",
          },
        ],
      },
      stats: {
        title: "Trusted by the coffee community",
        items: [
          { icon: <Users className="w-7 h-7 text-[#6F4E37] mx-auto" />, value: "1,200+", label: "Owners use it" },
          { icon: <CheckCircle className="w-7 h-7 text-[#A3B18A] mx-auto" />, value: "98%", label: "Satisfied & recommend" },
          { icon: <DollarSign className="w-7 h-7 text-[#FFB347] mx-auto" />, value: "20%+", label: "Avg. profit increase" },
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
    <div className="min-h-screen font-sans bg-[#F5E9DA] relative">
      {/* Background image with sepia overlay */}
      <div className="absolute inset-0 -z-10">
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80"
          alt="Cozy coffee shop background"
          className="w-full h-full object-cover object-center"
          style={{ filter: "sepia(0.25) brightness(0.85)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#F5E9DA]/80 via-[#F5E9DA]/60 to-[#6F4E37]/60" />
      </div>

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-4 pt-24 pb-16 text-center">
        <div className="flex flex-col items-center gap-4">
          <Coffee className="w-16 h-16 text-[#6F4E37] drop-shadow-lg" />
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#6F4E37] drop-shadow-sm mb-2">
            {t.hero.title}
          </h1>
          <h2 className="text-xl md:text-2xl font-semibold text-[#A3B18A] mb-4">
            {t.hero.subtitle}
          </h2>
          <p className="text-lg md:text-xl text-[#4B3A2F] mb-8 max-w-2xl mx-auto">
            {t.hero.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/dashboard"
              className="bg-gradient-to-r from-[#A3B18A] to-[#6F4E37] text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-md hover:scale-105 transition-all duration-200"
            >
              {t.hero.ctaPrimary}
            </Link>
            <Link
              href="/demo"
              className="border-2 border-[#A3B18A] text-[#6F4E37] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#A3B18A]/10 transition-all duration-200"
            >
              {t.hero.ctaSecondary}
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="md:col-span-3 mb-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[#6F4E37] mb-2">
            {t.features.title}
          </h2>
        </div>
        {t.features.items.map((feature, idx) => (
          <div
            key={idx}
            className="bg-white/80 rounded-xl shadow p-6 flex flex-col items-center text-center border border-[#E6D3C5] hover:shadow-lg transition-all"
          >
            {feature.icon}
            <h3 className="mt-4 text-lg font-semibold text-[#6F4E37]">{feature.title}</h3>
            <p className="text-[#4B3A2F] mt-2 text-base">{feature.description}</p>
          </div>
        ))}
      </section>

      {/* Stats Section */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white/90 rounded-2xl shadow-lg p-8 flex flex-col md:flex-row items-center justify-between gap-8 border border-[#E6D3C5]">
          <div className="flex-1 text-center md:text-left mb-6 md:mb-0">
            <h3 className="text-xl font-bold text-[#6F4E37] mb-2">{t.stats.title}</h3>
          </div>
          <div className="flex-1 flex flex-row justify-center gap-8">
            {t.stats.items.map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center">
                {stat.icon}
                <div className="text-2xl font-bold text-[#6F4E37] mt-1">{stat.value}</div>
                <div className="text-[#4B3A2F] text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-3xl mx-auto px-4 py-16 text-center">
        <div className="bg-gradient-to-r from-[#A3B18A] to-[#6F4E37] rounded-2xl shadow-xl p-10">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            {t.cta.title}
          </h2>
          <p className="text-lg text-[#F5E9DA] mb-8">
            {t.cta.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4">
            <Link
              href="/signup"
              className="bg-white text-[#6F4E37] px-8 py-4 rounded-lg font-semibold text-lg shadow hover:bg-[#F5E9DA] hover:text-[#A3B18A] transition-all duration-200"
            >
              {t.cta.primary}
            </Link>
            <Link
              href="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-[#6F4E37] transition-all duration-200"
            >
              {t.cta.secondary}
            </Link>
          </div>
          <p className="text-[#F5E9DA] mt-2 text-sm">{t.cta.trust}</p>
        </div>
      </section>
    </div>
  )
}
