import React from "react";
import IconProps from "@/types/Icon";

const AnalystIcon: React.FC<IconProps> = ({ isActive }) => {
  const fillColor = isActive ? "#C80909" : "#ADADAD"; // Warna aktif dan tidak aktif

  return (
    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="vuesax/bold/activity">
        <g id="activity">
          <path
            id="Vector"
            d="M16.19 2.5H7.81C4.17 2.5 2 4.67 2 8.31V16.68C2 20.33 4.17 22.5 7.81 22.5H16.18C19.82 22.5 21.99 20.33 21.99 16.69V8.31C22 4.67 19.83 2.5 16.19 2.5ZM17.26 10.46L14.95 13.44C14.66 13.81 14.25 14.05 13.78 14.1C13.31 14.16 12.85 14.03 12.48 13.74L10.65 12.3C10.58 12.24 10.5 12.24 10.46 12.25C10.42 12.25 10.35 12.27 10.29 12.35L7.91 15.44C7.76 15.63 7.54 15.73 7.32 15.73C7.16 15.73 7 15.68 6.86 15.57C6.53 15.32 6.47 14.85 6.72 14.52L9.1 11.43C9.39 11.06 9.8 10.82 10.27 10.76C10.73 10.7 11.2 10.83 11.57 11.12L13.4 12.56C13.47 12.62 13.54 12.62 13.59 12.61C13.63 12.61 13.7 12.59 13.76 12.51L16.07 9.53C16.32 9.2 16.8 9.14 17.12 9.4C17.45 9.67 17.51 10.14 17.26 10.46Z"
            fill={fillColor}
          />
        </g>
      </g>
    </svg>
  );
};

export default AnalystIcon;
