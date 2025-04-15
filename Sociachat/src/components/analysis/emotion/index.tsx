import { useEffect, useState } from "react";
import Header from "@/components/header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import InfoCard from "../info-card";
import SelectModel from "../select-model";
import SelectTopic from "../select-topic";
import { useAnalysis } from "@/hooks/AnalysisContext";
import { TEmotion } from "@/types/Emotion";
import BarEmotion from "./bar-chart";
import TableTopicAnalysis from "../tren-of-tweet/table-topic-analysis/TableTopicAnalysis";
import { Skeleton } from "@/components/ui/skeleton";
import SkeletonTweet from "../skeleton-tweet";
import { LoadMoreTweetEmotion } from "../embedded-tweet";

const Emotion = () => {
  const {
    selectedProject,
    emotion,
    filteredEmotion,
    selectedModelEmotion,
    selectedTopic,
    filteredTopic,
  } = useAnalysis();

  const emotionLabel = ["😨", "😢", "🥰", "😁", "😡", "😐"];
  const [fearEmotions, setFearEmotions] = useState<TEmotion[]>([]);
  const [sadEmotions, setSadEmotions] = useState<TEmotion[]>([]);
  const [loveEmotions, setLoveEmotions] = useState<TEmotion[]>([]);
  const [joyEmotions, setJoyEmotions] = useState<TEmotion[]>([]);
  const [angerEmotions, setAngerEmotions] = useState<TEmotion[]>([]);
  const [neutralEmotions, setNeutralEmotions] = useState<TEmotion[]>([]);

  useEffect(() => {
    const fearEmotions = filteredEmotion.filter((item) =>
      selectedModelEmotion === "cnn"
        ? item.predicted_emotions_cnn === "Fear"
        : item.predicted_emotions_bilstm === "Fear"
    );
    const sadEmotions = filteredEmotion.filter((item) =>
      selectedModelEmotion === "cnn"
        ? item.predicted_emotions_cnn === "Sad"
        : item.predicted_emotions_bilstm === "Sad"
    );
    const loveEmotions = filteredEmotion.filter((item) =>
      selectedModelEmotion === "cnn"
        ? item.predicted_emotions_cnn === "Love"
        : item.predicted_emotions_bilstm === "Love"
    );
    const joyEmotions = filteredEmotion.filter((item) =>
      selectedModelEmotion === "cnn"
        ? item.predicted_emotions_cnn === "Joy"
        : item.predicted_emotions_bilstm === "Joy"
    );
    const angerEmotions = filteredEmotion.filter((item) =>
      selectedModelEmotion === "cnn"
        ? item.predicted_emotions_cnn === "Anger"
        : item.predicted_emotions_bilstm === "Anger"
    );
    const neutralEmotions = filteredEmotion.filter((item) =>
      selectedModelEmotion === "cnn"
        ? item.predicted_emotions_cnn === "Neutral"
        : item.predicted_emotions_bilstm === "Neutral"
    );

    setFearEmotions(fearEmotions);
    setSadEmotions(sadEmotions);
    setLoveEmotions(loveEmotions);
    setJoyEmotions(joyEmotions);
    setAngerEmotions(angerEmotions);
    setNeutralEmotions(neutralEmotions);
  }, [filteredEmotion, selectedProject, selectedModelEmotion]);

  if (!selectedProject) {
    return (
      <section className="flex-grow p-6 bg-white rounded-lg shadow block">
        Please select a project to view the emotion.
      </section>
    );
  }

  return (
    <section className="w-[761px] p-6 bg-white rounded-lg shadow flex-col justify-start items-start gap-6 inline-flex">
      <div className="self-stretch bg-white rounded-lg border border-zinc-100 flex-col justify-start items-start flex">
        <div className="self-stretch mb-6 px-6 py-5 flex-col justify-start items-start gap-2 flex">
          <div className="flex w-full items-center gap-2">
            <Header label="Emotion of Keyword" keyword={selectedProject?.keyword ?? ""} />
          </div>
          <div className="flex w-full justify-end items-center gap-2">
            {/* <SelectModel isSentiment={false} /> */}
            <SelectTopic />
          </div>
          <div className="self-stretch p-4 mt-7 rounded-md border border-[#f2f2f2] justify-center gap-4 inline-flex">
            <TableTopicAnalysis topics={filteredTopic} />
          </div>
          {selectedModelEmotion == "" ? (
            <div className="self-stretch p-4 mt-3 bg-gray-50 rounded-md border border-[#f2f2f2] justify-center gap-4 inline-flex">
              Please select a model to view the emotion.
            </div>
          ) : (
            <>
              <div className="self-stretch p-4 mt-3 mb-3 bg-gray-50 rounded-md border border-[#f2f2f2] justify-center gap-4 inline-flex">
                {emotion ? (
                  <>
                    <InfoCard type="totalTweet" value={emotion.total_data} />
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
                <div className="w-full h-[363px] relative">
                  {emotion ? (
                    <BarEmotion emotion={emotion} selectedTopic={selectedTopic} />
                  ) : (
                    <Skeleton className="h-52 w-full" />
                  )}
                </div>
              </div>
            </>
          )}
        </div>
        {selectedModelEmotion != "" && (
          <div className="self-stretch w-full py-6 px-6 bg-white rounded-lg border border-zinc-100 flex-col justify-start items-start flex">
            <Tabs defaultValue="😨" className="w-full">
              <TabsList className="bg-white rounded shadow justify-center items-center gap-2 flex">
                {emotionLabel.map((emotion) => (
                  <TabsTrigger
                    key={emotion}
                    value={emotion}
                    className="text-base font-bold grow shrink h-[33px] px-3 py-2 bg-white rounded shadow capitalize"
                  >
                    {emotion}
                  </TabsTrigger>
                ))}
              </TabsList>
              <TabsContent value="😨">
                {emotion ? (
                  <div className="grow w-full shrink flex-col justify-start items-start gap-2.5 inline-flex overflow-y-auto overflow-x-hidden">
                    <LoadMoreTweetEmotion
                      items={fearEmotions}
                      itemsPerPage={10}
                      selectedModel={selectedModelEmotion as "cnn" | "cnn-bilstm"}
                      modelKey="emotions"
                    />
                  </div>
                ) : (
                  <SkeletonTweet />
                )}
              </TabsContent>
              <TabsContent value="😢">
                {emotion ? (
                  <div className="grow w-full shrink flex-col justify-start items-start gap-2.5 inline-flex overflow-y-auto overflow-x-hidden">
                    <LoadMoreTweetEmotion
                      items={sadEmotions}
                      itemsPerPage={10}
                      selectedModel={selectedModelEmotion as "cnn" | "cnn-bilstm"}
                      modelKey="emotions"
                    />
                  </div>
                ) : (
                  <SkeletonTweet />
                )}
              </TabsContent>
              <TabsContent value="🥰">
                {emotion ? (
                  <div className="grow w-full shrink flex-col justify-start items-start gap-2.5 inline-flex overflow-y-auto overflow-x-hidden">
                    <LoadMoreTweetEmotion
                      items={loveEmotions}
                      itemsPerPage={10}
                      selectedModel={selectedModelEmotion as "cnn" | "cnn-bilstm"}
                      modelKey="emotions"
                    />
                  </div>
                ) : (
                  <SkeletonTweet />
                )}
              </TabsContent>
              <TabsContent value="😁">
                {emotion ? (
                  <div className="grow w-full shrink flex-col justify-start items-start gap-2.5 inline-flex overflow-y-auto overflow-x-hidden">
                    <LoadMoreTweetEmotion
                      items={joyEmotions}
                      itemsPerPage={10}
                      selectedModel={selectedModelEmotion as "cnn" | "cnn-bilstm"}
                      modelKey="emotions"
                    />
                  </div>
                ) : (
                  <SkeletonTweet />
                )}
              </TabsContent>
              <TabsContent value="😡">
                {emotion ? (
                  <div className="grow w-full shrink flex-col justify-start items-start gap-2.5 inline-flex overflow-y-auto overflow-x-hidden">
                    <LoadMoreTweetEmotion
                      items={angerEmotions}
                      itemsPerPage={10}
                      selectedModel={selectedModelEmotion as "cnn" | "cnn-bilstm"}
                      modelKey="emotions"
                    />
                  </div>
                ) : (
                  <SkeletonTweet />
                )}
              </TabsContent>
              <TabsContent value="😐">
                {emotion ? (
                  <div className="grow w-full shrink flex-col justify-start items-start gap-2.5 inline-flex overflow-y-auto overflow-x-hidden">
                    <LoadMoreTweetEmotion
                      items={neutralEmotions}
                      itemsPerPage={10}
                      selectedModel={selectedModelEmotion as "cnn" | "cnn-bilstm"}
                      modelKey="emotions"
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

export default Emotion;
