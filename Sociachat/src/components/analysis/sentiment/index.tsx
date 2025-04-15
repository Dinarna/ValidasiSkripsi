import Header from "@/components/header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import InfoCard from "../info-card";
import { TSentiment } from "@/types/Sentiment";
import { useEffect, useState } from "react";
import { useAnalysis } from "@/hooks/AnalysisContext";
import SentimentPie from "./pie-chart";
import SelectTopic from "../select-topic";
import SelectModel from "../select-model";
import TableTopicAnalysis from "../tren-of-tweet/table-topic-analysis/TableTopicAnalysis";
import { Skeleton } from "@/components/ui/skeleton";
import SkeletonTweet from "../skeleton-tweet";
import { LoadMoreTweetSentiment } from "../embedded-tweet";
const Sentiment = () => {
  const {
    selectedProject,
    sentiment,
    filteredSentiment,
    selectedModel,
    selectedTopic,
    filteredTopic,
  } = useAnalysis();
  const [positiveSentiments, setPositiveSentiments] = useState<TSentiment[]>([]);
  const [negativeSentiments, setNegativeSentiments] = useState<TSentiment[]>([]);

  useEffect(() => {
    const positiveSentiments = filteredSentiment.filter((item) =>
      selectedModel === "cnn"
        ? item.predicted_sentiment_cnn === "Positif"
        : item.predicted_sentiment_cnn_lstm === "Positif"
    );
    const negativeSentiments = filteredSentiment.filter((item) =>
      selectedModel === "cnn"
        ? item.predicted_sentiment_cnn === "Negatif"
        : item.predicted_sentiment_cnn_lstm === "Negatif"
    );
    setPositiveSentiments(positiveSentiments);
    setNegativeSentiments(negativeSentiments);
  }, [filteredSentiment, selectedProject, selectedModel]);

  if (!selectedProject) {
    return (
      <section className="flex-grow p-6 bg-white rounded-lg shadow block">
        Please select a project to view the sentiment.
      </section>
    );
  }

  return (
    <section className="w-[761px] p-6 bg-white rounded-lg shadow flex-col justify-start items-start gap-6 inline-flex">
      <div className="self-stretch bg-white rounded-lg border border-zinc-100 flex-col justify-start items-start flex">
        <div className="self-stretch px-6 py-5 flex-col justify-start items-start gap-2 flex">
          <div className="flex w-full items-center gap-2">
            <Header
              label="Sentiment of Keyword"
              keyword={selectedProject?.keyword ?? ""}
            />
          </div>
          <div className="flex w-full justify-end items-center gap-2">
            {/* <SelectModel /> */}
            <SelectTopic />
          </div>
          <div className="self-stretch p-4 mt-7 rounded-md border border-[#f2f2f2] justify-center gap-4 inline-flex">
            <TableTopicAnalysis topics={filteredTopic} />
          </div>
          {selectedModel == "" ? (
            <div className="self-stretch p-4 mt-3 bg-gray-50 rounded-md border border-[#f2f2f2] justify-center gap-4 inline-flex">
              Please select a model to view the sentiment.
            </div>
          ) : (
            <>
              <div className="self-stretch p-4 mt-3 mb-3 bg-gray-50 rounded-md border border-[#f2f2f2] justify-center gap-4 inline-flex">
                {sentiment ? (
                  <>
                    <InfoCard type="totalTweet" value={sentiment.total_data} />
                    <InfoCard type="category" value={selectedProject.topic_category} />
                  </>
                ) : (
                  <>
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                  </>
                )}
              </div>
              <div className="self-stretch justify-center items-center gap-10 inline-flex">
                <div className="w-[555px] relative">
                  {sentiment ? (
                    <SentimentPie sentiment={sentiment} selectedTopic={selectedTopic} />
                  ) : (
                    <Skeleton className="h-52 w-full" />
                  )}
                </div>
              </div>
            </>
          )}
        </div>
        {selectedModel != "" && (
          <div className="self-stretch w-full py-6 px-6 bg-white rounded-lg border border-zinc-100 flex-col justify-start items-start flex">
            <Tabs defaultValue="positive" className="w-full">
              <TabsList className="bg-white rounded shadow justify-center items-center gap-2 flex w-full">
                <TabsTrigger
                  value="positive"
                  className="text-base font-bold grow shrink h-[33px] px-3 py-2 bg-white rounded shadow"
                >
                  Sentiment Positive
                </TabsTrigger>
                <TabsTrigger
                  value="negative"
                  className="text-base font-bold grow shrink  h-[33px] px-3 py-2 bg-white rounded shadow"
                >
                  Sentiment Negative
                </TabsTrigger>
              </TabsList>
              <TabsContent value="positive">
                {sentiment ? (
                  <div className="grow w-full shrink flex-col justify-start items-start gap-2.5 inline-flex overflow-y-auto overflow-x-hidden">
                    <LoadMoreTweetSentiment
                      items={positiveSentiments}
                      itemsPerPage={10}
                      selectedModel={selectedModel as "cnn" | "cnn-lstm"}
                      modelKey={"sentiment"}
                    />
                  </div>
                ) : (
                  <SkeletonTweet />
                )}
              </TabsContent>
              <TabsContent value="negative">
                {sentiment ? (
                  <div className="grow w-full shrink flex-col justify-start items-start gap-2.5 inline-flex overflow-y-auto overflow-x-hidden">
                    <LoadMoreTweetSentiment
                      items={negativeSentiments}
                      itemsPerPage={10}
                      selectedModel={selectedModel as "cnn" | "cnn-bilstm"}
                      modelKey={"sentiment"}
                    />
                  </div>
                ) : (
                  <SkeletonTweet />
                )}
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </section>
  );
};

export default Sentiment;
