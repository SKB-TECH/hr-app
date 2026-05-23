import { getAllJobs } from "../../../../services/job.service";
import AllJobs from "../../../../components/jobs/AllJobs";
import { getTranslations } from "next-intl/server";

interface SearchParams {
  page?: string;
  limit?: string;
  search?: string;
}

export default async function JobsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const t = await getTranslations("jobs");
  const params = await searchParams;
  const page = parseInt(params.page || "1");
  const limit = parseInt(params.limit || "10");
  const search = params.search || "";

  let result = null;
  let fetchError: string | null = null;

  try {
    result = await getAllJobs({ page, limit, search });
  } catch (error) {
    // debug log the error for server-side debugging
    console.error(
      "Error fetching jobs:",
      error instanceof Error ? error.message : "Unknown error",
    );
    fetchError = t("errorLoading");
  }

  return (
    <AllJobs
      jobsList={result?.data ?? []}
      fetchError={fetchError ?? undefined}
      pagination={
        result
          ? {
              currentPage: result.currentPage,
              totalPages: result.totalPages,
              totalItems: result.totalItems,
              itemsPerPage: result.itemsPerPage,
            }
          : null
      }
      searchQuery={search}
    />
  );
}
