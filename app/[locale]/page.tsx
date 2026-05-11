import React from 'react';
import {useTranslations} from "next-intl";

const Page = () => {
    const t=useTranslations("greetings")
    return (
        <div>
            {t("welcome")}
        </div>
    );
};

export default Page;
