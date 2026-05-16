import React from 'react'
import { ReusableTittle } from './ReusableTittle'
import ReusableButton from './ReusableButton'
import { Arrow } from 'radix-ui/internal';
import { ArrowRight } from 'lucide-react';
import { title } from 'process';
import JobCard from './JobCard';

type JobSectionProps = {
  title?: string;
  location?: string;
  salary?: string;
  description?: string;
  featured?: boolean;
};

const JobSection = (props: JobSectionProps) => {

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
    <div className="px-6 py-16 md:px-12 max-w-7xl mx-auto">
      <div className="flex items-center">
        <div>
          <ReusableTittle firstTittle="jobs" secondTittle="Latest Openings" />
        </div>

        <div className="ml-auto">
          <ReusableButton icon={<ArrowRight />} />
        </div>
      </div>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-1">
        {jobs.map((job, index) => (
          <div
            key={index}
            className={`p-10 ${
              index === 0
                ? "bg-[#32FFCE] text-black"
                : "bg-[#132745] text-white"
            }`}
          >
            <JobCard
              title={job.title}
              location={job.location}
              salary={job.salary}
              description={job.description}
              featured={job.featured}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default JobSection