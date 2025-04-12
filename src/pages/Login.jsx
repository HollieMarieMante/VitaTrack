import { useState } from "react";
import { auth, db, googleProvider } from "../firebase/config";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./styles/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      const ref = doc(db, "users", res.user.uid);
      const snap = await getDoc(ref);
      const role = snap.data()?.role;
      navigate(role === "admin" ? "/dashboard" : "/welcome");
    } catch (err) {
      console.error(err);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const user = res.user;
      const userRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userRef);

      // If the user doesn't exist in the database, add them
      if (!userDoc.exists()) {
        await setDoc(userRef, {
          display_name: user.displayName,
          email: user.email,
          role: "user",
          isBlocked: false
        });
      }

      const role = userDoc.data()?.role;
      navigate(role === "admin" ? "/dashboard" : "/welcome");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="login-page">
      <div>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
          <button type="submit">Login</button>
        </form>
        <p>Don't have an account yet? <Link to="/signup">Sign up here!</Link></p>
        <button onClick={handleGoogleLogin}>Continue with Google</button>
      </div>

      <div> 

      </div>
      
    </div>
  );
};

export default Login;