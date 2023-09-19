"use client";

import "./login.scss";
import { useState, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/assets/logo.svg";
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
    <div className="login bg-gradient-to-r from-red-500 to-orange-500">
      <div className="login-container">
        <div className="login-cols flex justify-center items-center h-full w-full">
          <div className="login-cols-2 bg-white w-full mx-3 md:max-0 mt-16 md:mt-32 px-7 py-10 md:w-[25rem] rounded-lg">
            <div className="flex items-center  gap-3">
              <Image
                src={logo}
                width={500}
                height={500}
                alt="logo"
                className="w-8"
              />
              <h1 className="text-2xl font-semibold text-[#27255F] uppercase">
                Furqaan
              </h1>
            </div>

            <h2 className="text-left mt-[2rem]  text-[1.2rem] font-medium text-[#27255F]">
              Login to your account
            </h2>
            <form className="form" onSubmit={handleLogin}>
              <p className="name">Email address</p>
              <input
                type="email"
                id="txtEmail"
                required
                // placeholder="Email address"
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
                  // placeholder="Enter your password"
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
                  className="submit-login bg-gradient-to-r from-red-500 to-orange-500 hover:from-orange-500 hover:to-red-500 transition-all "
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
