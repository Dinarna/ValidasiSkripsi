import { Skeleton } from "@/components/ui/skeleton";

const SkeletonTweet = () => {
  return (
    <div className="grid grid-cols-2 gap-2.5">
      <Skeleton className="h-52 grow w-full" />
      <Skeleton className="h-52 grow w-full" />
    </div>
  );
};

export default SkeletonTweet;
