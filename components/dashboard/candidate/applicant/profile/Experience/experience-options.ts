export const EMPLOYMENT_TYPE_OPTIONS = ["Full-Time", "Part-Time", "Contract", "Internship", "Freelance"];

export function isEndBeforeStart(startDate: string, endDate: string): boolean {
  if (!startDate || !endDate) return false;
  return new Date(endDate).getTime() < new Date(startDate).getTime();
}
