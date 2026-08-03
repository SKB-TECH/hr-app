export interface TableDataTypes {
  id: number;
  role: string;
  status: string;
  date_posted: Date;
  due_date: string;
  job_type: string;
  applicants: number;
  current_applicants: number;
  max_applicants: number;
}

export interface JobListingTypes {
  Live: string;
  Draft: string;
  Closed: string;
}

export const jobListingData: TableDataTypes[] = [
  {
    id: 1,
    role: "Social Media Assistant",
    status: "Live",
    date_posted: new Date("2026-05-20"),
    due_date: "2026-06-20",
    job_type: "Full Time",
    applicants: 15,
    current_applicants: 4,
    max_applicants: 11,
  },
  {
    id: 2,
    role: "Senior Designer",
    status: "Closed",
    date_posted: new Date("2026-05-18"),
    due_date: "2026-06-18",
    job_type: "Full Time",
    applicants: 42,
    current_applicants: 2,
    max_applicants: 2,
  },
  {
    id: 3,
    role: "Frontend Developer",
    status: "Live",
    date_posted: new Date("2026-06-01"),
    due_date: "2026-07-01",
    job_type: "Full Time",
    applicants: 37,
    current_applicants: 3,
    max_applicants: 5,
  },
  {
    id: 4,
    role: "Backend Developer",
    status: "Live",
    date_posted: new Date("2026-06-02"),
    due_date: "2026-07-05",
    job_type: "Full Time",
    applicants: 29,
    current_applicants: 1,
    max_applicants: 4,
  },
  {
    id: 5,
    role: "UI/UX Designer",
    status: "Draft",
    date_posted: new Date("2026-06-05"),
    due_date: "2026-07-10",
    job_type: "Contract",
    applicants: 0,
    current_applicants: 0,
    max_applicants: 2,
  },
  {
    id: 6,
    role: "Product Manager",
    status: "Live",
    date_posted: new Date("2026-05-25"),
    due_date: "2026-06-30",
    job_type: "Full Time",
    applicants: 18,
    current_applicants: 12,
    max_applicants: 20,
  },
  {
    id: 7,
    role: "QA Engineer",
    status: "Closed",
    date_posted: new Date("2026-05-10"),
    due_date: "2026-06-10",
    job_type: "Full Time",
    applicants: 24,
    current_applicants: 2,
    max_applicants: 2,
  },
  {
    id: 8,
    role: "DevOps Engineer",
    status: "Live",
    date_posted: new Date("2026-06-08"),
    due_date: "2026-07-12",
    job_type: "Remote",
    applicants: 11,
    current_applicants: 0,
    max_applicants: 1,
  },
  {
    id: 9,
    role: "Data Analyst",
    status: "Live",
    date_posted: new Date("2026-06-04"),
    due_date: "2026-07-04",
    job_type: "Hybrid",
    applicants: 26,
    current_applicants: 1,
    max_applicants: 3,
  },
  {
    id: 10,
    role: "Data Scientist",
    status: "Draft",
    date_posted: new Date("2026-06-07"),
    due_date: "2026-07-20",
    job_type: "Full Time",
    applicants: 0,
    current_applicants: 0,
    max_applicants: 2,
  },
  {
    id: 11,
    role: "Marketing Specialist",
    status: "Closed",
    date_posted: new Date("2026-05-03"),
    due_date: "2026-06-03",
    job_type: "Part Time",
    applicants: 31,
    current_applicants: 3,
    max_applicants: 3,
  },
  {
    id: 12,
    role: "Content Writer",
    status: "Live",
    date_posted: new Date("2026-06-06"),
    due_date: "2026-07-08",
    job_type: "Remote",
    applicants: 20,
    current_applicants: 2,
    max_applicants: 4,
  },
  {
    id: 13,
    role: "HR Coordinator",
    status: "Live",
    date_posted: new Date("2026-05-28"),
    due_date: "2026-06-28",
    job_type: "Full Time",
    applicants: 13,
    current_applicants: 1,
    max_applicants: 2,
  },
  {
    id: 14,
    role: "Recruiter",
    status: "Closed",
    date_posted: new Date("2026-05-01"),
    due_date: "2026-06-01",
    job_type: "Hybrid",
    applicants: 35,
    current_applicants: 2,
    max_applicants: 2,
  },
  {
    id: 15,
    role: "Finance Officer",
    status: "Live",
    date_posted: new Date("2026-06-10"),
    due_date: "2026-07-15",
    job_type: "Full Time",
    applicants: 9,
    current_applicants: 0,
    max_applicants: 1,
  },
  {
    id: 16,
    role: "Business Analyst",
    status: "Live",
    date_posted: new Date("2026-06-11"),
    due_date: "2026-07-16",
    job_type: "Hybrid",
    applicants: 22,
    current_applicants: 1,
    max_applicants: 2,
  },
  {
    id: 17,
    role: "Customer Success Manager",
    status: "Draft",
    date_posted: new Date("2026-06-09"),
    due_date: "2026-07-18",
    job_type: "Remote",
    applicants: 0,
    current_applicants: 0,
    max_applicants: 3,
  },
  {
    id: 18,
    role: "Technical Support Engineer",
    status: "Live",
    date_posted: new Date("2026-06-12"),
    due_date: "2026-07-19",
    job_type: "Shift",
    applicants: 17,
    current_applicants: 2,
    max_applicants: 5,
  },
  {
    id: 19,
    role: "Graphic Designer",
    status: "Closed",
    date_posted: new Date("2026-05-14"),
    due_date: "2026-06-14",
    job_type: "Contract",
    applicants: 40,
    current_applicants: 1,
    max_applicants: 1,
  },
  {
    id: 20,
    role: "Mobile Developer",
    status: "Live",
    date_posted: new Date("2026-06-13"),
    due_date: "2026-07-22",
    job_type: "Full Time",
    applicants: 16,
    current_applicants: 1,
    max_applicants: 2,
  },
  {
    id: 21,
    role: "Cloud Engineer",
    status: "Live",
    date_posted: new Date("2026-06-14"),
    due_date: "2026-07-25",
    job_type: "Remote",
    applicants: 14,
    current_applicants: 0,
    max_applicants: 2,
  },
  {
    id: 22,
    role: "Security Engineer",
    status: "Draft",
    date_posted: new Date("2026-06-15"),
    due_date: "2026-07-30",
    job_type: "Full Time",
    applicants: 0,
    current_applicants: 0,
    max_applicants: 1,
  },
  {
    id: 23,
    role: "Machine Learning Engineer",
    status: "Live",
    date_posted: new Date("2026-06-16"),
    due_date: "2026-07-31",
    job_type: "Hybrid",
    applicants: 27,
    current_applicants: 2,
    max_applicants: 3,
  },
  {
    id: 24,
    role: "Operations Manager",
    status: "Closed",
    date_posted: new Date("2026-05-07"),
    due_date: "2026-06-07",
    job_type: "Full Time",
    applicants: 33,
    current_applicants: 1,
    max_applicants: 1,
  },
  {
    id: 25,
    role: "Sales Executive",
    status: "Live",
    date_posted: new Date("2026-06-17"),
    due_date: "2026-08-01",
    job_type: "Full Time",
    applicants: 12,
    current_applicants: 3,
    max_applicants: 6,
  },
  {
    id: 26,
    role: "Accountant",
    status: "Live",
    date_posted: new Date("2026-06-18"),
    due_date: "2026-08-03",
    job_type: "Part Time",
    applicants: 8,
    current_applicants: 0,
    max_applicants: 2,
  },
  {
    id: 27,
    role: "Office Administrator",
    status: "Closed",
    date_posted: new Date("2026-05-11"),
    due_date: "2026-06-11",
    job_type: "Full Time",
    applicants: 21,
    current_applicants: 1,
    max_applicants: 1,
  },
  {
    id: 28,
    role: "Project Coordinator",
    status: "Live",
    date_posted: new Date("2026-06-19"),
    due_date: "2026-08-05",
    job_type: "Hybrid",
    applicants: 19,
    current_applicants: 2,
    max_applicants: 4,
  },
  {
    id: 29,
    role: "AI Engineer",
    status: "Draft",
    date_posted: new Date("2026-06-20"),
    due_date: "2026-08-10",
    job_type: "Remote",
    applicants: 0,
    current_applicants: 0,
    max_applicants: 2,
  },
  {
    id: 30,
    role: "Intern Software Developer",
    status: "Live",
    date_posted: new Date("2026-06-21"),
    due_date: "2026-08-12",
    job_type: "Internship",
    applicants: 53,
    current_applicants: 5,
    max_applicants: 10,
  },
];

