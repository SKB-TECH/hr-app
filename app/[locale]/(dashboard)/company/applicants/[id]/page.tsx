import Link from "next/link";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { getApplicantDetails } from "@/lib/company_applicant";
import ActionDropDown from "@/components/dashboard/company/applicant-profile/ActionDropDown";
import PersonalProfileInfo from "@/components/dashboard/Company/applicant-profile/PersonalProfileInfo";
import ApplicantDetailsWrapper from "@/components/dashboard/company/applicant-profile/ApplicantDetailsWrapper";

async function ApplicantProfile({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;
  const applicantDetails = getApplicantDetails(id);

  if (!applicantDetails) {
    return (
      <div className='flex items-center justify-center h-screen text-red-500 text-lg font-semibold'>
        No applicant data available
      </div>
    );
  }

  return (
    <section className='px-4 lg:px-6 overflow-y-auto py-4'>
      {/* header */}
      <div className='pb-4  flex items-center justify-between gap-6'>
        {/* return arrow */}
        <Link href='/company/applicants' className='flex items-center gap-2 '>
          <Image
            width={28}
            height={28}
            src='/BackArrow.png'
            alt='return arrow'
          />
          <h1 className='text-[24px] font-bold text-neutral-100 text-nowrap line-clamp-1 min-w-[50px] text-ellipsis overflow-hidden '>
            Applicant Details
          </h1>
        </Link>
        <ActionDropDown
          selected='View Profile'
          menuItems={["View Profile", "Edit Profile", "Delete Profile"]}
        >
          <ChevronDown
            size={16}
            className='shrink-0 text-brand md:size-4 transition-transform duration-300 group-data-[state=open]:rotate-180'
          />
        </ActionDropDown>
      </div>
      <div className='max-lg:flex-col flex gap-6 min-w-0'>
        {/* left side */}
        <PersonalProfileInfo applicant={applicantDetails} />

        {/* right side  */}
        <ApplicantDetailsWrapper applicantDetails={applicantDetails} />
      </div>
    </section>
  );
}

export default ApplicantProfile;
