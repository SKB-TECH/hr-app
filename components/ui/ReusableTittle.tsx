import React from "react";

interface TittleProps {
  firstTittle?: string;
  secondTittle?: string;
  text?: string;
}

export const ReusableTittle = ({
  firstTittle,
  secondTittle,
  text,
}: TittleProps) => {
  return (
    <div className="space-y-5 lg:space-y-6">
     
      <h1
        className="text-[#41ECC3] font-semibold uppercase tracking-[5%]
        text-[18px] sm:text-[20px] md:text-[24px] lg:text-[30px]"
      >
        {firstTittle}
      </h1>

    
      <h2
        className="text-[#132745] font-bold leading-tight
        w-full 
        text-[28px] sm:text-[36px] md:text-[42px] lg:text-[40px]"
      >
        {secondTittle}
      </h2>

    
      {text && (
        <p
          className="text-[#000000] font-normal leading-relaxed
          w-full max-w-[581px]
          text-[16px] sm:text-[18px] md:text-[19px] lg:text-[20px]
          tracking-[0.05em]"
        >
          {text}
        </p>
      )}
    </div>
  );
};
