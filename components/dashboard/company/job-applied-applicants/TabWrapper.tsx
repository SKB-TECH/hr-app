"use client";

import { useState } from "react";
import ReusableHeaders from "../../candidate/settings/ReusableHeaders";
import { jobListApplicantsTabs } from "@/data/job-list-applicant";
import ApplicantsTab from "./ApplicantsTab";
import JobDetails from "./JobDetails";
import AnalyticsTab from "./AnalyticsTab";

interface TabWrapperProps {
  jobId: number;
}

function TabWrapper({ jobId }: TabWrapperProps) {
  const [currentTab, setCurrentTab] = useState(jobListApplicantsTabs[0].title);
  return (
    <div>
      <ReusableHeaders
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        navigations={jobListApplicantsTabs}
      />
      {currentTab === "Applicants" && <ApplicantsTab jobId={jobId} />}
      {currentTab === "Job Details" && <JobDetails jobId={jobId} />}
      {currentTab === "Analytics" && <AnalyticsTab jobId={jobId} />}
    </div>
  );
}

export default TabWrapper;
