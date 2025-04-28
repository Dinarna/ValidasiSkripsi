import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "@/hooks/AuthContext";
import Spinner from "@/components/spinner";

function PrivateRoute() {
  const { auth, loading } = useAuth();

  if (loading) {
    return <Spinner />;
  }

  if (!auth) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}

export default PrivateRoute;
