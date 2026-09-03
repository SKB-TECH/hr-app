"use client";
import { useTranslations } from "next-intl";
import { FooterBrand } from "@/components/platform/landing/footer/FooterBrand";
import { FooterLinkColum } from "@/components/platform/landing/footer/FooterLinksColum";
import { NewsletterSignup } from "@/components/platform/landing/footer/NewsletterSignup";
import FooterBottom from "@/components/platform/landing/footer/FooterBottom";

export default function Footer() {
  const t = useTranslations("landing");

  return (
    <footer className="bg-gray-900  pt-16 pb-8">
      <div className=" w-full max-w-7xl mx-auto px-4  md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-x-10 gap-y-10 mb-14">
          <FooterBrand />
          <FooterLinkColum
            title={t("footer.columns.about.title")}
            links={t.raw("footer.columns.about.links")}
          />
          <FooterLinkColum
            title={t("footer.columns.resources.title")}
            links={t.raw("footer.columns.resources.links")}
          />
          <NewsletterSignup />
        </div>
        <FooterBottom />
      </div>
    </footer>
  );
}
