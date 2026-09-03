import Image from "next/image";
import { useTranslations } from "next-intl";

export function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: number;
  icon: string;
}) {
  const t = useTranslations("candidateDashboard.stats");
  return (
    <div className="border border-gray-200 relative bg-white p-6 flex flex-col justify-between min-h-[140px]">
      <div className="flex items-start justify-between">
        <p className="text-[16px] xl:text-[18px] font-epilogue tracking-wider font-bold text-[#202430]">
          {label}
        </p>
        <Image
          src={icon}
          alt={t("iconAlt")}
          width={88}
          height={88}
          className="absolute bottom-0 right-4"
        />
      </div>
      <p className="text-[72px] font-semibold text-[#202430] leading-none mt-2">
        {value}
      </p>
    </div>
  );
}
