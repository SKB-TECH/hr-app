interface TittleProps {
  firstTittle?: string;
  secondTittle?: string;
}

export const ReusableTittle = ({ firstTittle, secondTittle }: TittleProps) => {
  return (
    <div className="space-y-4 md:space-y-6">
      <p className="text-[#32FFCE] font-bold uppercase text-xl tracking-widest mb-4">
        {firstTittle}
      </p>
      <h2 className="text-4xl md:text-5xl font-extrabold text-[#0D2145] leading-tight mb-6">
        {secondTittle}
      </h2>
    </div>
  );
};
