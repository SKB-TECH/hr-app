// use this file for ts types

// company type definition
export type CompanyIndustry = {
  name: string;
  style: {
    bg: string;
    color:string
  };
};
export type Company = {
  id: number;
  src: string;
  availableJobs: number;
  name: string;
  description: string;
  industry: CompanyIndustry[];
  size: number;
};
// company filter type definition
export type FilterOption = {
  name: string;
  count: number;
};
