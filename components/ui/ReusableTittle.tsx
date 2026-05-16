import React from "react";

interface TittleProps {
  firstTittle?: string;
  secondTittle?: string;
  text?: string;
}

export const ReusableTittle = ({ firstTittle, secondTittle }: TittleProps) => {
  return (
    <div className="space-y-4 md:space-y-6 ">
      <p className="text-brand font-bold uppercase text-3xl mb-8">
        {firstTittle}
      </p>
      <h2 className="text-4xl md:text-5xl font-extrabold text-[#0D2145] leading-tight mb-8">
        {secondTittle}
      </h2>
    </div>
  );
};
