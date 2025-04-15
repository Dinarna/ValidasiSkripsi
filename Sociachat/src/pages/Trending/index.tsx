import { Badge } from "@/components/ui/badge";
import CountBtn from "@/components/CountBtn";
import PageWrapper from "@/layouts/PageWrapper";
import Navbar from "@/components/navbar/navbar";

const Trending = () => {
  return (
    <PageWrapper title="Home">
      <Navbar />
      <div className=" flex flex-col items-center justify-center h-screen bg-background">
        <div className="flex flex-col items-center gap-y-4">
          <div className="inline-flex items-center gap-x-4">
            <span className="text-6xl">+</span>
          </div>
          <a href="https://ui.shadcn.com" rel="noopener noreferrer nofollow" target="_blank">
            <Badge variant="outline">shadcn/ui</Badge>
          </a>
          <CountBtn />
        </div>
      </div>
    </PageWrapper>
  );
};

export default Trending;
