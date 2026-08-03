'use client';

import { PencilSquareIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

interface SocialLink {
  platform: string;
  url: string;
  displayUrl: string;
  icon: React.ReactNode;
}

function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22 5.92c-.77.36-1.6.6-2.46.7a4.27 4.27 0 0 0 1.87-2.36 8.5 8.5 0 0 1-2.7 1.04 4.24 4.24 0 0 0-7.24 3.87A12.05 12.05 0 0 1 3 4.6a4.25 4.25 0 0 0 1.32 5.67 4.2 4.2 0 0 1-1.92-.53 4.25 4.25 0 0 0 3.41 4.22 4.25 4.25 0 0 1-1.92.07 4.25 4.25 0 0 0 3.97 2.95A8.52 8.52 0 0 1 2 18.57a12.02 12.02 0 0 0 6.5 1.9c7.8 0 12.07-6.55 12.07-12.24 0-.19 0-.37-.01-.55A8.6 8.6 0 0 0 22 5.92z" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20z" />
    </svg>
  );
}

interface SocialLinksSectionProps {
  links?: SocialLink[];
}

const defaultLinks: SocialLink[] = [
  {
    platform: "Instagram",
    url: "https://instagram.com/jakegyll",
    displayUrl: "instagram.com/jakegyll",
    icon: <InstagramIcon />,
  },
  {
    platform: "Twitter",
    url: "https://twitter.com/jakegyll",
    displayUrl: "twitter.com/jakegyll",
    icon: <TwitterIcon />,
  },
  {
    platform: "Website",
    url: "https://www.jakegyll.com",
    displayUrl: "www.jakegyll.com",
    icon: <GlobeIcon />,
  },
];

export default function SocialLinksSection({ links = defaultLinks }: SocialLinksSectionProps) {
  return (
    <div className="bg-white border border-gray-200 p-6 font-epilogue">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-[18px] font-bold text-[#202430]">Social Links</h2>
        <button className="border border-gray-200 p-1.5  hover:border-indigo-400 transition-colors">
          <PencilSquareIcon className="w-4 h-4 text-brand" />
        </button>
      </div>

      <div className="flex flex-col gap-5">
        {links.map((link) => (
          <div key={link.platform} className="flex items-center gap-3">
            <span className="text-gray-400 flex-shrink-0 mt-0.5">{link.icon}</span>
            <div className="min-w-0">
              <p className="text-[14px] text-gray-400">{link.platform}</p>
              <Link
                href={link.url}
                target="_blank"
                className="text-[16px]  text-brand hover:text-indigo-800 transition-colors mt-0.5 block truncate"
              >
                {link.displayUrl}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

