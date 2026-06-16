import type {
  Category,
  CategoryCompany,
  CategoryIcon,
  RecommendedCompany,
} from "@/data/type";

export type {
  Category,
  CategoryCompany,
  CategoryIcon,
  RecommendedCompany,
  TagVariant,
} from "@/data/type";
export { categories } from "@/data/type";

export type CategoryConfig = {
  id: Category;
  label: string;
  icon: CategoryIcon;
};

export const categoryConfig: CategoryConfig[] = [
  { id: "Design", label: "Design", icon: "palette" },
  { id: "Fintech", label: "Fintech", icon: "landmark" },
  { id: "Hosting", label: "Hosting", icon: "server" },
  { id: "Business Services", label: "Business Service", icon: "briefcase" },
  { id: "Dev", label: "Development", icon: "code" },
  { id: "Education", label: "Education", icon: "book" },
  { id: "Healthcare", label: "Healthcare", icon: "heart" },
  { id: "Entertainment", label: "Entertainment", icon: "film" },
  { id: "Travel", label: "Travel", icon: "map" },
  { id: "Food & Beverage", label: "Food & Beverage", icon: "coffee" },
];

export const recommendedCompanies: RecommendedCompany[] = [
  {
    id: "nomad",
    name: "Nomad",
    logo: "/logo/Nomad.png",
    jobs: 3,
    description:
      "Nomad is located in Paris. Nomad has generated 12M in revenue and has raised 2M in funding.",
    tag: "Business Service",
    tagVariant: "business",
  },
  {
    id: "discord",
    name: "Discord",
    logo: "/logo/discord.png",
    jobs: 3,
    description:
      "Discord is a voice, video, and text communication platform used by hundreds of millions of people.",
    tag: "Business Service",
    tagVariant: "business",
  },
  {
    id: "maze",
    name: "Maze",
    logo: "/logo/maze.png",
    jobs: 3,
    description:
      "Maze helps product teams run rapid tests and get actionable insights to build better products faster.",
    tag: "Business Service",
    tagVariant: "business",
  },
  {
    id: "udacity",
    name: "Udacity",
    logo: "/logo/udacity.png",
    jobs: 3,
    description:
      "Udacity is an online learning platform offering nanodegree programs in tech and business.",
    tag: "Business Service",
    tagVariant: "business",
  },
  {
    id: "webflow",
    name: "Webflow",
    logo: "/logo/webflowpng.png",
    jobs: 3,
    description:
      "Webflow is a design and hosting platform that lets teams build responsive websites visually.",
    tag: "Business Service",
    tagVariant: "business",
  },
  {
    id: "foundation",
    name: "Foundation",
    logo: "/logo/foundation.png",
    jobs: 3,
    description:
      "Foundation is a creative platform for building and selling digital art and collectibles.",
    tag: " Business Service ",
    tagVariant: "business",
  },
];

