import React from "react";
import IconProps from "@/types/Icon";

const NotificationIcon: React.FC<IconProps> = ({ isActive }) => {
  const fillColor = isActive ? "#C80909" : "#ADADAD"; // Warna aktif dan tidak aktif

  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="20" fill="#EBEBEB" />
      <path
        d="M27.3399 22.49L26.3399 20.83C26.1299 20.46 25.9399 19.76 25.9399 19.35V16.82C25.9399 14.47 24.5599 12.44 22.5699 11.49C22.0499 10.57 21.0899 10 19.9899 10C18.8999 10 17.9199 10.59 17.3999 11.52C15.4499 12.49 14.0999 14.5 14.0999 16.82V19.35C14.0999 19.76 13.9099 20.46 13.6999 20.82L12.6899 22.49C12.2899 23.16 12.1999 23.9 12.4499 24.58C12.6899 25.25 13.2599 25.77 13.9999 26.02C15.9399 26.68 17.9799 27 20.0199 27C22.0599 27 24.0999 26.68 26.0399 26.03C26.7399 25.8 27.2799 25.27 27.5399 24.58C27.7999 23.89 27.7299 23.13 27.3399 22.49Z"
        fill={fillColor}
      />
      <path
        d="M22.8297 28.01C22.4097 29.17 21.2997 30 19.9997 30C19.2097 30 18.4297 29.68 17.8797 29.11C17.5597 28.81 17.3197 28.41 17.1797 28C17.3097 28.02 17.4397 28.03 17.5797 28.05C17.8097 28.08 18.0497 28.11 18.2897 28.13C18.8597 28.18 19.4397 28.21 20.0197 28.21C20.5897 28.21 21.1597 28.18 21.7197 28.13C21.9297 28.11 22.1397 28.1 22.3397 28.07C22.4997 28.05 22.6597 28.03 22.8297 28.01Z"
        fill={fillColor}
      />
    </svg>
  );
};

export default NotificationIcon;
