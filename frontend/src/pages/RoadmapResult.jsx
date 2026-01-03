import React from "react";

export default function RoadmapResult({ roadmap }) {
  if (!roadmap) return null;

  const data = roadmap.phases.map((p) => ({
    title: p.phase,
    duration: p.duration,
    steps: p.focus,
    narrative: p.narrative,
  }));

  const downloadPdf = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/roadmap/pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roadmap }),
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
    <div className="min-h-screen flex flex-col items-center pt-24 p-4 bg-[#2B1F24]">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 text-white shadow-2xl">
        <h1 className="text-3xl font-bold text-[#F7A9B8] text-center mb-6">
          Your Personalized Roadmap
        </h1>

        <div className="space-y-6">
          {data.map((phase, idx) => (
            <div
              key={idx}
              className="bg-white/10 border border-white/20 rounded-2xl p-5 shadow-lg"
            >
              <div className="flex justify-between mb-2">
                <h3 className="text-lg font-semibold text-[#F7A9B8]">
                  {phase.title}
                </h3>
                <span className="text-xs text-gray-300">
                  {phase.duration}
                </span>
              </div>

              <ul className="space-y-2 text-sm text-gray-200">
                {phase.steps.map((s, i) => (
                  <li key={i}>• {s}</li>
                ))}
              </ul>

              {phase.narrative && (
                <p className="mt-3 text-gray-300 italic text-sm">
                  {phase.narrative}
                </p>
              )}
            </div>
          ))}
        </div>

        <button
          onClick={downloadPdf}
          className="w-full mt-6 bg-[#CFA4A8] text-[#2B1F24] font-semibold rounded-xl py-3 hover:bg-[#B7898E]"
        >
          📄 Download PDF Roadmap
        </button>
      </div>
    </div>
  );
}
