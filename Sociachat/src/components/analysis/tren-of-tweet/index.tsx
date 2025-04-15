import Header from "@/components/header";
import TableTopicAnalysis from "./table-topic-analysis/TableTopicAnalysis";
import { useAnalysis } from "@/hooks/AnalysisContext";
import SelectTopic from "../select-topic";
import { Skeleton } from "@/components/ui/skeleton";
import InfoCard from "../info-card";
import { LoadMoreTweetTopic } from "../embedded-tweet";

const TrenOfTweet = () => {
  const { selectedProject, topics, tweetsTopic } = useAnalysis();

  if (!selectedProject) {
    return (
      <section className="flex-grow p-6 bg-white rounded-lg shadow block">
        Please select a project to view the topic.
      </section>
    );
  }

  return (
    <section className="w-[761px] min-h-screen p-6 bg-white rounded-lg shadow flex-col justify-start items-start gap-6 inline-flex">
      {/* topik analisis */}
      <div className="self-stretch h-[490px] px-6 py-5 bg-white rounded-lg border border-zinc-100 flex-col justify-start items-start gap-5 flex">
        <div className="self-stretch py-1 justify-start items-center gap-2 inline-flex">
          <Header
            label="Keyword"
            keyword={selectedProject?.keyword ?? ""}
            num={topics.length.toString()}
          />
        </div>
        <div className="self-stretch h-[390px] flex-col justify-start items-start gap-2.5 flex">
          <TableTopicAnalysis topics={topics} />
        </div>
      </div>

      <div className="self-stretch p-4 mt-3 mb-3 bg-gray-50 rounded-md border border-[#f2f2f2] justify-center gap-4 inline-flex">
        {tweetsTopic ? (
          <>
            <InfoCard type="totalTweet" value={tweetsTopic.length} />
            <InfoCard type="category" value={selectedProject.topic_category} />
          </>
        ) : (
          <>
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </>
        )}
      </div>

      {/* top of view */}
      <div className="self-stretch min-h-fit px-6 py-5 bg-white rounded-lg border border-zinc-100 flex-col justify-start items-start gap-5 flex">
        <div className="self-stretch h-10 py-1 flex-col justify-start items-start gap-2 flex">
          <div className="flex w-full items-center">
            <Header label="Tweet" keyword={selectedProject?.keyword ?? ""} />
            <SelectTopic />
          </div>
        </div>

        <div className="self-stretch grow shrink basis-0 justify-start items-start gap-5 inline-flex">
          <div className="grow w-full shrink h-[919px] flex-col justify-start items-start gap-2.5 inline-flex overflow-y-auto overflow-x-hidden">
            <LoadMoreTweetTopic items={tweetsTopic} itemsPerPage={10} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrenOfTweet;
