export const DEGREE_SUGGESTIONS = [
  "High School Diploma",
  "Associate Degree",
  "Bachelor's Degree",
  "Master's Degree",
  "Doctorate (PhD)",
  "Professional Certificate",
  "Diploma",
  "Advanced Diploma",
];

export function isEndBeforeStart(startDate: string, endDate: string): boolean {
  if (!startDate || !endDate) return false;
  return new Date(endDate).getTime() < new Date(startDate).getTime();
}
