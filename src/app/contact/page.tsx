"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { Mail, Phone, MapPin, Clock, Send, MessageCircle } from "lucide-react";

export default function ContactPage() {
  const { language } = useLanguage();

  const translations = {
    vi: {
      hero: {
        title: "Liên hệ với chúng tôi",
        subtitle: "Chúng tôi luôn sẵn sàng hỗ trợ bạn",
        description: "Có câu hỏi về MenuCalc? Hãy liên hệ với đội ngũ hỗ trợ thân thiện của chúng tôi.",
      },
      form: {
        title: "Gửi tin nhắn",
        name: "Họ và tên",
        email: "Email",
        phone: "Số điện thoại",
        subject: "Chủ đề",
        message: "Tin nhắn",
        submit: "Gửi tin nhắn",
        placeholder: {
          name: "Nhập họ và tên của bạn",
          email: "Nhập email của bạn",
          phone: "Nhập số điện thoại",
          subject: "Chọn chủ đề",
          message: "Nhập tin nhắn của bạn...",
        },
      },
      info: {
        title: "Thông tin liên hệ",
        address: "123 Đường ABC, Quận 1, TP.HCM",
        phone: "+84 28 1234 5678",
        email: "support@menucalc.vn",
        hours: "Thứ 2 - Thứ 6: 8:00 - 18:00",
        description: "Đội ngũ hỗ trợ của chúng tôi sẽ phản hồi trong vòng 24 giờ.",
      },
      topics: {
        title: "Chủ đề thường gặp",
        items: [
          "Tư vấn triển khai",
          "Hỗ trợ kỹ thuật",
          "Đăng ký gói Enterprise",
          "Đào tạo nhân viên",
          "Tích hợp hệ thống",
          "Khác",
        ],
      },
    },
    en: {
      hero: {
        title: "Get in touch",
        subtitle: "We're here to help",
        description: "Have questions about MenuCalc? Contact our friendly support team.",
      },
      form: {
        title: "Send us a message",
        name: "Full name",
        email: "Email",
        phone: "Phone number",
        subject: "Subject",
        message: "Message",
        submit: "Send message",
        placeholder: {
          name: "Enter your full name",
          email: "Enter your email",
          phone: "Enter your phone number",
          subject: "Select a subject",
          message: "Enter your message...",
        },
      },
      info: {
        title: "Contact information",
        address: "123 ABC Street, District 1, Ho Chi Minh City",
        phone: "+84 28 1234 5678",
        email: "support@menucalc.com",
        hours: "Monday - Friday: 8:00 AM - 6:00 PM",
        description: "Our support team will respond within 24 hours.",
      },
      topics: {
        title: "Common topics",
        items: [
          "Implementation consultation",
          "Technical support",
          "Enterprise plan",
          "Staff training",
          "System integration",
          "Other",
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

      {/* Contact Form and Info */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="order-2 lg:order-1">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-[#E6D3C5]">
              <h2 className="text-2xl font-bold text-[#6F4E37] mb-6">
                {t.form.title}
              </h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#6F4E37] font-medium mb-2">
                      {t.form.name}
                    </label>
                    <input
                      type="text"
                      placeholder={t.form.placeholder.name}
                      className="w-full px-4 py-3 border border-[#E6D3C5] rounded-lg focus:ring-2 focus:ring-[#A3B18A] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-[#6F4E37] font-medium mb-2">
                      {t.form.email}
                    </label>
                    <input
                      type="email"
                      placeholder={t.form.placeholder.email}
                      className="w-full px-4 py-3 border border-[#E6D3C5] rounded-lg focus:ring-2 focus:ring-[#A3B18A] focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[#6F4E37] font-medium mb-2">
                    {t.form.phone}
                  </label>
                  <input
                    type="tel"
                    placeholder={t.form.placeholder.phone}
                    className="w-full px-4 py-3 border border-[#E6D3C5] rounded-lg focus:ring-2 focus:ring-[#A3B18A] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-[#6F4E37] font-medium mb-2">
                    {t.form.subject}
                  </label>
                  <select className="w-full px-4 py-3 border border-[#E6D3C5] rounded-lg focus:ring-2 focus:ring-[#A3B18A] focus:border-transparent">
                    <option value="">{t.form.placeholder.subject}</option>
                    {t.topics.items.map((topic, idx) => (
                      <option key={idx} value={topic}>
                        {topic}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[#6F4E37] font-medium mb-2">
                    {t.form.message}
                  </label>
                  <textarea
                    rows={5}
                    placeholder={t.form.placeholder.message}
                    className="w-full px-4 py-3 border border-[#E6D3C5] rounded-lg focus:ring-2 focus:ring-[#A3B18A] focus:border-transparent resize-none"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#A3B18A] to-[#6F4E37] text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center"
                >
                  <Send className="w-5 h-5 mr-2" />
                  {t.form.submit}
                </button>
              </form>
            </div>
          </div>

          {/* Contact Information */}
          <div className="order-1 lg:order-2">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-[#E6D3C5] h-fit">
              <h2 className="text-2xl font-bold text-[#6F4E37] mb-6">
                {t.info.title}
              </h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="w-6 h-6 text-[#A3B18A] mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-[#6F4E37] mb-1">
                      {language === "vi" ? "Địa chỉ" : "Address"}
                    </h3>
                    <p className="text-[#4B3A2F] leading-relaxed">
                      {t.info.address}
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="w-6 h-6 text-[#FFB347] mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-[#6F4E37] mb-1">
                      {language === "vi" ? "Điện thoại" : "Phone"}
                    </h3>
                    <p className="text-[#4B3A2F]">
                      {t.info.phone}
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="w-6 h-6 text-[#6F4E37] mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-[#6F4E37] mb-1">
                      Email
                    </h3>
                    <p className="text-[#4B3A2F]">
                      {t.info.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="w-6 h-6 text-[#A3B18A] mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-[#6F4E37] mb-1">
                      {language === "vi" ? "Giờ làm việc" : "Business hours"}
                    </h3>
                    <p className="text-[#4B3A2F]">
                      {t.info.hours}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-8 p-4 bg-[#F5E9DA] rounded-lg">
                <div className="flex items-start">
                  <MessageCircle className="w-5 h-5 text-[#6F4E37] mr-3 mt-1 flex-shrink-0" />
                  <p className="text-[#4B3A2F] text-sm">
                    {t.info.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white/80 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#6F4E37] text-center mb-12">
            {language === "vi" ? "Câu hỏi thường gặp" : "Frequently Asked Questions"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-[#6F4E37] mb-2">
                {language === "vi" ? "Thời gian phản hồi?" : "Response time?"}
              </h3>
              <p className="text-[#4B3A2F] leading-relaxed">
                {language === "vi" 
                  ? "Chúng tôi phản hồi trong vòng 24 giờ làm việc." 
                  : "We respond within 24 business hours."
                }
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-[#6F4E37] mb-2">
                {language === "vi" ? "Hỗ trợ tiếng Việt?" : "Vietnamese support?"}
              </h3>
              <p className="text-[#4B3A2F] leading-relaxed">
                {language === "vi" 
                  ? "Có, chúng tôi hỗ trợ đầy đủ bằng tiếng Việt." 
                  : "Yes, we provide full support in Vietnamese."
                }
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-[#6F4E37] mb-2">
                {language === "vi" ? "Tư vấn miễn phí?" : "Free consultation?"}
              </h3>
              <p className="text-[#4B3A2F] leading-relaxed">
                {language === "vi" 
                  ? "Có, chúng tôi cung cấp tư vấn miễn phí cho khách hàng tiềm năng." 
                  : "Yes, we provide free consultation for potential customers."
                }
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-[#6F4E37] mb-2">
                {language === "vi" ? "Đào tạo nhân viên?" : "Staff training?"}
              </h3>
              <p className="text-[#4B3A2F] leading-relaxed">
                {language === "vi" 
                  ? "Có, chúng tôi cung cấp đào tạo cho nhân viên của bạn." 
                  : "Yes, we provide training for your staff."
                }
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 