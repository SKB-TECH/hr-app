"use client";

import { BriefcaseBusiness, ClipboardList, Gift, Check } from "lucide-react";

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
    title: "Perks & Benefits",
    subtitle: "Step 3/3",
    icon: Gift,
  },
];

export default function Stepper({ currentStep }: StepperProps) {
  return (
    <div className="w-full">
      {/* Desktop Stepper */}
      <div className="hidden md:grid md:grid-cols-3 gap-4 w-full">
        {steps.map((step) => {
          const Icon = step.icon;
          const active = currentStep === step.id;
          const completed = currentStep > step.id;

          return (
            <div
              key={step.id}
              className={`relative flex items-center p-4 border transition-all rounded-none ${
                active
                  ? "bg-white border-[#4640DE] shadow-[0_4px_20px_rgba(70,64,222,0.08)]"
                  : completed
                    ? "bg-[#F8F9FC] border-[#D6DDEB]"
                    : "bg-white border-[#E4E7EC] opacity-70"
              }`}
            >
              {/* Active Indicator Top/Bottom Bar */}
              {active && (
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#4640DE]" />
              )}

              {/* Step Icon / Status */}
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-none transition-all ${
                  completed
                    ? "bg-[#4640DE] text-white"
                    : active
                      ? "bg-[#4640DE] text-white"
                      : "bg-[#F0F2F7] text-[#7C8493]"
                }`}
              >
                {completed ? <Check size={18} strokeWidth={2.5} /> : <Icon size={18} />}
              </div>

              {/* Step Info */}
              <div className="ml-3.5 flex-1 min-w-0">
                <span
                  className={`text-xs font-semibold uppercase tracking-wider block ${
                    active || completed ? "text-[#4640DE]" : "text-[#7C8493]"
                  }`}
                >
                  {step.subtitle}
                </span>
                <h3
                  className={`font-bold font-clash text-sm truncate ${
                    active ? "text-[#132745]" : completed ? "text-[#132745]" : "text-[#7C8493]"
                  }`}
                >
                  {step.title}
                </h3>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile Stepper */}
      <div className="md:hidden bg-white border border-[#D6DDEB] p-4 rounded-none">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#4640DE]">
            Step {currentStep} of {steps.length}
          </span>
          <span className="text-xs font-semibold text-[#132745]">
            {steps.find((s) => s.id === currentStep)?.title}
          </span>
        </div>
        {/* Progress Bar */}
        <div className="w-full bg-[#E4E7EC] h-1.5 rounded-none overflow-hidden">
          <div
            className="bg-[#4640DE] h-full transition-all duration-300"
            style={{ width: `${(currentStep / steps.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}

