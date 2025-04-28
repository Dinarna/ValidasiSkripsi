import React, { Dispatch, SetStateAction } from "react";
import SidebarHeader from "./sidebar-header";
import SidebarSection from "./sidebar-section";
import {
  TrendingUp,
  User,
  Smile,
  MessageCircle,
  Share2,
  Users,
  Bot,
} from "lucide-react";
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
import { useAnalysis } from "@/hooks/AnalysisContext";
import { ChatbotIcon } from "@/assets";
import KuesionerIcon from "@/assets/kuesioner-icon";

const Sidebar: React.FC = () => {
  const { projects, selectedProject, active, setSelectedProject, setActive } =
    useAnalysis();

  const handleItemClick = (label: string) => {
    setActive(label);
  };

  return (
    <aside className="w-full px-5 lg:px-[25px] py-6 bg-white rounded-lg flex-col justify-start items-start inline-flex gap-5">
      {/* <SidebarHeader
        projects={projects}
        selectedProject={selectedProject?._id ?? ""}
        onProjectChange={(newProject) =>
          setSelectedProject(projects.find((p) => p._id === newProject) ?? null)
        }
      /> */}
      {/* <SidebarSection
        items={[
          {
            label: CONTENT_OVERVIEW,
            icon: <User />,
            active: active === CONTENT_OVERVIEW,
            onClick: () => handleItemClick(CONTENT_OVERVIEW),
          },
        ]}
      />
      <div className="self-stretch  border border-gray-200"></div> */}
      {/* <SidebarSection
        items={[
          {
            label: CONTENT_TREN_OF_TWEET,
            icon: <TrendingUp />,
            active: active === CONTENT_TREN_OF_TWEET,
            onClick: () => handleItemClick(CONTENT_TREN_OF_TWEET),
          },
          {
            label: CONTENT_SENTIMENT_ANALYST,
            icon: <Smile />,
            active: active === CONTENT_SENTIMENT_ANALYST,
            onClick: () => handleItemClick(CONTENT_SENTIMENT_ANALYST),
          },
          {
            label: CONTENT_EMOTION_ANALYSIS,
            icon: <MessageCircle />,
            active: active === CONTENT_EMOTION_ANALYSIS,
            onClick: () => handleItemClick(CONTENT_EMOTION_ANALYSIS),
          },
        ]}
      />
      <div className="self-stretch  border border-gray-200"></div>
      <SidebarSection
        title="Social Network Analysis"
        items={[
          {
            label: CONTENT_BUZZER,
            icon: <Share2 />,
            active: active === CONTENT_BUZZER,
            onClick: () => handleItemClick(CONTENT_BUZZER),
          },
          {
            label: CONTENT_COMMUNITY,
            icon: <Users />,
            active: active === CONTENT_COMMUNITY,
            onClick: () => handleItemClick(CONTENT_COMMUNITY),
          },
        ]}
      />
      <div className="self-stretch  border border-gray-200"></div> */}
      <SidebarSection
        items={[
          {
            label: CONTENT_CHAT_BOT,
            icon: <ChatbotIcon isActive={active === CONTENT_CHAT_BOT} />,
            active: active === CONTENT_CHAT_BOT,
            onClick: () => handleItemClick(CONTENT_CHAT_BOT),
          },
          {
            label: CONTENT_KUESIONER,
            icon: <KuesionerIcon isActive={active === CONTENT_KUESIONER} />,
            active: active === CONTENT_KUESIONER,
            onClick: () => handleItemClick(CONTENT_KUESIONER),
          },
        ]}
      />
    </aside>
  );
};

export default Sidebar;
