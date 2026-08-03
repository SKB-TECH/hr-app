"use client";
import { useState } from "react";
import ReusableHeaders, {
  NavigationItem,
} from "../../candidate/settings/ReusableHeaders";
import ApplicantProfileTab from "./ApplicantProfileTab";
import { Applicant, ApplicantTabs } from "@/types/company-applicants";
import InterviewSchedule from "./InterviewSchedule";
import HiringProcess from "./HiringProcess";
import dynamic from "next/dynamic";
const ResumeTab = dynamic(() => import("./ResumeTab"), {
  ssr: false,
});

const availableTabs = [
  { id: 1, title: "Applicant Profile" },
  { id: 2, title: "Resume" },
  { id: 3, title: "Hiring Process" },
  { id: 4, title: "Interview Schedule" },
] satisfies NavigationItem<ApplicantTabs>[];

function ApplicantDetailsWrapper({
  applicantDetails,
}: {
  applicantDetails: Applicant;
}) {
  const [currentTab, setCurrentTab] =
    useState<ApplicantTabs>("Applicant Profile");

  return (
    <div className="w-full lg:w-3/4 border border-brand-light-neutral px-4 min-w-0 overflow-hidden">
      <ReusableHeaders
        navigations={availableTabs}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
      />
      <div className=" ">
        {currentTab === "Applicant Profile" && (
          <ApplicantProfileTab applicantDetails={applicantDetails} />
        )}
        {currentTab === "Resume" && <ResumeTab />}
        {currentTab === "Hiring Process" && (
          <HiringProcess applicantDetails={applicantDetails} />
        )}
        {currentTab === "Interview Schedule" && <InterviewSchedule />}
      </div>
    </div>
  );
}

export default ApplicantDetailsWrapper;
