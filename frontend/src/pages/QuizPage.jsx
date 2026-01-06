// src/pages/QuizPage.jsx
import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import { getGuestId } from "../utils/guest";
import api from "../lib/api";

/*
  16 statement-style questions (you can replace / tweak wording later)
*/
const QUESTIONS = [
  // --- E vs I ---
  "I feel drained after socializing for long periods.",
  "I prefer deep one-on-one conversations over group discussions.",
  "I gain energy from being around other people.",
  "I enjoy initiating conversations with strangers.",
  "I need regular alone time to recharge.",
  "I often think before I speak.",

  // --- S vs N ---
  "I focus more on possibilities than current realities.",
  "I prefer ideas and theories over concrete facts.",
  "I notice small details that others miss.",
  "I rely on my imagination more than my senses.",
  "I trust practical experience over abstract concepts.",
  "I tend to think about the future rather than the present moment.",

  // --- T vs F ---
  "I prioritize logic over feelings when making decisions.",
  "I try to avoid hurting others’ feelings, even if it means not being honest.",
  "I often analyze situations objectively.",
  "I am deeply affected by others’ emotions.",
  "I make decisions based on my personal values.",
  "I confront conflicts directly rather than avoid them.",

  // --- J vs P ---
  "I enjoy having everything organized and planned.",
  "I like being spontaneous rather than following a schedule.",
  "I get stressed when plans suddenly change.",
  "I complete tasks well before the deadline.",
  "I prefer keeping my options open instead of committing early.",
  "I adapt quickly when unexpected situations occur.",

  // --- A vs T (Identity) ---
  "I remain calm even under immense pressure.",
  "I often doubt my abilities or decisions.",
  "I seek constant self-improvement.",
  "I worry about how others perceive me.",
  "I handle criticism without getting defensive.",
  "I get overwhelmed easily in chaotic environments."
];

/* 5-point scale labels (left = disagree, right = agree) */
const SCALE = [
  { value: 1, label: "Strongly disagree" },
  { value: 2, label: "Disagree" },
  { value: 3, label: "Neutral" },
  { value: 4, label: "Agree" },
  { value: 5, label: "Strongly agree" },
];

export default function QuizPage() {
  const navigate = useNavigate();
  const total = QUESTIONS.length;

  const [answers, setAnswers] = useState(() => {
    const init = {};
    for (let i = 0; i < total; i++) init[i] = 0;
    return init;
  });

  const [index, setIndex] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Keyboard shortcuts
  useEffect(() => {
    function onKey(e) {
      if (e.key >= "1" && e.key <= "5") {
        const val = parseInt(e.key, 10);
        handleSelect(index, val);
      } else if (e.key === "ArrowRight" || e.key === "Enter") {
        nextQuestion();
      } else if (e.key === "ArrowLeft") {
        prevQuestion();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, answers]);

  const handleSelect = useCallback((qIdx, val) => {
    setAnswers((prev) => ({ ...prev, [qIdx]: val }));
  }, []);

  const nextQuestion = useCallback(() => {
    if (index < total - 1) setIndex((i) => i + 1);
  }, [index, total]);

  const prevQuestion = useCallback(() => {
    if (index > 0) setIndex((i) => i - 1);
  }, [index]);

  const answeredCount = Object.values(answers).filter((v) => v > 0).length;
  const progressPercent = Math.round((answeredCount / total) * 100);

  async function handleSubmit() {
    setError(null);
    const unanswered = Object.entries(answers).filter(([, v]) => v === 0);
    if (unanswered.length > 0) {
      setError("Please answer all questions before submitting.");
      const firstUnanswered = parseInt(unanswered[0][0], 10);
      setIndex(firstUnanswered);
      return;
    }

    setSubmitting(true);
    try {
const payload = { answers };
const res = await api.post("/api/analyze", payload);

const result = res.data;

// ✅ SAVE RESULT AS GUEST
await api.post("/career/quiz/submit", {
  guest_id: getGuestId(),
  personality_type: result.type,
  career_choice: null, // or selected career later
  result: result
});

// 👉 then go to result page
navigate("/result", { state: { result } });

    } catch (err) {
      console.error(err);
      setError("Failed to analyze — please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const btnBase =
    "px-4 py-2 rounded-full font-medium shadow-md transition focus:outline-none";
  const optionBase =
    "flex-1 text-sm md:text-base px-3 py-2 rounded-full text-center cursor-pointer select-none";

  return (
   <div className="min-h-screen bg-[#3C2F2F] text-[#F7F4F1] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-3xl">
        {/* Progress */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-[#F7F4F1]/90">
              Question <span className="font-semibold">{index + 1}</span> of {total}
            </div>
            <div className="text-sm text-[#F7F4F1]/80">
              {answeredCount}/{total} answered
            </div>
          </div>

          <div className="w-full h-3 bg-[#F7F4F1]/10 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#F4B8C0] to-[#DCC7AA] transition-all"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Question card */}
        <div className="bg-[#4A8C8C]/10 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-[#DCC7AA]/20 shadow-lg">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.98, y: 4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -4 }}
              transition={{
                duration: 0.25,
                ease: "easeInOut",
              }}
            >
              <div className="mb-4">
                <div className="text-sm text-[#DCC7AA] mb-2">Statement</div>
                <h3 className="text-2xl md:text-3xl font-semibold text-[#F7F4F1]">
                  {QUESTIONS[index]}
                </h3>
              </div>

              {/* Options */}
              <div className="mt-6 flex flex-col md:flex-row gap-3">
                {SCALE.map((opt) => {
                  const selected = answers[index] === opt.value;
                  const color = selected
                    ? "bg-[#DCC7AA] text-[#3C2F2F]"
                    : "bg-white/10 text-[#F7F4F1]";
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => handleSelect(index, opt.value)}
                      className={`${optionBase} ${color} ${
                        selected ? "scale-105 shadow-lg" : "hover:bg-white/20"
                      }`}
                      aria-pressed={selected}
                      aria-label={opt.label}
                    >
                      <div className="text-xs md:text-sm opacity-90">
                        {opt.label}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Navigation */}
              <div className="mt-6 flex items-center justify-between gap-3">
                <button
                  onClick={prevQuestion}
                  className={`${btnBase} bg-white/10 text-[#F7F4F1] hover:bg-white/20`}
                  disabled={index === 0}
                >
                  ← Previous
                </button>

                {index < total - 1 ? (
                  <button
                    onClick={nextQuestion}
                    className={`${btnBase} bg-[#DCC7AA] text-[#3C2F2F] hover:bg-[#4A8C8C] hover:text-[#F7F4F1]`}
                  >
                    Next →
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    className={`${btnBase} bg-gradient-to-r from-[#F4B8C0] to-[#DCC7AA] text-[#3C2F2F] hover:from-[#DCC7AA] hover:to-[#4A8C8C]`}
                    disabled={submitting}
                  >
                    {submitting ? "Analyzing..." : "Finish & See Results"}
                  </button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Error + Tips */}
          <div className="mt-4 flex items-center justify-between text-xs text-[#F7F4F1]/80">
            <div>Tip: press 1–5 on your keyboard to answer quickly</div>
            <div className="text-red-300">{error}</div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-6 text-sm text-[#F7F4F1]/80">
          <p>
            Your answers are used only to generate this personality result. No
            personal data is collected.
          </p>
        </div>
      </div>
    </div>
  );
}