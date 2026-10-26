"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";

import Stepper from "./Stepper";
import JobInformation from "./JobInformation";
import JobDescription from "./JobDescription";
import PerksBenefits from "./PerksBenefits";
import { JobData } from "./types";

import { Link, useRouter } from "@/i18n/routing";
import { useMyCompany } from "@/core/hooks/company/use-my-company";
import { useCreateCompanyJob } from "@/core/hooks/jobs/use-create-company-job";

export default function PostJob() {
  const router = useRouter();
  const company = useMyCompany();
  const createJob = useCreateCompanyJob(company.data?.id || "");

  const [currentStep, setCurrentStep] = useState(1);

  const [jobData, setJobData] = useState<JobData>({
    jobTitle: "",
    location: "",
    employmentTypes: [],
    minSalary: 5000,
    maxSalary: 22000,
    category: "",
    skills: [],
    jobDescription: "",
    responsibilities: "",
    whoYouAre: "",
    niceToHave: "",
    benefits: [],
  });

  const updateData = (values: Partial<JobData>) => {
    setJobData((prev) => ({
      ...prev,
      ...values,
    }));
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const previousStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async (status: "DRAFT" | "LIVE") => {
    if (!company.data) {
      toast.error("Create your company profile first");
      return;
    }
    if (!jobData.jobTitle.trim()) {
      toast.error("Le titre du poste est obligatoire");
      setCurrentStep(1);
      return;
    }
    if (!jobData.category) {
      toast.error("Sélectionnez une catégorie avant d’enregistrer l’offre");
      setCurrentStep(1);
      return;
    }
    if (status === "LIVE" && (!jobData.employmentTypes.length || !jobData.jobDescription.trim())) {
      toast.error("Vérifiez le type de contrat et la description avant publication");
      setCurrentStep(!jobData.employmentTypes.length ? 1 : 2);
      return;
    }

    try {
      await createJob.mutateAsync({
        title: jobData.jobTitle,
        location:
            jobData.location || company.data.location || "Central Africa",
        employmentTypes: jobData.employmentTypes,
        minSalary: jobData.minSalary,
        maxSalary: jobData.maxSalary,
        category: jobData.category,
        skills: jobData.skills,
        description: jobData.jobDescription,
        responsibilities: jobData.responsibilities,
        requirements: jobData.whoYouAre,
        niceToHave: jobData.niceToHave,
        benefits: jobData.benefits,
        status,
      });

      toast.success(status === "LIVE" ? "Job published successfully" : "Draft saved successfully");

      // next-intl ajoutera automatiquement /fr ou /en
      router.push("/company/job-listing");
    } catch {
      toast.error("Unable to publish this job");
    }
  };

  return (
    <section className="max-w-5xl mx-auto space-y-8 px-4 py-8 lg:px-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#D6DDEB] pb-6">
        <div>
          <Link
            href="/company"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#7C8493] hover:text-[#4640DE] transition-colors mb-2"
          >
            <ArrowLeft size={16} />
            Back to Dashboard
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold font-clash text-[#132745] tracking-tight">
            Post an Executive Opportunity
          </h1>
          <p className="text-sm text-[#7C8493] mt-1">
            Reach certified leadership talent and specialized professionals across Central Africa.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-3 py-1 bg-[#F8F9FC] text-[#4640DE] border border-[#D6DDEB] rounded-none">
            Step {currentStep} of 3
          </span>
        </div>
      </div>

      {/* Stepper Navigation */}
      <Stepper currentStep={currentStep} />

      {/* Step Content Card */}
      <div className="bg-white border border-[#D6DDEB] p-6 md:p-10 rounded-none shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
        {currentStep === 1 && (
          <JobInformation data={jobData} updateData={updateData} />
        )}

        {currentStep === 2 && (
          <JobDescription data={jobData} updateData={updateData} />
        )}

        {currentStep === 3 && (
          <PerksBenefits data={jobData} updateData={updateData} />
        )}
      </div>

      {/* Action Footer Bar */}
      <div className="flex items-center justify-between bg-white border border-[#D6DDEB] p-4 md:p-5 rounded-none shadow-sm">
        <button
          type="button"
          disabled={currentStep === 1}
          onClick={previousStep}
          className={`px-6 py-3 font-semibold text-sm rounded-none border transition-all cursor-pointer ${
            currentStep === 1
              ? "cursor-not-allowed border-[#E4E7EC] text-[#A8ADB7] bg-[#F8F9FC]"
              : "border-[#D6DDEB] text-[#132745] hover:bg-[#F8F9FC] hover:border-[#4640DE]"
          }`}
        >
          Previous
        </button>

        {currentStep < 3 ? (
          <button
            type="button"
            onClick={nextStep}
            className="px-8 py-3 font-semibold text-sm rounded-none bg-[#4640DE] hover:bg-[#3730C9] text-white shadow-sm transition-all cursor-pointer"
          >
            Next Step
          </button>
        ) : (
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => handleSubmit("DRAFT")}
              disabled={createJob.isPending}
              className="border border-[#D6DDEB] hover:border-[#4640DE] px-6 py-3 font-semibold text-sm text-[#132745] rounded-none transition-all cursor-pointer disabled:opacity-60"
            >
              Save as Draft
            </button>
            <button
              type="button"
              onClick={() => handleSubmit("LIVE")}
              disabled={createJob.isPending}
              className="bg-[#4640DE] hover:bg-[#3730C9] px-8 py-3 font-semibold text-sm text-white rounded-none transition-all cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 shadow-sm"
            >
              {createJob.isPending ? "Publishing…" : "Publish Job Offer"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

