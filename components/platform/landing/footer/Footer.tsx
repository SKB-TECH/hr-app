"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import FooterBottom from "@/components/platform/landing/footer/FooterBottom";
import { useState } from "react";

export default function Footer() {
  const t = useTranslations("landing");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail("");
        setSubscribed(false);
      }, 4000);
    }
  };

  return (
    <footer className="bg-[#0B132B] text-white pt-16 md:pt-20 pb-10 border-t border-white/10">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-white/10">
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <Link href="/" className="mb-5 inline-block">
              <Image
                src="/logo/logow.png"
                alt="Fast2Hire Logo"
                width={160}
                height={40}
                className="h-9 w-auto object-contain"
              />
            </Link>
            <p className="text-sm text-white/70 leading-relaxed max-w-sm">
              {t("footer.brandDescription")}
            </p>
            {/* <div className="mt-6 flex items-center gap-2 px-3 py-1.5 rounded-none bg-white/5 border border-white/10 text-xs text-[#FFB836] font-medium">
              <span className="w-2 h-2 bg-[#26A4FF]" />
              <span>Certified Executive Recruitment Platform</span>
            </div> */}
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-5">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-sm text-white/70 hover:text-[#4640DE] transition-colors"
                >
                  Homepage
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-white/70 hover:text-[#4640DE] transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/jobs"
                  className="text-sm text-white/70 hover:text-[#4640DE] transition-colors"
                >
                  Find Jobs
                </Link>
              </li>
              <li>
                <Link
                  href="/companies"
                  className="text-sm text-white/70 hover:text-[#4640DE] transition-colors"
                >
                  Browse Companies
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Site Policy */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-5">
              Site Policy
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-sm text-white/70 hover:text-[#4640DE] transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-white/70 hover:text-[#4640DE] transition-colors"
                >
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-white/70 hover:text-[#4640DE] transition-colors"
                >
                  GDPR Compliance
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-white/70 hover:text-[#4640DE] transition-colors"
                >
                  Cookie Usage
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Newsletter */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-5">
              Let&apos;s Get In Touch
            </h3>

            <div className="space-y-3 text-sm text-white/80 w-full mb-6">
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-[#26A4FF] shrink-0" />
                <a
                  href="mailto:contact@fast2hire.com"
                  className="hover:text-[#4640DE] transition-colors truncate"
                >
                  contact@fast2hire.com
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Phone size={16} className="text-[#26A4FF] shrink-0 mt-0.5" />
                <div className="flex flex-col gap-1 text-sm">
                  <a
                    href="tel:+250784545831"
                    className="hover:text-[#4640DE] transition-colors"
                  >
                    +250 784 545 831
                  </a>
                  <a
                    href="tel:+243977423201"
                    className="hover:text-[#4640DE] transition-colors"
                  >
                    +243 977 423 201
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-[#FF6550] shrink-0 mt-0.5" />
                <span className="text-white/70">
                  Kinshasa, Gombe &amp; Rwanda Gisenyi
                </span>
              </div>

            </div>

            {/* Compact Newsletter Input with rounded-none */}
            <form onSubmit={handleSubscribe} className="w-full">
              <p className="text-xs text-white/70 mb-2">
                {t("footer.newsletter.heading")}
              </p>
              <div className="flex items-center rounded-none bg-white/10 border border-white/15 p-1 focus-within:border-[#4640DE] transition-colors">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("footer.newsletter.emailPlaceholder")}
                  className="w-full bg-transparent px-3 py-1.5 text-xs text-white placeholder:text-white/40 outline-none rounded-none"
                  required
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-none bg-[#4640DE] hover:bg-[#3730C9] text-white text-xs font-semibold shrink-0 transition-colors"
                >
                  {subscribed ? "✓" : <ArrowRight size={14} />}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Footer Bottom with Socials & Copyright */}
        <FooterBottom />
      </div>
    </footer>
  );
}
