import { useState } from "react";
import { auth, db, googleProvider } from "../firebase/config";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import GoogleIcon from "../../public/icons/GoogleIcon";
import "./styles/Signup.css"
import Loading from "../components/Loading";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", res.user.uid), {
        display_name: name,
        email,
        isBlocked: false,
        password,
        role: "user",
      });
      navigate("/welcome");
    } catch (err) {
      console.error(err);
    }
  };

  if(isLoading) return <Loading/>;

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

  return (
    <div className="signup-page">

      <div className="left-side">
        <div className="form">
          <h2>Sign Up</h2>
          <form className="signup-form" onSubmit={handleSignup}>
            <input type="name" placeholder="Full Name" onChange={(e) => setName(e.target.value)} required/> 
            <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required/>
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required/>
            <button type="submit">Sign Up</button>
          </form>
          <p>Already had an account? <Link to="/login">Login here!</Link></p>
          <p>or</p>
          <button className="login-google" onClick={handleGoogleLogin}>Continue with &nbsp;<GoogleIcon/></button>
        </div>
      </div>

      <div className="right-side">
      <img className="signup-img" src="/signup.png" alt="checklist" />
      </div>
    </div>
  );
};

export default Signup;