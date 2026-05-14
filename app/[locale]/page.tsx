import React from 'react';
import { useTranslations } from "next-intl";
import { Misson } from '@/components/misson';



const Page = () => {
    const t=useTranslations("greetings")
    return (
      <div>
       <Misson />
      </div>
    );
};

export default Page;
