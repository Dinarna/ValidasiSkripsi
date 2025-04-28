import { useEffect, useState } from "react";
import QuestionCard from "./question-card";
import ChatBubble from "./chat-bubble";
import ChatResponseBubble from "./chat-response-bubble";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { SendIcon } from "@/assets";
import { useAnalysis } from "@/hooks/AnalysisContext";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronRight } from "lucide-react";

const ChatBot = () => {
  const {
    selectedProject,
    prompt,
    messages,
    sendChat,
    hasAnimated,
    handleSetHasAnimated,
  } = useAnalysis();

  const [activePromptTopic, setActivePromptTopic] = useState(null);
  const [question, setQuestion] = useState("");

  const handleTriggerClick = (topic: any) => {
    setActivePromptTopic(activePromptTopic === topic ? null : topic);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (question.trim() === "") return;

    sendChat(question, [
      ...messages,
      { text: question, isUser: true, isLoading: false },
    ]);
    setQuestion("");
  };

  // if (!selectedProject) {
  //   return (
  //     <section className="flex-grow p-6 bg-white rounded-lg shadow block">
  //       Please select a project to view the chatbot.
  //     </section>
  //   );
  // }

  return (
    <section className="w-full h-[80vh] p-6 bg-white rounded-lg shadow flex flex-col justify-between items-center">
      {messages.length > 0 ? (
        <div className="self-stretch h-[800px] overflow-auto mb-10">
          {messages.map((msg, index) => {
            const isLastItem = index === messages.length - 1;
            const questions = isLastItem && msg.questions ? msg.questions : [];

            return (
              <div
                key={index}
                className={`mb-2 flex ${msg.isUser ? "justify-end" : "justify-start"}`}
              >
                {msg.isUser ? (
                  <ChatBubble text={msg.text} isUser={true} />
                ) : msg.isLoading ? (
                  <div className="p-4 rounded-lg mb-2 max-w-[60%] bg-gray-100 text-gray-700 self-start">
                    <Skeleton className="h-[75px] w-[300px]" />
                    <p className="text-secondary font-bold animate-pulse">
                      Generating Response......
                    </p>
                  </div>
                ) : (
                  <ChatResponseBubble
                    response={msg.text}
                    questions={questions}
                    onClick={(prompt) => {
                      sendChat(prompt.pertanyaan, [
                        ...messages,
                        {
                          text: prompt.pertanyaan,
                          isUser: true,
                          isLoading: false,
                        },
                      ]);
                    }}
                    hasAnimated={!!hasAnimated[index]}
                    onAnimationEnd={() => handleSetHasAnimated(index)}
                  />
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center mb-5 w-full">
          <div className="grid grid-cols-1 gap-2 w-full ">
            {prompt != null ? (
              Object.keys(prompt).map((topicKey, index) => (
                <Collapsible
                  key={topicKey}
                  open={activePromptTopic === topicKey}
                  className="border border-gray-200 rounded-xl"
                >
                  <div className="grid items-center">
                    <CollapsibleTrigger asChild className="px-3 py-8">
                      <Button
                        className={`text-foreground font-bold hover:text-primary-foreground hover:bg-secondary w-full rounded-xl
                ${activePromptTopic === topicKey ? "bg-secondary text-primary-foreground" : "bg-white"}`}
                        onClick={() => handleTriggerClick(topicKey)}
                      >
                        <span className="w-8 h-8 border border-gray-300 rounded-md flex items-center justify-center mr-3">
                          {index + 1}
                        </span>
                        Prompt Topic {index + 1}
                        <span className="ml-auto">
                          {activePromptTopic === topicKey ? (
                            <ChevronDown />
                          ) : (
                            <ChevronRight />
                          )}
                        </span>
                      </Button>
                    </CollapsibleTrigger>
                  </div>
                  <CollapsibleContent>
                    <div className="grid gap-2 mt-2">
                      {Object.keys(prompt[topicKey]).map((questionKey) => (
                        <QuestionCard
                          key={questionKey}
                          prompt={prompt[topicKey][questionKey]}
                          onClick={() => {
                            const question = prompt[topicKey][questionKey];
                            sendChat(question.optimal_prompt, [
                              ...messages,
                              {
                                text: question.optimal_prompt,
                                isUser: true,
                                isLoading: false,
                              },
                            ]);
                          }}
                        />
                      ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              ))
            ) : (
              <>
                {/* <Skeleton className="h-14 w-full" />
                <Skeleton className="h-14 w-full" /> */}
              </>
            )}
          </div>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="flex w-full items-center space-x-2"
      >
        <Input
          type="text"
          placeholder="Type question here..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <Button type="submit">
          <SendIcon />
        </Button>
      </form>
    </section>
  );
};

export default ChatBot;
