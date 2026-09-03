"use client";

import { format, parseISO } from "date-fns";
import {
  PencilSquareIcon,
  TrashIcon,
  BuildingOffice2Icon,
} from "@heroicons/react/24/outline";
import type { CandidateExperience } from "@/core/types/candidate-experience";

interface ExperienceItemProps {
  experience: CandidateExperience;
  isLast: boolean;
  onEdit: (experience: CandidateExperience) => void;
  onDelete: (experience: CandidateExperience) => void;
}

function formatExperienceDate(value: string) {
  try {
    return format(parseISO(value), "MMM yyyy");
  } catch {
    return value;
  }
}

export default function ExperienceItem({
  experience,
  isLast,
  onEdit,
  onDelete,
}: ExperienceItemProps) {
  const startLabel = formatExperienceDate(experience.startDate);
  const endLabel = experience.isCurrent
    ? "Present"
    : experience.endDate
      ? formatExperienceDate(experience.endDate)
      : "Present";
  const locationLabel = [experience.cityName, experience.countryName]
    .filter(Boolean)
    .join(", ");

  return (
    <div
      className={`sm:flex gap-4 ${!isLast ? "pb-6 mb-6 border-b border-gray-100" : ""}`}
    >
      <div className='w-12 h-12 rounded-full overflow-hidden bg-indigo-50 flex-shrink-0 flex items-center justify-center'>
        <BuildingOffice2Icon className='h-6 w-6 text-brand' />
      </div>

      <div className='flex-1 min-w-0'>
        <div className='flex items-start justify-between gap-2'>
          <h3 className='text-[18px] font-bold text-[#202430]'>
            {experience.position}
          </h3>
          <div className='flex shrink-0 items-center gap-2'>
            <button
              type='button'
              onClick={() => onEdit(experience)}
              aria-label={`Edit ${experience.position}`}
              className='cursor-pointer border border-gray-200 p-1.5 hover:border-brand'
            >
              <PencilSquareIcon className='w-4 h-4 text-brand' />
            </button>
            <button
              type='button'
              onClick={() => onDelete(experience)}
              aria-label={`Delete ${experience.position}`}
              className='cursor-pointer border border-gray-200 p-1.5 hover:border-red-300'
            >
              <TrashIcon className='w-4 h-4 text-[#FF6550]' />
            </button>
          </div>
        </div>

        <p className='text-[16px] text-gray-500 mt-1 flex items-center gap-1.5 flex-wrap'>
          <span className='font-semibold text-[#202430]'>
            {experience.companyName}
          </span>
          {experience.employmentType && (
            <>
              <span className='text-gray-300'>•</span>
              <span>
                {experience.employmentType === "FULL_TIME"
                  ? "Full Time"
                  : experience.employmentType === "PART_TIME"
                    ? "Part Time"
                    : experience.employmentType === "CONTRACT"
                      ? "Contract"
                      : experience.employmentType === "INTERNSHIP"
                        ? "Internship"
                        : experience.employmentType === "FREELANCE"
                          ? "Freelance"
                          : experience.employmentType === "TEMPORARY"
                            ? "Temporary"
                            : experience.employmentType === "VOLUNTEER"}
              </span>
            </>
          )}
          <span className='text-gray-300'>•</span>
          <span>
            {startLabel} - {endLabel}
          </span>
        </p>

        {locationLabel && (
          <p className='text-[16px] text-gray-400 mt-1'>{locationLabel}</p>
        )}

        {experience.description && (
          <p className='text-[16px] text-gray-500 leading-relaxed mt-3'>
            {experience.description}
          </p>
        )}
      </div>
    </div>
  );
}
