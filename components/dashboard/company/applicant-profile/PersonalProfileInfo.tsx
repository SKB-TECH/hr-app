import { Star, Dot, MessageSquareText } from "lucide-react";
import Image from "next/image";
import StageProgressBar from "./StageProgressBar";
import { Button } from "@/components/ui/button";
import ContactSection from "./ContactSection";
import { Applicant } from "@/types/company-applicants";
import { Badge } from "@/components/ui/badge";

function PersonalProfileInfo({ applicant }: { applicant: Applicant }) {
  return (
    <div className="w-full lg:w-1/4 lg:min-w-[350px]  border border-brand-light-neutral p-4  ">
      {/* profile image */}
      <div className="flex items-center gap-4 xl:gap-8  ">
        <Image
          width={60}
          height={60}
          src={applicant.applicantDetails.image}
          alt="user"
          className="rounded-full object-cover object-center w-22 h-22 "
        />
        <div className="">
          <div>
            {" "}
            <h1 className=" text-neutral-100 text-[24px] font-bold">
              {applicant.applicantDetails.name}
            </h1>
            <p className="text-[14px] text-neutral-60">
              {applicant.applicantDetails.title}
            </p>
          </div>
          {/* rate star */}
          <div className="max-md:hidden flex items-center gap-2 mt-2  ">
            <Star size={19} color="orange" fill="orange" />
            <p>{applicant.applicantDetails.ratings}</p>
          </div>
          <div className="md:hidden flex items-center gap-4  mt-4">
            <Badge className=" bg-white border border-brand-light-neutral text-neutral-60 p-4 text-sm ">
              <Star size={19} color="orange" fill="orange" />
              <p>{applicant.applicantDetails.ratings}</p>
            </Badge>

            <Badge className=" bg-white border border-[#26A4FF] text-[#26A4FF] font-medium p-4 text-sm ">
              Interviewed
            </Badge>
          </div>
        </div>
      </div>

      <div className="mt-6 ">
        <div className="bg-[#f8f8fd] p-4 ">
          <div className="flex items-center justify-between text-[14px] font-epilogue border-b pb-2 border-brand-light-neutral ">
            <p className="text-neutral-100 font-medium">Applied Jobs</p>
            <p className="text-gray-400 font-medium ">2 days ago</p>
          </div>

          {applicant.applicantDetails.appliedJobs.map((job, index) => (
            <div key={index} className="pt-2">
              <h1 className="text-neutral-100 text-[16px] tracking-tight font-bold">
                {job.title}
              </h1>
              <div className="flex items-center">
                <span className="text-neutral-80 text-[14px] tracking-wide">
                  {job.field}
                </span>{" "}
                <Dot className="text-neutral-80" />{" "}
                <span className="text-neutral-60 text-[14px] tracking-wide">
                  {job.type}
                </span>
              </div>
            </div>
          ))}
        </div>
        <StageProgressBar stages={applicant.applicationStage} />
        <div className="flex justify-between items-center gap-2 my-6">
          <Button
            variant="custom-primary"
            className="py-6 flex-1  text-md hover:bg-brand-light-neutral/20 border border-brand-light-neutral cursor-pointer"
          >
            Schedule Interview
          </Button>
          <Button
            variant="custom-primary"
            className="px-4  hover:bg-brand-light-neutral/20 border border-brand-light-neutral cursor-pointer"
          >
            <MessageSquareText className="scale-130" size={10} />
          </Button>
        </div>

        {/* social media info */}
        <ContactSection />
      </div>
    </div>
  );
}

export default PersonalProfileInfo;
