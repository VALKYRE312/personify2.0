import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toJpeg } from "html-to-image";
import { usePersonality } from "../context/PersonalityStore";
import PersonalityDimensions from "../components/PersonalityDimensions";

export default function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state?.result;
  const { setResult } = usePersonality();

  // 📌 ref for download target
  const captureRef = useRef(null);

  useEffect(() => {
    if (result) setResult(result);
  }, [result, setResult]);
  if (!result) {
    return (
      <div className="min-h-screen bg-[#3C2F2F] flex items-center justify-center text-center text-[#F7F4F1]">
        <div>
          <p className="text-xl mb-4">No result found — please take the quiz first.</p>
          <button
            onClick={() => navigate("/quiz")}
            className="px-6 py-2 rounded-full bg-[#DCC7AA] text-[#3C2F2F] font-semibold"
          >
            Go to Quiz
          </button>
        </div>
      </div>
    );
  }

  const { type, breakdown, profile } = result;

  // 🎯 Download result as JPG
const downloadJpg = async () => {
  if (!captureRef.current) {
    console.warn("❌ captureRef not found");
    return;
  }

  try {
    const dataUrl = await toJpeg(captureRef.current, {
      quality: 0.95,
      backgroundColor: "#3C2F2F",   // prevents transparent background
    });

    const link = document.createElement("a");
    link.download = "personality_result.jpg";
    link.href = dataUrl;
    link.click();
  } catch (err) {
    console.error("🚨 JPG export failed:", err);
  }
};



 return (
  <div className="min-h-screen bg-[#3C2F2F] text-[#F7F4F1]
                  flex flex-col items-center px-4 pt-24 pb-16">

    {/* ===== Capture Area (JPG Only) ===== */}
    <motion.div
      ref={captureRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-4xl"
    >
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-5xl font-bold text-[#DCC7AA] mb-2">{type}</h1>
        <h2 className="text-2xl text-[#F4B8C0] mb-4">{profile.title}</h2>
        <p className="max-w-2xl mx-auto text-[#F7F4F1]/90">
          {profile.summary}
        </p>
      </div>

      {/* Traits */}
      {breakdown && (
        <div className="mb-10">
          <PersonalityDimensions breakdown={breakdown} />
        </div>
      )}
    </motion.div>

    {/* ===== Buttons (outside capture) ===== */}
    <div className="w-full max-w-4xl flex justify-center gap-4 mt-8">
      <button
        onClick={downloadJpg}
        className="px-6 py-2 rounded-full bg-[#F4B8C0] text-[#3C2F2F]
                   font-semibold hover:bg-[#DCC7AA] transition"
      >
        📸 Download JPG
      </button>

      <button
        onClick={() => navigate('/profile')}
        className="px-6 py-2 rounded-full bg-[#F4B8C0] text-[#3C2F2F]
                   font-semibold hover:bg-[#DCC7AA] transition"
      >
        View Profile
      </button>
    </div>

  </div>
);
}