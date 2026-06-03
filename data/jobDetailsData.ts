// these mock data being used in job[id] page, and can be used in other pages as well if needed

export type Job = {
  title: string;
  image: string;
  company: string;
  location: string;
  type: string;
  category: string;
  role: string;
};

export const categoryStyles: Record<string, { bg: string; text: string }> = {
  marketing: {
    bg: "#EB85331A",
    text: "#FFB836",
  },
  design: {
    bg: "#56CDAD1A",
    text: "#56CDAD",
  },
  engineering: {
    bg: "#D6E4FF1A",
    text: "#2F54EB",
  },
  product: {
    bg: "#FFF1B8",
    text: "#FA8C16",
  },
  development: {
    bg: "#C8FACD",
    text: "#52C41A",
  },
};
export const jobsDetailsResponse = [
  {
    id: "1",
    company: "Stripe",
    title: "Social Media Marketing Specialist",

    description:
      "Stripe is looking for Social Media Marketing expert to help manage our online networks. You will be responsible for monitoring our social media channels, creating content, finding effective ways to engage the community and incentivize others to engage on our channels.",

    responsibilities: [
      "Community engagement to ensure that is supported and actively represented online",
      "Focus on social media content development and publication",
      "Marketing and strategy support",
      "Stay on top of trends on social media platforms",
      "Engage with online communities",
    ],

    whoYouAre: [
      "You're detail-oriented and creative",
      "You have strong communication skills",
      "You enjoy community engagement",
    ],

    niceToHaves: [
      "Fluent in English",
      "Project management skills",
      "Copy editing skills",
    ],

    roleInfo: {
      applyBefore: "July 31, 2021",
      jobPostedOn: "July 1, 2021",
      jobType: "Full-Time",
      salary: "$75k–$85k USD",
    },

    categories: [
      { id: 1, name: "Marketing" },
      { id: 2, name: "Design" },
    ],

    skills: [
      "Project Management",
      "Copywriting",
      "Social Media Marketing",
      "English",
    ],

    applicants: {
      applied: 5,
      capacity: 10,
      progress: 50,
    },

    requiredSkills: [
      { id: 1, name: "Project Management" },
      { id: 2, name: "Copywriting" },
      { id: 3, name: "Social Media Marketing" },
    ],
  },

  {
    id: "2",
    company: "Spotify",
    title: "Frontend Developer",

    description:
      "Spotify is looking for a Frontend Developer to build scalable and user-friendly web applications for millions of users worldwide.",

    responsibilities: [
      "Build reusable UI components",
      "Collaborate with designers and backend developers",
      "Optimize applications for performance",
      "Maintain clean and scalable code",
    ],

    whoYouAre: [
      "You enjoy solving UI challenges",
      "You understand responsive design",
      "You write clean TypeScript code",
    ],

    niceToHaves: [
      "Experience with Next.js",
      "Knowledge of animations",
      "Testing experience",
    ],

    roleInfo: {
      applyBefore: "August 20, 2021",
      jobPostedOn: "August 2, 2021",
      jobType: "Remote",
      salary: "$90k–$110k USD",
    },

    categories: [
      { id: 1, name: "Development" },
      { id: 2, name: "Engineering" },
    ],

    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],

    applicants: {
      applied: 18,
      capacity: 25,
      progress: 72,
    },

    requiredSkills: [
      { id: 1, name: "React" },
      { id: 2, name: "Next.js" },
      { id: 3, name: "TypeScript" },
    ],
  },

  {
    id: "3",
    company: "Airbnb",
    title: "Product Designer",

    description:
      "Airbnb is hiring a Product Designer to create intuitive and delightful user experiences for travelers and hosts.",

    responsibilities: [
      "Design user-centered interfaces",
      "Create wireframes and prototypes",
      "Work closely with product managers",
      "Maintain design consistency",
    ],

    whoYouAre: [
      "You have a strong design portfolio",
      "You understand UX principles",
      "You enjoy collaborative environments",
    ],

    niceToHaves: [
      "Experience with Figma",
      "Illustration skills",
      "Motion design knowledge",
    ],

    roleInfo: {
      applyBefore: "September 10, 2021",
      jobPostedOn: "August 15, 2021",
      jobType: "Full-Time",
      salary: "$85k–$100k USD",
    },

    categories: [
      { id: 1, name: "Design" },
      { id: 2, name: "Product" },
    ],

    skills: ["Figma", "UX Research", "Wireframing", "Prototyping"],

    applicants: {
      applied: 12,
      capacity: 20,
      progress: 60,
    },

    requiredSkills: [
      { id: 1, name: "Figma" },
      { id: 2, name: "UX Research" },
      { id: 3, name: "Prototyping" },
    ],
  },

  {
    id: "4",
    company: "Notion",
    title: "Backend Engineer",

    description:
      "Notion is seeking a Backend Engineer to help scale our infrastructure and improve system reliability.",

    responsibilities: [
      "Build scalable backend services",
      "Design APIs and database structures",
      "Improve system performance",
      "Collaborate across engineering teams",
    ],

    whoYouAre: [
      "You enjoy system design",
      "You write efficient backend code",
      "You are comfortable with databases",
    ],

    niceToHaves: [
      "Cloud deployment experience",
      "Knowledge of microservices",
      "DevOps familiarity",
    ],

    roleInfo: {
      applyBefore: "October 1, 2021",
      jobPostedOn: "September 1, 2021",
      jobType: "Hybrid",
      salary: "$110k–$130k USD",
    },

    categories: [
      { id: 1, name: "Engineering" },
      { id: 2, name: "Backend" },
    ],

    skills: ["Node.js", "PostgreSQL", "Docker", "API Development"],

    applicants: {
      applied: 9,
      capacity: 15,
      progress: 60,
    },

    requiredSkills: [
      { id: 1, name: "Node.js" },
      { id: 2, name: "PostgreSQL" },
      { id: 3, name: "Docker" },
    ],
  },
];
export const perks = [
  {
    icon: "/icon.png",
    title: "Full Healthcare",
    description:
      "We believe in thriving communities and that starts with our team being happy and healthy.",
  },
  {
    icon: "/icon1.png",
    title: "Unlimited Vacation",
    description:
      "We believe you should have a flexible schedule that makes space for family, wellness, and fun.",
  },
  {
    icon: "/icon2.png",
    title: "Skill Development",
    description:
      "We believe in always learning and leveling up our skills. Whether it's a conference or online course.",
  },
  {
    icon: "/icon3.png",
    title: "Team Summits",
    description:
      "Every 6 months we have a full team summit where we have fun, reflect, and plan for the upcoming quarter.",
  },
  {
    icon: "/icon4.png",
    title: "Remote Working",
    description:
      "You know how you perform your best. Work from home, coffee shop or anywhere when you feel like it.",
  },
  {
    icon: "/icon4.png",
    title: "Commuter Benefits",
    description:
      "We’re grateful for all the time and energy each team member puts into getting to work every day.",
  },
  {
    icon: "/icon5.png",
    title: "We give back.",
    description:
      "We anonymously match any donation our employees make (up to $/€ 600) so they can support the organizations they care about most-times two.",
  },
];

