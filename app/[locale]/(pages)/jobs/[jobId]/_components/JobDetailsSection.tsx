type Props = {
  title: string;
  children: React.ReactNode;
  className?: string;
};

export default function JobDetailsSection({
  title,
  children,
  className = "",
}: Props) {
  return (
    <div className={`space-y-2 ${className}`}>
      <h1 className="leading-[1.6] tracking-normal text-[24px] md:text-[32px] text-neutral-100 font-bold font-clash">
        {title}
      </h1>
      {children}
    </div>
  );
}
