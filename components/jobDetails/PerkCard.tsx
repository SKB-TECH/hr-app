import Image from "next/image";

type PerkCardProps = {
  icon: string;
  title: string;
  description: string;
};

export default function PerkCard({ icon, title, description }: PerkCardProps) {
  return (
    <div className="space-y-1.5">
      <Image
        src={icon}
        alt={title}
        width={46}
        height={46}
        quality={100}
        loading="lazy"
        className="mb-3 text-brand object-contain"
      />

      <h3 className="text-[20px] font-semibold  text-neutral-100">{title}</h3>

      <p className=" text-neutral-80 text-[16px] leading-[1.6] tracking-normal">
        {description}
      </p>
    </div>
  );
}
