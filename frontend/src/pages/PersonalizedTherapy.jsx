// src/pages/PersonalizedTherapy.jsx
import React from "react";
import { usePersonality } from "../context/PersonalityStore";
import { Sparkles } from "lucide-react";
import PERSONALITY_FULL from "../lib/personality_full_data"; // or personality_full_data_resolved
import { useNavigate, useLocation } from "react-router-dom";
export default function PersonalizedTherapy()  {
  const { result } = usePersonality();
  const navigate = useNavigate();
  const location = useLocation();
  const type = result?.type?.toUpperCase() || "INFP";
  const data = PERSONALITY_FULL[type] || {};

  // therapy object with fallbacks
  const therapy = data.therapy || {};
  const subtitle = therapy.subtitle || data.relationship || "Personalized guidance for growth and calm.";
  const guided = therapy.guided_reflection || [
    "Reflect on how you felt this week.",
    "What small action restored calm recently?",
  ];
  const calming = therapy.calming_practices || [];
  const reads = therapy.gentle_reads || [];
  const growthPoints = therapy.growth_points || [];

  return (
    <div className="min-h-screen bg-[#2D232E] py-24 px-12 text-[#FDEFF4]">
      <div className="max-w-[1500px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* LEFT */}
        <div className="bg-[#3A2C31] border border-[#6C5456] rounded-3xl p-14 shadow-2xl">
          <h2 className="text-4xl font-bold flex items-center gap-3 mb-6 leading-snug">
            <span className="text-2xl">♡</span>
            Personalized Therapy
          </h2>

          <p className="text-lg text-[#FDEFF4]/85 leading-relaxed mb-10">
            {subtitle}
          </p>

          <hr className="border-[#6C5456] mb-10" />

          <h3 className="text-2xl font-semibold mb-5 text-[#D8B4B8] flex items-center gap-2">
            🌷 Guided Reflection
          </h3>

          <ul className="list-disc list-inside space-y-3 text-[#FDEFF4]/90 text-[15px] leading-relaxed mb-8">
            {guided.map((q, i) => <li key={i}>{q}</li>)}
          </ul>

          <div className="flex justify-center">
            <button
 onClick={() => {
  sessionStorage.setItem("therapy_from", location.pathname); // ✅ STORE
  navigate("/therapy-session", {
    state: { type }
  });
}}

            className="bg-pink-300 hover:bg-pink-200 transition-all text-[#3A2C31] px-8 py-3 rounded-xl font-semibold">
               Have a Therapy Session
            </button>
          </div>
        </div>

        {/* RIGHT */}
        <div className="bg-[#3A2C31] border border-[#6C5456] rounded-3xl p-14 shadow-2xl">
          <h3 className="text-3xl font-bold mb-6 flex items-center gap-3 text-[#D8B4B8]">
            <Sparkles className="w-7 h-7 text-[#D8B4B8]" />
            Calming Practices
          </h3>

          <div className="space-y-4 mb-8">
            {calming.length > 0 ? (
              calming.map((c, i) => (
                <div key={i} className="bg-[#4A3538] border border-[#6C5456] rounded-xl p-4 text-[#FDEFF4]/90">
                  {c}
                </div>
              ))
            ) : (
              <div className="text-[#FDEFF4]/90">No calming practices provided for this type.</div>
            )}
          </div>

          {/* Gentle reads */}
          <div className="bg-[#4A3538] border border-[#6C5456] rounded-2xl p-8 mb-8">
            <h4 className="text-xl font-semibold mb-4 text-[#D8B4B8]">Gentle Reads</h4>
            <ul className="list-disc list-inside space-y-3 text-[#FDEFF4]/90 text-[15px]">
              {reads.length > 0 ? (
                reads.map((r, i) => (
                  <li key={i}>{typeof r === "string" ? r : `${r.title} — ${r.author}`}</li>
                ))
              ) : (
                <li>No reading suggestions available.</li>
              )}
            </ul>
          </div>

          {/* Growth & Guidance micro-points */}
          {growthPoints.length > 0 && (
            <div className="mb-6">
              <h4 className="text-lg font-semibold mb-3 text-[#D8B4B8]">Growth & Guidance</h4>
              <ul className="list-none space-y-3 text-[#FDEFF4]/90">
                {growthPoints.map((g, i) => (
                  <li key={i} className="flex gap-3 items-start">
                    <span className="text-[#F7C7B6] text-lg">🌱</span>
                    <span>{g}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex justify-end">
           <button
  onClick={() => navigate("/self-reflection")}
  className="bg-[#18A690] hover:bg-[#15907e] transition-all text-white px-8 py-3 rounded-xl font-semibold"
>
  Self Reflection
</button>

          </div>
        </div>
      </div>
    </div>
  );
}
