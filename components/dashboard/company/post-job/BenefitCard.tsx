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
    <div className="group rounded-none border border-[#D6DDEB] bg-white p-5 transition-all hover:border-[#4640DE] hover:shadow-[0_4px_20px_rgba(70,64,222,0.06)]">
      <div className="flex items-start justify-between">
        {/* Icon Container */}
        <div className="flex h-12 w-12 items-center justify-center rounded-none bg-[#F8F9FC] border border-[#E4E7EC] text-[#4640DE]">
          {iconMap[benefit.icon as keyof typeof iconMap]}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1">
          {onEdit && (
            <button
              type="button"
              onClick={() => onEdit(benefit)}
              className="rounded-none p-1.5 text-gray-400 opacity-0 transition-opacity group-hover:opacity-100 hover:text-[#4640DE] cursor-pointer"
            >
              <Pencil size={16} />
            </button>
          )}

          <button
            type="button"
            onClick={() => onDelete(benefit.id)}
            className="p-1.5 text-gray-400 hover:text-red-500 transition-colors cursor-pointer rounded-none"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      <h3 className="mt-4 text-base font-bold font-clash text-[#132745]">
        {benefit.title}
      </h3>

      <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-[#7C8493]">
        {benefit.description}
      </p>
    </div>
  );
}

