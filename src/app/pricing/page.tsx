"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";
import { Check, Star } from "lucide-react";

export default function PricingPage() {
  const { language } = useLanguage();

  const translations = {
    vi: {
      hero: {
        title: "Giá cả phù hợp cho mọi quy mô",
        subtitle: "Chọn gói phù hợp với nhu cầu của bạn",
        description: "Không có phí ẩn, không có ràng buộc dài hạn. Hủy bất cứ lúc nào.",
      },
      plans: {
        starter: {
          name: "Khởi đầu",
          price: "Miễn phí",
          period: "vĩnh viễn",
          description: "Hoàn hảo cho quán cà phê mới mở",
          features: [
            "Tối đa 20 món trong menu",
            "Tính giá cơ bản",
            "Báo cáo lợi nhuận đơn giản",
            "Hỗ trợ email",
            "Cập nhật hàng tháng",
          ],
          cta: "Bắt đầu miễn phí",
          popular: false,
        },
        pro: {
          name: "Chuyên nghiệp",
          price: "299.000đ",
          period: "/tháng",
          description: "Lý tưởng cho quán cà phê đang phát triển",
          features: [
            "Không giới hạn món trong menu",
            "Tính giá nâng cao",
            "Phân tích lợi nhuận chi tiết",
            "Quản lý kho nguyên liệu",
            "Báo cáo xuất Excel",
            "Hỗ trợ ưu tiên",
            "Tích hợp POS",
            "Sao lưu tự động",
          ],
          cta: "Dùng thử 14 ngày",
          popular: true,
        },
        enterprise: {
          name: "Doanh nghiệp",
          price: "Liên hệ",
          period: "",
          description: "Cho chuỗi quán cà phê lớn",
          features: [
            "Tất cả tính năng Pro",
            "Quản lý nhiều chi nhánh",
            "API tùy chỉnh",
            "Hỗ trợ 24/7",
            "Đào tạo nhân viên",
            "Tích hợp ERP",
            "Báo cáo tùy chỉnh",
            "Quản lý người dùng",
          ],
          cta: "Liên hệ tư vấn",
          popular: false,
        },
      },
      faq: {
        title: "Câu hỏi thường gặp",
        items: [
          {
            question: "Có thể dùng thử miễn phí không?",
            answer: "Có! Bạn có thể dùng thử gói Pro miễn phí trong 14 ngày, không cần thẻ tín dụng.",
          },
          {
            question: "Có thể hủy bất cứ lúc nào không?",
            answer: "Hoàn toàn có thể. Bạn có thể hủy gói đăng ký bất cứ lúc nào, không có phí phạt.",
          },
          {
            question: "Dữ liệu có được bảo mật không?",
            answer: "Tuyệt đối! Dữ liệu của bạn được mã hóa và bảo vệ theo tiêu chuẩn bảo mật cao nhất.",
          },
        ],
      },
    },
    en: {
      hero: {
        title: "Pricing that fits every size",
        subtitle: "Choose the plan that fits your needs",
        description: "No hidden fees, no long-term commitments. Cancel anytime.",
      },
      plans: {
        starter: {
          name: "Starter",
          price: "Free",
          period: "forever",
          description: "Perfect for new coffee shops",
          features: [
            "Up to 20 menu items",
            "Basic pricing calculation",
            "Simple profit reports",
            "Email support",
            "Monthly updates",
          ],
          cta: "Start free",
          popular: false,
        },
        pro: {
          name: "Professional",
          price: "$12.99",
          period: "/month",
          description: "Ideal for growing coffee shops",
          features: [
            "Unlimited menu items",
            "Advanced pricing",
            "Detailed profit analytics",
            "Ingredient inventory",
            "Excel export",
            "Priority support",
            "POS integration",
            "Auto backup",
          ],
          cta: "Start 14-day trial",
          popular: true,
        },
        enterprise: {
          name: "Enterprise",
          price: "Contact us",
          period: "",
          description: "For large coffee chains",
          features: [
            "All Pro features",
            "Multi-location management",
            "Custom API",
            "24/7 support",
            "Staff training",
            "ERP integration",
            "Custom reports",
            "User management",
          ],
          cta: "Contact sales",
          popular: false,
        },
      },
      faq: {
        title: "Frequently Asked Questions",
        items: [
          {
            question: "Can I try it for free?",
            answer: "Yes! You can try the Pro plan free for 14 days, no credit card required.",
          },
          {
            question: "Can I cancel anytime?",
            answer: "Absolutely. You can cancel your subscription at any time with no penalties.",
          },
          {
            question: "Is my data secure?",
            answer: "Absolutely! Your data is encrypted and protected with the highest security standards.",
          },
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

      {/* Pricing Plans */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {/* Starter Plan */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-[#E6D3C5] relative">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-[#6F4E37] mb-2">
                {t.plans.starter.name}
              </h3>
              <div className="mb-4">
                <span className="text-4xl font-bold text-[#6F4E37]">
                  {t.plans.starter.price}
                </span>
                <span className="text-[#4B3A2F] ml-2">
                  {t.plans.starter.period}
                </span>
              </div>
              <p className="text-[#4B3A2F] mb-6">
                {t.plans.starter.description}
              </p>
            </div>
            <ul className="space-y-3 mb-8">
              {t.plans.starter.features.map((feature, idx) => (
                <li key={idx} className="flex items-center">
                  <Check className="w-5 h-5 text-[#A3B18A] mr-3 flex-shrink-0" />
                  <span className="text-[#4B3A2F]">{feature}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/signup"
              className="w-full bg-[#6F4E37] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#5A3E2E] transition-colors text-center block"
            >
              {t.plans.starter.cta}
            </Link>
          </div>

          {/* Pro Plan */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-[#A3B18A] relative transform scale-105">
            {t.plans.pro.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-[#FFB347] text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center">
                  <Star className="w-4 h-4 mr-1" />
                  {language === "vi" ? "Phổ biến" : "Most Popular"}
                </div>
              </div>
            )}
            <div className="text-center">
              <h3 className="text-2xl font-bold text-[#6F4E37] mb-2">
                {t.plans.pro.name}
              </h3>
              <div className="mb-4">
                <span className="text-4xl font-bold text-[#6F4E37]">
                  {t.plans.pro.price}
                </span>
                <span className="text-[#4B3A2F] ml-2">
                  {t.plans.pro.period}
                </span>
              </div>
              <p className="text-[#4B3A2F] mb-6">
                {t.plans.pro.description}
              </p>
            </div>
            <ul className="space-y-3 mb-8">
              {t.plans.pro.features.map((feature, idx) => (
                <li key={idx} className="flex items-center">
                  <Check className="w-5 h-5 text-[#A3B18A] mr-3 flex-shrink-0" />
                  <span className="text-[#4B3A2F]">{feature}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/signup"
              className="w-full bg-gradient-to-r from-[#A3B18A] to-[#6F4E37] text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all text-center block"
            >
              {t.plans.pro.cta}
            </Link>
          </div>

          {/* Enterprise Plan */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-[#E6D3C5] relative">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-[#6F4E37] mb-2">
                {t.plans.enterprise.name}
              </h3>
              <div className="mb-4">
                <span className="text-4xl font-bold text-[#6F4E37]">
                  {t.plans.enterprise.price}
                </span>
                <span className="text-[#4B3A2F] ml-2">
                  {t.plans.enterprise.period}
                </span>
              </div>
              <p className="text-[#4B3A2F] mb-6">
                {t.plans.enterprise.description}
              </p>
            </div>
            <ul className="space-y-3 mb-8">
              {t.plans.enterprise.features.map((feature, idx) => (
                <li key={idx} className="flex items-center">
                  <Check className="w-5 h-5 text-[#A3B18A] mr-3 flex-shrink-0" />
                  <span className="text-[#4B3A2F]">{feature}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/contact"
              className="w-full bg-[#6F4E37] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#5A3E2E] transition-colors text-center block"
            >
              {t.plans.enterprise.cta}
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white/80 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#6F4E37] text-center mb-12">
            {t.faq.title}
          </h2>
          <div className="space-y-6">
            {t.faq.items.map((item, idx) => (
              <div key={idx} className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-[#6F4E37] mb-2">
                  {item.question}
                </h3>
                <p className="text-[#4B3A2F] leading-relaxed">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
} 