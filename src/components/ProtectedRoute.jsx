import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, role, loading } = useAuth();

  if (loading) return <p>Loading...</p>;
  if (!user || (allowedRoles && !allowedRoles.includes(role))) return <Navigate to="/" />;
  return children;
};

export default ProtectedRoute;