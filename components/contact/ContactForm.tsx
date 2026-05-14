"use client";

import { useTranslations } from "next-intl";
import InputField from "./InputField";
import SubmitButton from "./SubmitButton";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";

export default function ContactForm() {
  const t = useTranslations("contact");

  return (
    <form className='space-y-8'>
      <InputField label={t("fullName")} type='text' name='fullName' />

      <InputField label={t("email")} type='email' name='email' />

      <InputField label={t("contactNumber")} type='tel' name='phone' />

      <div className=''>
        <Label
          htmlFor='message'
          className='block text-gray-700 font-medium mb-3'
        >
          {t("message")}
        </Label>
        <Textarea
          id='message'
          placeholder={t("message")}
          className='w-full h-40 px-4 py-3 border border-gray-200 rounded-md bg-white outline-none focus:ring-2 focus:ring-[#40EBC7] focus:border-transparent'
        />
      </div>

      <div className='pt-4'>
        <SubmitButton />
      </div>
    </form>
  );
}
