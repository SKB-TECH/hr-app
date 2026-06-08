import JobCategories from "./JobCategories";
import JobSummaryCard from "./JobSummaryCard";
import RequiredSkills from "./RequiredSkills";

type RoleInfo = {
  applyBefore: string;
  jobPostedOn: string;
  jobType: string;
  salary: string;
};

type Skill = {
  id: string | number;
  name: string;
};

type Category = {
  id: number | string;
  name: string;
};

type Props = {
  roleInfo: RoleInfo;
  categories: Category[];
  requiredSkills: Skill[];
  className?: string;
};

export default function JobSidebarSection({
  roleInfo,
  categories,
  requiredSkills,
  className = "",
}: Props) {
  return (
    <div className={className}>
      <JobSummaryCard
        applyBefore={roleInfo.applyBefore}
        postedOn={roleInfo.jobPostedOn}
        jobType={roleInfo.jobType}
        salary={roleInfo.salary}
      />
      <JobCategories labels={categories} />
      <RequiredSkills skills={requiredSkills} />
    </div>
  );
}
