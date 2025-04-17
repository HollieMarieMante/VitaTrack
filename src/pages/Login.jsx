import { useState } from "react";
import { auth, db, googleProvider } from "../firebase/config";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./styles/Login.css";
import GoogleIcon from "../../public/icons/GoogleIcon";
import Loading from "../components/Loading";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      const ref = doc(db, "users", res.user.uid);
      const snap = await getDoc(ref);
      const role = snap.data()?.role;
      setIsLoading(false);
      navigate(role === "admin" ? "/dashboard" : "/welcome");
    } catch (err) {
      console.error(err);
      setError("Invalid email or password. Please try again.");
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const user = res.user;
      const userRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) {
        await setDoc(userRef, {
          display_name: user.displayName,
          email: user.email,
          role: "user",
          isBlocked: false
        });
      }

      const role = userDoc.data()?.role;
      setIsLoading(false);
      navigate(role === "admin" ? "/dashboard" : "/welcome");
    } catch (err) {
      console.error(err);
    }
  };

  if(isLoading) return <Loading/>;

  return (
    <div className="login-page">

      <div className="left-side">
        <div className="form">
          <h2>Login</h2>
          <form className="login-form" onSubmit={handleLogin}>
            <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required/>
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required/>
            {error && <p className="error-message">{error}</p>}
            <button type="submit">Login</button>
          </form>
          <p>Don't have an account yet? <Link to="/signup">Sign up here!</Link></p>
          <p>or</p>
          <button className="login-google" onClick={handleGoogleLogin}>Continue with &nbsp;<GoogleIcon/></button>
        </div>
      </div>

      <div className="right-side"> 
        <img className="login-img" src="/signup.png" alt="checklist" />
      </div>
      
    </div>
  );
};

export default Login;