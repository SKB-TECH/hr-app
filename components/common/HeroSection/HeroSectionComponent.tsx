import HeroContent from "./HeroContent";

export default function HeroSectionComponent(){
    return (
      
        <div className="">
            <div className="  min-h-[550px] bg-pattern bg-[#F8F8FD] position-relative px-6 sm:px-18">
               <HeroContent
        heading={"Discover\nmore than"}
        headingHighlight="5000+ Jobs"
        subheading={
          "Great platform for the job seeker that searching for\nnew career heights and passionate about startups."
        }
        searchBar={{
          placeholder: "Job title or keyword",
          defaultLocation: "Florence, Italy",
          searchLabel: "Search my job",
          popularLabel: "Popular :",
          popularTags: ["UI Designer", "UX Researcher", "Android", "Admin"],
        }}
      />

            </div>
        </div>
    )
}