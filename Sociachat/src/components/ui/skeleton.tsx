import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse bg-[#F4F4F4] rounded-lg cursor-progress",
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
