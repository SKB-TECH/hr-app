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
    {
      icon: <FacebookIcon />,
      label: "Facebook",
      href: "https://facebook.com/fast2hire",
    },
    {
      icon: <InstagramIcon />,
      label: "Instagram",
      href: "https://instagram.com/fast2hire",
    },
    {
      icon: <DribbbleIcon />,
      label: "Dribbble",
      href: "https://dribbble.com/fast2hire",
    },
    {
      icon: <LinkedInIcon />,
      label: "LinkedIn",
      href: "https://linkedin.com/company/fast2hire",
    },
    {
      icon: <TwitterIcon />,
      label: "Twitter",
      href: "https://twitter.com/fast2hire",
    },
  ];

  const copyrightText =
    t("footer.bottom.copyright", { year: 2026 }) ||
    "2026 ©Fast2Hire. All rights reserved.";

  return (
    <div className="flex flex-col items-center gap-4 pt-8 md:flex-row md:justify-between">
      <p className="text-xs text-white/60 text-center md:text-left">
        {copyrightText.replace("JobHuntly", "Fast2Hire")}
      </p>

      <div className="flex items-center justify-center md:justify-end gap-2.5 flex-wrap">
        {socials.map(({ icon, label, href }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Follow Fast2Hire on ${label}`}
            title={label}
            className="w-9 h-9 rounded-none bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-[#4640DE] hover:border-[#4640DE] hover:scale-105 active:scale-95 active:bg-[#3730C9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#26A4FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B132B] transition-all duration-300"
          >
            {icon}
          </a>
        ))}
      </div>
    </div>
  );
}
