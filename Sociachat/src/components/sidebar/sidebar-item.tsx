import React from "react";

interface SidebarItemProps {
  icon?: React.ReactNode;
  label: string;
  active?: boolean;
  onClick: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  label,
  active = false,
  onClick,
}) => {
  return (
    <div
      className={`group self-stretch h-[52px] p-4 ${active ? "bg-secondary text-white shadow-md" : "bg-white"} rounded-xl flex-col justify-center items-start gap-2.5 flex cursor-pointer hover:bg-secondary hover:text-white hover:transition-all`}
      onClick={onClick}
    >
      <div className="self-stretch justify-between items-center inline-flex">
        <div className="justify-start items-center gap-2.5 flex">
          <div className="w-10 h-10 justify-center items-center flex">{icon}</div>
          <p
            className={`text-base font-bold leading-tight group-hover:text-white ${active ? "text-white" : "text-gray-400"}`}
          >
            {label}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SidebarItem;
