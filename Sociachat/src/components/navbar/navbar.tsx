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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { auth, logout } = useAuth();
  const navigate = useNavigate();
  const avatarUrl = "/user-avatar.png";

  const navItems = [
    { to: "/dashboard", icon: DashboardIcon, label: "Dashboard" },
    { to: "/analysis", icon: AnalystIcon, label: "Analysis" },
  ];

  useEffect(() => {
    if (!auth) navigate("/login", { replace: true });
  }, [auth, navigate]);

  return (
    <nav className="bg-white px-4 md:px-32 py-2 flex justify-between items-center fixed top-0 left-0 w-full z-50">
      {/* Logo dan Hamburger Menu Mobile */}
      <div className="flex items-center space-x-2 p-1 md:p-3 border-0 md:border border-gray-200 rounded-md">
        <Logo />
        <span className="text-lg md:text-xl font-bold">Socialabs</span>
      </div>

      {/* Hamburger Button untuk Mobile */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden p-2 text-gray-600 hover:text-gray-800"
      >
        {isMenuOpen ? (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        )}
      </button>

      {/* Menu Desktop */}
      <div className="hidden md:flex w-[480px] justify-center cursor-pointer space-x-14">
        {navItems.map((item) => (
          <NavItem key={item.to} {...item} />
        ))}
      </div>

      {/* Menu Mobile */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg md:hidden">
          <div className="flex flex-col items-center py-4">
            {navItems.map((item) => (
              <div
                key={item.to}
                className="w-full text-center py-2 hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                <NavItem {...item} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bagian Kanan (Ikon dan Avatar) */}
      <div className="flex items-center space-x-4 cursor-pointer">
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
          className={`flex flex-col items-center ${
            isActive ? "text-red-500" : "text-gray-500"
          }`}
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

export default Navbar;
