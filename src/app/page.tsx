'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Home() {
  const { language } = useLanguage()

  const translations = {
    vi: {
      hero: {
        title: "Tính Toán Menu",
        subtitle: "Thông Minh",
        description: "Tối ưu hóa hoạt động quán cà phê với công cụ tính giá menu thông minh, phân tích chi phí và tối ưu lợi nhuận.",
        ctaPrimary: "Bắt Đầu Miễn Phí",
        ctaSecondary: "Xem Demo"
      },
      features: {
        title: "Mọi thứ bạn cần để tối ưu menu quán cà phê",
        description: "Từ theo dõi chi phí nguyên liệu đến phân tích biên lợi nhuận, chúng tôi cung cấp tất cả công cụ cần thiết để vận hành quán cà phê có lãi.",
        items: [
          {
            title: "Định Giá Menu",
            description: "Thuật toán định giá thông minh để tối đa lợi nhuận"
          },
          {
            title: "Phân Tích Chi Phí",
            description: "Chi tiết nguyên liệu và chi phí"
          },
          {
            title: "Theo Dõi Lợi Nhuận",
            description: "Biên lợi nhuận và phân tích thời gian thực"
          }
        ],
        featureList: [
          {
            title: "Quản Lý Nguyên Liệu",
            description: "Theo dõi chi phí nguyên liệu, quản lý kho và tính giá chính xác cho từng món."
          },
          {
            title: "Tính Chi Phí Công Thức",
            description: "Tự động tính chi phí của từng công thức dựa trên giá nguyên liệu hiện tại."
          },
          {
            title: "Phân Tích Lợi Nhuận",
            description: "Nhận thông tin chi tiết về biên lợi nhuận và xác định các món có lãi nhất."
          },
          {
            title: "Tối Ưu Menu",
            description: "Gợi ý được hỗ trợ bởi AI để tối ưu menu cho lợi nhuận tối đa."
          },
          {
            title: "Cập Nhật Thời Gian Thực",
            description: "Nhận cập nhật tức thì về chi phí và lợi nhuận khi giá nguyên liệu thay đổi."
          },
          {
            title: "Dễ Sử Dụng",
            description: "Giao diện trực quan được thiết kế cho chủ quán cà phê và quản lý."
          }
        ]
      },
      stats: {
        title: "Được tin tưởng bởi hàng trăm quán cà phê",
        items: [
          { value: "500+", label: "Quán cà phê đang sử dụng" },
          { value: "25%", label: "Tăng lợi nhuận trung bình" },
          { value: "10,000+", label: "Món được tính toán" },
          { value: "4.9/5", label: "Đánh giá từ khách hàng" }
        ]
      },
      cta: {
        title: "Sẵn sàng tối ưu menu quán cà phê của bạn?",
        description: "Tham gia cùng hàng trăm quán cà phê đã tăng lợi nhuận với công cụ tính toán menu thông minh của chúng tôi.",
        primary: "Dùng Thử Miễn Phí",
        secondary: "Liên Hệ Tư Vấn",
        trust: "Không cần thẻ tín dụng • Dùng thử 14 ngày • Hủy bất cứ lúc nào"
      },
      footer: {
        description: "Công cụ thông minh cho lợi nhuận và tối ưu menu quán cà phê.",
        sections: {
          product: "Sản Phẩm",
          support: "Hỗ Trợ",
          company: "Công Ty"
        },
        links: {
          features: "Tính Năng",
          pricing: "Giá Cả",
          demo: "Demo",
          help: "Trung Tâm Trợ Giúp",
          contact: "Liên Hệ",
          docs: "Tài Liệu",
          about: "Về Chúng Tôi",
          blog: "Blog",
          careers: "Tuyển Dụng"
        },
        copyright: "© 2024 MenuCalc. Tất cả quyền được bảo lưu."
      }
    },
    en: {
      hero: {
        title: "Smart Menu",
        subtitle: "Calculation",
        description: "Streamline your coffee shop operations with intelligent menu pricing, cost analysis, and profit optimization tools.",
        ctaPrimary: "Get Started Free",
        ctaSecondary: "Watch Demo"
      },
      features: {
        title: "Everything you need to optimize your coffee shop menu",
        description: "From ingredient cost tracking to profit margin analysis, we provide all the tools you need to run a profitable coffee shop.",
        items: [
          {
            title: "Menu Pricing",
            description: "Smart pricing algorithms to maximize profits"
          },
          {
            title: "Cost Analysis",
            description: "Detailed breakdown of ingredients and costs"
          },
          {
            title: "Profit Tracking",
            description: "Real-time profit margins and analytics"
          }
        ],
        featureList: [
          {
            title: "Ingredient Management",
            description: "Track ingredient costs, manage inventory, and calculate accurate pricing for every item."
          },
          {
            title: "Recipe Costing",
            description: "Automatically calculate the cost of each recipe based on current ingredient prices."
          },
          {
            title: "Profit Analytics",
            description: "Get detailed insights into your profit margins and identify your most profitable items."
          },
          {
            title: "Menu Optimization",
            description: "AI-powered suggestions to optimize your menu for maximum profitability."
          },
          {
            title: "Real-time Updates",
            description: "Get instant updates on costs and profits as ingredient prices change."
          },
          {
            title: "Easy to Use",
            description: "Intuitive interface designed for coffee shop owners and managers."
          }
        ]
      },
      stats: {
        title: "Trusted by hundreds of coffee shops",
        items: [
          { value: "500+", label: "Coffee shops using our platform" },
          { value: "25%", label: "Average profit increase" },
          { value: "10,000+", label: "Items calculated" },
          { value: "4.9/5", label: "Customer rating" }
        ]
      },
      cta: {
        title: "Ready to optimize your coffee shop menu?",
        description: "Join hundreds of coffee shops that have increased their profits with our smart menu calculation tools.",
        primary: "Start Free Trial",
        secondary: "Contact Sales",
        trust: "No credit card required • 14-day free trial • Cancel anytime"
      },
      footer: {
        description: "Smart tools for coffee shop profitability and menu optimization.",
        sections: {
          product: "Product",
          support: "Support",
          company: "Company"
        },
        links: {
          features: "Features",
          pricing: "Pricing",
          demo: "Demo",
          help: "Help Center",
          contact: "Contact",
          docs: "Documentation",
          about: "About",
          blog: "Blog",
          careers: "Careers"
        },
        copyright: "© 2024 MenuCalc. All rights reserved."
      }
    }
  }

  const t = translations[language]

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-brown-50 relative">
      {/* Coffee Shop Background Images */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Hero Background */}
        <div className="absolute top-0 left-0 w-full h-screen">
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat opacity-10"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')"
            }}
          />
        </div>
        
        {/* Features Background */}
        <div className="absolute top-screen left-0 w-full h-screen">
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat opacity-5"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1442512595331-e89e73853f31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')"
            }}
          />
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              {t.hero.title}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-brown-600">
                {' '}{t.hero.subtitle}
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              {t.hero.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/dashboard" 
                className="bg-gradient-to-r from-amber-600 to-brown-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                {t.hero.ctaPrimary}
              </Link>
              <Link 
                href="/demo" 
                className="border-2 border-amber-300 text-gray-700 px-8 py-4 rounded-lg font-semibold text-lg hover:border-amber-400 hover:bg-amber-50 transition-all duration-200"
              >
                {t.hero.ctaSecondary}
              </Link>
            </div>
          </div>
        </div>
        
        {/* Hero Image/Illustration */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="relative">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-amber-100">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {t.features.items.map((item, index) => (
                  <div key={index} className={`bg-gradient-to-br from-${['amber', 'brown', 'orange'][index]}-50 to-${['amber', 'brown', 'orange'][index]}-100 p-6 rounded-xl`}>
                    <div className={`w-12 h-12 bg-${['amber', 'brown', 'orange'][index]}-600 rounded-lg flex items-center justify-center mb-4`}>
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/80 backdrop-blur-sm relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t.features.title}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t.features.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.features.featureList.map((feature, index) => (
              <div key={index} className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-xl">
                <div className={`w-16 h-16 bg-${['amber', 'brown', 'orange', 'yellow', 'red', 'indigo'][index]}-100 rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <svg className={`w-8 h-8 text-${['amber', 'brown', 'orange', 'yellow', 'red', 'indigo'][index]}-600`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coffee Shop Stats Section */}
      <section className="py-16 bg-gradient-to-r from-amber-100 to-brown-100 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t.stats.title}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {t.stats.items.map((stat, index) => (
              <div key={index}>
                <div className={`text-3xl font-bold text-${['amber', 'brown', 'orange', 'yellow'][index]}-600 mb-2`}>{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-amber-600 to-brown-600 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {t.cta.title}
          </h2>
          <p className="text-xl text-amber-100 mb-8 max-w-2xl mx-auto">
            {t.cta.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/signup" 
              className="bg-white text-amber-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-200"
            >
              {t.cta.primary}
            </Link>
            <Link 
              href="/contact" 
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-amber-600 transition-all duration-200"
            >
              {t.cta.secondary}
            </Link>
          </div>
          <p className="text-amber-200 mt-6 text-sm">
            {t.cta.trust}
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">MenuCalc</h3>
              <p className="text-gray-400">
                {t.footer.description}
              </p>
            </div>
            <div>
              <h4 className="text-md font-semibold mb-4">{t.footer.sections.product}</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/features" className="hover:text-white">{t.footer.links.features}</Link></li>
                <li><Link href="/pricing" className="hover:text-white">{t.footer.links.pricing}</Link></li>
                <li><Link href="/demo" className="hover:text-white">{t.footer.links.demo}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-md font-semibold mb-4">{t.footer.sections.support}</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/help" className="hover:text-white">{t.footer.links.help}</Link></li>
                <li><Link href="/contact" className="hover:text-white">{t.footer.links.contact}</Link></li>
                <li><Link href="/docs" className="hover:text-white">{t.footer.links.docs}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-md font-semibold mb-4">{t.footer.sections.company}</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-white">{t.footer.links.about}</Link></li>
                <li><Link href="/blog" className="hover:text-white">{t.footer.links.blog}</Link></li>
                <li><Link href="/careers" className="hover:text-white">{t.footer.links.careers}</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>{t.footer.copyright}</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
