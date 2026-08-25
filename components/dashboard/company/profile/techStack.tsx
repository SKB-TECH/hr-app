import { companyProfiles } from "@/data/companyDetails";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { ArrowRightIcon, PlusIcon } from "lucide-react";
import Image from "next/image";
import { Link } from "@/i18n/routing";

export default function TechStack() {
  const companyDetails = companyProfiles[0];
  return (
    <div>
      {/* side stack */}
      <div className="w-full">
        <div className="flex justify-between">
          <h1 className="text-neutral-100 text-3xl font-clash font-bold">
            Tech stack
          </h1>
          <div className="flex items-center gap-2">
            <button className="border border-gray-200 p-1.5  ">
              <PlusIcon className="w-4 h-4 text-brand" />
            </button>
            <button className="border border-gray-200 p-1.5   ">
              <PencilSquareIcon className="w-4 h-4 text-brand" />
            </button>
          </div>
        </div>
        <div className="flex flex-wrap gap-10 mt-8">
          {companyDetails.techStack.map((tech) => (
            <div key={tech.name} className="flex flex-col items-center gap-5">
              <Image
                src={tech.image}
                alt={tech.name}
                width={65}
                height={65}
                className="h-15 w-15"
              />
              <span className="text-neutral-100 font-epilogue">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-10 ">
          <Link
            href="/companies/1/#"
            className="text-base md:text-[16px] text-brand font-epilogue font-semibold break-all mt-5 inline-flex items-center"
          >
            View tech stack
            <ArrowRightIcon className="inline-block h-5 w-5 ml-5" />
          </Link>
        </div>
        <hr className="bg-neutral-20 mt-3" />
        <div className="mt-10">
          <div className="flex justify-between mb-5">
            <h1 className="text-neutral-100 text-xl font-clash font-bold ">
              Office Location
            </h1>
            <div className="flex items-center gap-2">
              <button className="border border-gray-200 p-1.5  ">
                <PlusIcon className="w-4 h-4 text-brand" />
              </button>
              <button className="border border-gray-200 p-1.5   ">
                <PencilSquareIcon className="w-4 h-4 text-brand" />
              </button>
            </div>
          </div>

          <div>
            {companyDetails.offices.map((office, index) => (
              <div key={office.name} className="flex items-center gap-5 mt-5">
                <Image
                  src={office.image}
                  alt={office.name}
                  width={28}
                  height={28}
                  className="h-8 w-8"
                />
                <span className="text-neutral-100 font-semibold font-epilogue">
                  {office.name}
                </span>
                {index === 0 && (
                  <span className="bg-[#26A4FF]/10 text-[#26A4FF] px-2 py-1 rounded-full text-xs font-medium">
                    Head Quarters
                  </span>
                )}
              </div>
            ))}
            <Link
              href="/companies/1/#"
              className="text-base md:text-[16px] text-brand font-epilogue font-semibold break-all mt-5 inline-flex items-center"
            >
              View Countries
              <ArrowRightIcon className="inline-block h-5 w-5 ml-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
