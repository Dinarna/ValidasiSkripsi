import React from "react";
import IconProps from "@/types/Icon";

const DashboardIcon: React.FC<IconProps> = ({ isActive }) => {
  const fillColor = isActive ? "#C80909" : "#ADADAD"; // Warna aktif dan tidak aktif

  return (
    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="vuesax/bold/category">
        <g id="category">
          <path id="Vector" d="M7.24 2.5H5.34C3.15 2.5 2 3.65 2 5.83V7.73C2 9.91 3.15 11.06 5.33 11.06H7.23C9.41 11.06 10.56 9.91 10.56 7.73V5.83C10.57 3.65 9.42 2.5 7.24 2.5Z" fill={fillColor} />
          <path id="Vector_2" d="M18.67 2.5H16.77C14.59 2.5 13.44 3.65 13.44 5.83V7.73C13.44 9.91 14.59 11.06 16.77 11.06H18.67C20.85 11.06 22 9.91 22 7.73V5.83C22 3.65 20.85 2.5 18.67 2.5Z" fill={fillColor} />
          <path
            id="Vector_3"
            d="M18.67 13.9299H16.77C14.59 13.9299 13.44 15.0799 13.44 17.2599V19.1599C13.44 21.3399 14.59 22.4899 16.77 22.4899H18.67C20.85 22.4899 22 21.3399 22 19.1599V17.2599C22 15.0799 20.85 13.9299 18.67 13.9299Z"
            fill={fillColor}
          />
          <path
            id="Vector_4"
            d="M7.24 13.9299H5.34C3.15 13.9299 2 15.0799 2 17.2599V19.1599C2 21.3499 3.15 22.4999 5.33 22.4999H7.23C9.41 22.4999 10.56 21.3499 10.56 19.1699V17.2699C10.57 15.0799 9.42 13.9299 7.24 13.9299Z"
            fill={fillColor}
          />
        </g>
      </g>
    </svg>
  );
};

export default DashboardIcon;
