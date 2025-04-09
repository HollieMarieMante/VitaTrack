import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { role, logout } = useAuth();
  return (
    <nav className="navbar">
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
      <button onClick={logout}>Sign Out</button>
    </nav>
  );
};

export default Navbar;