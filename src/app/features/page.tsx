"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import {
  BarChart2,
  Store,
  Clock,
  Calculator,
  Shield,
  Zap,
  Users,
  Target,
  Award,
} from "lucide-react";

export default function FeaturesPage() {
  const { language } = useLanguage();

  const translations = {
    vi: {
      hero: {
        title: "Tính năng mạnh mẽ cho quán cà phê của bạn",
        subtitle: "Mọi thứ bạn cần để quản lý menu hiệu quả",
        description: "Khám phá các tính năng được thiết kế đặc biệt cho chủ quán cà phê nhỏ và vừa.",
      },
      features: {
        title: "Tính năng chi tiết",
        items: [
          {
            icon: <Calculator className="w-8 h-8 text-[#6F4E37]" />,
            title: "Tính giá tự động",
            description: "Tự động tính giá bán dựa trên chi phí nguyên liệu và tỷ lệ lợi nhuận mong muốn.",
            details: ["Tính toán chi phí theo công thức", "Đề xuất giá bán tối ưu", "Theo dõi biến động giá"],
          },
          {
            icon: <BarChart2 className="w-8 h-8 text-[#A3B18A]" />,
            title: "Phân tích lợi nhuận",
            description: "Báo cáo chi tiết về lãi/lỗ của từng món, từng ngày, từng tháng.",
            details: ["Biểu đồ trực quan", "So sánh theo thời gian", "Phân tích xu hướng"],
          },
          {
            icon: <Store className="w-8 h-8 text-[#FFB347]" />,
            title: "Quản lý kho",
            description: "Theo dõi tồn kho nguyên liệu, cảnh báo khi sắp hết hàng.",
            details: ["Cập nhật tồn kho real-time", "Cảnh báo hết hàng", "Lịch sử nhập xuất"],
          },
          {
            icon: <Clock className="w-8 h-8 text-[#6F4E37]" />,
            title: "Tiết kiệm thời gian",
            description: "Giao diện đơn giản, thao tác nhanh, phù hợp cho chủ quán bận rộn.",
            details: ["Thao tác một chạm", "Giao diện thân thiện", "Hướng dẫn trực quan"],
          },
          {
            icon: <Shield className="w-8 h-8 text-[#A3B18A]" />,
            title: "Bảo mật dữ liệu",
            description: "Dữ liệu của bạn được bảo vệ an toàn với mã hóa tiêu chuẩn công nghiệp.",
            details: ["Mã hóa SSL/TLS", "Sao lưu tự động", "Kiểm soát truy cập"],
          },
          {
            icon: <Zap className="w-8 h-8 text-[#FFB347]" />,
            title: "Tích hợp dễ dàng",
            description: "Kết nối với các hệ thống POS và kế toán hiện có của bạn.",
            details: ["API mở", "Xuất dữ liệu", "Đồng bộ tự động"],
          },
        ],
      },
      benefits: {
        title: "Lợi ích khi sử dụng",
        items: [
          { icon: <Target className="w-6 h-6 text-[#6F4E37]" />, text: "Tăng lợi nhuận 20-30%" },
          { icon: <Users className="w-6 h-6 text-[#A3B18A]" />, text: "Tiết kiệm 5-10 giờ/tuần" },
          { icon: <Award className="w-6 h-6 text-[#FFB347]" />, text: "Quản lý chuyên nghiệp" },
        ],
      },
    },
    en: {
      hero: {
        title: "Powerful features for your coffee shop",
        subtitle: "Everything you need to manage your menu effectively",
        description: "Discover features designed specifically for small and medium coffee shop owners.",
      },
      features: {
        title: "Detailed Features",
        items: [
          {
            icon: <Calculator className="w-8 h-8 text-[#6F4E37]" />,
            title: "Automatic pricing",
            description: "Automatically calculate selling prices based on ingredient costs and desired profit margins.",
            details: ["Recipe cost calculation", "Optimal price suggestions", "Price fluctuation tracking"],
          },
          {
            icon: <BarChart2 className="w-8 h-8 text-[#A3B18A]" />,
            title: "Profit analytics",
            description: "Detailed reports on profit/loss for each item, day, and month.",
            details: ["Visual charts", "Time-based comparisons", "Trend analysis"],
          },
          {
            icon: <Store className="w-8 h-8 text-[#FFB347]" />,
            title: "Inventory management",
            description: "Track ingredient inventory and get alerts when stock is low.",
            details: ["Real-time inventory updates", "Low stock alerts", "Import/export history"],
          },
          {
            icon: <Clock className="w-8 h-8 text-[#6F4E37]" />,
            title: "Time saving",
            description: "Simple interface, fast operations, perfect for busy shop owners.",
            details: ["One-tap operations", "User-friendly interface", "Visual guides"],
          },
          {
            icon: <Shield className="w-8 h-8 text-[#A3B18A]" />,
            title: "Data security",
            description: "Your data is protected with industry-standard encryption.",
            details: ["SSL/TLS encryption", "Automatic backups", "Access control"],
          },
          {
            icon: <Zap className="w-8 h-8 text-[#FFB347]" />,
            title: "Easy integration",
            description: "Connect with your existing POS and accounting systems.",
            details: ["Open API", "Data export", "Auto synchronization"],
          },
        ],
      },
      benefits: {
        title: "Benefits of using our platform",
        items: [
          { icon: <Target className="w-6 h-6 text-[#6F4E37]" />, text: "Increase profits by 20-30%" },
          { icon: <Users className="w-6 h-6 text-[#A3B18A]" />, text: "Save 5-10 hours per week" },
          { icon: <Award className="w-6 h-6 text-[#FFB347]" />, text: "Professional management" },
        ],
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

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#6F4E37] text-center mb-12">
          {t.features.title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {t.features.items.map((feature, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-lg p-6 border border-[#E6D3C5] hover:shadow-xl transition-all"
            >
              <div className="flex items-center mb-4">
                {feature.icon}
                <h3 className="text-xl font-semibold text-[#6F4E37] ml-3">
                  {feature.title}
                </h3>
              </div>
              <p className="text-[#4B3A2F] mb-4 leading-relaxed">
                {feature.description}
              </p>
              <ul className="space-y-2">
                {feature.details.map((detail, detailIdx) => (
                  <li key={detailIdx} className="flex items-center text-sm text-[#4B3A2F]">
                    <div className="w-2 h-2 bg-[#A3B18A] rounded-full mr-3"></div>
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-white/80 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#6F4E37] mb-8">
            {t.benefits.title}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {t.benefits.items.map((benefit, idx) => (
              <div key={idx} className="flex flex-col items-center">
                {benefit.icon}
                <p className="text-[#4B3A2F] font-medium mt-2 text-center">
                  {benefit.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
} 