import Image from "next/image";
import ActionDropDown from "../applicant-profile/ActionDropDown";
import { SquarePen } from "lucide-react";

function JobDetailHeader({ jobTitle, src }: { jobTitle: string; src: string }) {
  return (
    <div className="w-full my-10 border bg-white  border-[#D6DDEB] p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
      <div className="flex  flex-col md:flex-row md:items-center gap-6 w-full ">
        <div className="flex  flex-col md:flex-row md:items-center gap-5 flex-1">
          <div className="flex justify-between items-center ">
            <div className="relative w-12 h-12 shrink-0">
              <Image
                src={src}
                alt={"Job icon "}
                fill
                quality={100}
                className="object-cover"
              />
            </div>
            <button className="sm:hidden  text-brand transition-colors cursor-pointer">
              <SquarePen />
            </button>
          </div>

          <div className="flex-1">
            <h1 className="text-[32px] leading-[1.05] max-md:text-[28px] tracking-0 font-bold text-[#25324B] tracking-[-0.02em]">
              {jobTitle}
            </h1>
          </div>
        </div>
        <ActionDropDown selected="Edit Job Details" hasDropDown={false}>
          {" "}
          <SquarePen
            size={16}
            className="shrink-0 text-brand md:size-4 transition-transform duration-300 "
          />
        </ActionDropDown>
      </div>
    </div>
  );
}

export default JobDetailHeader;
