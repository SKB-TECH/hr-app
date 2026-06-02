import JobBulletList from "./JobBulletList";

type Props = {
  responsibilities: string[];
  whoYouAre: string[];
  niceToHaves: string[];
  className?: string;
};

export default function JobResponsibilitiesSection({
  responsibilities,
  whoYouAre,
  niceToHaves,
  className = "",
}: Props) {
  return (
    <div className={className}>
      <JobBulletList title="Responsibilities" items={responsibilities} />
      <JobBulletList title="Who you are" items={whoYouAre} className="pt-10" />
      <JobBulletList
        title="Nice to Haves"
        items={niceToHaves}
        className="pt-10"
      />
    </div>
  );
}
