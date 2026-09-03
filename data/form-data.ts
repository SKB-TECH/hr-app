import { FormField } from "../types/form-types";

export const BASIC_FIELDS: FormField[] = [
  {
    key: "fullName",
    label: "Full name",
    type: "text",
    placeholder: "Enter your fullname",
  },
  {
    key: "email",
    label: "Email address",
    type: "email",
    placeholder: "Enter your email address",
  },
  {
    key: "phone",
    label: "Phone number",
    type: "tel",
    placeholder: "Enter your phone number",
  },
  {
    key: "currentJobTitle",
    label: "Current or previous job title",
    type: "text",
    placeholder: "What's your current or previous job title?",
  },
];

export const LINK_FIELDS: FormField[] = [
  {
    key: "linkedinUrl",
    label: "LinkedIn URL",
    type: "url",
    placeholder: "Link to your LinkedIn URL",
  },
  {
    key: "portfolioUrl",
    label: "Portfolio URL",
    type: "url",
    placeholder: "Link to your portfolio URL",
  },
];
