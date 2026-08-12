"use client";
import Image from "next/image";
import { Company } from "@/types/types";
import SharedCard from "@/components/common/navbar/SharedCard";
import Link from "next/link";

export function JobsCard({
  company,
  viewGrid,
  applyLink,
}: {
  company: Company;
  viewGrid: boolean;
  applyLink: string;
}) {
  //grid on md csreen and above
  if (viewGrid) {
    return (
      <SharedCard>
        <div className="flex flex-col gap-4 h-full">
          <div className="flex  items-start justify-between">
            <Image
              src={company.src}
              alt={company.name}
              width={48}
              height={48}
              className="w-12 h-12 object-cover"
            />{" "}
            <span className="px-3 py-1 m-1 rounded-full bg-[#56CDAD1A] text-[#56CDAD] inline-flex items-center font-medium whitespace-nowrap">
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
          <div className="mt-auto">
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
      </SharedCard>
    );
  }

  // current layout card
  return (
    <SharedCard>
      <div className="flex flex-col justify-between h-full md:flex-row gap-4 md:gap-5">
        <div className="flex flex-col md:flex-row gap-6">
          <Image
            src={company.src}
            alt={company.name}
            width={80}
            height={80}
            className="max-sm:w-[48px] max-sm:h-[48px] w-20 h-20 object-cover"
          />
          <div className="flex flex-col ">
            <Link href={`/candidate/find-jobs/1`}>
              <h2 className="text-[20px] hover:text-brand  font-semibold md:font-bold text-neutral-100 md:my-2 block">
                {company.name}
              </h2>
            </Link>

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
        <div className="flex flex-col gap-4 w-full md:w-auto">
          <Link
            href={applyLink}
            className="bg-brand hover:bg-indigo-800 duration-300 text-white font-epilogue px-15 py-3  text-center"
          >
            Apply
          </Link>

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
