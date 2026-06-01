// use this file for data that is used across the app, such as arrays of objects, constants, etc.
import { Company, SidebarFilterCompany } from "../types/types";

// mock data for search company sidebar filters
export const mockSidebarCompanyFilters: SidebarFilterCompany[] = [
  {
    title: "Industry",
    options: [
      { name: "Advertising", count: 43 },
      { name: "Business Service", count: 4 },
      { name: "Blockchain", count: 5 },
      { name: "Cloud", count: 15 },
      { name: "Consumer Tech", count: 5 },
      { name: "Education", count: 34 },
      { name: "Fintech", count: 45 },
      { name: "Gaming", count: 33 },
      { name: "Food & Beverage", count: 5, defaultSelected: true },
      { name: "Healthcare", count: 3, defaultSelected: true },
      { name: "Hosting", count: 5 },
      { name: "Media", count: 4 },
    ],
  },
  {
    title: "Company Size",
    options: [
      { name: "1-50", count: 25 },
      { name: "51-150", count: 57 },
      { name: "151-250", count: 45 },
      { name: "251-500", count: 4, defaultSelected: true },
      { name: "501-1000", count: 43 },
      { name: "1000+ above", count: 23 },
    ],
  },
];

export const sortOptions = ["Most relevant", "Most recent"];

// Mock data for companies
export const companies: Company[] = [
  {
    id: 1,
    src: "/stripe.png",
    location: "San Francisco, CA",
    availableJobs: 12,
    name: "Stripe",
    description:
      "Stripe is a software platform for starting and running internet businesses. Millions of businesses rely on Stripe's software tools.",
    industry: [
      {
        name: "Business",
        style: {
          color: "#56CDAD",
          bg: "#FFFFFF",
        },
      },
      {
        name: "Blockchain",
        style: {
          color: "#FFB836",
          bg: "#FFFFFF",
        },
      },
    ],
    size: 1000,
  },
  {
    id: 2,
    src: "/square.png",
    location: "San Francisco, CA",
    availableJobs: 8,
    name: "Square",
    description:
      "Square builds common business tools in unconventional ways so more people can start, run, and grow their businesses.",
    industry: [
      {
        name: "Business",
        style: {
          color: "#56CDAD",
          bg: "#FFFFFF",
        },
      },
      {
        name: "Blockchain",
        style: {
          color: "#FFB836",
          bg: "#FFFFFF",
        },
      },
    ],
    size: 1000,
  },
  {
    id: 3,
    src: "/robinhood.png",
    location: "Menlo Park, CA",
    availableJobs: 5,
    name: "Robinhood",
    description:
      "Robinhood is lowering barriers, removing fees, and providing greater access to financial information.",
    industry: [
      {
        name: "Business",
        style: {
          color: "#56CDAD",
          bg: "#FFFFFF",
        },
      },
    ],
    size: 1000,
  },
  {
    id: 4,
    src: "/revolut.png",
    location: "London, UK",
    availableJobs: 14,
    name: "Revolut",
    description:
      "When Revolut was founded in 2015, we had a vision to build a sustainable, digital alternative to traditional big banks.",
    industry: [
      {
        name: "Business",
        style: {
          color: "#56CDAD",
          bg: "#FFFFFF",
        },
      },
    ],
    size: 1000,
  },
  {
    id: 5,
    src: "/truebill.png",
    location: "Washington, DC",
    availableJobs: 3,
    name: "Truebill",
    description:
      "Take control of your money. Truebill develops a mobile app that helps consumers take control of their financial.",
    industry: [
      {
        name: "Business",
        style: {
          color: "#56CDAD",
          bg: "#FFFFFF",
        },
      },
    ],
    size: 501,
  },
  {
    id: 6,
    src: "/coinbase.png",
    location: "San Francisco, CA",
    availableJobs: 21,
    name: "Coinbase",
    description:
      "Coinbase is a digital currency wallet and platform where merchants and consumers can transact with new digital currencies.",
    industry: [
      {
        name: "Business",
        style: {
          color: "#56CDAD",
          bg: "#FFFFFF",
        },
      },
      {
        name: "Blockchain",
        style: {
          color: "#FFB836",
          bg: "#FFFFFF",
        },
      },
    ],
    size: 1000,
  },
  {
    id: 7,
    src: "/kraken.png",
    location: "San Francisco, CA",
    availableJobs: 9,
    name: "Kraken",
    description:
      "Based in San Francisco, Kraken is the world's largest global bitcoin exchange in euro volume and liquidity.",
    industry: [
      {
        name: "Business",
        style: {
          color: "#56CDAD",
          bg: "#FFFFFF",
        },
      },
      {
        name: "Blockchain",
        style: {
          color: "#FFB836",
          bg: "#FFFFFF",
        },
      },
    ],
    size: 1000,
  },
  {
    id: 8,
    src: "/divvy.png",
    location: "Lehi, UT",
    availableJobs: 4,
    name: "Divvy",
    description:
      "Divvy is a secure financial platform for businesses to manage payments and subscriptions.",
    industry: [
      {
        name: "Business",
        style: {
          color: "#56CDAD",
          bg: "#FFFFFF",
        },
      },
      {
        name: "Blockchain",
        style: {
          color: "#FFB836",
          bg: "#FFFFFF",
        },
      },
    ],
    size: 501,
  },
];

