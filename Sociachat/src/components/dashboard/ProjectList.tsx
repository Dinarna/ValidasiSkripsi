import { useEffect, useState } from "react";

import { Button } from "../ui/button";
import { CreateNewProjectIcon } from "@/assets";
import { Link } from "react-router-dom";
import { DataTable } from "@/components/topic-table/data-table";
import { columns } from "@/components/topic-table/column";
import { axiosPrivate } from "@/axiosConfig";
import { useAnalysis } from "@/hooks/AnalysisContext";
import { API } from "@/lib/urls";
import Project from "@/types/Project";

const ProjectList = () => {
  const { getProjects } = useAnalysis();
  const [projectList, setProjectList] = useState<Project[]>([]);

  const getProjectList = async () => {
    try {
      const response = await axiosPrivate.get(
        `${API}/project?name=&page=1&limit=50`
      );
      setProjectList(response.data.data.projects);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProjectList();
    getProjects();
  }, []);

  return (
    <div className="w-[1170px] p-6 bg-white rounded-lg shadow flex-col justify-start items-start gap-6 inline-flex">
      <div className="self-stretch h-[60px] flex-col justify-start items-start gap-6 flex">
        <div className="self-stretch justify-start items-start gap-2 inline-flex">
          <div className="grow shrink basis-0 flex-col justify-start items-start gap-1 inline-flex">
            <h2 className="font-primary leading-9">Project List</h2>
            <p className="text-zinc-500 text-base font-normal  leading-tight">
              List of projects that have been created based on the topics of the
              specified keywords
            </p>
          </div>
          <Link to={"/dashboard/create-project"}>
            <Button icon={<CreateNewProjectIcon />} size={"lg"}>
              Create New Project
            </Button>
          </Link>
        </div>
      </div>
      <div className="self-stretch bg-white rounded-lg border border-zinc-100 flex flex-col justify-start items-center">
        <DataTable columns={columns} data={projectList} />
      </div>
    </div>
  );
};

export default ProjectList;
