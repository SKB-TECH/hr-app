"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

export function FooterBrand() {
  const t = useTranslations("landing");

  return (
    <div className="col-span-2 md:col-span-2">
      <div className="mb-5">
          <Image
              src="/logo/logow.png"
              alt="JobHuntly Logo"
              width={180}
              height={180}
              className="object-cover"
              style={{ height: "auto" }}
          />
      </div>
      <p className="text-sm text-gray-400 leading-relaxed max-w-[300px]">
        {t("footer.brandDescription")}
      </p>
    </div>
  );
}