export const similarJobs: Job[] = [
  {
    image: "/Nomad.png",
    title: "Social Media Assistant",
    company: "Nomad",
    location: "Paris, France",
    type: "Full-Time",
    category: "Marketing",
    role: "Design",
  },
  {
    image: "/Dropbox.png",
    title: "Brand Designer",
    company: "Dropbox",
    location: "San Fransisco, USA",
    type: "Full-Time",
    category: "Marketing",
    role: "Design",
  },
  {
    image: "/Terraform.png",
    title: "Interactive Developer",
    company: "Terraform",
    location: "Hamburg, Germany",
    type: "Full-Time",
    category: "Marketing",
    role: "Design",
  },
  {
    image: "/Packer.png",
    title: "HR Manager",
    company: "Packer",
    location: "Lucern, Switzerland",
    type: "Full-Time",
    category: "Marketing",
    role: "Design",
  },
  {
    image: "/Netlify.png",
    title: "Social Media Assistant",
    company: "Netlify",
    location: "Paris, France",
    type: "Full-Time",
    category: "Marketing",
    role: "Design",
  },
  {
    image: "/Maze.png",
    title: "Brand Designer",
    company: "Maze",
    location: "San Fransisco, USA",
    type: "Full-Time",
    category: "Marketing",
    role: "Design",
  },
  {
    image: "/Udacity.png",
    title: "Interactive Developer",
    company: "Udacity",
    location: "Hamburg, Germany",
    type: "Full-Time",
    category: "Marketing",
    role: "Design",
  },
  {
    image: "/Webflow.png",
    title: "HR Manager",
    company: "Webflow",
    location: "Lucern, Switzerland",
    type: "Full-Time",
    category: "Marketing",
    role: "Design",
  },
];
