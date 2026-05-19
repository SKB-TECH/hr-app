"use client";

import { useTranslations } from "next-intl";
import InputField from "./InputField";
import SubmitButton from "./SubmitButton";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import useSubmitClientMessage from "../../hooks/useSubmitClientMessage";
import { ContactFormData } from "../../types/contact";
import { useState } from "react";

export default function ContactForm() {
  const t = useTranslations("contact");
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });

  const { isLoading, error, success, submitForm } =
    useSubmitClientMessage(formData);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={submitForm} className="space-y-8">
      <InputField
        label={t("fullName")}
        type="text"
        name="fullName"
        value={formData.fullName}
        onChange={handleChange}
      />

      <InputField
        label={t("email")}
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />

      <InputField
        label={t("contactNumber")}
        type="tel"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
      />

      <div className="">
        <Label
          htmlFor="message"
          className="block text-gray-700 font-medium mb-3"
        >
          {t("message")}
        </Label>
        <Textarea
          id="message"
          name="message"
          placeholder={t("message")}
          value={formData.message}
          onChange={handleChange}
          className="w-full h-40 px-4 py-3 border border-gray-200 rounded-md bg-white outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
        />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}
      {success && (
        <p className="text-green-500 text-sm">Message sent successfully!</p>
      )}

      <div className="pt-4">
        <SubmitButton isLoading={isLoading} />
      </div>
    </form>
  );
}
