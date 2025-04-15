import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  DashboardIcon,
  NotificationIcon,
  AnalystIcon,
  ServiceIcon,
  FinanceIcon,
  Logo,
  TrendingIcon,
} from "@/assets";
import Avatar from "../avatar/avatar";
import axios from "axios";
import User from "@/types/User";

import { useAuth } from "@/hooks/AuthContext";
import { API } from "@/lib/urls";

interface NavItemProps {
  icon: React.FC<{ isActive: boolean }>;
  label: string;
  active?: boolean;
  to: string;
  className?: string;
}

const Navbar: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const { auth, logout } = useAuth();
  const navigate = useNavigate();
  const avatarUrl = "/user-avatar.png";

  const getUser = async () => {
    try {
      const response = await axios.get(`${API}/account/auth/current-user`, {
        headers: {
          Authorization: `Bearer ${auth?.accessToken}`,
          "Ocp-Apim-Subscription-Key":"a95190b4c3f94ef58c4c1acd11d33e10"
        },
      });
      if (response.data.statusCode === 401) {
        logout();
        return;
      }
      setUser(response.data.data);
    } catch (error) {
      console.error("Failed to get user", error);
    }
  };

  // useEffect(() => {
  //   if (!auth) navigate("/login", { replace: true });
  // }, [auth, navigate]);

  useEffect(() => {
    if (auth?.accessToken) getUser();
  }, [auth?.accessToken]);

  return (
    <nav className=" bg-white px-32 py-2 flex justify-between items-center fixed top-0 left-0 w-full z-50">
      {/* Logo dan Nama Aplikasi */}
      <div className="flex items-center space-x-2 p-3 border border-gray-200 rounded-md">
        <Logo />
        <span className="text-xl font-bold">Socialabs</span>
      </div>

      {/* Menu Navigasi */}
      <div className="w-[480px] flex justify-center  cursor-pointer space-x-14">
        {/* <NavItem to="/" icon={TrendingIcon} label="Trending" className="p-2" /> */}
        <NavItem
          to="/dashboard"
          icon={DashboardIcon}
          label="Dashboard"
          className="p-2"
        />
        <NavItem
          to="/analysis"
          icon={AnalystIcon}
          label="Analysis"
          className="p-2"
        />
        {/* <NavItem
          to="/service"
          icon={ServiceIcon}
          label="Service"
          className="p-2"
        /> */}
      </div>

      {/* Ikon Notifikasi, Keuangan, dan Profil */}
      <div className="flex items-center space-x-4 cursor-pointer">
        {/* <NotificationIconWrapper icon={NotificationIcon} hasNotification /> */}
        {/* <FinanceIcon isActive /> */}
        <div className="relative">
          <Avatar src={avatarUrl} size={40} user={user} logout={logout} />
        </div>
      </div>
    </nav>
  );
};

const NavItem: React.FC<NavItemProps> = ({ icon: Icon, label, to }) => {
  return (
    <NavLink to={to}>
      {({ isActive }) => (
        <div
          className={`flex flex-col items-center ${isActive ? "text-red-500" : "text-gray-500"}`}
        >
          <Icon isActive={isActive} />
          <span className="text-sm">{label}</span>
          {isActive && (
            <div className="w-full h-1 bg-red-500 mt-1 rounded-full"></div>
          )}
        </div>
      )}
    </NavLink>
  );
};

interface NotificationIconWrapperProps {
  icon: React.FC<{ isActive: boolean }>;
  hasNotification?: boolean;
}

const NotificationIconWrapper: React.FC<NotificationIconWrapperProps> = ({
  icon: Icon,
  hasNotification,
}) => {
  return (
    <div className="relative">
      <Icon isActive={!!hasNotification} />
      {hasNotification && (
        <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></div>
      )}
    </div>
  );
};

export default Navbar;
