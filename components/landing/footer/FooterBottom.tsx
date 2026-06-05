
"use client";

import {
  FacebookIcon,
  InstagramIcon,
  DribbbleIcon,
  LinkedInIcon,
  TwitterIcon,
} from "@/components/landing/icons";

export default function FooterBottom() {
  const socials = [
    { icon: <FacebookIcon />, label: "Facebook" },
    { icon: <InstagramIcon />, label: "Instagram" },
    { icon: <DribbbleIcon />, label: "Dribbble" },
    { icon: <LinkedInIcon />, label: "LinkedIn" },
    { icon: <TwitterIcon />, label: "Twitter" },
  ];

  return (
    <div className="flex flex-col items-center gap-4 pt-6 border-t border-gray-700 md:flex-row md:justify-between">
      <p className="text-xs text-gray-500 text-center md:text-left">
  {new Date().getFullYear()}  ©JobHuntly. All rights reserved.
</p>

      <div className="flex items-center justify-center md:justify-end gap-3 flex-wrap">
        {socials.map(({ icon, label }) => (
          <a
            key={label}
            href="#"
            aria-label={label}
            className="w-9 h-9 rounded-full border border-gray-600 flex items-center justify-center text-gray-400 hover:text-white hover:border-white transition-colors"
          >
            {icon}
          </a>
        ))}
      </div>
    </div>
  );
}