"use client";

import {
  Pencil,
  X,
} from "lucide-react";

import { Benefit } from "./types";
import Image from "next/image";

const iconMap = {
  Healthcare: (
    <Image src="/park1.png" alt="Healthcare" width={35} height={35} />
  ),
  Remote: (
    <Image src="/park2.png" alt="Remote" width={35} height={35} />
  ),
  Vacation: (
    <Image src="/park3.png" alt="Vacation" width={35} height={35} />
  ),
  Gym: (
    <Image src="/park4.png" alt="Gym" width={35} height={35} />
  ),
  Learning: (
    <Image src="/park5.png" alt="Learning" width={35} height={35} />
  ),
};

interface BenefitCardProps {
  benefit: Benefit;
  onDelete: (id: number) => void;
  onEdit?: (benefit: Benefit) => void;
}

export default function BenefitCard({
  benefit,
  onDelete,
  onEdit,
}: BenefitCardProps) {
  return (
    <div className="group rounded-sm border border-gray-200 bg-white p-3 transition hover:border-indigo-300 hover:shadow-md">
      <div className="flex items-start justify-between">
        {/* Icon */}
        <div className="flex h-14 w-14 items-center justify-center rounded-xl text-indigo-600">
          {iconMap[benefit.icon as keyof typeof iconMap]}
        </div>

        {/* Actions */}
        <div className="flex gap-2 ">
          <button
            type="button"
            onClick={() => onEdit?.(benefit)}
            className="rounded-md p-2 text-gray-500 opacity-0 transition group-hover:opacity-100 hover:text-indigo-600"
          >
            <Pencil size={18} />
          </button>

          <button
            type="button"
            onClick={() => onDelete(benefit.id)}
            className="p-2 text-neutral-500 "
          >
            <X size={18} />
          </button>
        </div>
      </div>

      <h3 className="mt-5 text-lg font-semibold text-gray-900">
        {benefit.title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-gray-500">
        {benefit.description}
      </p>
    </div>
  );
}
