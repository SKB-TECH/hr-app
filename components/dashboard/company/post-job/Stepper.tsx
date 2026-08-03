"use client";

import { BriefcaseBusiness, ClipboardList, Gift } from "lucide-react";

interface StepperProps {
  currentStep: number;
}

const steps = [
  {
    id: 1,
    title: "Job Information",
    subtitle: "Step 1/3",
    icon: BriefcaseBusiness,
  },
  {
    id: 2,
    title: "Job Description",
    subtitle: "Step 2/3",
    icon: ClipboardList,
  },
  {
    id: 3,
    title: "Perks & Benefit",
    subtitle: "Step 3/3",
    icon: Gift,
  },
];

export default function Stepper({ currentStep }: StepperProps) {
  return (
    <div>
      <div className="hidden md:block w-full border border-neutral-20">
        <div className="flex flex-col md:flex-row">
          {steps.map((step, index) => {
            const Icon = step.icon;

            const active = currentStep === step.id;
            const completed = currentStep > step.id;

            return (
              <div key={step.id} className="flex flex-1 items-center p-5">
                {/* Circle */}
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-full transition-all
                ${
                  active
                    ? "bg-brand text-white"
                    : completed
                      ? "bg-brand text-white"
                      : "bg-[#E9EBFD] text-gray-400"
                }`}
                >
                  <Icon size={20} />
                </div>

                {/* Text */}
                <div className="ml-4">
                  <p
                    className={`text-xs ${
                      active || completed ? "text-brand" : "text-gray-400"
                    }`}
                  >
                    {step.subtitle}
                  </p>

                  <h3
                    className={`font-semibold ${
                      active || completed
                        ? "text-neutral-100"
                        : "text-neutral-60"
                    }`}
                  >
                    {step.title}
                  </h3>
                </div>

                {/* Line */}
                {index !== steps.length - 1 && (
                  <hr className="hidden bg-gray-200 md:block w-0.5 h-10 mx-auto" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* mobile screen */}
      <div className="md:hidden">
        <hr className="w-screen h-0.5 bg-neutral-40 -mx-4" />
        <div className="mt-4 flex items-center justify-between">
          {steps.map((step, index) => {
            const active = currentStep === step.id;
            const completed = currentStep > step.id;
            const Icon = step.icon;
            return (
              <div key={step.id}>
                <div className="flex gap-4 items-center">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-full transition-all
                ${
                  active
                    ? "bg-brand text-white"
                    : completed
                      ? "bg-brand text-white"
                      : "bg-[#E9EBFD] text-gray-400"
                }`}
                  >
                    <Icon size={20} />
                  </div>
                  <div className="">
                    {index !== steps.length - 1 && (
                      <hr className="bg-gray-200  h-0.5 w-15 mt-2" />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-4 flex items-center gap-3">
          <p className="text-sm text-brand">
            Step {currentStep}/{steps.length}
          </p>
          <hr className="w-[1px] h-5 bg-gray-200 " />
          <h3 className="font-semibold text-gray-900">
            {steps.find((step) => step.id === currentStep)?.title}
          </h3>
        </div>
        <hr className="w-screen h-0.5 bg-neutral-20 -mx-4 mt-5" />
      </div>
    </div>
  );
}
