"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import FormSection from "./FormSection";
import BenefitCard from "./BenefitCard";
import AddBenefitModal, { BenefitForm } from "./AddBenefitModal";
import { JobData, Benefit } from "./types";

const emptyForm: BenefitForm = {
  title: "",
  description: "",
  icon: "Healthcare",
};

interface PerksBenefitsProps {
  data: JobData;
  updateData: (values: Partial<JobData>) => void;
}

export default function PerksBenefits({
  data,
  updateData,
}: PerksBenefitsProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingBenefit, setEditingBenefit] = useState<number | null>(null);

  const [benefitForm, setBenefitForm] = useState<BenefitForm>(emptyForm);

  const handleDelete = (id: number) => {
    updateData({
      benefits: data.benefits.filter((item) => item.id !== id),
    });
  };

  const handleEdit = (benefit: Benefit) => {
    setEditingBenefit(benefit.id);

    setBenefitForm({
      id: benefit.id,
      title: benefit.title,
      description: benefit.description,
      icon: benefit.icon,
    });

    setModalOpen(true);
  };

  const handleAdd = () => {
    setEditingBenefit(null);
    setBenefitForm(emptyForm);
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!benefitForm.title.trim()) return;

    const newBenefit: Benefit = {
      id: editingBenefit ?? Date.now(),
      title: benefitForm.title,
      description: benefitForm.description,
      icon: benefitForm.icon,
    };

    const updatedBenefits =
      editingBenefit !== null
        ? data.benefits.map((item) =>
            item.id === editingBenefit ? newBenefit : item,
          )
        : [...data.benefits, newBenefit];

    updateData({
      benefits: updatedBenefits,
    });

    setModalOpen(false);
    setEditingBenefit(null);
    setBenefitForm(emptyForm);
  };

  const handleClose = () => {
    setModalOpen(false);
    setEditingBenefit(null);
    setBenefitForm(emptyForm);
  };

  return (
    <>
      <div className=" bg-white">
        {/* Header */}
        <div className="border-b pb-5">
          <h2 className="text-base font-semibold">Basic Information</h2>

          <p className="mt-2 text-sm text-gray-500">
            List out your top perks and benefits.
          </p>
        </div>

        <div className="">
          <FormSection
            title="Perks and Benefits"
            description="Encourage more people to apply by sharing the attractive rewards and benefits you offer your employees"
            className="border-none"
          >
            <>
              <button
                type="button"
                onClick={handleAdd}
                className="mb-8 flex items-center gap-2 border border-neutral-200 hover:bg-[#f3f4f6] transition-300 px-5 py-3 font-medium text-brand"
              >
                <Plus size={18} />
                Add Benefit
              </button>

              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {data.benefits.map((benefit) => (
                  <BenefitCard
                    key={benefit.id}
                    benefit={benefit}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                  />
                ))}
              </div>
            </>
          </FormSection>
        </div>
      </div>

      <AddBenefitModal
        open={modalOpen}
        form={benefitForm}
        setForm={setBenefitForm}
        onClose={handleClose}
        onSave={handleSave}
      />
    </>
  );
}
