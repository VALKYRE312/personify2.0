// src/components/PersonalityInsights.jsx
import React from "react";
import { Sparkles, Star, Briefcase, Heart } from "lucide-react";

export default function PersonalityInsights({ personality, career, therapy }) {

    // ---- ADD THESE LOGS ----
  console.log("Personality prop (PersonalityInsights):", personality);
  console.log("personality?.famous:", personality?.famous);
  
  const strengths = personality?.strengths || [
    "Empathetic and intuitive understanding of others",
    "Creative problem-solving skills",
    "Strong moral compass and authenticity",
    "Ability to see deeper emotional meaning in events",
    "Excellent listener who values harmony",
  ];

  const weaknesses = personality?.weaknesses || [
    "Overthinks decisions and situations",
    "Can take criticism personally",
    "Tends to avoid conflict",
    "Easily overwhelmed by chaotic environments",
    "Struggles with setting emotional boundaries",
  ];

  const growth = personality?.growth || therapy?.growth;
  const workStyle = personality?.work_style || career?.work_style;
  const relationship = personality?.relationship;

  // Use personality.famous (resolved by your personality_full_data import in ProfilePage).
  // Keep empty array fallback so UI doesn't crash.
  const famous = Array.isArray(personality?.famous) ? personality.famous : [];

  return (
    <div className="w-full lg:w-1/3 h-700 bg-[#3A2C31] border border-[#6C5456] p-8 rounded-3xl shadow-[0_0_25px_rgba(0,0,0,0.35)] overflow-y-auto max-h-[85vh]">
      <h2 className="text-3xl font-semibold mb-6 flex items-center gap-2 text-[#D8B4B8]">
        <Sparkles className="w-6 h-6 text-[#D8B4B8]" /> Personality Insights
      </h2>

      <div className="space-y-10 leading-relaxed text-sm">
        {/* Motto */}
        <div className="border-t border-[#6C5456] pt-6 pb-6">
          <h3 className="font-semibold text-[#D8B4B8] text-lg mb-2 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#B7898E]" /> Personal Motto
          </h3>
          <p className="text-[#FDEFF4]/90">
            {personality?.motto ||
              "Meaning matters more than perfection. Stay true to your values, and your path will always feel authentic."}
          </p>
        </div>

        {/* Strengths */}
        <div>
          <h3 className="font-semibold text-[#D8B4B8] text-lg mb-2 flex items-center gap-2">
            <Star className="w-4 h-4 text-[#B7898E]" /> Strengths
          </h3>
          <ul className="list-disc list-inside space-y-2 text-[#FDEFF4]/90">
            {strengths.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>

        {/* Weaknesses */}
        <div className="border-t border-[#6C5456] pt-6">
          <h3 className="font-semibold text-[#D8B4B8] text-lg mb-2 flex items-center gap-2">
            <Star className="w-4 h-4 text-[#B7898E]" /> Weaknesses
          </h3>
          <ul className="list-disc list-inside space-y-2 text-[#FDEFF4]/90">
            {weaknesses.map((w, i) => (
              <li key={i}>{w}</li>
            ))}
          </ul>
        </div>

        {/* Growth Areas */}
        {growth && (
          <div className="border-t border-[#6C5456] pt-6">
            <h3 className="font-semibold text-[#D8B4B8] text-lg mb-2 flex items-center gap-2">
              <Star className="w-4 h-4 text-[#B7898E]" /> Growth Areas
            </h3>
            <p className="text-[#FDEFF4]/90">{growth}</p>
          </div>
        )}

        {/* Work Style */}
        {workStyle && (
          <div className="border-t border-[#6C5456] pt-6">
            <h3 className="font-semibold text-[#D8B4B8] text-lg mb-2 flex items-center gap-2">
              <Star className="w-4 h-4 text-[#B7898E]" /> Work Style
            </h3>
            <p className="text-[#FDEFF4]/90">{workStyle}</p>
          </div>
        )}

        {/* Ideal Career Paths */}
        {career?.roles && (
          <div className="border-t border-[#6C5456] pt-6">
            <h3 className="font-semibold text-[#D8B4B8] text-lg mb-2 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-[#B7898E]" /> Ideal Career Paths
            </h3>
            <ul className="list-disc list-inside space-y-2 text-[#FDEFF4]/90">
              {career.roles.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Relationship Style */}
        {(relationship || therapy?.relationship) && (
          <div className="border-t border-[#6C5456] pt-6">
            <h3 className="font-semibold text-[#D8B4B8] text-lg mb-2 flex items-center gap-2">
              <Heart className="w-4 h-4 text-[#B7898E]" /> Relationship Style
            </h3>
            <p className="text-[#FDEFF4]/90">
              {relationship || therapy?.relationship}
            </p>
          </div>
        )}

        {/* Famous personalities */}
        <div className="border-t border-[#6C5456] pt-6">
          <h3 className="font-semibold text-[#D8B4B8] text-lg mb-2 flex items-center gap-2">
            <Star className="w-4 h-4 text-[#B7898E]" /> Famous Similar
            Personalities
          </h3>

          <ul className="list-disc list-inside space-y-2 text-[#FDEFF4]/90 mb-4">
            {famous.length > 0
              ? famous.map((f) => <li key={f.name}>{f.name}</li>)
              : <li>No famous examples available for this type.</li>}
          </ul>

          <div className="grid grid-cols-4 gap-4 text-center">
            {famous.map((f) => (
              <div key={f.name + "-" + (f.img || "")}>
                <img
                  src={f.img}
                  alt={f.name}
                  loading="lazy"
                  className="w-16 h-16 rounded-full object-cover mx-auto"
                />
                <p className="text-xs mt-2 text-[#FDEFF4]/90">{f.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
