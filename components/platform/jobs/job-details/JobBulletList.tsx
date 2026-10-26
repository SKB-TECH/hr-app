import { CheckCircle2 } from "lucide-react";

type Props = {
  title: string;
  items: string[];
  className?: string;
};

export default function JobBulletList({ title, items, className = "" }: Props) {
  if (!items || items.length === 0) return null;

  return (
    <div className={`space-y-4 ${className}`}>
      <h2 className="text-xl md:text-2xl text-[#132745] font-bold font-clash tracking-tight">
        {title}
      </h2>
      <ul className="space-y-3">
        {items.map((item, index) => (
          <li
            key={index}
            className="text-[#515B6F] leading-relaxed text-sm md:text-base flex items-start gap-3"
          >
            <CheckCircle2 className="text-[#4640DE] w-5 h-5 shrink-0 mt-0.5" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

