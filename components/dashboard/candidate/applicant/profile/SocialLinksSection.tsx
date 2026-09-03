"use client";

import { useState } from "react";
import { PencilSquareIcon, LinkIcon, GlobeAltIcon } from "@heroicons/react/24/outline";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

import { useMyCandidateProfile } from "@/core/hooks/candidate/use-my-candidate-profile";
import { SectionSkeleton } from "./shared/Skeleton";
import EditSocialLinksModal from "./Profile/EditSocialLinksModal";

function LinkedInIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.47v6.27zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.48 2 2 6.58 2 12.2c0 4.5 2.87 8.32 6.84 9.67.5.1.68-.22.68-.49 0-.24-.01-.88-.01-1.72-2.78.62-3.37-1.36-3.37-1.36-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.73 0 0 .84-.28 2.75 1.05a9.3 9.3 0 0 1 5 0c1.9-1.33 2.75-1.05 2.75-1.05.55 1.42.2 2.47.1 2.73.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.79-4.57 5.05.36.32.68.94.68 1.9 0 1.37-.01 2.48-.01 2.82 0 .27.18.6.69.49A10.02 10.02 0 0 0 22 12.2C22 6.58 17.52 2 12 2z"
      />
    </svg>
  );
}

function displayUrl(url: string) {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

type SocialLink = { platform: string; url: string; icon: React.ReactNode };

export default function SocialLinksSection() {
  const t = useTranslations("candidateProfileCore.socialLinksSection");
  const { data: profile, isLoading, isError } = useMyCandidateProfile();
  const [editOpen, setEditOpen] = useState(false);

  const candidates: { platform: string; url: string | null | undefined; icon: React.ReactNode }[] = [
    { platform: t("platforms.linkedin"), url: profile?.candidateProfile?.linkedinUrl, icon: <LinkedInIcon /> },
    { platform: t("platforms.github"), url: profile?.candidateProfile?.githubUrl, icon: <GitHubIcon /> },
    { platform: t("platforms.website"), url: profile?.candidateProfile?.portfolioUrl, icon: <GlobeAltIcon className="h-5 w-5" /> },
  ];
  const links: SocialLink[] = candidates.filter((link): link is SocialLink => Boolean(link.url));

  return (
    <div className="bg-white border border-gray-200 p-6 font-epilogue">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-[18px] font-bold text-[#202430]">{t("title")}</h2>
        <button
          type="button"
          onClick={() => setEditOpen(true)}
          disabled={isLoading}
          aria-label={t("editAria")}
          className="cursor-pointer border border-gray-200 p-1.5 hover:border-indigo-400 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
        >
          <PencilSquareIcon className="w-4 h-4 text-brand" />
        </button>
      </div>

      {isLoading && <SectionSkeleton rows={2} />}

      {!isLoading && isError && (
        <p className="text-[14px] text-gray-500">{t("errorLoading")}</p>
      )}

      {!isLoading && !isError && links.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-2 py-6 text-center">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-50 text-brand">
            <LinkIcon className="h-5 w-5" />
          </span>
          <p className="text-[15px] font-medium text-[#202430]">{t("emptyTitle")}</p>
          <p className="text-[14px] text-gray-500">{t("emptyDescription")}</p>
          <button
            type="button"
            onClick={() => setEditOpen(true)}
            className="mt-2 cursor-pointer text-[14px] font-semibold text-brand transition-colors hover:text-indigo-800"
          >
            {t("addButton")}
          </button>
        </div>
      )}

      {!isLoading && !isError && links.length > 0 && (
        <div className="flex flex-col gap-5">
          {links.map((link) => (
            <div key={link.platform} className="flex items-center gap-3">
              <span className="text-gray-400 flex-shrink-0 mt-0.5">{link.icon}</span>
              <div className="min-w-0">
                <p className="text-[14px] text-gray-400">{link.platform}</p>
                <Link
                  href={link.url}
                  target="_blank"
                  className="text-[16px] text-brand hover:text-indigo-800 transition-colors mt-0.5 block truncate"
                >
                  {displayUrl(link.url)}
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {profile && <EditSocialLinksModal open={editOpen} onOpenChange={setEditOpen} profile={profile} />}
    </div>
  );
}
