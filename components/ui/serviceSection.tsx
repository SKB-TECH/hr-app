import React from "react";
import { ReusableTittle } from "./ReusableTittle";
import Image from "next/image";

const ServiceSection = () => {
  const services = [
    {
      title: "Searching",
      description:
        "Lorem ipsum dolor sit amet consectetur. Turpis sed pulvinar sed blandit rhoncus tellus senectus at quis.",
      icon: (
        <div className="relative h-10 w-10">
          <Image
            src="/images/search-icon.png"
            alt="Search"
            fill
            sizes="40px"
            className="object-contain"
          />
        </div>
      ),
    },
    {
      title: "Mock Interview",
      description:
        "Lorem ipsum dolor sit amet consectetur. Turpis sed pulvinar sed blandit rhoncus tellus senectus at quis.",
      icon: (
        <div className="relative h-10 w-10">
          <Image
            src="/images/filter-icon.png"
            alt="Filter"
            fill
            sizes="40px"
            className="object-contain"
          />
        </div>
      ),
    },
    {
      title: "Reference Check",
      description:
        "Lorem ipsum dolor sit amet consectetur. Turpis sed pulvinar sed blandit rhoncus tellus senectus at quis.",
      icon: (
        <div className="relative h-10 w-10">
          <Image
            src="/images/check-icon.png"
            alt="Reference"
            fill
            sizes="40px"
            className="object-contain"
          />
        </div>
      ),
    },
    {
      title: "Get you Onboard",
      description:
        "Lorem ipsum dolor sit amet consectetur. Turpis sed pulvinar sed blandit rhoncus tellus senectus at quis.",
      icon: (
        <div className="relative h-10 w-10">
          <Image
            src="/images/work-icon.png"
            alt="Onboard"
            fill
            sizes="40px"
            className="object-contain"
          />
        </div>
      ),
    },
  ];

  return (
    <div className="bg-[#f7f7f7]">
      <div className=" px-6 py-16 md:px-12 max-w-7xl mx-auto">
        <div className="items-center justify-center text-center mt-10 lg:mt-20 max-w-2xl mx-auto">
          <ReusableTittle
            firstTittle="services"
            secondTittle="Assist you to find a job that matches with your goal"
          />
        </div>
        <div className="flex flex-wrap justify-center mt-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white shadow-md p-6  m-4 w-64">
              <div className="text-4xl">{service.icon}</div>
              <h3 className="text-xl font-bold mt-4">{service.title}</h3>
              <p className="text-gray-600 mt-2">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceSection;
