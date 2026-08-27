
"use client"
import { PencilSquareIcon, PlusIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useState } from "react";

interface Experience {
  id: number;
  role: string;
  company: string;
  employmentType: string;
  startDate: string;
  endDate: string;
  duration: string;
  location: string;
  description: string;
  logo: string;
}

const allExperiences: Experience[] = [
  {
    id: 1,
    role: "Product Designer",
    company: "Twitter",
    employmentType: "Full-Time",
    startDate: "Jun 2019",
    endDate: "Present",
    duration: "1y 1m",
    location: "Manchester, UK",
    description:
      "Created and executed social media plan for 10 brands utilizing multiple features and content types to increase brand outreach, engagement, and leads.",
    logo: "/Twitter.png",
  },
  {
    id: 2,
    role: "Growth Marketing Designer",
    company: "GoDaddy",
    employmentType: "Full-Time",
    startDate: "Jun 2011",
    endDate: "May 2019",
    duration: "8y",
    location: "Manchester, UK",
    description:
      "Developed digital marketing strategies, activation plans, proposals, contests and promotions for client initiatives",
    logo: "/GoDaddy.png",
  },
  {
    id: 3,
    role: "Senior Product Designer",
    company: "Pinterest",
    employmentType: "Full-Time",
    startDate: "Mar 2009",
    endDate: "May 2011",
    duration: "2y 2m",
    location: "Manchester, UK",
    description: "Led design for core discovery features across web and mobile.",
    logo: "/Pinterest.png",
  },
  {
    id: 4,
    role: "UX Designer",
    company: "Blinklist",
    employmentType: "Full-Time",
    startDate: "Jan 2007",
    endDate: "Feb 2009",
    duration: "2y 1m",
    location: "Manchester, UK",
    description: "Designed onboarding flows and content discovery experiences.",
    logo: "/Blinklist.png",
  },
  {
    id: 5,
    role: "Junior Designer",
    company: "Pixelgrade",
    employmentType: "Full-Time",
    startDate: "Aug 2005",
    endDate: "Dec 2006",
    duration: "1y 4m",
    location: "Manchester, UK",
    description: "Supported visual design for marketing websites and landing pages.",
    logo: "/Pixelgrade.png",
  },
];

function ExperienceItem({ exp, isLast }: { exp: Experience; isLast: boolean }) {
  return (
    <div className={`sm:flex gap-4 ${!isLast ? "pb-6 mb-6 border-b border-gray-100" : ""}`}>
      {/* Logo */}
      <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 flex-shrink-0 flex items-center justify-center">
        <Image
          src={exp.logo}
          alt={exp.company}
          width={80}
          height={80}
          className="object-contain w-full h-full"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-[18px] font-bold text-[#202430]">{exp.role}</h3>
          <button className="cursor-pointer border border-gray-200 p-1.5   flex-shrink-0">
            <PencilSquareIcon className="w-4 h-4 text-brand" />
          </button>
        </div>

        <p className="text-[16px] text-gray-500 mt-1 flex items-center gap-1.5 flex-wrap">
          <span className="font-semibold text-[#202430]">{exp.company}</span>
          <span className="text-gray-300">•</span>
          <span>{exp.employmentType}</span>
          <span className="text-gray-300">•</span>
          <span>
            {exp.startDate} - {exp.endDate} ({exp.duration})
          </span>
        </p>

        <p className="text-[16px] text-gray-400 mt-1">{exp.location}</p>

        <p className="text-[16px] text-gray-500 leading-relaxed mt-3">{exp.description}</p>
      </div>
    </div>
  );
}

export default function ExperiencesSection() {
  const [showAll, setShowAll] = useState(false);
  const visibleCount = 2;
  const visibleExperiences = showAll ? allExperiences : allExperiences.slice(0, visibleCount);
  const remaining = allExperiences.length - visibleCount;

  return (
    <div className="bg-white border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[20px] font-bold text-[#25324B]">Experiences</h2>
        <button className="cursor-pointer border border-gray-200 p-1.5">
          <PlusIcon className="w-4 h-4 text-brand" />
        </button>
      </div>

      <div>
        {visibleExperiences.map((exp, i) => (
          <ExperienceItem key={exp.id} exp={exp} isLast={i === visibleExperiences.length - 1} />
        ))}
      </div>

      {!showAll && remaining > 0 && (
        <button
          onClick={() => setShowAll(true)}
          className="w-full cursor-pointer text-center text-[14px] font-semibold text-brand hover:text-indigo-800 transition-colors mt-2"
        >
          Show {remaining} more experiences
        </button>
      )}
    </div>
  );
}