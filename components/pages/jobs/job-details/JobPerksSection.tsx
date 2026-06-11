import PerkCard from "./PerkCard";

type Perk = {
  icon: string;
  title: string;
  description: string;
};

type Props = {
  perks: Perk[];
  className?: string;
};

export default function JobPerksSection({ perks, className = "" }: Props) {
  return (
    <section className={`border-y border-gray-200 py-8 md:py-20  ${className}`}>
      <div className="mb-8">
        <h2 className=" leading-[1.6] tracking-normal text-[32px] font-bold text-neutral-100">
          Perks & Benefits
        </h2>
        <p className="text-[16px] text-neutral-80 leading-[1.6] tracking-normal">
          This job comes with several perks and benefits designed to support
          your success.
        </p>
      </div>
      <div className="grid gap-x-10 gap-y-14 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {perks.map((perk) => (
          <PerkCard
            key={perk.title}
            icon={perk.icon}
            title={perk.title}
            description={perk.description}
          />
        ))}
      </div>
    </section>
  );
}
