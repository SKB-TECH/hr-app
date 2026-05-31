import PaginationWrapper from "@/app/[locale]/(pages)/jobs/ReusablePagination/PaginationWrapper";
import ReusableHeroSection from "@/app/[locale]/(pages)/jobs/HeroSection/ReusableHeroSection";
import Navbar from "@/components/ui/Navbar";
import JobsPage from "./(pages)/jobs/page";

const Page = () => {
  return (
    <main className='flex-1 space-y-8 p-6'>
     <JobsPage />
    </main>
  );
};

export default Page;
