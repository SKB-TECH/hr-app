import { JobInfo, FormField } from "../types/form-types";

export const DEFAULT_JOB: JobInfo = {
  title: "Social Media Assistant",
  company: "Nomad",
  location: "Paris, France",
  type: "Full-Time",
};

export const BASIC_FIELDS: FormField[] = [
  {
    label: "Full name",
    type: "text",
    placeholder: "Enter your fullname",
  },
  {
    label: "Email address",
    type: "email",
    placeholder: "Enter your email address",
  },
  {
    label: "Phone number",
    type: "tel",
    placeholder: "Enter your phone number",
  },
  {
    label: "Current or previous job title",
    type: "text",
    placeholder: "What's your current or previous job title?",
  },
];

export const LINK_FIELDS: FormField[] = [
  {
    label: "LinkedIn URL",
    type: "url",
    placeholder: "Link to your LinkedIn URL",
  },
  {
    label: "Portfolio URL",
    type: "url",
    placeholder: "Link to your portfolio URL",
  },
];