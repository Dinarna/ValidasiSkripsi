import React from "react";

import PageWrapper from "@/layouts/PageWrapper";
import Navbar from "@/components/navbar/navbar";

const Service = () => {
  return (
    <PageWrapper title="Service">
      <Navbar />
      <div className=" flex flex-col items-center justify-center h-screen bg-background">
        <div className="flex flex-col items-center gap-y-4">
          <h1>Service</h1>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Service;
