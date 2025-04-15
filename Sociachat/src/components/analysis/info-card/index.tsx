import React from "react";

interface InfoCardProps {
  type:
    | "totalTweet"
    | "totalAccount"
    | "keyword"
    | "category"
    | "topicInterpretation";
  value: string | number;
}

const InfoCard = ({ type, value }: InfoCardProps) => {
  let label: string;

  switch (type) {
    case "totalTweet":
      label = "Total Tweet";
      break;
    case "totalAccount":
      label = "Total Account";
      break;
    case "keyword":
      label = "Keyword";
      break;
    case "category":
      label = "Category";
      break;
    case "topicInterpretation":
      label = "";
      break;
    default:
      label = "";
  }

  return (
    <div
      className={`grow shrink basis-0 h-10 px-4 ${type === "topicInterpretation" ? "py-9" : "py-2.5"} bg-white rounded-md shadow border border-[#dcdcdc] flex items-center capitalize`}
    >
      <div>
        {type === "topicInterpretation" ? (
          <p className="text-[#2d2e33] text-base font-bold leading-tight">
            {value}
          </p>
        ) : (
          <p className="text-[#2d2e33] text-base font-bold leading-tight">
            {label} : {value}
          </p>
        )}
      </div>
    </div>
  );
};

export default InfoCard;
