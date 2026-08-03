import ActionDropDown from "@/components/dashboard/company/applicant-profile/ActionDropDown";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Dot, MoreHorizontal } from "lucide-react";
import { getJobById } from "@/lib/company_applicant";
import TabWrapper from "@/components/dashboard/company/job-applied-applicants/TabWrapper";

async function page({ params }: { params: Promise<{ id: number }> }) {
  const { id } = await params;
  const job = getJobById(id);

  if (!job) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500 text-lg font-semibold">
        Job not found
      </div>
    );
  }

  return (
    <div className="px-4 lg:px-6 overflow-y-auto py-4">
      <div className="pb-4  flex  justify-between  ">
        {/* return arrow */}
        <div className="flex  max-md:w-full max-md:flex-col max-md:gap-2 md:items-center max-md:justify-start justify-between gap-4 ">
          <div className="flex items-center justify-between w-full ">
            <Link href="/company/job-listing">
              <Image
                width={28}
                height={28}
                src="/BackArrow.png"
                alt="return arrow"
              />
            </Link>
            <span className="md:hidden">
              <MoreHorizontal />
            </span>
          </div>
          <div className=" text-neutral-100 ">
            <h1 className="text-[20px] font-bold text-nowrap line-clamp-1 min-w-[50px] text-ellipsis overflow-hidden ">
              {job.role}
            </h1>
            <p className="flex text-nowrap md:text-nowrap items-center text-[16px]">
              Design <Dot /> {job.job_type} <Dot /> <span>{job.current_applicants}/</span>
              <span className="text-neutral-60">{job.max_applicants} Hired</span>{" "}
            </p>
          </div>
        </div>
        <ActionDropDown
          selected="More Action"
          menuItems={["View Profile", "Edit Profile", "Delete Profile"]}
        >
          {" "}
          <ChevronDown
            size={16}
            className="shrink-0 text-brand md:size-4 transition-transform duration-300 group-data-[state=open]:rotate-180"
          />
        </ActionDropDown>
      </div>
      <TabWrapper jobId={id} />
    </div>
  );
}

export default page;
