import React from "react";

const steps = [
  { n: "01", title: "Begin",        desc: "Start a gentle, judgment-free quiz." },
  { n: "02", title: "Respond",      desc: "Choose Agree ↔ Disagree honestly." },
  { n: "03", title: "Signals",      desc: "Timing & hesitation add depth." },
  { n: "04", title: "Processing",   desc: "Your core traits begin to form." },
  { n: "05", title: "Your Type",    desc: "Clear trait bars & explanation." },
  { n: "06", title: "Share",        desc: "Save your profile or share it." },
];

// subtle gradients for cards (like the mock)
const swatches = [
  "from-[#FFE9D9] to-[#FFF5EE]",
  "from-[#DDE6FF] to-[#F0F4FF]",
  "from-[#EEDBFF] to-[#F7F0FF]",
  "from-[#FFE8D6] to-[#FFF4EA]",
  "from-[#DDE8FF] to-[#EEF4FF]",
  "from-[#EAD9FF] to-[#F6F0FF]",
];

// pin colors (with light drop shadow)
const pins = ["#FF7A3D", "#5B79FF", "#6A4DFF", "#FF7A3D", "#5B79FF", "#6A4DFF"];

export default function HowItWorksSticky() {
  return (
    <section
  className="relative py-16 md:py-24 overflow-hidden"
  style={{ background: "#3C2F2F10" }}   // 6% opacity warm brown
>

      <div className="absolute inset-0 pointer-events-none paper-lines" />

      <div className="relative max-w-5xl mx-auto px-5 md:px-8">
        <header className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#DCC7AA]">
            How <span className="text-[#F4B8C0]">Personify</span> Works
          </h2>
          <p className="text-[#5b5b5b] mt-3">
            A friendly 6-step flow from first question to a clear result.
          </p>
        </header>

        {/* grid: 2 columns, alternating left/right cards */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-y-16 md:gap-y-24">
          {steps.map((s, i) => {
            const leftCol = i % 2 === 0; // even index on left
            const tilt = leftCol ? "-rotate-[3deg]" : "rotate-[3deg]";
            const pinColor = pins[i];
            const grad = swatches[i % swatches.length];

            return (
              <div
                key={s.n}
                className={`relative ${leftCol ? "md:pr-10" : "md:pl-10"}`}
              >
                {/* sticky note */}
                <div
                  className={`relative ${tilt} note-shadow bg-white rounded-3xl`}
                >
                  {/* gradient panel like the mock */}
                  <div
                    className={`absolute right-6 top-6 h-[110px] w-[68%] rounded-2xl bg-gradient-to-br ${grad} opacity-90`}
                  />

                  {/* content */}
                  <div className="relative p-6 md:p-7">
                    <div className="text-sm font-semibold tracking-wider text-[#a87] mb-2">
                      {s.n}
                    </div>
                    <h3 className="text-xl md:text-2xl font-semibold text-[#1f1f1f] mb-2">
                      {s.title}
                    </h3>
                    <p className="text-[#4b4b4b] leading-relaxed">
                      {s.desc}
                    </p>
                  </div>

                  {/* pin */}
                  <div
                    className={`absolute -top-4 ${leftCol ? "left-8" : "right-8"}`}
                  >
                    <div
                      className="h-8 w-8 rounded-full"
                      style={{
                        background: `radial-gradient(circle at 30% 30%, #fff 0%, ${pinColor} 60%)`,
                        boxShadow:
                          "0 6px 14px rgba(0,0,0,.15), inset 0 -2px 6px rgba(0,0,0,.12)",
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}

          {/* dashed curved connectors (SVG). Hidden on small screens */}
          <svg
            className="hidden md:block absolute inset-0 pointer-events-none"
            width="100%"
            height="100%"
          >
            {/* 0 → 1 */}
            <path
              d="M 38% 8% C 55% 10%, 58% 18%, 72% 18%"
              className="flow-curve"
            />
            {/* 1 → 2 */}
            <path
              d="M 62% 26% C 40% 32%, 38% 40%, 28% 44%"
              className="flow-curve"
            />
            {/* 2 → 3 */}
            <path
              d="M 38% 58% C 55% 60%, 58% 66%, 72% 66%"
              className="flow-curve"
            />
            {/* 3 → 4 */}
            <path
              d="M 62% 74% C 40% 80%, 38% 88%, 28% 92%"
              className="flow-curve"
            />
            {/* 4 → 5 */}
            <path
              d="M 38% 106% C 55% 108%, 58% 114%, 72% 114%"
              className="flow-curve"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
