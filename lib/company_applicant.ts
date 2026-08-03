import { applicantsData } from "@/data/dashboard-applicants";
import { jobListApplicants } from "@/data/job-list-applicant";
import { Applicant } from "@/types/company-applicants";
import { jobListingData, TableDataTypes } from "@/data/company-job-listing";
import { jobsDetailsResponse } from "@/data/jobDetailsData";

export const getApplicantDetails = (
  id: number | string,
): Applicant | undefined => {
  const applicantInfo = applicantsData.find((info) => info.id === Number(id));
  return applicantInfo;
};

export const getCandidatesAppliedJob = (jobId: number) => {
  const applicantsApplied = jobListApplicants.filter(
    (applicant) => applicant.jobId === Number(jobId),
  );
  return applicantsApplied;
};

export const getJobById = (id: number): TableDataTypes | undefined => {
  return jobListingData.find((job) => job.id === Number(id));
};

export const getJobDetailsById = (id: number) => {
  return jobsDetailsResponse.find((job) => Number(job.id) === Number(id)) || jobsDetailsResponse[0];
};
