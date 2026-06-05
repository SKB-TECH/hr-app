
"use client";
import {FooterBrand} from "@/components/landing/footer/FooterBrand"
import {FooterLinkColum} from "@/components/landing/footer/FooterLinksColum"
import {NewsletterSignup} from "@/components/landing/footer/NewsletterSignup"
import FooterBottom from "@/components/landing/footer/FooterBottom"


export default function Footer() {
  return (
    <footer className="bg-gray-900 px-6 sm:px-18 pt-16 pb-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-x-10 gap-y-10 mb-14">
          <FooterBrand />
          <FooterLinkColum
            title="About"
            links={["Companies", "Pricing", "Terms", "Advice", "Privacy Policy"]}
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