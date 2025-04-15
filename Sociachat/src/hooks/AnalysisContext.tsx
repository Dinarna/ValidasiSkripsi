import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { axiosPrivate, axiosPublic } from "@/axiosConfig";

import {
  CONTENT_OVERVIEW,
  CONTENT_TREN_OF_TWEET,
  CONTENT_SENTIMENT_ANALYST,
  CONTENT_EMOTION_ANALYSIS,
  CONTENT_BUZZER,
  CONTENT_COMMUNITY,
  CONTENT_CHAT_BOT,
} from "@/types/constantLabelSidebar";
import Project from "@/types/Project";
import { Sentiment, TSentiment } from "@/types/Sentiment";
import axios from "axios";
import { API } from "@/lib/urls";
import { Topic, TweetTopic } from "@/types/Topic";
import { Emotion, TEmotion } from "@/types/Emotion";
import { Buzzer } from "@/types/Buzzer";
import {
  ChatbotMessage,
  ChatbotPrompt,
  ChatbotPromptTopic,
  ChatbotPromptTopics,
} from "@/types/Chatbot";
import { Community } from "@/types/Community";

type AnalysisProviderProps = {
  children: ReactNode;
};

const AnalysisContext = createContext<
  | {
      projects: Project[];
      selectedProject: Project | null;
      active: string;
      selectedModel: string;
      selectedModelEmotion: string;
      selectedTopic: string;
      filteredTopic: Topic[];
      // overview
      overview: Project | null;
      // topic
      topics: Topic[];
      tweetsTopic: TweetTopic[];
      // sentiment
      sentiment: Sentiment | null;
      filteredSentiment: TSentiment[];
      // emotion
      emotion: Emotion | null;
      filteredEmotion: TEmotion[];
      // buzzer
      buzzer: Buzzer[];
      // community
      community: Community | null;
      filteredCommunity: Community | null;
      // chatbot
      prompt: ChatbotPromptTopics | null;
      messages: ChatbotMessage[];
      hasAnimated: Record<number, boolean>;
      handleSetHasAnimated: (index: number) => void;
      setSelectedProject: (project: Project | null) => void;
      setActive: (active: string) => void;
      setSelectedModel: (model: string) => void;
      setSelectedModelEmotion: (model: string) => void;
      setSelectedTopic: (topic: string) => void;
      setFilteredCommunity: (community: Community | null) => void;
      sendChat: (question: string, messages: ChatbotMessage[]) => void;
      getProjects: () => Promise<void>;
      resetAnalysis: () => void;
    }
  | undefined
>(undefined);

