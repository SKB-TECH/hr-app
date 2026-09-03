"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { PlusIcon, FolderPlusIcon } from "@heroicons/react/24/outline";

import { useCandidatePortfolios } from "@/core/hooks/candidate/use-candidate-portfolios";
import { SectionSkeleton } from "./shared/Skeleton";
import PortfolioItem from "./Portfolio/PortfolioItem";
import PortfolioModal from "./Portfolio/PortfolioModal";
import DeletePortfolioDialog from "./Portfolio/DeletePortfolioDialog";
import type { CandidatePortfolio } from "@/core/types/candidate-portfolio";

export default function PortfoliosSection() {
  const t = useTranslations("candidateProfileSections");
  const { data: portfolios = [], isLoading, isError } = useCandidatePortfolios();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingPortfolio, setEditingPortfolio] = useState<CandidatePortfolio | null>(null);
  const [deletingPortfolio, setDeletingPortfolio] = useState<CandidatePortfolio | null>(null);

  const openAddModal = () => {
    setEditingPortfolio(null);
    setModalOpen(true);
  };

  const openEditModal = (portfolio: CandidatePortfolio) => {
    setEditingPortfolio(portfolio);
    setModalOpen(true);
  };

  return (
    <div className="bg-white border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-[18px] font-bold text-[#202430]">{t("portfolio.sectionTitle")}</h2>
        <button
          type="button"
          onClick={openAddModal}
          aria-label={t("portfolio.addAriaLabel")}
          className="cursor-pointer border border-gray-200 p-1.5 hover:border-brand"
        >
          <PlusIcon className="w-4 h-4 text-brand" />
        </button>
      </div>

      {isLoading && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <SectionSkeleton rows={1} />
          <SectionSkeleton rows={1} />
        </div>
      )}

      {!isLoading && isError && (
        <p className="text-[14px] text-gray-500">{t("portfolio.loadError")}</p>
      )}

      {!isLoading && !isError && portfolios.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-2 py-8 text-center">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-50 text-brand">
            <FolderPlusIcon className="h-5 w-5" />
          </span>
          <p className="text-[15px] font-medium text-[#202430]">{t("portfolio.emptyTitle")}</p>
          <p className="text-[14px] text-gray-500">{t("portfolio.emptyDescription")}</p>
          <button
            type="button"
            onClick={openAddModal}
            className="mt-2 cursor-pointer text-[14px] font-semibold text-brand transition-colors hover:text-indigo-800"
          >
            {t("portfolio.addButton")}
          </button>
        </div>
      )}

      {!isLoading && !isError && portfolios.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {portfolios.map((portfolio, index) => (
            <PortfolioItem key={portfolio.id} portfolio={portfolio} index={index} onEdit={openEditModal} onDelete={setDeletingPortfolio} />
          ))}
        </div>
      )}

      <PortfolioModal open={modalOpen} onOpenChange={setModalOpen} portfolio={editingPortfolio} />
      <DeletePortfolioDialog portfolio={deletingPortfolio} onOpenChange={(open) => !open && setDeletingPortfolio(null)} />
    </div>
  );
}
