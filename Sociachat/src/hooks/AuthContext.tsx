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
  user_id?: String;
  // email?: string;
  // accessToken?: string;
  // refreshToken?: string;
}

interface AuthContextType {
  auth: Auth | null;
  login: (username: string, password: string) => Promise<any>;
  logout: () => void;
  register: (
    username: string,
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
      const user_id = cookies.get("user_id");
      if (user_id) {
        setAuth({ user_id });
      }

      setLoading(false);
    };
    initializeAuth();
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const response = await axiosPublic.post(
        `http://20.195.9.167:4444/chatbot/login`,
        {
          username,
          password,
        }
      );
      if (response.status === 201 || response.status === 200) {
        const { user_id, username, nama } = response.data;
        setAuth({ user_id });
        cookies.set("user_id", user_id, { expires: 1 });
        cookies.set("username", username, { expires: 1 });
        cookies.set("nama", nama, { expires: 1 });
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
    cookies.remove("user_id");
    cookies.remove("username");
    cookies.remove("nama");
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
