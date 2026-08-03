import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { PlusIcon } from "lucide-react";
import BenefitCard from "./benefitCard";


type Perk = {
  icon: string;
  title: string;
  description: string;
};

type Props = {
  perks: Perk[];
  className?: string;
};

export default function BenefitSection({ perks, className = "" }: Props) {
  return (
    <section
      className={`border-y border-gray-200 py-8 md:py-8   ${className}`}
    >
      <div className="mb-8 flex justify-between">
        <h2 className=" leading-[1.6] tracking-normal text-3xl font-bold text-neutral-100">
          Benefit
        </h2>
        <div className="flex items-center gap-2">
          <button className="border border-gray-200 p-1.5  ">
            <PlusIcon className="w-4 h-4 text-brand" />
          </button>
          <button className="border border-gray-200 p-1.5   ">
            <PencilSquareIcon className="w-4 h-4 text-brand" />
          </button>
        </div>
      </div>
      <div className="grid gap-3 gap-y-14 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {perks.slice(0, 6).map((perk) => (
          <BenefitCard
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
