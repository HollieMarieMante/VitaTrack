import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loading from "./Loading";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, role, loading } = useAuth();

  if (loading) return <Loading/>;
  if (!user || (allowedRoles && !allowedRoles.includes(role))) return <Navigate to="/" />;
  return children;
};

export default ProtectedRoute;