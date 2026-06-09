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
      {/* separator for small devices */}
      <hr className="block md:hidden border-t border-light-brand-neutral my-6" />
      <JobBulletList
        title="Who you are"
        items={whoYouAre}
        className="md:pt-10 "
      />
      {/* separator for small devices */}
      <hr className="block md:hidden border-t border-light-brand-neutral my-6" />
      <JobBulletList
        title="Nice to Have"
        items={niceToHaves}
        className="md:pt-10"
      />
      {/* separator for small devices */}
      <hr className="block md:hidden border-t border-light-brand-neutral my-6" />
    </div>
  );
}
