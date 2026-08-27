"use client";

import { useState } from "react";
import { PlusIcon, AcademicCapIcon } from "@heroicons/react/24/outline";

import { useCandidateCertifications } from "@/core/hooks/candidate/use-candidate-certifications";
import CertificationItem from "./Certification/CertificationItem";
import CertificationModal from "./Certification/CertificationModal";
import DeleteCertificationDialog from "./Certification/DeleteCertificationDialog";
import type { CandidateCertification } from "@/core/types/candidate-certification";

export default function CertificationSection() {
  const { data: certifications = [], isLoading, isError } = useCandidateCertifications();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingCertification, setEditingCertification] = useState<CandidateCertification | null>(null);
  const [deletingCertification, setDeletingCertification] = useState<CandidateCertification | null>(null);

  const openAddModal = () => {
    setEditingCertification(null);
    setModalOpen(true);
  };

  const openEditModal = (certification: CandidateCertification) => {
    setEditingCertification(certification);
    setModalOpen(true);
  };

  return (
    <div className="bg-white border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[20px] font-bold text-[#25324B]">Certifications</h2>
        <button
          type="button"
          onClick={openAddModal}
          aria-label="Add certification"
          className="border border-gray-200 p-1.5 hover:border-brand"
        >
          <PlusIcon className="w-4 h-4 text-brand" />
        </button>
      </div>

      {isLoading && (
        <div className="space-y-4" aria-live="polite" aria-busy="true">
          {[0, 1].map((key) => (
            <div key={key} className="animate-pulse">
              <div className="h-4 w-1/3 rounded bg-gray-100" />
              <div className="mt-2 h-3 w-1/4 rounded bg-gray-100" />
              <div className="mt-2 h-3 w-1/5 rounded bg-gray-100" />
            </div>
          ))}
        </div>
      )}

      {!isLoading && isError && (
        <p className="text-[14px] text-gray-500">
          We couldn&apos;t load your certifications right now. Please refresh the page to try again.
        </p>
      )}

      {!isLoading && !isError && certifications.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-2 py-8 text-center">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-50 text-brand">
            <AcademicCapIcon className="h-5 w-5" />
          </span>
          <p className="text-[15px] font-medium text-[#202430]">No certifications yet</p>
          <p className="text-[14px] text-gray-500">Add your certifications to help recruiters see your validated skills.</p>
          <button
            type="button"
            onClick={openAddModal}
            className="mt-2 text-[14px] font-semibold text-brand hover:text-indigo-800 transition-colors"
          >
            Add Certification
          </button>
        </div>
      )}

      {!isLoading && !isError && certifications.length > 0 && (
        <div>
          {certifications.map((certification, index) => (
            <CertificationItem
              key={certification.id}
              certification={certification}
              isLast={index === certifications.length - 1}
              onEdit={openEditModal}
              onDelete={setDeletingCertification}
            />
          ))}
        </div>
      )}

      <CertificationModal open={modalOpen} onOpenChange={setModalOpen} certification={editingCertification} />
      <DeleteCertificationDialog certification={deletingCertification} onOpenChange={(open) => !open && setDeletingCertification(null)} />
    </div>
  );
}
