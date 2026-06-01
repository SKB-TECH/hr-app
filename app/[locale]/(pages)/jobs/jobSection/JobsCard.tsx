import Image from "next/image";
import { Company } from "@/types/types";
import SharedCard from "@/components/common/navbar/SharedCard";


export function JobsCard({ company }: { company: Company }) {
  return (
    <SharedCard>
      <div className="flex flex-col justify-between items-start md:flex-row gap-4 md:gap-5">
        <div className="flex flex-col md:flex-row gap-6">
          <Image
            src={company.src}
            alt={company.name}
            width={80}
            height={80}
            className="max-sm:w-[48px] max-sm:h-[48px] w-20 h-20 object-cover"
          />
          <div className="flex flex-col ">
            <h2 className="max-md:text-[20px] text-[24px] font-semibold md:font-bold text-neutral-100 md:my-2 block">
              {company.name}
            </h2>

            <p className="text-neutral-60 font-epilogue text-[16px] mb-3 line-clamp-2 md:line-clamp-4">
              {company.description}
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="text-[14px] px-4 py-1.5 rounded-full font-medium bg-[#56CDAD1A] text-[#56CDAD] ">
                {company.location}
              </span>
              <div className="h-8 w-0.5 bg-gray-200 self-center" />
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
        <div className="flex flex-col gap-4 w-full md:w-auto ">
          <button className="bg-brand text-white font-epilogue px-15 py-3">
            Apply
          </button>

          <div className="w-32">
            <div className="w-full h-1.5 bg-gray-200 overflow-hidden">
              <div
                className="h-full bg-[#56CDAD]"
                style={{
                  width: `${(company.applied / company.capacity) * 100}%`,
                }}
              />
            </div>

            <p className="mt-2 text-xs text-neutral-60">
              <span className="font-semibold text-neutral-100">
                {company.applied} Applied
              </span>
              <span>of {company.capacity} capacity</span>
            </p>
          </div>
        </div>
      </div>
    </SharedCard>
  );
}
