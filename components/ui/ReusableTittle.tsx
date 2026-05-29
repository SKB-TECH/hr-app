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
    <div className="space-y-6 mt-20">
      <h1 className="text-brand font-semibold font-clash text-[30px] leading-[100%] tracking-[5%] uppercase">
        {firstTittle}
      </h1>

      <h2 className="text-[#132745] w-[609px] h-[70px] opacity-100 font-clash text-[48px] leading-[100%] tracking-[0%]">
        {secondTittle}
      </h2>
      {text && (
        <p className="text-[#000000] w-[581px] h-[169px]   opacity-100 text-[20px] leading-tight tracking-normal mt-15">
          {text}
        </p>
      )}
    </div>
  );
};
