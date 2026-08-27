"use client";

import { PencilSquareIcon, PlusIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useState } from "react";

interface Education {
  id: number;
  school: string;
  degree: string;
  startYear: string;
  endYear: string;
  description: string;
  logo: string;
}

const allEducations: Education[] = [
  {
    id: 1,
    school: "Harvard University",
    degree: "Postgraduate degree, Applied Psychology",
    startYear: "2010",
    endYear: "2012",
    description:
      "As an Applied Psychologist in the field of Consumer and Society, I am specialized in creating business opportunities by observing, analysing, researching and changing behaviour.",
    logo: "/Harvard.png",
  },
  {
    id: 2,
    school: "University of Toronto",
    degree: "Bachelor of Arts, Visual Communication",
    startYear: "2005",
    endYear: "2009",
    description: "",
    logo: "/Toronto.png",
  },
  {
    id: 3,
    school: "Manchester High School",
    degree: "High School Diploma",
    startYear: "2001",
    endYear: "2005",
    description: "",
    logo: "/Manchester.png",
  },
  {
    id: 4,
    school: "London Academy of Arts",
    degree: "Certificate, Graphic Design",
    startYear: "1999",
    endYear: "2001",
    description: "",
    logo: "/London.png",
  },
];

function EducationItem({ edu, isLast }: { edu: Education; isLast: boolean }) {
  return (
    <div
      className={`sm:flex gap-4 ${!isLast ? "pb-6 mb-6 border-b border-gray-100" : ""}`}
    >
      {/* Logo */}
      <div className='w-12 h-12 rounded-md overflow-hidden bg-gray-100 flex-shrink-0 flex items-center justify-center'>
        <Image
          src={edu.logo}
          alt={edu.school}
          width={80}
          height={80}
          className='object-contain w-full h-full'
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
      </div>

      {/* Content */}
      <div className='flex-1 min-w-0'>
        <div className='flex items-start justify-between gap-2'>
          <h3 className='text-[18px] font-bold text-[#202430]'>{edu.school}</h3>
          <button className='border border-gray-200 p-1.5   flex-shrink-0'>
            <PencilSquareIcon className='w-4 h-4 text-brand' />
          </button>
        </div>

        <p className='text-[16px] text-gray-500 mt-1'>{edu.degree}</p>
        <p className='text-[16px] text-gray-400 mt-1'>
          {edu.startYear} - {edu.endYear}
        </p>

        {edu.description && (
          <p className='text-[16px] text-gray-500 leading-relaxed mt-3'>
            {edu.description}
          </p>
        )}
      </div>
    </div>
  );
}

export default function EducationsSection() {
  const [showAll, setShowAll] = useState(false);
  const visibleCount = 2;
  const visibleEducations = showAll
    ? allEducations
    : allEducations.slice(0, visibleCount);
  const remaining = allEducations.length - visibleCount;

  return (
    <div className='bg-white border border-gray-200 p-6'>
      <div className='flex items-center justify-between mb-6'>
        <h2 className='text-[20px] font-bold text-[#25324B]'>Educations</h2>
        <button className='border border-gray-200 p-1.5  '>
          <PlusIcon className='w-4 h-4 text-brand' />
        </button>
      </div>

      <div>
        {visibleEducations.map((edu, i) => (
          <EducationItem
            key={edu.id}
            edu={edu}
            isLast={i === visibleEducations.length - 1}
          />
        ))}
      </div>

      {!showAll && remaining > 0 && (
        <button
          onClick={() => setShowAll(true)}
          className='w-full text-center text-[14px] font-semibold text-brand hover:text-indigo-800 transition-colors mt-2'
        >
          Show {remaining} more educations
        </button>
      )}
    </div>
  );
}
