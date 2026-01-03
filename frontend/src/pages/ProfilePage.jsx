// src/pages/ProfilePage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import PersonalityDimensions from "../components/PersonalityDimensions";
import ProfileCard from "../components/ProfileCard";
import PersonalityInsights from "../components/PersonalityInsights";
import api from "../lib/api";
import { usePersonality } from "../context/PersonalityStore";
import { BarChart2 } from "lucide-react";
import PERSONALITY_FULL_RESOLVED from "../lib/personality_full_data";

export default function ProfilePage() {
  const navigate = useNavigate();
  const { result } = usePersonality(); // ✅ from context
  
  const [personality, setPersonality] = useState(null);
  const [career, setCareer] = useState(null);
  const [therapy, setTherapy] = useState(null);
  const [loading, setLoading] = useState(true); // <-- added
  // normalize type to uppercase (safety)
  const typeKey = result?.type?.toUpperCase();
  const type = typeKey;

  useEffect(() => {
    if (!type) {
      navigate("/quiz"); // no result yet → go take quiz
      return;
    }

    let mounted = true;

    async function load() {
      setLoading(true);
      try {
        const [pRes, cRes, tRes] = await Promise.all([
          api.get(`/api/personality/${type}`),
          api.get(`/api/career/${type}`),
          api.get(`/api/therapy/${type}`),
        ]);

        if (!mounted) return;

        // local fallback from your personality_full_data
        const local = PERSONALITY_FULL_RESOLVED[type] || {};

        // Merge: local as baseline, API override if available
        const mergedPersonality = {
          ...local,
          ...(pRes?.data || {}),
        };

        // ---- ADD THESE LOGS HERE ----
console.log("local (from personality_full_data):", local);
console.log("mergedPersonality:", mergedPersonality);
console.log("mergedPersonality.famous:", mergedPersonality.famous);
// --------------------------------

        setPersonality(mergedPersonality);
        setCareer(cRes?.data || null);
        setTherapy(tRes?.data || null);
      } catch (e) {
        console.error("Profile data fetch failed:", e);
        // If API fails, fall back to local data so UI still shows meaningful content
        if (mounted) {
          const local = PERSONALITY_FULL_RESOLVED[type] || {};
          setPersonality(local);
          setCareer(null);
          setTherapy(null);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, [type, navigate]);


  // if user opens /profile without a quiz result
  if (!result) {
    return (
      <div className="min-h-screen bg-[#2D232E] text-[#FDEFF4] flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-lg">No personality result found yet.</p>
          <Button onClick={() => navigate("/quiz")}>Go take the quiz</Button>
        </div>
      </div>
    );
  }

    // optional: simple loading state UI
  if (loading && !personality) {
    return (
      <div className="min-h-screen bg-[#2D232E] text-[#FDEFF4] flex items-center justify-center">
        <div className="text-center">
          <p className="mb-4">Loading profile…</p>
          <div className="inline-block h-6 w-6 border-4 border-t-transparent rounded-full animate-spin border-[#CFA4A8]" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 p-10 pt-24 min-h-screen bg-[#2D232E] text-[#FDEFF4]">
      {/* LEFT: profile card */}
      <ProfileCard result={result} personality={personality} />

      {/* MIDDLE: personality breakdown bars */}
      <div className="w-full lg:w-1/3 bg-[#3A2C31] border border-[#6C5456] p-8 rounded-3xl shadow-[0_0_25px_rgba(0,0,0,0.35)]">
        <h2 className="text-3xl font-semibold mb-6 flex items-center gap-2 text-[#D8B4B8]">
          <BarChart2 className="w-6 h-6 text-[#D8B4B8]" /> Personality Breakdown
        </h2>

        <PersonalityDimensions breakdown={result.breakdown} />

        {/* Subscribe box */}
        <div className="mt-8 p-6 bg-[rgba(207,164,168,0.12)] border border-[rgba(207,164,168,0.25)] rounded-2xl text-center">
          <h3 className="text-xl font-semibold text-[#D8B4B8]">
            Unlock Full Insights
          </h3>
          <p className="text-sm mt-2 text-[#FDEFF4]/70">
            Access deeper explanations, compatibility mapping, career paths, and more.
          </p>

          <Button className="mt-4 w-full py-3 rounded-xl bg-[#CFA4A8] text-[#3A2C31] font-medium hover:bg-[#B7898E] transition-all">
            Subscribe to unlock more insights
          </Button>
        </div>
      </div>

      {/* RIGHT: scrollable insights section */}
      <PersonalityInsights
        personality={personality}
        career={career}
        therapy={therapy}
      />
    </div>
  );
}
