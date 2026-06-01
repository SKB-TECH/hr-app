import { CircleCheck } from "lucide-react";

type Props = {
  title: string;
  items: string[];
  className?: string;
};

export default function JobBulletList({ title, items, className = "" }: Props) {
  return (
    <div className={`space-y-2 ${className}`}>
      <h1 className="text-[24px] md:text-[32px] text-neutral-100 font-bold font-clash">
        {title}
      </h1>
      <div>
        {items.map((item, index) => (
          <span
            key={index}
            className="text-neutral-100 text-[16px] flex items-start md:items-center mb-2"
          >
            <CircleCheck className="text-accent-green w-5 h-5  shrink-0" />
            <p className="inline-block ml-2">{item}</p>
          </span>
        ))}
      </div>
    </div>
  );
}
