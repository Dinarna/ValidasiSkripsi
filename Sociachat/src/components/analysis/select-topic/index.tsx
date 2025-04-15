import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useAnalysis } from "@/hooks/AnalysisContext";

const SelectTopic = () => {
  const { topics, selectedTopic, setSelectedTopic } = useAnalysis();

  return (
    <Select
      value={selectedTopic}
      onValueChange={(newTopic) => setSelectedTopic(newTopic)}
    >
      <SelectTrigger className="text-red-700 text-base font-bold leading-tight w-36">
        <SelectValue placeholder="Select Topic" />
      </SelectTrigger>
      <SelectContent className="">
        <SelectItem value="all">{"All Topic"}</SelectItem>
        {topics.map((topic) => (
          <SelectItem
            key={`topic-${topic.topicId}`}
            value={topic.topicId.toString()}
          >
            Topic {topic.topicId + 1}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectTopic;
