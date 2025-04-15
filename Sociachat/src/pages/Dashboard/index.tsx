import { Outlet, useLocation } from "react-router-dom";

import PageWrapper from "@/layouts/PageWrapper";
import Navbar from "@/components/navbar/navbar";
import MyProjectCard from "@/components/dashboard/MyProjectCard";
import ProjectList from "@/components/dashboard/ProjectList";

const Dashboard = () => {
  const location = useLocation();
  const isDashboardRoot = location.pathname === "/dashboard";

  return (
    <PageWrapper title="Dashboard">
      <Navbar />
      <div className=" flex flex-col items-center  min-h-screen bg-background mt-24">
        <div className="flex flex-col items-start gap-y-4">
          {isDashboardRoot && (
            <>
              {/* <MyProjectCard /> */}
              <ProjectList />
            </>
          )}
          <Outlet />
        </div>
      </div>
    </PageWrapper>
  );
};

export default Dashboard;
