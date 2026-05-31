import SectionComponent from "@/components/common/section/Section";
import Link from "next/link";
import HeroSectionComponent from "@/components/common/HeroSection/HeroSectionComponent";

const HomePage = () => {
    return (
        <>
            <HeroSectionComponent/>
            {/*  Companies we helped grow  */}
            <div className="w-full bg-white py-10">
                <section className="max-w-6xl mx-auto flex flex-col gap-5">
                    <span className="text-sm text-black/60 font-bold">Companies we are working with!</span>
                    <div className="flex flex-row gap-4 w-full overflow-x-hidden">

                        {[0,1,2,3,4,5].map((i) => (
                            <Link href="#" key={i} className="p-8 rounded-md bg-white/50 border hover:border transition-all duration-150">
                                <span className="">Logo company</span>
                            </Link>
                        ))}
                    </div>
                </section>
            </div>
            <SectionComponent
                title="Explore by"
                highlight="category"
                isExpanded={true}
                showAllText="Show all jobs"
                showAllLink="/jobs"
            />
        </>
    );
};

export default HomePage;
