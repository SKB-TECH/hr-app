"use client";

import React from "react";
import { ReusableTittle } from "./ReusableTittle";
import { Button } from "./button";
import { ArrowRight } from "lucide-react";

const JobSection = () => {
  const jobs = [
    {
      title: "Frontend Developer",
      location: "Manchester, UK",
      salary: "£40000 - £55000 per annum",
      description:
        "Lorem ipsum dolor sit amet consectetur. Turpis sed pulvinar sed blandit rhoncus tellus senectus at quis. Mi at fermentum imperdiet velit magna a aliquam. Faucibus et quam ac elit placerat tristique vulputate",
      featured: "view job",
    },
    {
      title: "Frontend Developer",
      location: "Manchester, UK",
      salary: "£40000 - £55000 per annum",
      description:
        "Lorem ipsum dolor sit amet consectetur. Turpis sed pulvinar sed blandit rhoncus tellus senectus at quis. Mi at fermentum imperdiet velit magna a aliquam. Faucibus et quam ac elit placerat tristique vulputate",
      featured: "view job",
    },
    {
      title: "Frontend Developer",
      location: "Manchester, UK",
      salary: "£40000 - £55000 per annum",
      description:
        "Lorem ipsum dolor sit amet consectetur. Turpis sed pulvinar sed blandit rhoncus tellus senectus at quis. Mi at fermentum imperdiet velit magna a aliquam. Faucibus et quam ac elit placerat tristique vulputate",
      featured: "view job",
    },
  ];
  return (
    <div className="px-6 py-20 md:px-12 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-12 ">
        <ReusableTittle firstTittle="jobs" secondTittle="Latest Openings" />
        <div >
          <Button
            size="icon"
            className="bg-[#32FFCE] hover:bg-[#32FFCE]/90 text-black h-12 w-12 rounded-none"
            onClick={() => {}}
          >
            <ArrowRight className="h-6 w-6" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3">
        {jobs.map((job, index) => {
          const isFirst = index === 0;
          return (
            <div
              key={index}
              className={`p-10 lg:p-14 flex flex-col h-full border-r border-[#ffffff33] last:border-r-0 ${
                isFirst
                  ? "bg-[#32FFCE] text-[#0D2145]"
                  : "bg-[#132745] text-white"
              }`}
            >
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-1">{job.title}</h2>
                <p
                  className={`text-sm ${isFirst ? "text-[#0D2145]/70" : "text-white/70"}`}
                >
                  {job.location}
                </p>
              </div>

              <div className="mb-6">
                <p
                  className={`text-base font-semibold ${isFirst ? "text-[#0D2145]" : "text-white"}`}
                >
                  {job.salary}
                </p>
              </div>

              <div className="flex-1">
                <p
                  className={`text-sm leading-relaxed line-clamp-6 ${isFirst ? "text-[#0D2145]/90" : "text-white/85"}`}
                >
                  {job.description}
                </p>
              </div>

              <div className="mt-10">
                <a
                  href="#"
                  className={`text-sm font-bold underline underline-offset-4 hover:opacity-80 transition-opacity ${
                    isFirst ? "text-[#0D2145]" : "text-[#32FFCE]"
                  }`}
                >
                  View Job
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* leon: removed another button which was useless */}
     
    </div>
  );
};

export default JobSection;
