import { Pie, PieChart, Sector } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChartContainer,
  ChartConfig,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
} from "@/components/ui/chart";
import { PieSectorDataItem } from "recharts/types/polar/Pie";
import { Sentiment } from "@/types/Sentiment";

interface SentimentPieProps {
  sentiment: Sentiment;
  selectedTopic: string;
}

const SentimentPie: React.FC<SentimentPieProps> = ({ sentiment, selectedTopic }) => {
  const colorScale = {
    negative: "#C80909",
    positive: "#C8090966",
  };
  
  const chartData = [
    {
      sentimentLabel: "positive",
      sentiment:
        selectedTopic === "all"
          ? Number((sentiment.sentiment_percentage?.positive ?? 0).toFixed(1))
          : Number((sentiment.sentiment_percentage_by_topic?.positive ?? 0).toFixed(1)),
      fill: colorScale.positive,
    },
    {
      sentimentLabel: "negative",
      sentiment:
        selectedTopic === "all"
          ? Number((sentiment.sentiment_percentage?.negative ?? 0).toFixed(1))
          : Number((sentiment.sentiment_percentage_by_topic?.negative ?? 0).toFixed(1)),
      fill: colorScale.negative,
    },
  ];

  const totalData = sentiment.total_data;

  // Hitung jumlah tweet positif dan negatif
  const positiveTweetCount = Math.round(
    totalData *
      (selectedTopic === "all"
        ? (sentiment.sentiment_percentage?.positive ?? 0) / 100
        : (sentiment.sentiment_percentage_by_topic?.positive ?? 0) / 100)
  );

  const negativeTweetCount = Math.round(
    totalData *
      (selectedTopic === "all"
        ? (sentiment.sentiment_percentage?.negative ?? 0) / 100
        : (sentiment.sentiment_percentage_by_topic?.negative ?? 0) / 100)
  );

  const chartDataWithColors = chartData.map((data, index) => ({
    ...data,
    parsedSentiment: data.sentiment,
    percentage: data.sentiment, // adding percentage to be used in tooltip
    value:
      data.sentimentLabel === "positive"
        ? positiveTweetCount.toString()
        : negativeTweetCount.toString(), // adding tweet count to be used in tooltip
  }));

  // Determine the index of the active segment
  const activeIndex = chartDataWithColors.reduce(
    (maxIndex, data, index, array) =>
      data.parsedSentiment > array[maxIndex].parsedSentiment ? index : maxIndex,
    0
  );

  const chartConfig = {
    sentiment: {
      label: "Sentiment",
    },
    positive: {
      label: "Positive",
      color: colorScale.positive,
    },
    negative: {
      label: "Negative",
      color: colorScale.negative,
    },
  } satisfies ChartConfig;

  return (
    <Card className="flex flex-col h-96">
      <CardContent className="flex items-center h-full">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square h-full pb-0 [&_.recharts-pie-label-text]:fill-foreground font-semibold w-full"
        >
          <PieChart>
            <ChartTooltip
              content={({ payload }) => {
                if (payload && payload.length > 0) {
                  return (
                    <div className=" h-[31px] px-3 py-2 bg-[#0f1728] rounded flex-col justify-start items-start flex">
                      <div className="text-white text-xs font-semibold capitalize">
                        {payload[0].payload.value} {payload[0].payload.sentimentLabel}{" "}
                        tweets
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Pie
              data={chartDataWithColors}
              dataKey="parsedSentiment"
              label={({ sentiment }) => `${sentiment} %`}
              stroke="white"
              strokeWidth={6}
              nameKey="sentimentLabel"
              activeIndex={activeIndex}
              activeShape={({ outerRadius = 0, ...props }: PieSectorDataItem) => (
                <Sector {...props} outerRadius={outerRadius + 10} />
              )}
            />
            <ChartLegend
              content={<ChartLegendContent nameKey="sentimentLabel" />}
              className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default SentimentPie;
