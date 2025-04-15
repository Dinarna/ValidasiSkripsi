import ProjectDescription from "./project-description";
import InfoCard from "../info-card";

import { useAnalysis } from "@/hooks/AnalysisContext";
import { Skeleton } from "@/components/ui/skeleton";

const Overview = () => {
  const { selectedProject, overview } = useAnalysis();

  if (!selectedProject) {
    return (
      <section className="flex-grow p-6 bg-white rounded-lg shadow block">
        Please select a project to view the overview.
      </section>
    );
  }

  return (
    <section className="flex-grow min-h-screen p-6 bg-white rounded-lg shadow flex-col justify-start items-start gap-3 inline-flex">
      <div className="self-stretch h-px bg-[#eeeeee]" />
      {overview ? (
        <ProjectDescription
          title={overview.title}
          description={overview.description}
        />
      ) : (
        <Skeleton className="h-12 w-full" />
      )}
      <div className="self-stretch p-4 mt-7 bg-gray-50 rounded-md border border-[#f2f2f2] justify-center gap-4 inline-flex">
        {overview ? (
          <>
            <InfoCard type="keyword" value={overview.keyword} />
            <InfoCard type="category" value={overview.topic_category} />
          </>
        ) : (
          <>
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </>
        )}
      </div>
      <div className="self-stretch h-px bg-[#eeeeee]" />
    </section>
  );
};

export default Overview;
