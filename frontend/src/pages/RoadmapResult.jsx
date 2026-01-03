import React, { useState } from "react";

export default function RoadmapResult({ careerData }) {
  const [data, setData] = useState([]);
  const [roadmap, setRoadmap] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRoadmap = async () => {
    if (!careerData) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/api/roadmap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(careerData),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || `Server error ${response.status}`);
      }

      const result = await response.json();
      setRoadmap(result.roadmap); // ✅ STORE FULL ROADMAP

      const phases =
        Array.isArray(result?.phases) && result.phases.length > 0
          ? result.phases
          : null;

      setData(
        phases ||
          [
            {
              title: "Foundation Phase",
              duration: "0–3 months",
              steps: [
                "Strengthen fundamentals",
                "Create a small portfolio or sample work",
                "Study 30–60 mins daily",
              ],
            },
            {
              title: "Skill Growth Phase",
              duration: "3–6 months",
              steps: [
                "Work on real-world projects",
                "Join communities / networking groups",
                "Refine problem-solving skills",
              ],
            },
            {
              title: "Career Launch",
              duration: "6–12 months",
              steps: [
                "Apply for internships / roles",
                "Prepare resume & portfolio",
                "Seek mentorship & feedback",
              ],
            },
          ]
      );
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

const downloadPdf = async () => {
  if (!roadmap) return;

  try {
    const res = await fetch("http://localhost:5000/api/roadmap/pdf", {
      method: "POST",
      headers: { "Content-Type": "application/json" },

      // ✅ SEND EXACT SAME ROADMAP USED IN UI
      body: JSON.stringify({
        roadmap: roadmap,
      }),
    });

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${roadmap.mbti}_${roadmap.career}_Roadmap.pdf`;
    a.click();

    window.URL.revokeObjectURL(url);
  } catch (err) {
    console.error("PDF download failed:", err);
  }
};


  return (
    <div
      className="min-h-screen flex flex-col items-center pt-24 p-4"
      style={{
        backgroundImage: `url('/src/assets/images/bg.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#2B1F24",
      }}
    >
      {/* 🟣 Blur is ONLY inside the card (Navbar stays visible) */}
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 text-white shadow-2xl">
        <h1 className="text-3xl font-bold text-[#F7A9B8] text-center mb-4">
          Your Personalized Roadmap
        </h1>

        <button
          type="button"
          onClick={fetchRoadmap}
          disabled={loading}
          className="w-full bg-[#F7A9B8] text-[#2B1F24] font-semibold rounded-xl py-3
                     hover:bg-[#F4A7B3] transition disabled:opacity-60"
        >
          {loading ? "Generating..." : "Generate Roadmap"}
        </button>

        {error && (
          <p className="text-red-400 text-center mt-3">
            ⚠️ {error} — check backend logs
          </p>
        )}

        {!loading && !error && data.length === 0 && (
          <p className="text-gray-300 text-center mt-3">
            Click “Generate Roadmap” to see your plan.
          </p>
        )}

        {/* ----------- ROADMAP WITH PROGRESS UI ----------- */}
        {!loading && !error && data.length > 0 && (
          <div className="space-y-6 mt-6">
            {data.map((phase, idx) => {
              const progressSteps = [33, 66, 100];
              const progress = progressSteps[idx] ?? 0;

              return (
                <React.Fragment key={idx}>
                  <div className="bg-white/10 border border-white/20 rounded-2xl p-5 shadow-lg backdrop-blur-md">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-lg font-semibold text-[#F7A9B8]">
                        {phase.title}
                      </h3>

                      {phase.duration && (
                        <span className="text-xs text-gray-300">
                          {phase.duration}
                        </span>
                      )}
                    </div>

                    <div className="w-full bg-white/20 rounded-full h-2 mb-3">
                      <div
                        className="h-2 rounded-full bg-[#F7A9B8]"
                        style={{ width: `${progress}%` }}
                      />
                    </div>

                    {Array.isArray(phase.steps) && (
                      <ul className="mt-2 space-y-2 text-gray-200 text-sm">
                        {phase.steps.map((step, i) => (
                          <li key={i} className="flex gap-2 items-start">
                            <span className="text-[#F7C7B6]">•</span>
                            {step}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {idx < data.length - 1 && (
                    <div className="flex justify-center">
                      <div className="w-1 h-7 bg-white/25 rounded-full" />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        )}

        <button
          type="button"
          onClick={() => window.location.reload()}
          className="w-full mt-6 bg-[#F7A9B8] text-[#2B1F24] font-semibold rounded-xl py-3 hover:bg-[#F4A7B3] transition"
        >
          Back to Form
        </button>

        <button
          onClick={downloadPdf}
          className="w-full mt-4 bg-[#CFA4A8] text-[#2B1F24] font-semibold rounded-xl py-3 hover:bg-[#B7898E] transition"
        >
          📄 Download PDF Roadmap
        </button>
      </div>
    </div>
  );
}