// job data can be added here as well
export const Alljobsfilter: SidebarFilterCompany[] = [
  {
    title: "Type of Employment",
    options: [{ name: "Full-time", count: 3 }, { name: "Part-time", count: 5 },
    { name: "Remote", count: 2 }, { name: "Internship", count: 24 },{ name: "Contract", count: 3 },],
  },
  {
    title: "Categories",
    options: [
      { name: "Design", count: 24 },
      { name: "Sales", count: 3 },
      { name: "Marketing", count: 3 },
      { name: "Business", count: 3, defaultSelected: true },
      { name: "Human Resources", count: 6 },
      { name: "Finance", count: 4 }, {
        name: "Engineering", count: 4
      },{ name: "technology", count: 5, defaultSelected: true },
    ],
  },
  {
    title: "Job Level",
    options: [
      { name: "Entry Level", count: 57 },
      { name: "Mid Level", count: 3 },
      { name: "Senior Level", count: 5 },
      { name: "Director", count: 12, defaultSelected: true },
      { name: "Vp or Above", count: 8 },
    ],
  },
  {
    title: "Salary Range",
    options: [
      { name: "$700 - $1000", count: 4 },
      { name: "$1000 - $1500", count: 6 },
      { name: "$1500 - $2000", count: 10 },
      { name: "$3000 or above", count: 4, defaultSelected: true },
    ],
  }
];


export const availableJobs: Company[] = [
  {
    id: 1,
    src: "/Nomad.png",
    location: "San Francisco, CA",
    availableJobs: 9,
    name: "Social Media Assistant",
    description:
      "Nomad is a software platform for starting and running internet businesses. Millions of businesses rely on Nomad's software tools.",
    industry: [
      {
        name: "Business",
        style: {
          color: "#56CDAD",
          bg: "#FFFFFF",
        },
      },
      {
        name: "Blockchain",
        style: {
          color: "#FFB836",
          bg: "#FFFFFF",
        },
      },
    ],
    size: 1000,
  },
  {
    id: 2,
    src: "/Dropbox.png",
    location: "San Francisco, CA",
    availableJobs: 9,
    name: "Brand Designer",
    description:
      "Dropbox is a file hosting service that offers cloud storage, file synchronization, and collaborative services.",
    industry: [
      {
        name: "Business",
        style: {
          color: "#56CDAD",
          bg: "#FFFFFF",
        },
      },
      {
        name: "Blockchain",
        style: {
          color: "#FFB836",
          bg: "#FFFFFF",
        },
      },
    ],
    size: 1000,
  },
  {
    id: 3,
    src: "/Terraform.png",
    location: "San Francisco, CA",
    availableJobs: 9,
    name: "Interactive Developer",
    description:
      "Terraform is a tool for building, changing, and versioning infrastructure safely and efficiently.",
    industry: [
      {
        name: "Business",
        style: {
          color: "#56CDAD",
          bg: "#FFFFFF",
        },
      },
      {
        name: "Blockchain",
        style: {
          color: "#FFB836",
          bg: "#FFFFFF",
        },
      },
    ],
    size: 1000,
  },
  {
    id: 4,
    src: "/revolut.png",
    location: "San Francisco, CA",
    availableJobs: 9,
    name: "Email Marketing",
    description:
      "Revolut is a financial technology company that provides a digital banking service.",
    industry: [
      {
        name: "Business",
        style: {
          color: "#56CDAD",
          bg: "#FFFFFF",
        },
      },
      {
        name: "Blockchain",
        style: {
          color: "#FFB836",
          bg: "#FFFFFF",
        },
      },
    ],
    size: 1000,
  },
  {
    id: 5,
    src: "/Canva.png",
    location: "San Francisco, CA",
    availableJobs: 9,
    name: "Lead Engineer",
    description:
      "Nomad is a software platform for starting and running internet businesses. Millions of businesses rely on Nomad's software tools.",
    industry: [
      {
        name: "Business",
        style: {
          color: "#56CDAD",
          bg: "#FFFFFF",
        },
      },
      {
        name: "Blockchain",
        style: {
          color: "#FFB836",
          bg: "#FFFFFF",
        },
      },
    ],
    size: 1000,
  },
  {
    id: 6,
    src: "/ClassPass.png",
    location: "San Francisco, CA",
    availableJobs: 9,
    name: "Product Designer",
    description:
      "ClassPass is a fitness subscription service that provides access to various workout classes and facilities.",
    industry: [
      {
        name: "Business",
        style: {
          color: "#56CDAD",
          bg: "#FFFFFF",
        },
      },
      {
        name: "Blockchain",
        style: {
          color: "#FFB836",
          bg: "#FFFFFF",
        },
      },
    ],
    size: 1000,
  },
  {
    id: 7,
    src: "/Pitch.png",
    location: "San Francisco, CA",
    availableJobs: 9,
    name: "Customer Manager",
    description:
      "Nomad is a software platform for starting and running internet businesses. Millions of businesses rely on Nomad's software tools.",
    industry: [
      {
        name: "Business",
        style: {
          color: "#56CDAD",
          bg: "#FFFFFF",
        },
      },
      {
        name: "Blockchain",
        style: {
          color: "#FFB836",
          bg: "#FFFFFF",
        },
      },
    ],
    size: 1000,
  },
];
