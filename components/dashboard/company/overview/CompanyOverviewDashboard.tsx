"use client";

import { useSession } from "@/core/hooks/auth/use-session";
import { useMyCompany } from "@/core/hooks/company/use-my-company";
import { useCompanyJobs } from "@/core/hooks/jobs/use-company-jobs";
import { useCompanyJobStats } from "@/core/hooks/jobs/use-company-job-stats";
import { useCompanyInterviews } from "@/core/hooks/interviews/use-company-interviews";
import GreetingFilter from "./GreetingFilter";
import QuickStatsBanner from "./QuickStatsBanner";
import JobStatisticsSection from "./JobStatisticsSection";
import JobOpenCard from "./JobOpenCard";
import ApplicantsSummary from "./ApplicantsSummary";
import JobUpdatesSection from "./JobUpdatesSection";

const COLORS=["#7B61FF","#56CDAD","#26A4FF","#F4A33C","#F65160"];

export default function CompanyOverviewDashboard(){
 const session=useSession(),company=useMyCompany(),companyId=company.data?.id||"";
 const jobs=useCompanyJobs(companyId,{limit:100}),stats=useCompanyJobStats(Boolean(companyId)),interviews=useCompanyInterviews(companyId);
 if(session.isPending||company.isPending||jobs.isPending||stats.isPending)return <div className="grid min-h-[650px] place-items-center text-[#7C8493]">Chargement du tableau de bord…</div>;
 if(company.isError||jobs.isError||stats.isError)return <div className="grid min-h-[650px] place-items-center"><button onClick={()=>{void company.refetch();void jobs.refetch();void stats.refetch()}} className="bg-brand px-5 py-3 font-bold text-white">Réessayer</button></div>;
 const rows=jobs.data?.data||[],summary=stats.data,now=new Date(),today=now.toDateString();
 const scheduledToday=(interviews.data||[]).filter(i=>new Date(i.scheduledAt).toDateString()===today).length;
 const categories=new Map<string,number>(); rows.forEach(job=>{const key=job.employmentTypes[0]?.replaceAll("_"," ")||"Autre";categories.set(key,(categories.get(key)||0)+job.applicantsCount)});
 const segments=[...categories.entries()].slice(0,5).map(([label,value],index)=>({label,value,color:COLORS[index]}));
 if(!segments.length)segments.push({label:"Candidatures",value:0,color:COLORS[0]});
 const latest=rows.slice(0,4).map(job=>({id:job.id,title:job.title,company:company.data?.name||"",location:job.location||"Remote",logo:job.companyLogoUrl||company.data?.logo||"/favicon.ico",tags:[job.category||"Autre",...(job.skills||[]).slice(0,1)],applied:job.applicantsCount,capacity:job.hiringTarget,employmentType:job.employmentTypes[0]?.replaceAll("_"," ")||"Non précisé"}));
 const start=new Date(now);start.setDate(now.getDate()-6);const dateRange=`${start.toLocaleDateString(undefined,{month:"short",day:"numeric"})} - ${now.toLocaleDateString(undefined,{month:"short",day:"numeric"})}`;
 return <main className="h-full overflow-y-auto bg-white px-5 pb-10 lg:px-9">
  <GreetingFilter name={session.data?.fullName?.split(" ")[0]||"Recruteur"} dateRange={dateRange}/>
  <QuickStatsBanner stats={[{value:summary?.applications||0,label:"Nouveaux candidats",bgColor:"#4640DE"},{value:scheduledToday,label:"Entretiens aujourd’hui",bgColor:"#56CDAD"},{value:0,label:"Messages non lus",bgColor:"#26A4FF"}]}/>
  <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,2fr)_352px]"><JobStatisticsSection applications={summary?.applications||0} jobs={rows}/><div className="grid gap-6"><JobOpenCard count={summary?.statuses.LIVE||0}/><ApplicantsSummary total={summary?.applications||0} segments={segments}/></div></div>
  <div className="mt-6"><JobUpdatesSection jobs={latest}/></div>
 </main>;
}
