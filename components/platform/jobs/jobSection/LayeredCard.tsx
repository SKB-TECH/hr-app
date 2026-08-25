import SharedCard from "@/components/common/navbar/SharedCard";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import AtsScore from "./AtsScore";
import { JobsCardProps } from "./JobsCard";
import { getAtsDetails } from "@/lib/candidate";

function LayeredCard({ company, applyLink, atsProps }: JobsCardProps) {
  const score = atsProps?.score ?? company.atsScore ?? 0;
  const atsInfo = atsProps?.atsInfo ?? getAtsDetails(score);

  return (
    <SharedCard>
      <div className="flex flex-col justify-between h-full md:flex-row gap-4 md:gap-5">
        <div className="flex flex-col md:flex-row gap-6 flex-1">
          <Image
            src={company.src}
            alt={company.name}
            width={80}
            height={80}
            className="max-sm:w-[48px] max-sm:h-[48px] w-20 h-20 object-cover shrink-0"
          />
          <div className="flex flex-col justify-between">
            <div>
              <Link href={applyLink}>
                <h2 className="text-[20px] hover:text-brand font-semibold md:font-bold text-neutral-100 md:my-2 block">
                  {company.name}
                </h2>
              </Link>

              <p className="text-neutral-60 font-epilogue text-[16px] mb-3 line-clamp-2 md:line-clamp-4">
                {company.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-[14px] px-4 py-1.5 rounded-full font-medium bg-[#56CDAD1A] text-[#56CDAD]">
                {company.location}
              </span>
              <div className="h-8 w-0.5 bg-gray-200 self-center hidden sm:block" />
              {company.industry.map((tag, idx) => (
                <span
                  key={idx}
                  style={{
                    backgroundColor: tag.style.bg,
                    borderColor: tag.style.color,
                    color: tag.style.color,
                  }}
                  className=" text-[14px] px-4 py-1.5 rounded-full font-medium border "
                >
                  {tag.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col max-md:space-y-4 max-md:gap-0 gap-3.5 w-full md:w-56 shrink-0">
          <Link
            href={applyLink}
            className="bg-brand hover:bg-indigo-800 duration-300 text-white font-epilogue px-8 py-3 text-center font-semibold block"
          >
            Apply
          </Link>

          {/* ATS Score */}
          <AtsScore score={score} atsInfo={atsInfo} />

          <div className="w-full">
            <div className="w-full h-1.5 bg-gray-200 overflow-hidden">
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
              </span>
              <span> of {company.capacity} capacity</span>
            </p>
          </div>
        </div>
      </div>
    </SharedCard>
  );
}

export default LayeredCard;
