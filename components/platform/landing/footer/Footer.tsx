"use client";
import { FooterBrand } from "@/components/platform/landing/footer/FooterBrand";
import { FooterLinkColum } from "@/components/platform/landing/footer/FooterLinksColum";
import { NewsletterSignup } from "@/components/platform/landing/footer/NewsletterSignup";
import FooterBottom from "@/components/platform/landing/footer/FooterBottom";

export default function Footer() {
  return (
    <footer className="bg-gray-900  pt-16 pb-8">
      <div className=" w-full max-w-7xl mx-auto px-4  md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-x-10 gap-y-10 mb-14">
          <FooterBrand />
          <FooterLinkColum
            title="About"
            links={[
              "Companies",
              "Pricing",
              "Terms",
              "Advice",
              "Privacy Policy",
            ]}
          />
          <FooterLinkColum
            title="Resources"
            links={["Help Docs", "Guide", "Updates", "Contact Us"]}
          />
          <NewsletterSignup />
        </div>
        <FooterBottom />
      </div>
    </footer>
  );
}
