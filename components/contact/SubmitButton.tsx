"use client";

import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

export default function SubmitButton() {
  const t = useTranslations("contact");

  return (
    <button
      type='submit'
      className='cursor-pointer inline-flex items-center gap-6 bg-[#40EBC7] hover:bg-[#32dcb9] text-[#0D2145] font-medium px-8 py-4 transition-colors'
    >
      <span>{t("submit")}</span>
      <ArrowRight size={20} strokeWidth={2.5} />
    </button>
  );
}
