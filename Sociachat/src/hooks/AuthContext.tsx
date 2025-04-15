import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import cookies from "js-cookie";
import { API } from "@/lib/urls";
import { axiosPublic } from "@/axiosConfig";
import axios from "axios";

interface Auth {
  id?: number;
  email?: string;
  accessToken?: string;
  refreshToken?: string;
}

interface AuthContextType {
  auth: Auth | null;
  login: (email: string, password: string) => Promise<any>;
  logout: () => void;
  register: (
    email: string,
    name: string,
    password: string,
    confirmPassword: string
  ) => Promise<any>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [auth, setAuth] = useState<Auth | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const initializeAuth = () => {
      const accessToken = cookies.get("accessToken");
      const refreshToken = cookies.get("refreshToken");
      if (accessToken && refreshToken) {
        setAuth({ accessToken, refreshToken });
      }

      setLoading(false); // Set loading to false after initialization
    };
    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await axiosPublic.post(`${API}/account/auth/login`, {
        email,
        password,
      });
      if (response.status === 201 || response.status === 200) {
        const { accessToken, refreshToken } = response.data.data;
        setAuth({ accessToken, refreshToken });
        cookies.set("accessToken", accessToken, { expires: 1 }); // Set cookie with expiration
        cookies.set("refreshToken", refreshToken, { expires: 7 }); // Set cookie with expiration
      }
      return response;
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const register = async (
    email: string,
    name: string,
    password: string,
    confirmPassword: string
  ) => {
    try {
      const response = await axiosPublic.post(`${API}/account/auth/register`, {
        email,
        name,
        password,
        confirmPassword,
      });
      return response;
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  const logout = () => {
    setAuth(null);
    cookies.remove("accessToken"); // Remove the token cookie
    cookies.remove("refreshToken"); // Remove the refresh token cookie
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout, register, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
