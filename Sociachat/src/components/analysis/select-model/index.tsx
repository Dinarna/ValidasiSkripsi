import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useAnalysis } from "@/hooks/AnalysisContext";

interface SelectModelProps {
  isSentiment?: boolean;
}

const SelectModel: React.FC<SelectModelProps> = ({ isSentiment = true }) => {
  const {
    selectedModel,
    setSelectedModel,
    selectedModelEmotion,
    setSelectedModelEmotion,
  } = useAnalysis();

  // Conditionally determine the model state and setter function
  const value = isSentiment ? selectedModel : selectedModelEmotion;
  const setValue = isSentiment ? setSelectedModel : setSelectedModelEmotion;

  return (
    <Select value={value} onValueChange={(newModel) => setValue(newModel)}>
      <SelectTrigger className="text-red-700 text-base font-bold leading-tight w-36">
        <SelectValue placeholder="Select Model" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="cnn">{"CNN"}</SelectItem>
        {isSentiment ? (
          <SelectItem value="cnn-lstm">{"CNN-LSTM"}</SelectItem>
        ) : (
          <SelectItem value="cnn-bilstm">{"Bi-LSTM"}</SelectItem>
        )}
      </SelectContent>
    </Select>
  );
};

export default SelectModel;
