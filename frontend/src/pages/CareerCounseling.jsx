// src/pages/CareerCounseling.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePersonality } from "../context/PersonalityStore";
import { Briefcase, Sparkles } from "lucide-react";

export default function CareerCounseling() {
  const { result } = usePersonality();
  const navigate = useNavigate();
  const type = result?.type?.toUpperCase();

  const [careerData, setCareerData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!type) return;

    setLoading(true);
    fetch(`/api/career/${type}`)
      .then((res) => res.json())
      .then((data) => {
        setCareerData(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [type]);

  if (loading) {
    return (
      <div className="text-center text-white mt-20">
        <p>Loading career insights...</p>
      </div>
    );
  }

  if (!careerData) {
    return (
      <div className="text-center text-white mt-20">
        <p>No career data found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#2D232E] py-24 px-12 text-[#FDEFF4]">
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">

        {/* ---------------- LEFT CARD ---------------- */}
        <div className="bg-[#3A2C31] border border-[#6C5456] rounded-3xl p-16 shadow-2xl">
          <h2 className="text-4xl font-bold flex items-center gap-3 mb-6 leading-snug">
            <Briefcase className="w-7 h-7 text-[#D8B4B8]" />
            Career Counseling for {type}
          </h2>

          <p className="text-lg text-[#FDEFF4]/85 leading-relaxed mb-10">
{careerData.work_style}
          </p>

          <hr className="border-[#6C5456] mb-10" />

          <h3 className="text-2xl font-semibold mb-5 text-[#D8B4B8] flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-[#B7898E]" />
            Ideal Career Paths
          </h3>

          {/* Careers are now clickable and pass MBTI + role */}
          <div className="grid grid-cols-2 gap-6 mb-14">
            {careerData.ideal_roles?.map((role, i) => (
              <button
                key={i}
                onClick={() =>
                  navigate(
                    `/career/plan?mbti=${type}&career=${encodeURIComponent(role)}`
                  )
                }
                className="
                  bg-[#5A4547] p-4 rounded-xl text-sm text-center 
                  border border-[#6C5456] tracking-wide 
                  transition-all duration-200 
                  hover:-translate-y-1 hover:shadow-lg hover:bg-[#6A5356]
                "
              >
                {role}
              </button>
            ))}
          </div>
          <h3 className="text-2xl font-semibold mb-4 text-[#D8B4B8]">
            Strengths to Highlight
          </h3>

          <ul className="list-disc list-inside space-y-3 text-[#FDEFF4]/90 text-[15px] leading-relaxed">
            {careerData.strengths?.map((strength, i) => (
              <li key={i}>{strength}</li>
            ))}
          </ul>
        </div>

        {/* ---------------- RIGHT CARD ---------------- */}
        <div className="bg-[#3A2C31] border border-[#6C5456] rounded-3xl p-16 shadow-2xl">
          <h3 className="text-3xl font-bold mb-6 flex items-center gap-3 text-[#D8B4B8]">
            <Sparkles className="w-7 h-7 text-[#D8B4B8]" />
            Growth & Guidance
          </h3>

          <ul className="list-none space-y-4 mb-12 text-[#FDEFF4]/90 text-[15px] leading-relaxed">
            {careerData.growth_points?.map((point, i) => (
  <li key={i} className="flex gap-3 items-start">
    <span className="text-[#F7C7B6] text-lg">🌱</span>
    <span>{point}</span>
  </li>
))}

          </ul>

          <div className="bg-[#4A3538] border border-[#6C5456] rounded-2xl p-8 mb-12">
            <h4 className="text-xl font-semibold mb-4 text-[#D8B4B8]">
              Resources for Growth
            </h4>

            <ul className="list-disc list-inside space-y-3 text-[#FDEFF4]/90 text-[15px]">
              <li>Building a Career You Love — The Muse</li>
              <li>Developing Emotional Intelligence — TEDx Talk</li>
              <li>Purpose-Driven Work — Medium Article</li>
            </ul>
          </div>

          <button
            onClick={() =>
  navigate(
    `/career/plan?career=${encodeURIComponent(
      careerData.ideal_roles?.[0] || ""
    )}&mbti=${type}`
  )
}

            className="bg-[#CFA4A8] hover:bg-[#B7898E] transition-all text-[#3A2C31] px-10 py-4 rounded-xl font-semibold text-lg shadow-lg"
          >
            🚀 Start Planning Your Path
          </button>
        </div>
      </div>
    </div>
  );
}
