import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, role, logout, loading } = useAuth();
  const navigate = useNavigate();

  if(loading){
    return null;
  }

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const getFallbackName = () => {
    if (!user) return "User";
    if (user.displayName) return user.displayName;
    if (user.email) return user.email.split("@")[0];
    return "User";
  };

  const display = getFallbackName();

  return (
    <nav className="navbar">
      <div>
        <p>{display}</p>
      </div>
      
      <div className="navbar-options">
        {role === 'admin' ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/user-management">User Management</Link>
          </>
        ) : (
          <>
            <Link to="/welcome">Home</Link>
            <Link to="/expenses">Expenses</Link>
            <Link to="/mood">Mood</Link>
            <Link to="/tasks">Tasks</Link>
          </>
        )}
        <button onClick={handleLogout}>Sign Out</button>
      </div>
    </nav>
  );
};

export default Navbar;