import React, { useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Handle Email/Password Login
 const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.alert("✅ Login successful:", userCredential.user);
    navigate("/resume");
  } catch (error) {
    console.error("❌ Login error:", error.code, error.message);
    alert("Login failed: " + error.message);
  }
};


  // ✅ Google Sign-In Handler (POPUP version)
 const handleGoogleLogin = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    console.log("Google Sign-In successful:", result.user);
    navigate("/resume");
  } catch (error) {
    alert("Google Sign-In failed: " + error.message);
  }
};


  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        required
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        required
        onChange={(e) => setPassword(e.target.value)}
      />
      
      {/* Email/Password Login Button */}
      <button type="submit">Login</button>

      {/* Google Sign-In Button */}
      <button type="button" onClick={handleGoogleLogin}>
        Sign in with Google
      </button>
    </form>
  );
};

export default Login;
