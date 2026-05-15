
import { useTranslations } from "next-intl";
import ReusableButton from '@/components/ui/ReusableButton';
import { ArrowRight } from 'lucide-react';
import { ReusableTittle } from '@/components/ui/ReusableTittle';
import { TeamSection } from "@/components/About/TeamSection";



const Page = () => {
    const t=useTranslations("greetings")
    return (
      <div>
     <TeamSection />
      </div>
    );
};

export default Page;
