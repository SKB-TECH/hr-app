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
    <div className='space-y-6 mt-20'>
      <h1 className='text-[#41ECC3] font-semibold text-[30px] leading-[100%] tracking-[5%] uppercase'>
        {firstTittle}
      </h1>

      <h2 className='text-[#132745] w-[609px] h-[70px] opacity-100 font-semibold text-[48px] leading-[100%] tracking-[0%]'>
        {secondTittle}
      </h2>
      {text && (
        <p className='text-[#000000] w-[581px] h-[169px] opacity-100 font-normal text-[20px] leading-[100%] tracking-[0.05em] leading-tight mt-15'>
          {text}
        </p>
      )}
    </div>
  );
};
