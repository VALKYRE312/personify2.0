import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaGoogle } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";

import api from "../lib/api";


export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
  e.preventDefault();
  setError("");

  try {
    const res = await api.post("/api/auth/login", {
      email,
      password,
    });

    const token = res.data.access_token;
    const user = res.data.user;

    localStorage.setItem("pa.token", token);
    localStorage.setItem("pa.user", JSON.stringify(user));

    // ✅ MERGE GUEST RESULTS
const guestId = sessionStorage.getItem("guest_id");

if (guestId) {
  try {
    await api.post(
      "/api/career/quiz/merge-results",
      { guest_id: guestId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    sessionStorage.removeItem("guest_id");
  } catch (err) {
    console.warn("Guest merge skipped:", err.response?.status);
  }
}

    navigate("/profile");
  } catch (err) {
    setError("Invalid email or password");
  } finally {
    setLoading(false);
  }
}


  return (

    <div className="flex min-h-screen bg-[#1E1A1A] text-[#F7F4F1]">
      {/* ==== LEFT PANEL ==== */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-[#5C4033] via-[#3C2F2F] to-[#2B1F1F] items-center justify-center text-center px-10">
        <div className="flex flex-col items-center text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl font-bold mb-4 text-[#F7F4F1]"
          >
            Reconnect and Continue Your Journey
          </motion.h1>

          <p className="text-[#F7F4F1]/80 mb-6 text-sm md:text-base max-w-md">
            Welcome back! Log in to continue exploring your personality insights
            and discover more about yourself.
          </p>

          {/* ==== STEPS ==== */}
         {/* ==== STEPS ==== */}
<div className="w-full max-w-xs space-y-3 mt-4 mx-auto">
  {[
    { num: "1", text: "Reconnect with your account" },
    { num: "2", text: "Continue your personality journey" },
    { num: "3", text: "Unlock your insights" },
  ].map((step, index) => (
    <div
      key={index}
      className="flex items-center bg-[#3B2E2E] hover:bg-[#4A3A3A] transition p-3 rounded-lg shadow-md"
    >
      <div className="bg-[#E9D5CA] text-[#2B1F1F] font-semibold w-7 h-7 flex items-center justify-center rounded-full text-sm mr-3 flex-shrink-0">
        {step.num}
      </div>
      <p className="text-sm md:text-base font-medium text-left whitespace-nowrap">
        {step.text}
      </p>
    </div>
  ))}
</div>

        </div>
      </div>

      {/* ==== RIGHT PANEL ==== */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-[#2C2424]/70 p-8 rounded-2xl w-full max-w-md shadow-lg backdrop-blur-sm"
        >
          <h2 className="text-2xl font-semibold mb-2 text-center">
            Log In to Your Account
          </h2>
          <p className="text-sm text-center text-[#F7F4F1]/70 mb-6">
            Enter your details to continue your personality journey
          </p>

          {/* Google Login */}
          <div className="mb-6">
<button
  type="button"
  onClick={() => {
    const apiUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
    window.location.href = `${apiUrl}/api/auth/google`;
  }}
  className="flex items-center justify-center w-full bg-white text-black py-2 rounded-md hover:bg-gray-200 transition"
>
  <FaGoogle className="mr-2" /> Continue with Google
</button>

          </div>

          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-[#F7F4F1]/30"></div>
            <span className="mx-2 text-[#F7F4F1]/50 text-sm">or</span>
            <div className="flex-grow border-t border-[#F7F4F1]/30"></div>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin}>

            <div className="mb-4">
              <label className="block text-sm mb-1">Email</label>
             <input
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  placeholder="Enter your email"
  className="w-full p-2 rounded-md bg-[#3C2F2F]/60 border border-[#F7F4F1]/30 focus:border-[#DCC7AA] outline-none text-[#F7F4F1]"
/>

            </div>

            <div className="mb-6">
              <label className="block text-sm mb-1">Password</label>
              <input
  type="password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  placeholder="Enter your password"
  className="w-full p-2 rounded-md bg-[#3C2F2F]/60 border border-[#F7F4F1]/30 focus:border-[#DCC7AA] outline-none text-[#F7F4F1]"
/>

            </div>

        {error && (
  <p className="text-sm text-red-400 mb-3 text-center">
    {error}
  </p>
)}


            <button
  type="submit"
  disabled={loading}
  className="w-full bg-[#DCC7AA] text-[#3C2F2F] py-2 rounded-md font-semibold hover:bg-[#C7B08F] transition disabled:opacity-60"
>
  {loading ? "Logging in..." : "Log In"}
</button>

          </form>

         <p className="text-center text-sm text-[#F7F4F1]/70 mt-4">
  Don’t have an account?{" "}
  <Link to="/register" className="text-[#DCC7AA] hover:underline">
    Sign up
  </Link>
</p>

        </motion.div>
      </div>
    </div>
  );
}