import { Bar, BarChart, LabelList, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Emotion } from "@/types/Emotion";

interface BarEmotionProps {
  emotion: Emotion;
  selectedTopic: string;
}

const BarEmotion: React.FC<BarEmotionProps> = ({ emotion, selectedTopic }) => {
  const totalData = emotion.total_data;
  const colors = [
    "#C80909",
    "#C80909CC",
    "#C8090999",
    "#C8090966",
    "#C8090933",
    "#C809091A",
  ];

  const chartData = [
    {
      emotionLabel: "😨",
      fill: "#C80909",
      tweetCount: Math.round(
        totalData *
          (selectedTopic === "all"
            ? (emotion.emotion_percentage?.Fear ?? 0) / 100
            : (emotion.emotion_percentage_by_topic?.Fear ?? 0) / 100)
      ),
      percentage:
        selectedTopic === "all"
          ? (emotion.emotion_percentage?.Fear ?? 0)
          : (emotion.emotion_percentage_by_topic?.Fear ?? 0),
    },
    {
      emotionLabel: "😢",
      fill: "#C80909CC",
      tweetCount: Math.round(
        totalData *
          (selectedTopic === "all"
            ? (emotion.emotion_percentage?.Sad ?? 0) / 100
            : (emotion.emotion_percentage_by_topic?.Sad ?? 0) / 100)
      ),
      percentage:
        selectedTopic === "all"
          ? (emotion.emotion_percentage?.Sad ?? 0)
          : (emotion.emotion_percentage_by_topic?.Sad ?? 0),
    },
    {
      emotionLabel: "🥰",
      fill: "#C8090999",
      tweetCount: Math.round(
        totalData *
          (selectedTopic === "all"
            ? (emotion.emotion_percentage?.Love ?? 0) / 100
            : (emotion.emotion_percentage_by_topic?.Love ?? 0) / 100)
      ),
      percentage:
        selectedTopic === "all"
          ? (emotion.emotion_percentage?.Love ?? 0)
          : (emotion.emotion_percentage_by_topic?.Love ?? 0),
    },
    {
      emotionLabel: "😁",
      fill: "#C8090966",
      tweetCount: Math.round(
        totalData *
          (selectedTopic === "all"
            ? (emotion.emotion_percentage?.Joy ?? 0) / 100
            : (emotion.emotion_percentage_by_topic?.Joy ?? 0) / 100)
      ),
      percentage:
        selectedTopic === "all"
          ? (emotion.emotion_percentage?.Joy ?? 0)
          : (emotion.emotion_percentage_by_topic?.Joy ?? 0),
    },
    {
      emotionLabel: "😡",
      fill: "#C8090933",
      tweetCount: Math.round(
        totalData *
          (selectedTopic === "all"
            ? (emotion.emotion_percentage?.Anger ?? 0) / 100
            : (emotion.emotion_percentage_by_topic?.Anger ?? 0) / 100)
      ),
      percentage:
        selectedTopic === "all"
          ? (emotion.emotion_percentage?.Anger ?? 0)
          : (emotion.emotion_percentage_by_topic?.Anger ?? 0),
    },
    {
      emotionLabel: "😐",
      fill: "#C809091A",
      tweetCount: Math.round(
        totalData *
          (selectedTopic === "all"
            ? (emotion.emotion_percentage?.Neutral ?? 0) / 100
            : (emotion.emotion_percentage_by_topic?.Neutral ?? 0) / 100)
      ),
      percentage:
        selectedTopic === "all"
          ? (emotion.emotion_percentage?.Neutral ?? 0)
          : (emotion.emotion_percentage_by_topic?.Neutral ?? 0),
    },
  ].sort((a, b) => b.percentage - a.percentage);

  const chartConfig = {
    emotion: {
      label: "Emotion",
    },
    fear: {
      label: "😨",
      color: "#C80909",
    },
    sad: {
      label: "😢",
      color: "#C80909CC ",
    },
    love: {
      label: "🥰",
      color: "#C8090999",
    },
    joy: {
      label: "😁",
      color: "#C8090966",
    },
    anger: {
      label: "😡",
      color: "#C8090933",
    },
    neutral: {
      label: "😐",
      color: "#C809091A",
    },
  } satisfies ChartConfig;

  const chartDataWithColors = chartData.map((item, index) => ({
    ...item,
    fill: colors[index % colors.length],
    value: Math.round(
      totalData *
        (selectedTopic === "all"
          ? (item.percentage ?? 0) / 100
          : (item.percentage ?? 0) / 100)
    ).toString(), // Calculating tweet count
  }));

  return (
    <Card className="flex flex-col h-96">
      <CardContent className="flex items-center h-full">
        <ChartContainer config={chartConfig} className="w-full h-72">
          <BarChart data={chartDataWithColors} layout="vertical">
            <XAxis type="number" hide />
            <YAxis
              dataKey="emotionLabel"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={({ payload }) => {
                if (payload && payload.length > 0) {
                  const { percentage } = payload[0].payload;
                  return (
                    <div className="h-[31px] px-3 py-2 bg-[#0f1728] rounded flex-col justify-start items-start flex">
                      <div className="text-white text-xs font-semibold">
                        {percentage.toFixed(2)} %
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="tweetCount" radius={5}>
              <LabelList
                dataKey={"tweetCount"}
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-center gap-2 text-sm">
        <div className="leading-none text-muted-foreground">Total Tweets by Emotion</div>
      </CardFooter>
    </Card>
  );
};

export default BarEmotion;
