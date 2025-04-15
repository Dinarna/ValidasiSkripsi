import Markdown from "react-markdown";
import { ChatbotQuestion } from "@/types/Chatbot";
import RecommendationQuestionCard from "../recommendation-question-card";
import { useEffect, useState } from "react";

interface ChatResponseBubbleProps {
  response: string;
  questions: ChatbotQuestion[];
  onClick: (prompt: ChatbotQuestion) => void;
  hasAnimated: boolean;
  onAnimationEnd: () => void;
}

const ChatResponseBubble = ({
  response,
  questions,
  onClick,
  hasAnimated,
  onAnimationEnd,
}: ChatResponseBubbleProps) => {
  const [displayedText, setDisplayedText] = useState("");
  const typingSpeed = 10;

  useEffect(() => {
    setDisplayedText("");
    if (!hasAnimated) {
      let index = 0;
      const interval = setInterval(() => {
        if (index < response.length) {
          setDisplayedText((prev) => prev + response[index]);
          index++;
        } else {
          clearInterval(interval);
          onAnimationEnd();
        }
      }, typingSpeed);

      return () => clearInterval(interval);
    } else {
      setDisplayedText(response);
    }
  }, [response, hasAnimated, onAnimationEnd]);

  return (
    <div>
      <div className="p-4 rounded-lg mb-2 max-w-[60%] bg-gray-100 text-gray-700 self-start">
        <Markdown>{displayedText}</Markdown>
      </div>
      <div className="mb-2 max-w-[60%] text-gray-700 self-start">
        {questions.map((question, index) => (
          <RecommendationQuestionCard
            key={question.pertanyaan}
            prompt={question}
            onClick={() => onClick(question)}
          />
        ))}
      </div>
    </div>
  );
};

export default ChatResponseBubble;
