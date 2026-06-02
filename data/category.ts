export type CategoryProp = {
  id: number;
  name: string;
  availableJobs: number;
  logo:string
};

export const categoriesData  = [
   {id: 1,name: "Design", availableJobs: 235,logo:"/images/Design-ico.png"},
    { id: 2,name: "Sales",availableJobs: 756 ,logo:"/images/sales-icon.png" },
    { id: 3, name: "Marketing",availableJobs: 140 , logo:"/images/marketing-ico.png" },
    { id: 4, name: "Finance", availableJobs: 325, logo:"/images/Finance-icon.png" },
    { id: 5,name: "Technology", availableJobs: 336, logo:"/images/Technology-icon.png"},
    {  id: 6,name: "Engineering",availableJobs: 542, logo:"/images/Bussiness.png"},
    { id: 7, name: "Business",availableJobs: 211, logo:"/images/Business-ico.png" },
    { id: 8,name: "Human Resources",  availableJobs: 346, logo:"/images/human-resources.png" }
  
]