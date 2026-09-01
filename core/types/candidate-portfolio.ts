export type CandidatePortfolio = {
  id: string;
  title: string;
  description: string | null;
  thumbnailUrl: string | null;
  projectUrl: string | null;
  createdAt: string;
  updatedAt: string;
};

export type CandidatePortfolioInput = {
  title: string;
  description: string;
  projectUrl?: string | null;
  thumbnail?: File;
};
