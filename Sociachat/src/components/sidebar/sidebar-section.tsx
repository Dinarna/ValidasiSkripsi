import React from "react";
import SidebarItem from "./sidebar-item";

interface SidebarSectionProps {
  title?: string;
  items: { icon?: React.ReactNode; label: string; active?: boolean; onClick: () => void }[];
}

const SidebarSection: React.FC<SidebarSectionProps> = ({ title, items }) => {
  return (
    <div className="self-stretch flex-col justify-start items-start gap-2 flex">
      {title && (
        <div className="self-stretch h-11 px-4 py-3 bg-stone-50 rounded-lg flex-col justify-center items-start gap-2.5 flex">
          <div className="self-stretch justify-between items-center inline-flex">
            <div className="justify-start items-center gap-2.5 flex">
              <p className="text-neutral-700 font-bold leading-tight">{title}</p>
            </div>
          </div>
        </div>
      )}
      {items.map((item, index) => (
        <SidebarItem key={index} icon={item.icon} label={item.label} active={item.active} onClick={item.onClick} />
      ))}
    </div>
  );
};

export default SidebarSection;
