import { ChatbotPrompt } from "@/types/Chatbot";

interface QuestionCardProps {
  prompt: ChatbotPrompt;
  className?: string; // className is optional
  onClick: (prompt: ChatbotPrompt) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  prompt,
  className = "",
  onClick,
}) => {
  return (
    <div
      onClick={() => onClick(prompt)}
      className={`grow shrink basis-0 self-stretch p-5 rounded-lg border border-[#adadad] flex-col justify-start items-start gap-1 inline-flex hover:bg-primary-foreground hover:text-foreground hover:cursor-pointer ${className}`}
    >
      <div className="text-[#606060] text-base font-normal leading-relaxed">
        {prompt.pertanyaan}
      </div>
    </div>
  );
};

export default QuestionCard;
