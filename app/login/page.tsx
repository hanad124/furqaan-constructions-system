"use client";

import "./login.scss";
import { useState, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { useRouter } from "next/navigation";

import { db, auth } from "../../firebase";
import { collection, getDocs, addDoc, doc, setDoc } from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";
import { AuthContext } from "../../auth";

const Login = () => {
  const router = useRouter();
  const { state, dispatch } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const querySnapshot = await getDocs(collection(db, "users"));
    const matchingUser = querySnapshot.docs.find(
      (doc) => doc.data().email === email && doc.data().password === password
    );
    if (matchingUser) {
      try {
        await addDoc(collection(db, "tempUser"), {
          email: email,
          password: password,
        });
      } catch (error) {}
      dispatch({ type: "LOGIN", payload: matchingUser.data() });

      router.push("/");
    } else {
      setPasswordError("Invalid email or password");
    }
  };

  const HidePassword = () => {
    setShowPassword(!showPassword);
  };

  const validateEmail = (email: string) => {
    // This regex pattern checks if the email is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    // This regex pattern checks if the password is at least 8 characters long and contains at least one digit and one uppercase letter
    const passwordRegex = /^(?=.*\d)(?=.*[A-Z])[a-zA-Z\d]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleEmailBlur = () => {
    if (!validateEmail(email)) {
      setEmailError("Invalid email address");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordBlur = () => {
    if (!validatePassword(password)) {
      setPasswordError(
        "Password must be at least 8 characters long and contain at least one digit and one uppercase letter"
      );
    } else {
      setPasswordError("");
    }
  };

  return (
    <div className="login">
      <div className="login-container">
        <div className="login-cols">
          <div className="login-cols-2">
            <h1>Login to your account</h1>
            <form className="form" onSubmit={handleLogin}>
              <p className="name">Email address</p>
              <input
                type="email"
                id="txtEmail"
                required
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={handleEmailBlur}
              />
              {emailError && <p className="error">{emailError}</p>}
              <p className="password">Password</p>
              <div className="passWrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  id="txtPass"
                  required
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={handlePasswordBlur}
                />
                {showPassword ? (
                  <RemoveRedEyeOutlinedIcon
                    className="eye text-slate-500"
                    style={{ cursor: "pointer", color: "gray" }}
                    onClick={HidePassword}
                  />
                ) : (
                  <VisibilityOffOutlinedIcon
                    className="eye text-slate-500 "
                    style={{ cursor: "pointer", color: "gray" }}
                    onClick={HidePassword}
                  />
                )}
              </div>
              {passwordError && <p className="error">{passwordError}</p>}
              <br />
              <Link href="/forgotPassword">
                <p className="forget_link text-[#0B63E5]">forgot password?</p>
              </Link>
              <div className="btn_login-wrapper">
                <button
                  className="submit-login bg-[#D54F33] hover:bg-[#c74a31]"
                  type="submit"
                  disabled={Boolean(emailError) || Boolean(passwordError)}
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
