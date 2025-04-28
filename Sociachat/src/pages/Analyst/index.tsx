import React, { useEffect, useState } from "react";
import PageWrapper from "@/layouts/PageWrapper";
import Navbar from "@/components/navbar/navbar";
import Sidebar from "@/components/sidebar/sidebar";
import {
  CONTENT_OVERVIEW,
  CONTENT_TREN_OF_TWEET,
  CONTENT_SENTIMENT_ANALYST,
  CONTENT_EMOTION_ANALYSIS,
  CONTENT_BUZZER,
  CONTENT_COMMUNITY,
  CONTENT_CHAT_BOT,
  CONTENT_KUESIONER,
} from "@/types/constantLabelSidebar";
import TrenOfTweet from "@/components/analysis/tren-of-tweet";
import Sentiment from "@/components/analysis/sentiment";
import Emotion from "@/components/analysis/emotion";
import Buzzer from "@/components/analysis/sna/buzzer";
import ChatBot from "@/components/analysis/chatbot";
import Overview from "@/components/analysis/overview";
import { useAnalysis } from "@/hooks/AnalysisContext";
import { useSearchParams } from "react-router-dom";
import CommunitySNA from "@/components/analysis/sna/community";
import Kuesioner from "@/components/analysis/kuesioner";

const Analyst: React.FC = () => {
  const { projects, active, setSelectedProject, getProjects, resetAnalysis } =
    useAnalysis();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    resetAnalysis();
    // getProjects();
  }, []);

  useEffect(() => {
    setSelectedProject(
      projects.find((project) => project._id === searchParams.get("id"))!
    );
  }, [projects]);

  return (
    <PageWrapper title="Analysis">
      <Navbar />
      <div className="grid grid-cols-1 lg:grid-cols-[0.75fr_2fr] mx-3 lg:mx-10 gap-10 h-screen bg-background mt-24">
        <Sidebar />
        {active === CONTENT_OVERVIEW && <Overview />}
        {active === CONTENT_TREN_OF_TWEET && <TrenOfTweet />}
        {active === CONTENT_SENTIMENT_ANALYST && <Sentiment />}
        {active === CONTENT_EMOTION_ANALYSIS && <Emotion />}
        {active === CONTENT_BUZZER && <Buzzer />}
        {active === CONTENT_COMMUNITY && <CommunitySNA />}
        {active === CONTENT_CHAT_BOT && <ChatBot />}
        {active === CONTENT_KUESIONER && <Kuesioner />}
      </div>
    </PageWrapper>
  );
};

export default Analyst;
