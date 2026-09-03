import { FormField } from "../types/form-types";

// `label` and `placeholder` below are translation keys, not literal text.
// Consumers must resolve them via useTranslations("findJobs") as
// `apply.form.fields.<key>.label` / `apply.form.fields.<key>.placeholder`.
export const BASIC_FIELDS: FormField[] = [
  {
    key: "fullName",
    label: "fullName",
    type: "text",
    placeholder: "fullName",
  },
  {
    key: "email",
    label: "email",
    type: "email",
    placeholder: "email",
  },
  {
    key: "phone",
    label: "phone",
    type: "tel",
    placeholder: "phone",
  },
  {
    key: "currentJobTitle",
    label: "currentJobTitle",
    type: "text",
    placeholder: "currentJobTitle",
  },
];

export const LINK_FIELDS: FormField[] = [
  {
    key: "linkedinUrl",
    label: "linkedinUrl",
    type: "url",
    placeholder: "linkedinUrl",
  },
  {
    key: "portfolioUrl",
    label: "portfolioUrl",
    type: "url",
    placeholder: "portfolioUrl",
  },
];
