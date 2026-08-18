export interface Benefit {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface JobData {
  jobTitle: string;

  location: string;

  employmentTypes: string[];

  minSalary: number;

  maxSalary: number;

  category: string;

  skills: string[];

  jobDescription: string;

  responsibilities: string;

  whoYouAre: string;

  niceToHave: string;

  benefits: Benefit[];
}
