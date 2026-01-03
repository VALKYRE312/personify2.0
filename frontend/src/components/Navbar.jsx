import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import eyeLogo from "../assets/images/eye1.gif"; // ✅ FIX
export default function Navbar() {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-[9999] w-full px-4 pb-5">

      <div
        className={`relative flex items-center justify-center transition-all duration-500 ease-in-out
        bg-[#3C2F2F]/80 backdrop-blur-xl rounded-full 
        border border-[#CBB69E]/60 shadow-[0_6px_25px_rgba(60,47,47,0.6)]
        ${expanded ? "w-full max-w-[480px] px-5 py-2" : "w-[58px] h-[58px] p-1"}
        mx-auto`}
      >
        {/* === LEFT LINKS === */}
        {expanded && (
          <div className="absolute left-5 flex items-center gap-3 sm:gap-6">
            <NavLink
              to="/"
              onClick={() => setExpanded(false)}
              className={({ isActive }) =>
                `text-sm sm:text-base font-medium transition-colors duration-200 ${
                  isActive ? "text-[#F4B8C0]" : "text-[#F7F4F1] hover:text-[#F4B8C0]"
                }`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/quiz"
              onClick={() => setExpanded(false)}
              className={({ isActive }) =>
                `text-sm sm:text-base font-medium transition-colors duration-200 ${
                  isActive ? "text-[#F4B8C0]" : "text-[#F7F4F1] hover:text-[#F4B8C0]"
                }`
              }
            >
              Quiz
            </NavLink>
          </div>
        )}

        {/* === CENTER LOGO === */}
        <div
          onClick={() => setExpanded(!expanded)}
          className="relative cursor-pointer rounded-full transition-transform duration-500 hover:scale-110"
        >
          {/* Enhanced animated glow */}
          <div
            className="absolute inset-0 m-auto w-12 h-12 sm:w-14 sm:h-14 rounded-full
            bg-gradient-to-tr from-[#F4B8C0]/70 via-[#EAA4AD]/80 to-[#F4B8C0]/70
            blur-[12px] opacity-90 animate-pulse-slow z-0"
          ></div>

         <img
  src={eyeLogo}
  alt="Logo"
  className={`relative z-10 w-9 h-9 sm:w-11 sm:h-11 object-cover rounded-full
    shadow-[0_0_40px_rgba(244,184,192,0.6)]
    transition-transform duration-700 ease-out
    ${expanded ? "rotate-180 scale-105" : "rotate-0 scale-100"}`}
 />

        </div>

        {/* === RIGHT LINKS === */}
        {expanded && (
          <div className="absolute right-5 flex items-center gap-3 sm:gap-6">
            <NavLink
              to="/register"
              onClick={() => setExpanded(false)}
              className={({ isActive }) =>
                `text-sm sm:text-base font-medium transition-colors duration-200 ${
                  isActive ? "text-[#F4B8C0]" : "text-[#F7F4F1] hover:text-[#F4B8C0]"
                }`
              }
            >
              Register
            </NavLink>

            <button
              onClick={() => {
                setExpanded(false);
                navigate("/profile");
              }}
              className="text-[#F7F4F1] hover:text-[#F4B8C0] transition-transform hover:scale-110"
              aria-label="Profile"
            >
              <svg
                className="w-6 h-6 sm:w-7 sm:h-7"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="8" r="4" />
                <path d="M6 20c0-3 3-5 6-5s6 2 6 5" />
              </svg>
            </button>
          </div>
        )}
      </div>
      {/* === Custom slow pulse animation === */}
      <style>{`
        @keyframes pulse-slow {
          0%, 100% {
            transform: scale(1);
            opacity: 0.8;
          }
          50% {
            transform: scale(1.2);
            opacity: 1;
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 2.2s ease-in-out infinite;
        }
      `}</style>
    </nav>
  );
}