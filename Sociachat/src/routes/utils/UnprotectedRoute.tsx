import  { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/AuthContext";

const UnprotectedRoute = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("User in UnprotectedRoute:", auth);
    if (auth) {
      navigate("/dashboard", { replace: true });
    }
  }, [auth, navigate]);

  return !auth ? <Outlet /> : null;
};

export default UnprotectedRoute;
