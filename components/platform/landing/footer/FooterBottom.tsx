"use client";

import { useTranslations } from "next-intl";
import {
  FacebookIcon,
  InstagramIcon,
  DribbbleIcon,
  LinkedInIcon,
  TwitterIcon,
} from "@/components/platform/landing/icons";

export default function FooterBottom() {
  const t = useTranslations("landing");
  const socials = [
    { icon: <FacebookIcon />, label: "Facebook" },
    { icon: <InstagramIcon />, label: "Instagram" },
    { icon: <DribbbleIcon />, label: "Dribbble" },
    { icon: <LinkedInIcon />, label: "LinkedIn" },
    { icon: <TwitterIcon />, label: "Twitter" },
  ];

  return (
    <div className="flex flex-col items-center gap-4 pt-8 md:flex-row md:justify-between">
      <p className="text-xs text-white/50 text-center md:text-left">
        {t("footer.bottom.copyright", { year: new Date().getFullYear() })}
      </p>

      <div className="flex items-center justify-center md:justify-end gap-2.5 flex-wrap">
        {socials.map(({ icon, label }) => (
          <a
            key={label}
            href="#"
            aria-label={label}
            className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-[#4640DE] hover:border-[#4640DE] hover:scale-105 transition-all duration-300"
          >
            {icon}
          </a>
        ))}
      </div>
    </div>
  );
}
