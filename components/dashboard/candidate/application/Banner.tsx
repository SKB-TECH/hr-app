import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";

export default function Banner() {
   const t = useTranslations("candidateApplications.banner");
   const [isVisible, setIsVisible] = useState(true);

   if (!isVisible) return null;

  return (
    <div className="flex mt-3 md:mt-6 px-5 md:px-6 py-5 md:py-6 border-none bg-[#F6F6FD] text-indigo-800">
      <div className="flex flex-col md:flex-row w-auto md:w-auto gap-3">
        <div>
          <Image
            width={40}
            height={40}
            src="/logo/newFeatureLogo.png"
            alt="Logo"
            className="w-10 h-10 md:w-15 md:h-15"
          />
        </div>
        <div className="flex items-start">
          <div>
            <div className="font-semibold text-[#4640DE] text-lg md:text-xl">
              {t("title")}
            </div>
            <div className="text-base md:text-sm text-neutral-60">
              <p className="md:w-2/3 ">
                {t("description")}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="ml-auto">
        <button
          onClick={() => setIsVisible(false)}
          className="text-neutral-100 text-xl md:text-sm font-bold"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
