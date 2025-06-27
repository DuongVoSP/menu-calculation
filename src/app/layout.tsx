import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
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
          <Navigation />
          
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
