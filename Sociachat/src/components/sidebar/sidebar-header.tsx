import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Project from "@/types/Project";

interface SidebarHeaderProps {
  projects: Array<Project>;
  selectedProject: string;
  onProjectChange: (newProject: string) => void;
}

const SidebarHeader: React.FC<SidebarHeaderProps> = ({
  projects,
  selectedProject,
  onProjectChange,
}) => {
  return (
    <Select value={selectedProject} onValueChange={onProjectChange}>
      <SelectTrigger className="text-red-700 text-base font-bold leading-tight">
        <SelectValue placeholder="Select Project" />
      </SelectTrigger>
      <SelectContent className="">
        {projects.map((project) => (
          <SelectItem key={project._id} value={project._id}>
            {project.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SidebarHeader;
