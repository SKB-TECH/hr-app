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
import AiJobGenerator from "./AiJobGenerator";

export default function PostJob() {
  const router = useRouter();
  const company = useMyCompany();
  const createJob = useCreateCompanyJob(company.data?.id || "");

  const [currentStep, setCurrentStep] = useState(1);
  const [showEditor, setShowEditor] = useState(false);

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
      <section className="mx-auto space-y-8 px-4 py-8 lg:px-8">
        <div>
          <Link
              href="/company"
              className="flex items-center gap-2 text-[24px] font-bold text-gray-900"
          >
            <ArrowLeft width={25} height={25} />
            Post a Job
          </Link>
        </div>

        {!showEditor && <AiJobGenerator
            data={jobData}
            updateData={updateData}
            companyName={company.data?.name || "Company"}
            industry={company.data?.industry}
            saving={createJob.isPending}
            onGenerated={() => setCurrentStep(1)}
            onReview={() => {
              setCurrentStep(1);
              setShowEditor(true);
            }}
            onManual={() => {
              setCurrentStep(1);
              setShowEditor(true);
            }}
            onSave={(status) => void handleSubmit(status)}
        />}

        {showEditor && <>
        <Stepper currentStep={currentStep} />

        {currentStep === 1 && (
            <JobInformation data={jobData} updateData={updateData} />
        )}

        {currentStep === 2 && (
            <JobDescription data={jobData} updateData={updateData} />
        )}

        {currentStep === 3 && (
            <PerksBenefits data={jobData} updateData={updateData} />
        )}

        <div className="flex items-center justify-between">
          <button
              type="button"
              disabled={currentStep === 1}
              onClick={previousStep}
              className={`border px-6 py-3 font-medium transition ${
                  currentStep === 1
                      ? "cursor-not-allowed border-gray-200 text-gray-400"
                      : "border-gray-300 hover:bg-gray-100"
              }`}
          >
            Previous
          </button>

          {currentStep < 3 ? (
              <button
                  type="button"
                  onClick={nextStep}
                  className="bg-brand px-6 py-3 font-medium text-white hover:bg-indigo-700"
              >
                Next Step
              </button>
          ) : (
              <div className="flex gap-3"><button
                  type="button"
                  onClick={() => handleSubmit("DRAFT")}
                  disabled={createJob.isPending}
                  className="border border-brand px-6 py-3 font-medium text-brand disabled:opacity-60"
              >Save draft</button><button
                  type="button"
                  onClick={() => handleSubmit("LIVE")}
                  disabled={createJob.isPending}
                  className="bg-brand px-6 py-3 font-medium text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {createJob.isPending ? "Publishing…" : "Publish job"}
              </button></div>
          )}
        </div>
        </>}
      </section>
  );
}
