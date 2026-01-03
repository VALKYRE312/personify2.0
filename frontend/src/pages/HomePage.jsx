import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import billie from "../assets/images/bg.jpg";
import PersonalityGrid from "../components/PersonalityGrid";
import HowItWorksSticky from "../components/HowItWorks";
import AboutSection from "../components/AboutSection";


export default function HomePage() {
  const [vh, setVh] = useState(
    typeof window !== "undefined" ? window.innerHeight : 800
  );

  // Pagination for personality types
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(16 / 4);

  const handleNext = () => setPage((prev) => (prev + 1) % totalPages);
  const handlePrev = () => setPage((prev) => (prev - 1 + totalPages) % totalPages);

  useEffect(() => {
    const onResize = () => setVh(window.innerHeight);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Testimonials
  const testimonials = [
    {
      name: "Olivia Richardson",
      location: "New York, USA",
      text: "I loved how clear and pretty the results were — felt very personal!",
      initials: "OR",
    },
    {
      name: "Sophia Mitchell",
      location: "London, UK",
      text: "Fast and accurate. The visuals helped me understand my traits quickly.",
      initials: "SM",
    },
    {
      name: "Aisha Khan",
      location: "London, UK",
      text: "Simple quiz but the insights were thoughtful. Great design too!",
      initials: "AK",
    },
    {
      name: "Emily Sanders",
      location: "Sydney, Australia",
      text: "Simple quiz but the insights were thoughtful. Great design too!",
      initials: "ES",
    },
    {
      name: "Priya Deshmukh",
      location: "Mumbai, India",
      text: "Fast and accurate. The visuals helped me understand my traits quickly.",
      initials: "PD",
    },
    {
      name: "Mia Lawrence",
      location: "Toronto, Canada",
      text: "I loved how clear and pretty the results were — felt very personal!",
      initials: "ML",
    },
  ];

  const duplicated = [...testimonials, ...testimonials];

  const bgColors = [
    "bg-red-400",
    "bg-blue-400",
    "bg-yellow-300",
    "bg-green-400",
    "bg-violet-400",
    "bg-red-300",
  ];

  return (
    <div className="home-root font-inter">

      {/* ================= HERO ================= */}
      <header className="relative h-screen w-full overflow-hidden">
        <img
          src={billie}
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-[rgba(60,47,47,0.65)]" />

        <div
          className="relative z-10 flex flex-col items-center justify-center text-center px-6"
          style={{ minHeight: vh }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 text-[#F7F4F1]"
          >
            Discover Your True Personality
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.7 }}
            className="text-base md:text-lg max-w-2xl mb-8 text-[#F7F4F1]/90"
          >
            Gentle, visual, and deeply accurate — take a short quiz and uncover
            what makes you, you.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.7 }}
          >
            <Link
              to="/quiz"
              className="px-8 py-3 rounded-full text-lg font-semibold shadow-md transition bg-[#DCC7AA] text-[#3C2F2F] hover:bg-[#4A8C8C] hover:text-[#F7F4F1]"
            >
              Start the Quiz
            </Link>
          </motion.div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[#F7F4F1]/80 text-sm select-none">
          Scroll to explore ↓
        </div>
      </header>

      {/* ================= PAGE CONTENT ================= */}
      <main className="bg-[#3C2F2F] text-[#F7F4F1]">

        {/* ====== ABOUT ====== */}
        <AboutSection />

        {/* ====== HOW IT WORKS (sticky notes) ====== */}
        <HowItWorksSticky />

        {/* ====== PERSONALITY TYPES ====== */}
        <section className="py-20 px-6 bg-[#4A8C8C]/10">
          <div className="max-w-6xl mx-auto mb-10 relative flex items-center justify-center text-center">
            <button
              onClick={handlePrev}
              className="absolute left-0 md:-left-10 text-[#DCC7AA] hover:text-[#F7F4F1] text-3xl"
            >
              ←
            </button>

            <div>
              <h3 className="text-3xl font-semibold text-[#DCC7AA]">
                Personality Types
              </h3>
              <p className="text-[#F7F4F1]/80 max-w-2xl mx-auto mt-3">
                Explore all 16 unique personality archetypes.
              </p>
            </div>

            <button
              onClick={handleNext}
              className="absolute right-0 md:-right-10 text-[#DCC7AA] hover:text-[#F7F4F1] text-3xl"
            >
              →
            </button>
          </div>

          <div className="max-w-6xl mx-auto px-4">
            <PersonalityGrid page={page} />
          </div>
        </section>

        {/* ====== TESTIMONIALS ====== */}
        <section className="py-20 px-6 bg-[#3C2F2F]/90">
          <div className="max-w-6xl mx-auto text-center mb-10">
            <h3 className="text-3xl font-semibold text-[#DCC7AA]">What People Say</h3>
            <p className="text-[#F7F4F1]/80 max-w-2xl mx-auto mt-3">
              See how others describe their experience.
            </p>
          </div>

          {/* Two rows of infinite scroll */}
          <div className="space-y-3">

            {/* Row A */}
            <div className="overflow-hidden">
              <div
                className="flex gap-4 items-stretch"
                style={{ animation: "scrollA 60s linear infinite" }}
              >
                {duplicated.map((t, idx) => (
                  <article
                    key={`a-${idx}`}
                    className={`min-w-[300px] max-w-xs rounded-2xl p-4 shadow-md text-black ${bgColors[idx % bgColors.length]}`}
                  >
                    <p className="text-sm leading-relaxed mb-3">{t.text}</p>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center font-medium">
                        {t.initials}
                      </div>
                      <div>
                        <div className="text-sm font-semibold">{t.name}</div>
                        <div className="text-xs opacity-90">{t.location}</div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Row B */}
            <div className="overflow-hidden">
              <div
                className="flex gap-4 items-stretch"
                style={{ animation: "scrollB 70s linear infinite reverse" }}
              >
                {duplicated.map((t, idx) => (
                  <article
                    key={`b-${idx}`}
                    className={`min-w-[300px] max-w-xs rounded-2xl p-4 shadow-md text-black ${bgColors[(idx + 2) % bgColors.length]}`}
                  >
                    <p className="text-sm leading-relaxed mb-3">{t.text}</p>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center font-medium">
                        {t.initials}
                      </div>
                      <div>
                        <div className="text-sm font-semibold">{t.name}</div>
                        <div className="text-xs opacity-90">{t.location}</div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

          </div>

          <style>{`
            @keyframes scrollA {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            @keyframes scrollB {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
          `}</style>
        </section>
      </main>
    </div>
  );
}
