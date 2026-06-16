
export interface FeaturedJob {
  id: number;
  title: string;
  companyLogo: string;
  description: string;
  location: string;
  tags: string[];
  companyName:string
}

export const featuredJobsData = [
  { id: 1, companyName:"Revolut" ,title: "Email Marketing", companyLogo: "/revolut.png", description: "Revolut look for Email marketing to help team ma... ", location: "Madrid, Spain", tags: ["Marketing", "Design"] },
  { id: 2, companyName:"Dropbox" , title: "Brand Designer", companyLogo: "/Dropbox.png", description: "Dropbox is looking for a creative brand designer to help team t...", location: "San Francisco, US", tags: ["Design", "Business"] },
  { id: 3, companyName:"Potch" , title: "Email Marketing", companyLogo: "/Pitch.png", description: "Pitch is looking for customer manager to join marketiing t...", location: " berlin -germany", tags: ["Marketing"] },
  { id: 4, companyName:"Blinklist" ,  title: "Visual Designer", companyLogo: "/Blin.png", description: "Blinklist look for a visual designer to help team desi... ", location: " Granada - spain", tags: ["Design"] },
  { id: 5,  companyName:"ClassPass" , title: "Product Designer", companyLogo: "/ClassPass.png", description: "Classpass look for a product designer to help us...", location: "machester , Uk", tags: ["Marketing","Design" ] },
  { id: 6, companyName:"Canva"  ,title: "Lead Designer", companyLogo: "/Canva.png", description: "Canva look for lead engineer to help develop n... ", location: "otario-canada", tags: ["Design","Business"] },
  { id: 7, companyName:"GoDaddy",  title: "Brand Strategy", companyLogo: "/GoDaddy.png", description: "GoDaddy is looking for a brand strategy to join the team...", location: " Marceille , France", tags: ["Marketing"] },
  { id: 8, companyName:"Twitter" , title: "Data Analyst", companyLogo: "/Twitter.png", description: "twitter look for Data Analyst to help  team Design...", location: " San diego , us ", tags: ["Technology"] },
];