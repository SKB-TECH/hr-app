"use client";

import { useTranslations } from "next-intl";

export default function ContactInfo() {
  const t = useTranslations("contact");

  return (
    <div className='max-w-md'>
      <p className='text-[#40EBC7] font-bold uppercase  text-3xl mb-8'>
        {t("title")}
      </p>

      <h2 className='text-4xl md:text-5xl font-extrabold text-[#0D2145] leading-tight mb-8'>
        {t("heading")}
      </h2>

      <p className='text-gray-600 leading-8 text-lg'>{t("description")}</p>
    </div>
  );
}
