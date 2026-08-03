"use client";

import { useState } from "react";

import Stepper from "./Stepper";
import JobInformation from "./JobInformation";
import JobDescription from "./JobDescription";
import PerksBenefits from "./PerksBenefits";
import { JobData } from "./types";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function PostJob() {
  const [currentStep, setCurrentStep] = useState(1);

  const [jobData, setJobData] = useState<JobData>({
    jobTitle: "",
    employmentTypes: [],
    minSalary: 5000,
    maxSalary: 22000,
    category: "",
    skills: [],
    jobDescription: "",
    responsibilities: "",
    whoYouAre: "",
    niceToHave: "",
    benefits: [
      {
        id: 1,
        title: "Full Healthcare",
        description:
          "We believe in thriving communities and that starts with our team being happy and healthy.",
        icon: "Healthcare",
      },
      {
        id: 2,
        title: "Unlimited Vacation",
        description:
          "We believe you should have a flexible schedule that makes space for family, wellness, and fun.",
        icon: "Remote",
      },
      {
        id: 3,
        title: "Skill Development",
        description:
          "We believe in always learning and leveling up our skills. Whether it's a conference or online course.",
        icon: "Vacation",
      },
    ],
  });

  // Update any field in the form
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

  const handleSubmit = () => {

    // Later you will replace this with your API call
    alert("Job submitted successfully!");
  };

  return (
    <section className="mx-auto space-y-8 px-4 py-8 lg:px-8">
      {/* Title */}
      <div>
        <Link
          href="/company"
          className="text-[24px] font-bold text-gray-900 flex items-center gap-2"
        >
          <ArrowLeft width={25} height={25} /> Post a Job
        </Link>
      </div>

      {/* Stepper */}
      <Stepper currentStep={currentStep} />

      {/* Step Content */}
      {currentStep === 1 && (
        <JobInformation data={jobData} updateData={updateData} />
      )}

      {currentStep === 2 && (
        <JobDescription data={jobData} updateData={updateData} />
      )}

      {currentStep === 3 && (
        <PerksBenefits data={jobData} updateData={updateData} />
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          disabled={currentStep === 1}
          onClick={previousStep}
          className={` border px-6 py-3 font-medium transition ${
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
            className=" bg-brand px-6 py-3 font-medium text-white hover:bg-indigo-700"
          >
            Next Step
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-brand px-6 py-3 font-medium text-white hover:bg-indigo-700"
          >
            Do a Review
          </button>
        )}
      </div>
    </section>
  );
}
