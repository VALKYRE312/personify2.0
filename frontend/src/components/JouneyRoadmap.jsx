import React from "react";

export default function JourneyRoadmap({ phases = [] }) {
  return (
    <div className="relative w-full max-w-4xl mx-auto mt-10">

      {/* Soft glow bg */}
      <div className="absolute inset-0 blur-3xl opacity-40 bg-gradient-to-b from-pink-300/30 via-purple-300/20 to-blue-300/20 rounded-[40px]" />

      <div className="relative bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[32px] p-10 shadow-2xl">

        <h2 className="text-3xl font-bold text-center text-[#F7C7D0] mb-8 tracking-wide">
          Your Growth Journey
        </h2>

        {/* Curved Path */}
        <svg className="absolute left-1/2 -translate-x-1/2 top-24" width="620" height="360">
          <path
            d="M 40 60 C 180 10, 340 10, 520 60
               S 520 180, 320 220
               S 140 300, 40 260"
            stroke="rgba(255,200,220,0.7)"
            strokeWidth="3"
            strokeDasharray="6 8"
            fill="none"
          />
        </svg>

        {/* Journey Nodes + Cards */}
        <div className="relative mt-6">
          {phases.map((phase, i) => {
            const leftSide = i % 2 === 0;

            return (
              <div key={i} className="relative flex items-center my-10">

                {/* Node */}
                <div className="journey-node absolute left-1/2 -translate-x-1/2 z-20">
                  <div className="w-10 h-10 rounded-full bg-pink-300/60 border border-white/50 shadow-[0_0_18px_rgba(255,170,200,.6)] flex items-center justify-center">
                    <span className="text-white text-lg">✨</span>
                  </div>
                </div>

                {/* Card */}
                <div className={`w-[48%] ${leftSide ? "text-right pr-6" : "text-left pl-6"} ${leftSide ? "-ml-[52%]" : "ml-[52%]"}`}>
                  <div className="
                    bg-white/15 border border-white/30 
                    rounded-2xl p-4 shadow-lg
                    hover:bg-white/20 hover:scale-[1.01]
                    transition
                  ">
                    <p className="text-sm text-green-300 mb-1">
                      Phase {i+1}
                    </p>

                    <h3 className="text-[#FFD2DD] font-semibold">
                      {phase.title}
                    </h3>

                    <p className="text-xs text-gray-300 mb-2">
                      {phase.duration}
                    </p>

                    <ul className="text-gray-200 text-sm space-y-1">
                      {phase.steps?.slice(0, 3).map((s, j) => (
                        <li key={j}>• {s}</li>
                      ))}
                    </ul>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-8 flex justify-center">
          <button className="
            px-6 py-3 rounded-xl font-semibold
            bg-[#F7B4C6] text-[#2B1F24]
            hover:bg-[#EFA3B4] transition
          ">
            Continue Your Journey 🚀
          </button>
        </div>
      </div>
    </div>
  );
}