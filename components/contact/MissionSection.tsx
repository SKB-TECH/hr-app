import { useTranslations } from "next-intl";
import { ReusableTittle } from "../ui/ReusableTittle";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

function MissionSection() {
  const t = useTranslations("mission");
  return (
    <section className="w-full bg-white ">
      <div className="flex flex-col lg:flex-row min-h-[500px] md:min-h-[600px]">
        {/* Left Content */}
        {/* freddy: fix layout paddings for better design */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center sm:pl-12 pl-6 sm:pr-0 pr-6 py-10 md:py-0">
          <div className="max-w-xl">
            <ReusableTittle
              firstTittle={t("title")}
              secondTittle={t("heading")}
            />

            <p className="mt-6 text-gray-600 font-normal leading-relaxed text-lg">
              {t("description")}
            </p>

            <div className="mt-8">
              <Button
                size="icon"
                className="bg-[#32FFCE] hover:bg-[#32FFCE]/90 text-black h-12 w-12 rounded-none"
              >
                <ArrowRight className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="w-full lg:w-1/2 relative bg-gray-100 min-h-[400px] lg:min-h-full">
          <Image
            src="/images/image.png"
            alt="Our Mission"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}

export default MissionSection;
