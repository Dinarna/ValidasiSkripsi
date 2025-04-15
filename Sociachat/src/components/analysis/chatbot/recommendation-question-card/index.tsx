import { ChatbotQuestion } from "@/types/Chatbot";

interface RecommendationQuestionCardProps {
  prompt: ChatbotQuestion;
  onClick: (prompt: ChatbotQuestion) => void;
}

const RecommendationQuestionCard: React.FC<RecommendationQuestionCardProps> = ({
  prompt,
  onClick,
}) => {
  return (
    <div
      onClick={() => onClick(prompt)}
      className={`grow shrink basis-0 mb-2 self-stretch p-5 rounded-lg border border-[#adadad] flex-col justify-start items-start gap-1 inline-flex hover:bg-primary-foreground hover:text-foreground hover:cursor-pointer`}
    >
      <div className="text-[#606060] text-base font-normal leading-relaxed">
        {prompt.pertanyaan}
      </div>
    </div>
  );
};

export default RecommendationQuestionCard;
