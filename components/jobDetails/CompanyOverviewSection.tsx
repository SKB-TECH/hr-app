import Image from "next/image";
import { ArrowRight } from "lucide-react";
import ImageGrid from "./ImageGrid";

type Props = {
  company: string;
  companyLogo: string;
  description: string;
  mainImage: string;
  topRightImage: string;
  bottomRightImage: string;
  className?: string;
};

export default function CompanyOverviewSection({
  company,
  companyLogo,
  description,
  mainImage,
  topRightImage,
  bottomRightImage,
  className = "",
}: Props) {
  return (
    <section
      className={`py-16 flex flex-col lg:flex-row justify-between gap-20 ${className}`}
    >
      <div className="max-w-2xl">
        <div className="flex items-center gap-4">
          <Image
            src={companyLogo}
            alt={`${company} logo`}
            width={48}
            height={48}
            quality={100}
          />
          <div>
            <h3 className="text-[32px] font-bold text-neutral-100">
              {company}
            </h3>
            <div className="flex items-center gap-2 text-brand">
              <span className="font-semibold">Read more about {company}</span>
              <ArrowRight size={16} />
            </div>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-neutral-80 text-[16px] leading-7">{description}</p>
        </div>
      </div>
      <ImageGrid
        mainImage={mainImage}
        topRightImage={topRightImage}
        bottomRightImage={bottomRightImage}
      />
    </section>
  );
}
