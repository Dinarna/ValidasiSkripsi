import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";

interface ChatBubbleProps {
  text: string;
  isUser: boolean;
}

const ChatBubble = ({ text, isUser }: ChatBubbleProps) => {
  return (
    <div
      className={`p-4 rounded-lg mb-2 max-w-[60%] ${isUser ? "bg-secondary text-white self-end" : "bg-gray-100 text-gray-700 self-start"}`}
    >
      <Markdown rehypePlugins={[rehypeRaw]}>{text}</Markdown>
    </div>
  );
};

export default ChatBubble;
