import PublicCandidateProfile from "@/components/platform/candidates/PublicCandidateProfile";

export default async function CandidatePublicProfilePage({ params }: { params: Promise<{ profileId: string }> }) {
  const { profileId } = await params;
  return <PublicCandidateProfile profileId={profileId}/>;
}
