import SharedCard from "@/components/common/navbar/SharedCard";
import Link from "next/link";
import { JobsCardProps } from "./JobsCard";
import Image from "next/image";
import { getAtsDetails } from "@/lib/candidate";
import AtsScore from "./AtsScore";

function GridJobCard({ company, applyLink, atsProps }: JobsCardProps) {
  const score = atsProps?.score ?? company.atsScore ?? 0;
  const atsInfo = atsProps?.atsInfo ?? getAtsDetails(score);

  return (
    <SharedCard>
      <div className="flex flex-col gap-4 h-full">
        <div className="flex  items-start justify-between">
          <Image
            src={company.src}
            alt={company.name}
            width={48}
            height={48}
            className="w-12 h-12 object-cover shrink-0"
          />
          <span className="px-3 py-1 m-1 rounded-full bg-[#56CDAD1A] text-[#56CDAD] inline-flex items-center font-medium whitespace-nowrap text-xs">
            {company.location}
          </span>
        </div>

        <div>
          <Link href={applyLink}>
            <h2 className="text-xl hover:text-brand font-semibold text-neutral-100">
              {company.name}
            </h2>
          </Link>
          <p className="text-neutral-60 font-epilogue text-sm mb-3 line-clamp-2">
            {company.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {company.industry.map((tag, idx) => (
            <span
              key={idx}
              style={{
                backgroundColor: tag.style.bg,
                borderColor: tag.style.color,
                color: tag.style.color,
              }}
              className="text-sm px-3 py-1 rounded-full border"
            >
              {tag.name}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-3 border-t border-gray-100 flex flex-col gap-2">
          {/* ATS Score */}
          <AtsScore score={score} atsInfo={atsInfo} />

          {/* Capacity Bar */}
          <div>
            <div className="w-full h-1.5 bg-gray-200">
              <div
                className="h-full bg-[#56CDAD]"
                style={{
                  width: `${(company.applied / company.capacity) * 100}%`,
                }}
              />
            </div>

            <p className="mt-2 text-sm text-neutral-60">
              <span className="font-semibold text-neutral-100">
                {company.applied} Applied
              </span>{" "}
              of {company.capacity} capacity
            </p>
          </div>
        </div>
      </div>
    </SharedCard>
  );
}

export default GridJobCard;
