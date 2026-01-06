import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import api from "../lib/api";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    birthday: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

try {
  const res = await api.post("/auth/register", form);

  // ✅ get token + user from backend
  const token = res.data.access_token;
  const user =
    res.data.user || {
      first_name: form.first_name,
      last_name: form.last_name,
      email: form.email,
      birthday: form.birthday,
    };

  // ✅ save auth + user
  localStorage.setItem("pa.token", token);
  localStorage.setItem("pa.user", JSON.stringify(user));

  // ✅ MERGE GUEST RESULTS IF USER TOOK QUIZ FIRST
  const guestId = sessionStorage.getItem("guest_id");
  if (guestId) {
    await api.post(
      "/career/quiz/merge-results",
      { guest_id: guestId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    sessionStorage.removeItem("guest_id");
  }

  // ✅ after register → go to profile
  navigate("/profile");
} catch (err) {

      console.error(err);
      const msg =
        err.response?.data?.error || "Registration failed. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex text-white bg-black">
      {/* === LEFT SECTION === */}
      <div className="hidden md:flex w-1/2 items-center justify-center bg-gradient-to-b from-[#3b2a20] via-[#2b1d16] to-black p-10 rounded-r-3xl shadow-2xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-md"
        >
          <h1 className="text-2xl font-semibold">⚪ Personify</h1>
          <h1 className="text-3xl font-bold mb-4 text-[#f4e3c2]">
            Get Started with Us
          </h1>
          <p className="text-sm text-[#d8c5a8] mb-8">
            Complete these easy steps to register your account.
          </p>

          <div className="space-y-3">
            <div className="flex items-center gap-3 bg-[#4a3626] p-3 rounded-xl">
              <div className="w-8 h-8 rounded-full bg-[#f4e3c2] flex items-center justify-center text-black font-semibold">
                1
              </div>
              <p className="text-[#f4e3c2]">Sign up your account</p>
            </div>

            <div className="flex items-center gap-3 bg-[#2e2219] p-3 rounded-xl">
              <div className="w-8 h-8 rounded-full border border-[#f4e3c2] flex items-center justify-center text-[#f4e3c2] font-semibold">
                2
              </div>
              <p className="text-[#bda789]">Take the Personality Quiz</p>
            </div>

            <div className="flex items-center gap-3 bg-[#2e2219] p-3 rounded-xl">
              <div className="w-8 h-8 rounded-full border border-[#f4e3c2] flex items-center justify-center text-[#f4e3c2] font-semibold">
                3
              </div>
              <p className="text-[#bda789]">Unlock Your Profile</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* === RIGHT SECTION === */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-[#0f0d0b]">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-md w-full p-10"
        >
          <h2 className="text-2xl font-semibold mb-2 text-[#f4e3c2]">
            Sign Up Account
          </h2>
          <p className="text-sm text-[#a8957a] mb-6">
            Enter your personal data to create your account.
          </p>

          {/* Social buttons */}
          <div className="flex gap-3 mb-5">
<button
  type="button"
  onClick={() => {
    const apiUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
    window.location.href = `${apiUrl}/api/auth/google`;
  }}
  className="flex-1 flex items-center justify-center gap-2 bg-[#2e2219] hover:bg-[#4a3626] p-2 rounded-lg border border-[#5c4433]"
>
  <FaGoogle className="text-[#f4e3c2]" /> Continue with Google
</button>

          </div>

          <div className="flex items-center mb-5">
            <div className="flex-grow border-t border-[#3b2a20]" />
            <span className="mx-3 text-[#a8957a] text-sm">or</span>
            <div className="flex-grow border-t border-[#3b2a20]" />
          </div>

          {/* Form fields */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex gap-3">
              <input
                type="text"
                name="first_name"
                placeholder="First Name"
                value={form.first_name}
                onChange={handleChange}
                className="w-1/2 p-3 rounded-lg bg-[#1b1410] border border-[#3b2a20] focus:border-[#f4e3c2] focus:outline-none text-[#f4e3c2]"
              />
              <input
                type="text"
                name="last_name"
                placeholder="Last Name"
                value={form.last_name}
                onChange={handleChange}
                className="w-1/2 p-3 rounded-lg bg-[#1b1410] border border-[#3b2a20] focus:border-[#f4e3c2] focus:outline-none text-[#f4e3c2]"
              />
            </div>

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-[#1b1410] border border-[#3b2a20] focus:border-[#f4e3c2] focus:outline-none text-[#f4e3c2]"
            />

            {/* Birthday */}
            <input
              type="date"
              name="birthday"
              value={form.birthday}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-[#1b1410] border border-[#3b2a20] focus:border-[#f4e3c2] focus:outline-none text-[#f4e3c2]"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-[#1b1410] border border-[#3b2a20] focus:border-[#f4e3c2] focus:outline-none text-[#f4e3c2]"
            />
            <p className="text-xs text-[#a8957a]">
              Must be at least 8 characters.
            </p>

            {error && (
              <p className="text-xs text-red-400 mb-1">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#f4e3c2] text-black font-semibold py-3 rounded-lg mt-3 hover:bg-[#e2cfa7] transition-all duration-200 disabled:opacity-60"
            >
              {loading ? "Creating account..." : "Sign Up"}
            </button>
          </form>

          <p className="text-center text-sm text-[#a8957a] mt-5">
            Already have an account?{" "}
            <a href="/login" className="text-[#f4e3c2] hover:underline">
              Log in
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