export const jobListingStyles: JobListingTypes = {
  Live: "bg-white border-[1px] border-accent-green text-accent-green",
  Draft: "bg-white border-[1px] border-accent-yellow text-accent-yellow",
  Closed: "bg-white border-[1px] border-accent-red text-accent-red",
};

export const jobTypeStyles = {
  "Full Time": "bg-white border-[1px] border-brand text-brand",
  "Part Time": "bg-white border-[1px] border-accent-green text-accent-green",
  Remote: "bg-white border-[1px] border-teal-600 text-teal-600",
  Hybrid: "bg-white border-[1px] border-purple-600 text-purple-600",
  Contract: "bg-white border-[1px] border-orange-600 text-orange-600",
  Internship: "bg-white border-[1px] border-cyan-600 text-cyan-600",
  Freelance: "bg-white border-[1px] border-accent-yellow text-accent-yellow",
  Shift: "bg-white border-[1px] border-rose-600 text-rose-600",
};

export const STATUS_OPTIONS = ["Live", "Draft", "Closed"] as const;
export const JOB_TYPE_OPTIONS = [
  "Full Time",
  "Part Time",
  "Remote",
  "Hybrid",
  "Contract",
  "Internship",
  "Shift",
] as const;

export interface ChartDataPoint {
  date: string;
  views: number;
}

