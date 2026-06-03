"use client";

import { useState } from "react";
import {
  FacebookIcon,
  InstagramIcon,
  DribbbleIcon,
  LinkedInIcon,
  TwitterIcon,
} from "@/components/landing/icons";
import Image from "next/image";

function FooterBrand() {
  return (
    <div className="col-span-2 md:col-span-1">
      <div className="mb-4">
        <Image src="/LogoWhite.png" alt="logo-white" width={100} height={100} />
      </div>
      <p className="text-sm text-gray-400 leading-relaxed">
        Great platform for the job seeker that passionate about startups. Find your dream job easier.
      </p>
    </div>
  );
}

function FooterLinkColumn({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <h3 className="text-sm font-bold text-white mb-5">{title}</h3>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link}>
            <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function NewsletterSignup() {
  const [email, setEmail] = useState("");

  return (                                                                        
    <div className="col-span-2 md:col-span-1">
      <h3 className="text-sm font-bold text-white mb-2">Get job notifications</h3>
      <p className="text-sm text-gray-400 mb-4 leading-relaxed">
        The latest job news, articles, sent to your inbox weekly.
      </p>
      {/* On mobile: input full width, button full width below */}
      <div className="flex flex-col gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
          className="w-full text-sm text-gray-800 bg-white px-4 py-3 outline-none placeholder-gray-400"
        />
        <button className="w-full sm:w-auto self-start bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-8 py-3 transition-colors whitespace-nowrap">
          Subscribe
        </button>
      </div>
    </div>
  );
}

function SocialIcons() {
  const socials = [
    { icon: <FacebookIcon />, label: "Facebook" },
    { icon: <InstagramIcon />, label: "Instagram" },
    { icon: <DribbbleIcon />, label: "Dribbble" },
    { icon: <LinkedInIcon />, label: "LinkedIn" },
    { icon: <TwitterIcon />, label: "Twitter" },
  ];

  return (
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
  );
}

function FooterBottom() {
  return (
    <div className="flex flex-col items-center gap-4 pt-6 border-t border-gray-700 md:flex-row md:justify-between">
      <p className="text-xs text-gray-500 text-center md:text-left">
        2021 @ JobHuntly. All rights reserved.
      </p>
      <SocialIcons />
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-gray-900 px-6 sm:px-18 pt-14 pb-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10 mb-12">
        {/* Row 1 mobile: spans full 2 cols */}
        <FooterBrand />

        {/* Row 2 mobile: About (col 1) + Resources (col 2) */}
        <FooterLinkColumn
          title="About"
          links={["Companies", "Pricing", "Terms", "Advice", "Privacy Policy"]}
        />
        <FooterLinkColumn
          title="Resources"
          links={["Help Docs", "Guide", "Updates", "Contact Us"]}
        />

        {/* Row 3 mobile: spans full 2 cols */}
        <NewsletterSignup />
      </div>
      <FooterBottom />
    </footer>
  );
}