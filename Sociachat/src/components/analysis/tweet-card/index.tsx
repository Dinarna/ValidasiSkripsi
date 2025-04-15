import React from "react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { MessageCircle, Repeat, Heart, BarChart2, ExternalLink } from "lucide-react";

interface TweetCardProps {
  username: string;
  date: string;
  location: string;
  tweet: string;
  seeInTwitterLink: string;
  stats: {
    likes: string;
    retweets: string;
    replies: string;
    views: string;
  };
}

const processTweetText = (text: string) => {
  const parts = text.split(/(@\w+)/g); // Split by usernames
  return parts.map((part, index) => {
    if (part.startsWith("@")) {
      return (
        <span key={index} className="text-secondary text-lg font-medium font-['Plus Jakarta Sans'] leading-[23px]">
          {part}
        </span>
      );
    }
    return (
      <span key={index} className="text-neutral-900 text-lg font-medium font-['Plus Jakarta Sans'] leading-[23px]">
        {part}
      </span>
    );
  });
};

const TweetCard: React.FC<TweetCardProps> = ({ username, date, location, tweet, seeInTwitterLink, stats }) => {
  return (
    <Card className="self-stretch  bg-white rounded-lg border border-zinc-100 flex-col justify-start items-start flex shadow">
      <CardHeader className="w-full">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <p className="text-base font-bold leading-[17px]">@{username}</p>
                <div className="w-[3px] h-[3px] bg-neutral-400 rounded-full" />
                <p className="text-neutral-400 text-xs font-semibold leading-[15px]">{date}</p>
              </div>
              <div className="text-neutral-400 text-xs font-normal leading-[15px]">{location}</div>
            </div>
          </div>
					<a href={seeInTwitterLink} className="py-2 rounded-lg flex items-center gap-1 text-secondary">
						<ExternalLink size={16} className="" />
            <div className=" text-xs font-bold leading-[15px]">See in Twitter</div>
          </a>
        </div>
      </CardHeader>
      <CardContent className="p-6 flex-col gap-4">
				<p className="text-neutral-900 text-lg font-medium leading-[23px]">{processTweetText(tweet) }</p>
      </CardContent>
      <CardFooter className="p-6 flex justify-start gap-5">
        <div className="flex items-center gap-2">
          <MessageCircle size={16} className="text-neutral-500" />
          <div className="text-neutral-500 text-sm font-bold leading-[17px]">{stats.replies}</div>
        </div>
        <div className="flex items-center gap-2">
          <Repeat size={16} className="text-neutral-500" />
          <div className="text-neutral-500 text-sm font-bold leading-[17px]">{stats.retweets}</div>
        </div>
        <div className="flex items-center gap-2">
          <Heart size={16} className="text-neutral-500" />
          <div className="text-neutral-500 text-sm font-bold leading-[17px]">{stats.likes}</div>
        </div>
        <div className="flex items-center gap-2">
          <BarChart2 size={16} className="text-neutral-500" />
          <div className="text-neutral-500 text-sm font-bold leading-[17px]">{stats.views}</div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TweetCard;