export const companiesByCategory: Record<Category, CategoryCompany[]> = {
  Design: [
    {
      id: "pentagram",
      name: "Pentagram",
      logo: "/logo/pentegram.png",
      jobs: 3,
    },
    {
      id: "wolff-olins",
      name: "Wolff Olins",
      logo: "/logo/wolfolins.png",
      jobs: 3,
    },
    { id: "clay", name: "Clay", logo: "/logo/clay.png", jobs: 3 },
    {
      id: "mediamonks",
      name: "MediaMonks",
      logo: "/logo/media.png",
      jobs: 3,
    },
    { id: "packer", name: "Packer", logo: "/logo/packer.png", jobs: 3 },
    { id: "square", name: "Square", logo: "/logo/squre.png", jobs: 3 },
    { id: "divy", name: "Divy", logo: "/logo/divy.png", jobs: 3 },
    {
      id: "webflow-cat",
      name: "Webflow",
      logo: "/logo/webflowpng.png",
      jobs: 3,
    },
  ],
  Fintech: [
    { id: "stripe", name: "Stripe", logo: "", jobs: 5 },
    { id: "plaid", name: "Plaid", logo: "", jobs: 4 },
    { id: "revolut", name: "Revolut", logo: "", jobs: 6 },
    { id: "monzo", name: "Monzo", logo: "", jobs: 2 },
    { id: "wise", name: "Wise", logo: "", jobs: 3 },
    { id: "chime", name: "Chime", logo: "", jobs: 4 },
    { id: "brex", name: "Brex", logo: "", jobs: 3 },
    { id: "affirm", name: "Affirm", logo: "", jobs: 2 },
  ],
  Hosting: [
    { id: "vercel", name: "Vercel", logo: "", jobs: 4 },
    { id: "netlify", name: "Netlify", logo: "", jobs: 3 },
    { id: "digitalocean", name: "DigitalOcean", logo: "", jobs: 5 },
    { id: "heroku", name: "Heroku", logo: "", jobs: 2 },
    { id: "cloudflare", name: "Cloudflare", logo: "", jobs: 6 },
    { id: "linode", name: "Linode", logo: "", jobs: 3 },
    { id: "render", name: "Render", logo: "", jobs: 4 },
    { id: "fly", name: "Fly.io", logo: "", jobs: 3 },
  ],
  "Business Services": [
    { id: "deloitte", name: "Deloitte", logo: "", jobs: 8 },
    { id: "accenture", name: "Accenture", logo: "", jobs: 7 },
    { id: "mckinsey", name: "McKinsey", logo: "", jobs: 5 },
    { id: "kpmg", name: "KPMG", logo: "", jobs: 4 },
    { id: "pwc", name: "PwC", logo: "", jobs: 6 },
    { id: "ey", name: "EY", logo: "", jobs: 5 },
    { id: "bcg", name: "BCG", logo: "", jobs: 4 },
    { id: "bain", name: "Bain", logo: "", jobs: 3 },
  ],
  Dev: [
    { id: "github", name: "GitHub", logo: "", jobs: 6 },
    { id: "gitlab", name: "GitLab", logo: "", jobs: 4 },
    { id: "atlassian", name: "Atlassian", logo: "", jobs: 5 },
    { id: "jetbrains", name: "JetBrains", logo: "", jobs: 3 },
    { id: "hashicorp", name: "HashiCorp", logo: "", jobs: 4 },
    { id: "docker", name: "Docker", logo: "", jobs: 3 },
    { id: "mongodb", name: "MongoDB", logo: "", jobs: 5 },
    { id: "redis", name: "Redis", logo: "", jobs: 2 },
  ],
  Education: [
    { id: "coursera", name: "Coursera", logo: "", jobs: 4 },
    { id: "udemy", name: "Udemy", logo: "", jobs: 5 },
    { id: "khanacademy", name: "Khan Academy", logo: "", jobs: 3 },
    { id: "edx", name: "edX", logo: "", jobs: 4 },
    { id: "skillshare", name: "Skillshare", logo: "", jobs: 2 },
    { id: "treehouse", name: "Treehouse", logo: "", jobs: 3 },
    { id: "codecademy", name: "Codecademy", logo: "", jobs: 4 },
    { id: "futurelearn", name: "FutureLearn", logo: "", jobs: 3 },
  ],
  Healthcare: [
    { id: "medplum", name: "Medplum", logo: "", jobs: 3 },
    { id: "apollohealth", name: "Apollo Health", logo: "", jobs: 3 },
    { id: "healthifyme", name: "HealthifyMe", logo: "", jobs: 3 },
    { id: "cvs-health", name: "CVS Health", logo: "", jobs: 5 },
    { id: "johnson", name: "Johnson & Johnson", logo: "", jobs: 6 },
    { id: "pfizer", name: "Pfizer", logo: "", jobs: 4 },
    { id: "unitedhealth", name: "UnitedHealth", logo: "", jobs: 5 },
    { id: "teladoc", name: "Teladoc", logo: "", jobs: 3 },
  ],
  Entertainment: [
    { id: "netflix", name: "Netflix", logo: "", jobs: 3 },
    { id: "spotify", name: "Spotify", logo: "", jobs: 5 },
    { id: "disney", name: "Disney+", logo: "", jobs: 4 },
    { id: "hulu", name: "Hulu", logo: "", jobs: 3 },
    { id: "twitch", name: "Twitch", logo: "", jobs: 4 },
    { id: "youtube", name: "YouTube", logo: "", jobs: 6 },
    { id: "hbo", name: "HBO Max", logo: "", jobs: 3 },
    { id: "soundcloud", name: "SoundCloud", logo: "", jobs: 2 },
  ],
  Travel: [
    { id: "airbnb", name: "Airbnb", logo: "", jobs: 3 },
    { id: "booking", name: "Booking.com", logo: "", jobs: 3 },
    { id: "expedia", name: "Expedia", logo: "", jobs: 3 },
    { id: "tripadvisor", name: "TripAdvisor", logo: "", jobs: 4 },
    { id: "kayak", name: "Kayak", logo: "", jobs: 3 },
    { id: "skyscanner", name: "Skyscanner", logo: "", jobs: 4 },
    { id: "klook", name: "Klook", logo: "", jobs: 3 },
    { id: "viator", name: "Viator", logo: "", jobs: 2 },
  ],
  "Food & Beverage": [
    { id: "doordash", name: "DoorDash", logo: "", jobs: 3 },
    { id: "uber-eats", name: "Uber Eats", logo: "", jobs: 3 },
    { id: "starbucks", name: "Starbucks", logo: "", jobs: 3 },
    { id: "amazon-fresh", name: "Amazon Fresh", logo: "", jobs: 3 },
    { id: "instacart", name: "Instacart", logo: "", jobs: 3 },
    { id: "wolt", name: "Wolt", logo: "", jobs: 3 },
    { id: "grubhub", name: "Grubhub", logo: "", jobs: 3 },
    { id: "postmates", name: "Postmates", logo: "", jobs: 3 },
  ],
};

export const companiesPageCopy = {
  recommended: {
    title: "Recommended Companies",
    subtitle:
      "Based on your profile, company preferences, and recent activity.",
    showAllLabel: "Show all",
  },
  cta: {
    title: "Start posting jobs today",
    subtitle: "Start posting jobs for only $10.",
    buttonLabel: "Sign Up For Free",
  },
  category: {
    title: "Companies by Category",
    resultsSuffix: "Results",
    viewMorePrefix: "View more",
    viewMoreSuffix: "companies",
  },
};

export const categoryResultCounts: Record<Category, number> = {
  Design: 24,
  Fintech: 18,
  Hosting: 15,
  "Business Services": 32,
  Dev: 27,
  Education: 0,
  Healthcare: 0,
  Entertainment: 0,
  Travel: 0,
  "Food & Beverage": 0,
};