export const AnalysisProvider = ({ children }: AnalysisProviderProps) => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [active, setActive] = useState<string>(CONTENT_CHAT_BOT);
  const [selectedModel, setSelectedModel] = useState<string>("cnn-lstm");
  const [selectedModelEmotion, setSelectedModelEmotion] = useState<string>("cnn-bilstm");
  const [selectedTopic, setSelectedTopic] = useState("all");
  const [filteredTopic, setFilteredTopic] = useState<Topic[]>([]);

  // overview
  const [overview, setOverview] = useState<Project | null>(null);

  // topic
  const [topics, setTopic] = useState<Topic[]>([]);
  const [tweetsTopic, setTweetsTopic] = useState<TweetTopic[]>([]);

  // sentiment
  const [sentiment, setSentiment] = useState<Sentiment | null>(null);
  const [filteredSentiment, setFilteredSentiment] = useState<TSentiment[]>([]);

  // emotion
  const [emotion, setEmotion] = useState<Emotion | null>(null);
  const [filteredEmotion, setFilteredEmotion] = useState<TEmotion[]>([]);

  // buzzer
  const [buzzer, setBuzzer] = useState<Buzzer[]>([]);

  // community
  const [community, setCommunity] = useState<Community | null>(null);
  const [filteredCommunity, setFilteredCommunity] = useState<Community | null>(null);

  // chatbot
  const [prompt, setPrompt] = useState<ChatbotPromptTopics | null>(null);
  const [messages, setMessages] = useState<ChatbotMessage[]>([]);
  const [hasAnimated, setHasAnimated] = useState<{ [key: number]: boolean }>({});

  const handleSetHasAnimated = (index: number) => {
    setHasAnimated((prevState) => ({
      ...prevState,
      [index]: true,
    }));
  };

  useEffect(() => {
    if (selectedProject) getTopic();
  }, [selectedProject]);

  useEffect(() => {
    if (topics && selectedTopic) filterTopic();
  }, [topics, selectedTopic]);

  useEffect(() => {
    if (selectedProject) getPrompt();
    setMessages([]);
    setHasAnimated({});
  }, [selectedProject]);

  useEffect(() => {
    getData();
  }, [selectedProject, active, selectedModel, selectedTopic, selectedModelEmotion]);

  const getData = async () => {
    // if (selectedProject) {
    // }
    switch (active) {
      case CONTENT_OVERVIEW:
        getOverview();
        break;
      case CONTENT_TREN_OF_TWEET:
        getTweetTopic();
        break;
      case CONTENT_SENTIMENT_ANALYST:
        if (selectedModel) getSentiment();
        break;
      case CONTENT_EMOTION_ANALYSIS:
        if (selectedModelEmotion) getEmotion();
        break;
      case CONTENT_BUZZER:
        getBuzzer();
        break;
      case CONTENT_COMMUNITY:
        getCommunity();
        break;
      case CONTENT_CHAT_BOT:
        getPrompt();
        break;
      default:
        break;
    }
  };

  const getProjects = async () => {
    try {
      const response = await axiosPrivate.get(`${API}/project?name=&page=1&limit=100`);
      setProjects(response.data.data.projects);
    } catch (error) {
      console.error(error);
    }
  };

  const getOverview = async () => {
    try {
      const response = await axiosPrivate.get(`${API}/project/${selectedProject?._id}`);
      setOverview(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getTopic = async () => {
    try {
      const response = await axiosPublic.get(
        `${API}/topic/topic-by-project/${selectedProject?._id}`
      );
      setTopic(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const filterTopic = async () => {
    try {
      if (selectedTopic === "all") {
        setFilteredTopic(topics);
        return;
      }

      const filteredTopic = topics.filter(
        (item) => selectedTopic === item.topicId.toString()
      );
      setFilteredTopic(filteredTopic);
    } catch (error) {
      console.error(error);
    }
  };

  const getTweetTopic = async () => {
    try {
      let url = `${API}/topic/document-by-project/${selectedProject?._id}`;

      if(selectedTopic != "all") {
        url += `?topic=${selectedTopic}`;
      }

      const response = await axiosPublic.get(url);
      setTweetsTopic(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getSentiment = async () => {
    try {
      const response = await axiosPublic.get(`${API}/sentiment/visualize-sentiment`, {
        params: {
          project_id: selectedProject?._id,
          topic: selectedTopic == "all" ? "" : selectedTopic,
          model_type: selectedModel,
        },
      });

      const responseData: Sentiment = response.data as Sentiment;
      setSentiment(responseData);

      const filteredByModel = responseData.sentiment.filter(
        (item) =>
          (selectedModel === "cnn" && item.predicted_sentiment_cnn) ||
          (selectedModel === "cnn-lstm" && item.predicted_sentiment_cnn_lstm)
      );

      const filteredByTopic =
        selectedTopic === "all"
          ? filteredByModel
          : filteredByModel.filter((item) => item.topic === selectedTopic);

      setFilteredSentiment(filteredByTopic);
    } catch (error) {
      console.error(error);
    }
  };

  const getEmotion = async () => {
    try {
      const response = await axiosPublic.get(`${API}/sentiment/visualize-emotion`, {
        params: {
          project_id: selectedProject?._id,
          topic: selectedTopic == "all" ? "" : selectedTopic,
          model_type: selectedModelEmotion,
        },
      });

      const responseData: Emotion = response.data as Emotion;
      setEmotion(responseData);

      const filteredByModel = responseData.emotion.filter(
        (item) =>
          (selectedModelEmotion === "cnn" && item.predicted_emotions_cnn) ||
          (selectedModelEmotion === "cnn-bilstm" && item.predicted_emotions_bilstm)
      );

      const filteredByTopic =
        selectedTopic === "all"
          ? filteredByModel
          : filteredByModel.filter((item) => item.topic === selectedTopic);

      setFilteredEmotion(filteredByTopic);
    } catch (error) {
      console.error(error);
    }
  };

  const getBuzzer = async () => {
    try {
      const response = await axiosPublic.get(
        `${API}/sna/get-buzzer-by-project-id/${selectedProject?._id}`
      );
      setBuzzer(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getCommunity = async () => {
    try {
      const response = await axiosPublic.get(
        `${API}/sna/get-community-by-project-id/${selectedProject?._id}`
      );
      const data = response.data.data[0];

      setCommunity(data);
      setFilteredCommunity(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getPrompt = async () => {
    // setMessages([
    //   {
    //     text: "Hi, how can I help you?",
    //     isUser: false,
    //     isLoading: false,
    //   },
    //   {
    //     text: "Apa itu Algoritma?",
    //     isUser: true,
    //     isLoading: false,
    //   },
    //   {
    //     text: "Algoritma adalah langkah-langkah sistematis yang digunakan untuk menyelesaikan suatu masalah atau mencapai tujuan tertentu. Dalam konteks pemrograman, algoritma adalah urutan instruksi yang diikuti oleh komputer untuk menyelesaikan tugas tertentu.",
    //     isUser: false,
    //     isLoading: false,
    //   }
    // ]);
    // try {
    //   const response = await axiosPublic.get(
    //     `${API}/chatbot/prompt?project_id=${selectedProject?._id}`
    //   );

    //   const data = response.data.data.prompt;
    //   setPrompt(data);
    // } catch (error) {
    //   console.error(error);
    // }
  };

  const sendChat = async (question: string, messages: ChatbotMessage[]) => {
    try {
      setMessages([...messages, { text: "Loading", isUser: false, isLoading: true }]);

      const response = await axiosPublic.post(
        `http://127.0.0.1:6000/chatbot/chat`,
        {
          query: question,
          // project_id: selectedProject?._id,
        }
      );

      const newMessages = messages.filter((message) => !message.isLoading);
      setMessages(newMessages);

      const data = response.data;

      setMessages([
        ...newMessages,
        {
          text: data.answer,
          questions: data.questions,
          isUser: false,
          isLoading: false,
        },
      ]);
    } catch (error) {
      console.error(error);
    }
  };

  const resetAnalysis = () => {
    setOverview(null);
    setTopic([]);
    setTweetsTopic([]);
    setSentiment(null);
    setFilteredSentiment([]);
    setEmotion(null);
    setFilteredEmotion([]);
    setBuzzer([]);
    setCommunity(null);
    setFilteredCommunity(null);
    setPrompt(null);
    // setMessages([]);
  };

  return (
    <AnalysisContext.Provider
      value={{
        projects,
        selectedProject,
        active,
        selectedModel,
        selectedModelEmotion,
        selectedTopic,
        filteredTopic,
        overview,
        topics,
        tweetsTopic,
        sentiment,
        filteredSentiment,
        emotion,
        filteredEmotion,
        buzzer,
        community,
        filteredCommunity,
        prompt,
        messages,
        hasAnimated,
        handleSetHasAnimated,
        sendChat,
        setSelectedProject,
        setActive,
        setSelectedModel,
        setSelectedModelEmotion,
        setSelectedTopic,
        setFilteredCommunity,
        getProjects,
        resetAnalysis,
      }}
    >
      {children}
    </AnalysisContext.Provider>
  );
};

export const useAnalysis = () => {
  const context = useContext(AnalysisContext);
  if (!context) {
    throw new Error("useAnalysis must be used within an AnalysisProvider");
  }
  return context;
};
