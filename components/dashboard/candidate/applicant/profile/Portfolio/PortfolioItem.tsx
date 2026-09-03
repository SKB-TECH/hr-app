"use client";

import { useTranslations } from "next-intl";
import { ArrowTopRightOnSquareIcon, PencilSquareIcon, TrashIcon, FolderIcon } from "@heroicons/react/24/outline";
import type { CandidatePortfolio } from "@/core/types/candidate-portfolio";

const ACCENT_COLORS = ["#4640DE", "#56CDAD", "#FFB836", "#FF6550", "#26A4FF"];

interface PortfolioItemProps {
  portfolio: CandidatePortfolio;
  index: number;
  onEdit: (portfolio: CandidatePortfolio) => void;
  onDelete: (portfolio: CandidatePortfolio) => void;
}

export default function PortfolioItem({ portfolio, index, onEdit, onDelete }: PortfolioItemProps) {
  const t = useTranslations("candidateProfileSections");
  const accentColor = ACCENT_COLORS[index % ACCENT_COLORS.length];

  return (
    <div className="flex flex-col border border-gray-100 transition-colors hover:border-gray-200">
      <div className="relative h-[140px] overflow-hidden border-t-4" style={{ borderColor: accentColor }}>
        {portfolio.thumbnailUrl ? (
          // Thumbnails come from arbitrary external storage URLs, so a plain
          // <img> avoids next/image's remote-pattern allow-list restriction.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={portfolio.thumbnailUrl}
            alt={portfolio.title}
            className="h-full w-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center" style={{ backgroundColor: `${accentColor}0D` }}>
            <span className="flex h-12 w-12 items-center justify-center rounded-full" style={{ backgroundColor: `${accentColor}1A`, color: accentColor }}>
              <FolderIcon className="h-6 w-6" />
            </span>
          </div>
        )}

        <div className="absolute top-2 right-2 flex items-center gap-2">
          <button
            type="button"
            onClick={() => onEdit(portfolio)}
            aria-label={t("portfolio.editAriaLabel", { title: portfolio.title })}
            className="cursor-pointer border border-gray-200 bg-white/95 p-1.5 hover:border-brand"
          >
            <PencilSquareIcon className="w-4 h-4 text-brand" />
          </button>
          <button
            type="button"
            onClick={() => onDelete(portfolio)}
            aria-label={t("portfolio.deleteAriaLabel", { title: portfolio.title })}
            className="cursor-pointer border border-gray-200 bg-white/95 p-1.5 hover:border-red-300"
          >
            <TrashIcon className="w-4 h-4 text-[#FF6550]" />
          </button>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-[16px] font-bold text-[#202430]">{portfolio.title}</h3>

        {portfolio.description && <p className="mt-1.5 line-clamp-3 text-[14px] text-gray-500 leading-relaxed">{portfolio.description}</p>}

        {portfolio.projectUrl && (
          <a
            href={portfolio.projectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-medium text-brand hover:underline"
          >
            {t("portfolio.viewProject")}
            <ArrowTopRightOnSquareIcon className="h-3.5 w-3.5" />
          </a>
        )}
      </div>
    </div>
  );
}
