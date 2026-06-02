import JobDetailsSection from "./JobDetailsSection";

type Props = {
  description: string;
  className?: string;
};

export default function JobDescriptionSection({
  description,
  className = "",
}: Props) {
  return (
    <JobDetailsSection title="Description" className={className}>
      <p className="text-neutral-80 text-[16px] leading-7">{description}</p>
    </JobDetailsSection>
  );
}
