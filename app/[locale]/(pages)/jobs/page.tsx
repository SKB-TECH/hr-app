// app/[locale]/(pages)/jobs/page.tsx
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
  searchParams: SearchParams;
}) {
  const t = await getTranslations("jobs");
  const params = await searchParams;
  const page = parseInt(params.page || "1");
  const limit = parseInt(params.limit || "10");
  const search = params.search || "";

  try {
    const result = await getAllJobs({ page, limit, search });

    return (
      <AllJobs
        jobsList={result.data}
        pagination={{
          currentPage: result.currentPage,
          totalPages: result.totalPages,
          totalItems: result.totalItems,
          itemsPerPage: result.itemsPerPage,
        }}
        searchQuery={search}
      />
    );
  } catch (error) {
    console.error("Error fetching jobs:", error);

    return (
      <AllJobs
        jobsList={[]}
        fetchError={t("errorLoading")}
        pagination={null}
        searchQuery={search}
      />
    );
  }
}
