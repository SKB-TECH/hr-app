import React from 'react'

type ServiceCardProps = {
    title: string;
    description: string;
    icon: React.ReactNode;
}

const ServiceCard = ({ title, description, icon }: ServiceCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 text-center text-[#132745]">
      {icon}
      <h3 className="text-xl font-bold mt-4">{title}</h3>
      <p className="mt-2">{description}</p>
    </div>
  );
  
  
}

export default ServiceCard