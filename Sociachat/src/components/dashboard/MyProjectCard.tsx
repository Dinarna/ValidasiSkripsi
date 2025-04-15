import React from "react";
import StatisticsCard from "./StatisticsCard";
import { TotalAccountIcon, TotalTopicIcon, TotalTweetIcon } from "@/assets";

const MyProjectCard: React.FC = () => {
  return (
    <div className="w-[1170px] h-[264px] p-6 bg-white rounded-lg shadow flex-col justify-start items-start gap-6 inline-flex">
      <div className="flex justify-start items-start gap-2">
        <div className="flex flex-col justify-start items-start gap-2">
          <h2 className="text-zinc-800  font-bold leading-[34px]">
            My Project
          </h2>
          <p className="text-zinc-500 text-base font-normal leading-tight">
            {" "}
            Project that discusses certain projects to suppress various things
            that are currently trending{" "}
          </p>
        </div>
      </div>
      <div className="w-full gap-6 flex justify-start items-start">
        <StatisticsCard
          title="Total Topic Analysis"
          value="12"
          icon={<TotalTopicIcon />}
        />
        <StatisticsCard
          title="Total Tweet"
          value="130,301"
          icon={<TotalTweetIcon />}
        />
        <StatisticsCard
          title="Total Account"
          value="50,231"
          icon={<TotalAccountIcon />}
        />
      </div>
    </div>
  );
};

export default MyProjectCard;