export const viewStatsData: ChartDataPoint[] = [
  { date: "19 Jul", views: 390 },
  { date: "20 Jul", views: 30 },
  { date: "21 Jul", views: 500 },
  { date: "22 Jul", views: 120 },
  { date: "23 Jul", views: 580 },
  { date: "24 Jul", views: 250 },
  { date: "25 Jul", views: 430 },
];

export interface TrafficChannelData {
  name: string;
  value: number;
  color: string;
}

export const trafficChannelData: TrafficChannelData[] = [
  {
    name: "Direct",
    value: 48,
    color: "#FFB836",
  },
  {
    name: "Social",
    value: 23,
    color: "#379FF2",
  },
  {
    name: "Organic",
    value: 24,
    color: "#6C5CE7",
  },
  {
    name: "Other",
    value: 5,
    color: "#56CDAD",
  },
];

export interface CountryVisitors {
  id: number;
  name: string;
  flag: string;
  visitors: number;
}

export const countryVisitorsData: CountryVisitors[] = [
  {
    id: 1,
    name: "USA",
    flag: "us",
    visitors: 3240,
  },
  {
    id: 2,
    name: "France",
    flag: "fr",
    visitors: 3188,
  },
  {
    id: 3,
    name: "Italy",
    flag: "it",
    visitors: 2938,
  },
  {
    id: 4,
    name: "Germany",
    flag: "de",
    visitors: 2624,
  },
  {
    id: 5,
    name: "Japan",
    flag: "jp",
    visitors: 2414,
  },
  {
    id: 6,
    name: "Netherlands",
    flag: "nl",
    visitors: 1916,
  },
  {
    id: 7,
    name: "Canada",
    flag: "ca",
    visitors: 1810,
  },
];