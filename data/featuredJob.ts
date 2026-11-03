export interface FeaturedJob {
  id: number;
  title: string;
  companyLogo: string;
  description: string;
  location: string;
  tags: string[];
  companyName: string;
}

export const featuredJobsData: FeaturedJob[] = [
  {
    id: 1,
    companyName: "Infinity Company",
    title: "Senior Full-Stack Developer",
    companyLogo: "/logo/lgo.png",
    description:
      "Architect and scale resilient full-stack web applications using TypeScript, Next.js, and cloud backend services.",
    location: "Kinshasa, DRC / Remote",
    tags: ["Engineering", "Technology"],
  },
  {
    id: 2,
    companyName: "Infinity Company",
    title: "Designer UX/UI",
    companyLogo: "/logo/lgo.png",
    description:
      "Design intuitive user interfaces, wireframes, and scalable Figma design systems across web and mobile products.",
    location: "Kigali, Rwanda / Remote",
    tags: ["Design"],
  },
  {
    id: 3,
    companyName: "Dropbox",
    title: "Senior Product Designer (UX/UI)",
    companyLogo: "/Dropbox.png",
    description:
      "Lead user research, interaction design, and high-fidelity prototyping for core cloud workspace products.",
    location: "San Francisco, US",
    tags: ["Design", "Business"],
  },
  {
    id: 4,
    companyName: "Revolut",
    title: "Growth Marketing Lead",
    companyLogo: "/revolut.png",
    description:
      "Drive multi-channel customer acquisition and lifecycle marketing campaigns across global fintech markets.",
    location: "Madrid, Spain",
    tags: ["Marketing"],
  },
  {
    id: 5,
    companyName: "Pitch",
    title: "Enterprise Account Director",
    companyLogo: "/Pitch.png",
    description:
      "Expand enterprise B2B partnerships and guide strategic client onboarding across EMEA.",
    location: "Berlin, Germany",
    tags: ["Business", "Marketing"],
  },
  {
    id: 6,
    companyName: "ClassPass",
    title: "Head of People & Talent Acquisition",
    companyLogo: "/ClassPass.png",
    description:
      "Lead executive talent acquisition, organizational development, and global people operations.",
    location: "Manchester, UK",
    tags: ["Human Resources"],
  },
  {
    id: 7,
    companyName: "Canva",
    title: "Principal Frontend Architect",
    companyLogo: "/Canva.png",
    description:
      "Architect high-performance frontend applications and accessible UI component systems.",
    location: "Ontario, Canada",
    tags: ["Engineering", "Technology"],
  },
  {
    id: 8,
    companyName: "Terraform",
    title: "Cloud Infrastructure Engineer",
    companyLogo: "/Terraform.png",
    description:
      "Build automated cloud infrastructure and multi-region Kubernetes platforms.",
    location: "Hamburg, Germany",
    tags: ["Technology", "Engineering"],
  },
];
