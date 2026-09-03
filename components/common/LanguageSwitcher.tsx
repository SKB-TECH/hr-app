"use client";

import { Globe2 } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

type Locale = "fr" | "en";

export default function LanguageSwitcher({ className = "" }: { className?: string }) {
  const locale = useLocale() as Locale;
  const t = useTranslations("common");

  function changeLocale(nextLocale: Locale) {
    if (nextLocale === locale) return;

    const nextPathname = window.location.pathname.match(/^\/(fr|en)(?=\/|$)/)
      ? window.location.pathname.replace(/^\/(fr|en)(?=\/|$)/, `/${nextLocale}`)
      : `/${nextLocale}${window.location.pathname}`;

    window.location.assign(`${nextPathname}${window.location.search}${window.location.hash}`);
  }

  return (
    <div
      className={`inline-flex h-9 items-center border border-brand-light-neutral bg-white p-1 ${className}`}
      role="group"
      aria-label={t("languageSwitcher.changeLanguage")}
    >
      <Globe2 className="mx-1 hidden size-4 text-neutral-60 sm:block" aria-hidden="true" />
      {(["fr", "en"] as const).map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => changeLocale(item)}
          aria-pressed={locale === item}
          aria-label={item === "fr" ? "Français" : "English"}
          className={`h-7 min-w-8 px-2 text-xs font-bold uppercase transition-colors ${
            locale === item
              ? "bg-brand text-white"
              : "text-neutral-60 hover:bg-brand-light-neutral/40 hover:text-brand"
          }`}
        >
          {item}
        </button>
      ))}
    </div>
  );
}
