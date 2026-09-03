"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import FormSection from "./FormSection";
import BenefitCard from "./BenefitCard";
import { JobData } from "./types";
import { usePlatformReferences } from "@/core/hooks/references/use-platform-references";

interface PerksBenefitsProps {
  data: JobData;
  updateData: (values: Partial<JobData>) => void;
}

export default function PerksBenefits({ data, updateData }: PerksBenefitsProps) {
  const [selectedId, setSelectedId] = useState("");
  const { data: catalog = [], isLoading } = usePlatformReferences("benefit");
  const available = catalog.filter(
    (item) => !data.benefits.some((benefit) => benefit.title === item.name),
  );

  const handleAdd = () => {
    const reference = catalog.find((item) => item.id === selectedId);
    if (!reference) return;
    updateData({
      benefits: [
        ...data.benefits,
        {
          id: Date.now(),
          title: reference.name,
          description: reference.description || "",
          icon: reference.icon || "Healthcare",
        },
      ],
    });
    setSelectedId("");
  };

  const handleDelete = (id: number) => {
    updateData({ benefits: data.benefits.filter((item) => item.id !== id) });
  };

  return (
    <div className="bg-white">
      <div className="border-b pb-5">
        <h2 className="text-base font-semibold">Basic Information</h2>
        <p className="mt-2 text-sm text-gray-500">List out your top perks and benefits.</p>
      </div>
      <FormSection
        title="Perks and Benefits"
        description="Select benefits from the platform catalog."
        className="border-none"
      >
        <div className="mb-8 flex max-w-xl gap-3">
          <select
            value={selectedId}
            onChange={(event) => setSelectedId(event.target.value)}
            className="min-w-0 flex-1 border border-neutral-200 bg-white px-4 py-3 outline-none focus:border-brand"
          >
            <option value="">{isLoading ? "Loading benefits..." : "Select a benefit"}</option>
            {available.map((benefit) => (
              <option key={benefit.id} value={benefit.id}>{benefit.name}</option>
            ))}
          </select>
          <button
            type="button"
            onClick={handleAdd}
            disabled={!selectedId}
            className="flex items-center gap-2 border border-neutral-200 px-5 py-3 font-medium text-brand transition-300 hover:bg-[#f3f4f6] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Plus size={18} /> Add
          </button>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {data.benefits.map((benefit) => (
            <BenefitCard key={benefit.id} benefit={benefit} onDelete={handleDelete} />
          ))}
        </div>
      </FormSection>
    </div>
  );
}
