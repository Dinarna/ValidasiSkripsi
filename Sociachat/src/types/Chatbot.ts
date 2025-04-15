interface ChatbotPromptTopics {
  [key: string]: ChatbotPromptTopic;
}

interface ChatbotPromptTopic {
  [key: string]: ChatbotPrompt;
  pertanyaan1: ChatbotPrompt;
  pertanyaan2: ChatbotPrompt;
}

interface ChatbotPrompt {
  optimal_prompt: string;
  pertanyaan: string;
}

interface ChatbotMessage {
  text: string;
  isUser: boolean;
  isLoading: boolean;
  questions?: ChatbotQuestion[];
}

interface ChatbotQuestion {
  pertanyaan: string;
  prompt_pertanyaan: string;
}

export type { ChatbotPromptTopics, ChatbotPromptTopic, ChatbotPrompt, ChatbotMessage, ChatbotQuestion };
