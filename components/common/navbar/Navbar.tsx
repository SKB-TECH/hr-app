"use client";

import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { navigations } from "@/data/data";
import Image from "next/image";
import { useState, useEffect } from "react";
import { X, Mail, Phone, ArrowRight } from "lucide-react";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import LanguageSwitcher from "@/components/common/LanguageSwitcher";
import { useTranslations } from "next-intl";

export default function NavbarComponentLandingPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const t = useTranslations("common");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Top Utility Bar — Deep Navy with Brand Blue & Coral Accents */}
      <div className="hidden lg:block bg-[#132745] text-white/80 text-xs py-2 px-6 lg:px-12 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a
              href="mailto:contact@fast2hire.com"
              className="flex items-center gap-2 hover:text-[#26A4FF] transition-colors"
            >
              <Mail size={13} className="text-[#26A4FF]" />
              <span>contact@fast2hire.com</span>
            </a>
            <span className="text-white/20">|</span>
            <a
              href="tel:+15552345678"
              className="flex items-center gap-2 hover:text-[#26A4FF] transition-colors"
            >
              <Phone size={13} className="text-[#26A4FF]" />
              <span>+1 (555) 234-5678</span>
            </a>
          </div>

          <div className="flex items-center gap-4 text-white/70">
            <span className="text-[11px] uppercase tracking-wider text-[#FF6550] font-semibold">
              Executive Search & Recruitment
            </span>
            <span className="text-white/20">|</span>
            <div className="flex items-center gap-3">
              <span className="text-xs text-white/70">Global Talent Network</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-[0_10px_30px_rgba(19,39,69,0.08)] py-3"
            : "bg-white/90 backdrop-blur-sm py-4 border-b border-[#25324B]/10"
        }`}
      >
        <div className="px-4 md:px-8 lg:px-12 w-full max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo & Links */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 shrink-0 group">
              <Image
                src="/logo/lgo.png"
                alt="Fast2Hire Logo"
                width={160}
                height={40}
                className="h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                priority
              />
            </Link>

            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              {navigations.map((item, index) => (
                <Link
                  key={index}
                  href={item.path}
                  className="text-sm font-semibold text-[#25324B] hover:text-[#4640DE] transition-colors duration-200 relative group py-1"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#4640DE] transition-all duration-200 group-hover:w-full rounded-full" />
                </Link>
              ))}
            </div>
          </div>

          {/* Right Actions: Language + Auth + CTA in Brand Blue */}
          <div className="hidden md:flex items-center gap-3 lg:gap-4">
            <LanguageSwitcher />

            <Link
              href="/sign-in"
              className="text-sm font-semibold text-[#25324B] hover:text-[#4640DE] px-3 py-2 transition-colors duration-200"
            >
              {t("navbar.login")}
            </Link>

            <Button
              className="bg-[#4640DE] hover:bg-[#3730C9] text-white text-sm font-semibold px-5 py-2.5 rounded-full shadow-[0_4px_14px_rgba(70,64,222,0.35)] transition-all duration-300 hover:shadow-[0_6px_20px_rgba(70,64,222,0.45)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              asChild
            >
              <Link href="/sign-up" className="flex items-center gap-1.5">
                <span>{t("navbar.signUp")}</span>
                <ArrowRight size={15} />
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <LanguageSwitcher />
            <button
              className="p-2 rounded-xl text-[#25324B] hover:bg-[#F8F8FD] transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={t("navbar.toggleMenu")}
            >
              {isOpen ? (
                <X size={24} className="text-[#25324B]" />
              ) : (
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#F8F8FD] border border-[#25324B]/15">
                  <HiOutlineMenuAlt2 size={22} className="text-[#25324B]" />
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-[#25324B]/10 px-6 py-5 shadow-2xl animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col gap-1 pb-4">
              {navigations.map((item, index) => (
                <Link
                  key={index}
                  href={item.path}
                  onClick={() => setIsOpen(false)}
                  className="text-base font-semibold text-[#25324B] hover:text-[#4640DE] py-3 border-b border-gray-100 last:border-b-0 transition-colors flex items-center justify-between"
                >
                  <span>{item.name}</span>
                  <ArrowRight size={16} className="text-[#7C8493]" />
                </Link>
              ))}
            </div>

            <div className="flex flex-col gap-3 pt-4 border-t border-gray-100">
              <Link
                href="/sign-in"
                onClick={() => setIsOpen(false)}
                className="w-full text-center py-2.5 font-semibold text-[#25324B] hover:text-[#4640DE] border border-[#25324B]/20 rounded-full transition-colors"
              >
                {t("navbar.login")}
              </Link>
              <Button
                className="w-full bg-[#4640DE] hover:bg-[#3730C9] text-white font-semibold py-2.5 rounded-full shadow-md"
                asChild
              >
                <Link href="/sign-up" onClick={() => setIsOpen(false)}>
                  {t("navbar.signUp")}
                </Link>
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
