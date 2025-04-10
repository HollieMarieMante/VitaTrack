import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { role, logout, loading } = useAuth();
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

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img height="auto" width={45} src="/logo.png" alt="checklist" />
        <p>itaTrack</p>
      </div>
      
      <div className="navbar-options">
        {role === 'admin' ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/user-management">User Management</Link>
          </>
        ) : (
          <>
            <Link to="/welcome" className="link-style">Home</Link>
            <Link to="/expenses" className="link-style">Expenses</Link>
            <Link to="/mood" className="link-style">Mood</Link>
            <Link to="/tasks" className="link-style">Tasks</Link>
          </>
        )}
        <button onClick={handleLogout}>Sign Out</button>
      </div>
    </nav>
  );
};

export default Navbar;