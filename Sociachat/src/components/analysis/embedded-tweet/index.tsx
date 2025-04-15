import { withLoadMore } from "@/hoc/withLoadMore";
import { Tweet, TweetSkeleton, TweetNotFound } from "react-tweet";

const TweetList: React.FC<{ items: any[] }> = ({ items }) => {
  const getTweetId = (tweetUrl: string) => {
    const tweetUrlSplit = tweetUrl.split("/");
    return tweetUrlSplit[tweetUrlSplit.length - 1];
  };

  return (
    <div className="self-stretch grid grid-cols-2 gap-2">
      {items.map((item) => (
        <Tweet
          key={`tweet-${item.tweet_url ?? item.url_tweet}`}
          id={getTweetId(item.tweet_url ?? item.url_tweet)}
          fallback={<TweetSkeleton />}
          onError={(error) => <TweetNotFound error={error} />}
        />
      ))}
    </div>
  );
};

// Apply the HOC
export const LoadMoreTweetTopic = withLoadMore(TweetList);
export const LoadMoreTweetSentiment = withLoadMore(TweetList);
export const LoadMoreTweetEmotion = withLoadMore(TweetList);
