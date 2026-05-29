"use client";

import { useState } from "react";
import {
  FacebookIcon,
  InstagramIcon,
  DribbbleIcon,
  LinkedInIcon,
  TwitterIcon,
  LogoIcon,
} from "@/components/landing/icons";

function FooterBrand() {
  return (
    <div className="max-w-xs">
      <div className="flex items-center gap-2 mb-4">
        <LogoIcon />
        <span className="text-lg font-extrabold text-white tracking-tight">JobHuntly</span>
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
    <div>
      <h3 className="text-sm font-bold text-white mb-2">Get job notifications</h3>
      <p className="text-sm text-gray-400 mb-4 leading-relaxed">
        The latest job news, articles, sent to your inbox weekly.
      </p>
      <div className="flex gap-2 flex-col sm:flex-row">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
          className="flex-1 text-sm text-gray-800 bg-white px-4 py-2.5 outline-none placeholder-gray-400 min-w-0"
        />
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-5 py-2.5 transition-colors whitespace-nowrap">
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
    <div className="flex items-center gap-3 flex-wrap">
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
    <div className="flex flex-col md:flex-row items-center justify-between pt-6 border-t border-gray-700 gap-4">
      <p className="text-xs text-gray-500">2021 @ JobHuntly. All rights reserved.</p>
      <SocialIcons />
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-gray-900 px-8 pt-14 pb-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <FooterBrand />
          <FooterLinkColumn title="About" links={["Companies", "Pricing", "Terms", "Advice", "Privacy Policy"]} />
          <FooterLinkColumn title="Resources" links={["Help Docs", "Guide", "Updates", "Contact Us"]} />
          <NewsletterSignup />
        </div>
        <FooterBottom />
      </div>
    </footer>
  );
}
