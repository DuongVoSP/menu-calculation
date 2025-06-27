"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";
import { Check, ArrowRight, Coffee, Shield, Zap, Mail, Lock, User, Building, Phone } from "lucide-react";
import { useState, ChangeEvent, FormEvent } from "react";

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  shopName: string;
  phone: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  shopName?: string;
  phone?: string;
}

export default function SignupPage() {
  const { language } = useLanguage();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    shopName: "",
    phone: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const translations = {
    vi: {
      hero: {
        title: "Bắt đầu dùng thử miễn phí",
        subtitle: "Không cần thẻ tín dụng • Hủy bất cứ lúc nào",
        description: "Trải nghiệm đầy đủ MenuCalc trong 14 ngày. Không có ràng buộc, không có phí ẩn.",
      },
      form: {
        title: "Tạo tài khoản",
        name: "Họ và tên",
        email: "Email",
        password: "Mật khẩu",
        confirmPassword: "Xác nhận mật khẩu",
        shopName: "Tên quán cà phê",
        phone: "Số điện thoại",
        submit: "Bắt đầu dùng thử miễn phí",
        placeholder: {
          name: "Nhập họ và tên của bạn",
          email: "Nhập email của bạn",
          password: "Tạo mật khẩu mạnh (tối thiểu 8 ký tự)",
          confirmPassword: "Nhập lại mật khẩu",
          shopName: "Tên quán cà phê của bạn",
          phone: "Số điện thoại liên hệ",
        },
      },
      sso: {
        title: "Hoặc đăng ký với",
        google: "Tiếp tục với Google",
        microsoft: "Tiếp tục với Microsoft",
        divider: "hoặc",
      },
      benefits: {
        title: "Bạn sẽ nhận được",
        items: [
          "Dùng thử 14 ngày miễn phí",
          "Truy cập đầy đủ tính năng Pro",
          "Hỗ trợ ưu tiên trong thời gian dùng thử",
          "Hướng dẫn thiết lập miễn phí",
          "Không cần thẻ tín dụng",
          "Hủy bất cứ lúc nào",
        ],
      },
      trust: {
        title: "Được tin tưởng bởi 1,200+ chủ quán",
        description: "Tham gia cộng đồng chủ quán cà phê đang phát triển cùng MenuCalc",
      },
      login: {
        text: "Đã có tài khoản?",
        link: "Đăng nhập",
      },
      terms: {
        text: "Bằng cách đăng ký, bạn đồng ý với",
        privacy: "Chính sách bảo mật",
        terms: "Điều khoản sử dụng",
        and: "và",
      },
    },
    en: {
      hero: {
        title: "Start your free trial",
        subtitle: "No credit card required • Cancel anytime",
        description: "Experience MenuCalc fully for 14 days. No commitments, no hidden fees.",
      },
      form: {
        title: "Create account",
        name: "Full name",
        email: "Email",
        password: "Password",
        confirmPassword: "Confirm password",
        shopName: "Coffee shop name",
        phone: "Phone number",
        submit: "Start free trial",
        placeholder: {
          name: "Enter your full name",
          email: "Enter your email",
          password: "Create a strong password (min 8 characters)",
          confirmPassword: "Confirm your password",
          shopName: "Your coffee shop name",
          phone: "Contact phone number",
        },
      },
      sso: {
        title: "Or sign up with",
        google: "Continue with Google",
        microsoft: "Continue with Microsoft",
        divider: "or",
      },
      benefits: {
        title: "You'll get",
        items: [
          "14-day free trial",
          "Full access to Pro features",
          "Priority support during trial",
          "Free setup guidance",
          "No credit card required",
          "Cancel anytime",
        ],
      },
      trust: {
        title: "Trusted by 1,200+ shop owners",
        description: "Join the growing community of coffee shop owners using MenuCalc",
      },
      login: {
        text: "Already have an account?",
        link: "Sign in",
      },
      terms: {
        text: "By signing up, you agree to our",
        privacy: "Privacy Policy",
        terms: "Terms of Service",
        and: "and",
      },
    },
  };

  const t = translations[language];

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = language === "vi" ? "Vui lòng nhập họ và tên" : "Please enter your full name";
    }

    if (!formData.email.trim()) {
      newErrors.email = language === "vi" ? "Vui lòng nhập email" : "Please enter your email";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = language === "vi" ? "Email không hợp lệ" : "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = language === "vi" ? "Vui lòng nhập mật khẩu" : "Please enter a password";
    } else if (formData.password.length < 8) {
      newErrors.password = language === "vi" ? "Mật khẩu phải có ít nhất 8 ký tự" : "Password must be at least 8 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = language === "vi" ? "Mật khẩu không khớp" : "Passwords do not match";
    }

    if (!formData.shopName.trim()) {
      newErrors.shopName = language === "vi" ? "Vui lòng nhập tên quán" : "Please enter your shop name";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = language === "vi" ? "Vui lòng nhập số điện thoại" : "Please enter your phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would typically make an API call to register the user
      console.log("Form submitted:", formData);
      
      // Redirect to dashboard or show success message
      // router.push('/dashboard');
      
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSSO = async (provider: 'google' | 'microsoft') => {
    setIsLoading(true);
    
    try {
      // Here you would implement SSO logic
      console.log(`SSO with ${provider}`);
      
      // Simulate SSO process
      await new Promise(resolve => setTimeout(resolve, 1500));
      
    } catch (error) {
      console.error(`${provider} SSO error:`, error);
    } finally {
      setIsLoading(false);
    }
  };

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

      {/* Signup Form and Benefits */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Signup Form */}
          <div className="order-2 lg:order-1">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-[#E6D3C5]">
              <h2 className="text-2xl font-bold text-[#6F4E37] mb-6">
                {t.form.title}
              </h2>

              {/* SSO Buttons */}
              <div className="mb-6">
                <p className="text-center text-[#4B3A2F] mb-4">
                  {t.sso.title}
                </p>
                <div className="space-y-3">
                  <button
                    onClick={() => handleSSO('google')}
                    disabled={isLoading}
                    className="w-full bg-white border-2 border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center disabled:opacity-50"
                  >
                    <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    {t.sso.google}
                  </button>
                  <button
                    onClick={() => handleSSO('microsoft')}
                    disabled={isLoading}
                    className="w-full bg-white border-2 border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center disabled:opacity-50"
                  >
                    <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                      <path fill="#f25022" d="M1 1h10v10H1z"/>
                      <path fill="#7fba00" d="M13 1h10v10H13z"/>
                      <path fill="#00a4ef" d="M1 13h10v10H1z"/>
                      <path fill="#ffb900" d="M13 13h10v10H13z"/>
                    </svg>
                    {t.sso.microsoft}
                  </button>
                </div>
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-[#4B3A2F]">
                      {t.sso.divider}
                    </span>
                  </div>
                </div>
              </div>

              {/* Email/Password Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#6F4E37] font-medium mb-2">
                      {t.form.name}
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder={t.form.placeholder.name}
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#A3B18A] focus:border-transparent ${
                          errors.name ? 'border-red-500' : 'border-[#E6D3C5]'
                        }`}
                      />
                    </div>
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-[#6F4E37] font-medium mb-2">
                      {t.form.email}
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder={t.form.placeholder.email}
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#A3B18A] focus:border-transparent ${
                          errors.email ? 'border-red-500' : 'border-[#E6D3C5]'
                        }`}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-[#6F4E37] font-medium mb-2">
                    {t.form.shopName}
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="shopName"
                      value={formData.shopName}
                      onChange={handleInputChange}
                      placeholder={t.form.placeholder.shopName}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#A3B18A] focus:border-transparent ${
                        errors.shopName ? 'border-red-500' : 'border-[#E6D3C5]'
                      }`}
                    />
                  </div>
                  {errors.shopName && (
                    <p className="text-red-500 text-sm mt-1">{errors.shopName}</p>
                  )}
                </div>
                <div>
                  <label className="block text-[#6F4E37] font-medium mb-2">
                    {t.form.phone}
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder={t.form.placeholder.phone}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#A3B18A] focus:border-transparent ${
                        errors.phone ? 'border-red-500' : 'border-[#E6D3C5]'
                      }`}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>
                <div>
                  <label className="block text-[#6F4E37] font-medium mb-2">
                    {t.form.password}
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder={t.form.placeholder.password}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#A3B18A] focus:border-transparent ${
                        errors.password ? 'border-red-500' : 'border-[#E6D3C5]'
                      }`}
                    />
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                  )}
                </div>
                <div>
                  <label className="block text-[#6F4E37] font-medium mb-2">
                    {t.form.confirmPassword}
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder={t.form.placeholder.confirmPassword}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#A3B18A] focus:border-transparent ${
                        errors.confirmPassword ? 'border-red-500' : 'border-[#E6D3C5]'
                      }`}
                    />
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-[#A3B18A] to-[#6F4E37] text-white py-4 px-6 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  ) : (
                    <>
                      {t.form.submit}
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </button>
                <div className="text-center">
                  <p className="text-[#4B3A2F]">
                    {t.login.text}{" "}
                    <Link href="/login" className="text-[#A3B18A] hover:text-[#6F4E37] font-medium">
                      {t.login.link}
                    </Link>
                  </p>
                </div>
                <div className="text-center text-xs text-[#4B3A2F]">
                  <p>
                    {t.terms.text}{" "}
                    <Link href="/privacy" className="text-[#A3B18A] hover:text-[#6F4E37]">
                      {t.terms.privacy}
                    </Link>{" "}
                    {t.terms.and}{" "}
                    <Link href="/terms" className="text-[#A3B18A] hover:text-[#6F4E37]">
                      {t.terms.terms}
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>

          {/* Benefits */}
          <div className="order-1 lg:order-2">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-[#E6D3C5] h-fit">
              <h2 className="text-2xl font-bold text-[#6F4E37] mb-6">
                {t.benefits.title}
              </h2>
              <div className="space-y-4">
                {t.benefits.items.map((benefit, idx) => (
                  <div key={idx} className="flex items-center">
                    <Check className="w-5 h-5 text-[#A3B18A] mr-3 flex-shrink-0" />
                    <span className="text-[#4B3A2F]">{benefit}</span>
                  </div>
                ))}
              </div>
              
              {/* Trust Indicators */}
              <div className="mt-8 p-6 bg-[#F5E9DA] rounded-lg">
                <h3 className="text-lg font-semibold text-[#6F4E37] mb-2">
                  {t.trust.title}
                </h3>
                <p className="text-[#4B3A2F] text-sm">
                  {t.trust.description}
                </p>
              </div>

              {/* Security & Support */}
              <div className="mt-6 space-y-4">
                <div className="flex items-center">
                  <Shield className="w-5 h-5 text-[#A3B18A] mr-3" />
                  <span className="text-[#4B3A2F] text-sm">
                    {language === "vi" ? "Dữ liệu được bảo mật 100%" : "100% secure data"}
                  </span>
                </div>
                <div className="flex items-center">
                  <Zap className="w-5 h-5 text-[#FFB347] mr-3" />
                  <span className="text-[#4B3A2F] text-sm">
                    {language === "vi" ? "Thiết lập trong 5 phút" : "Setup in 5 minutes"}
                  </span>
                </div>
                <div className="flex items-center">
                  <Coffee className="w-5 h-5 text-[#6F4E37] mr-3" />
                  <span className="text-[#4B3A2F] text-sm">
                    {language === "vi" ? "Hỗ trợ tiếng Việt" : "Vietnamese support"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="bg-white/80 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#6F4E37] mb-8">
            {language === "vi" ? "Tại sao chọn MenuCalc?" : "Why choose MenuCalc?"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="w-12 h-12 bg-[#A3B18A] rounded-lg flex items-center justify-center mx-auto mb-4">
                <Coffee className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-[#6F4E37] mb-2">
                {language === "vi" ? "Dễ sử dụng" : "Easy to use"}
              </h3>
              <p className="text-[#4B3A2F] text-sm">
                {language === "vi" 
                  ? "Giao diện thân thiện, không cần kiến thức kỹ thuật" 
                  : "User-friendly interface, no technical knowledge required"
                }
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="w-12 h-12 bg-[#FFB347] rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-[#6F4E37] mb-2">
                {language === "vi" ? "An toàn" : "Secure"}
              </h3>
              <p className="text-[#4B3A2F] text-sm">
                {language === "vi" 
                  ? "Dữ liệu được mã hóa và bảo vệ an toàn" 
                  : "Data is encrypted and securely protected"
                }
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="w-12 h-12 bg-[#6F4E37] rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-[#6F4E37] mb-2">
                {language === "vi" ? "Nhanh chóng" : "Fast"}
              </h3>
              <p className="text-[#4B3A2F] text-sm">
                {language === "vi" 
                  ? "Thiết lập nhanh, kết quả tức thì" 
                  : "Quick setup, instant results"
                }
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 