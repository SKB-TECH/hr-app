"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const t = useTranslations("landing");

  return (
    <div className="col-span-2 md:col-span-2">
      <h3 className="text-sm font-bold text-white mb-2">{t("footer.newsletter.heading")}</h3>
      <p className="text-sm text-gray-400 mb-5 leading-relaxed">
        {t("footer.newsletter.description")}
      </p>
      <div className="flex flex-col gap-2 md:flex-row ">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t("footer.newsletter.emailPlaceholder")}
          className="w-full md:flex-1 text-sm text-gray-800 bg-white px-4 py-3 outline-none placeholder-gray-400"
        />
        <button className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-8 py-3 transition-colors whitespace-nowrap">
          {t("footer.newsletter.subscribeButton")}
        </button>
      </div>
    </div>
  );
}