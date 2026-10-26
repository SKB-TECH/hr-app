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
        description="Select executive benefits and incentives from the platform catalog."
        className="border-none"
      >
        <div className="mb-8 flex max-w-xl gap-3">
          <select
            value={selectedId}
            onChange={(event) => setSelectedId(event.target.value)}
            className="min-w-0 flex-1 border border-[#D6DDEB] bg-white rounded-none px-4 py-3 text-sm font-medium text-[#132745] outline-none focus:border-[#4640DE] focus:ring-1 focus:ring-[#4640DE]"
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
            className="inline-flex items-center gap-2 bg-[#4640DE] hover:bg-[#3730C9] disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed px-6 py-3 font-semibold text-sm text-white rounded-none transition-all cursor-pointer shadow-sm"
          >
            <Plus size={16} /> Add
          </button>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {data.benefits.map((benefit) => (
            <BenefitCard key={benefit.id} benefit={benefit} onDelete={handleDelete} />
          ))}
        </div>
      </FormSection>

    </div>
  );
}
