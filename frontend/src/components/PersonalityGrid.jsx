import React from "react";
import { motion } from "framer-motion";

// All 16 MBTI personality types
const personalityTypes = [
  { type: "INFP", title: "The Mediator", blurb: "Idealistic, creative, and empathetic." },
  { type: "INFJ", title: "The Advocate", blurb: "Insightful, principled, and passionate about helping others." },
  { type: "INTP", title: "The Thinker", blurb: "Curious, analytical, and independent-minded." },
  { type: "INTJ", title: "The Architect", blurb: "Strategic, rational, and visionary." },
  { type: "ENFP", title: "The Campaigner", blurb: "Enthusiastic, curious, and sociable." },
  { type: "ENFJ", title: "The Protagonist", blurb: "Charismatic, inspiring, and deeply empathetic." },
  { type: "ENTP", title: "The Debater", blurb: "Quick-witted, bold, and loves a challenge." },
  { type: "ENTJ", title: "The Commander", blurb: "Strategic, decisive, and bold." },
  { type: "ISFJ", title: "The Protector", blurb: "Loyal, practical, and caring." },
  { type: "ISFP", title: "The Adventurer", blurb: "Gentle, creative, and free-spirited." },
  { type: "ISTJ", title: "The Logistician", blurb: "Responsible, organized, and dependable." },
  { type: "ISTP", title: "The Virtuoso", blurb: "Practical, hands-on, and action-oriented." },
  { type: "ESFJ", title: "The Consul", blurb: "Warm, caring, and socially aware." },
  { type: "ESFP", title: "The Entertainer", blurb: "Energetic, spontaneous, and playful." },
  { type: "ESTJ", title: "The Executive", blurb: "Efficient, structured, and confident." },
  { type: "ESTP", title: "The Entrepreneur", blurb: "Bold, adaptable, and loves excitement." },
];

// Warm pastel colors (matches testimonial tones)
const cardColors = [
  "bg-[#F4B8C0]", // blush pink
  "bg-[#DCC7AA]", // warm sand
  "bg-[#4A8C8C]", // muted teal
  "bg-[#F9DCDC]", // pale pink
  "bg-[#F7F4F1]", // soft cream
];

export default function PersonalityGrid({ page = 0 }) {
  const itemsPerPage = 4;
  const startIndex = page * itemsPerPage;
  const visible = personalityTypes.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {visible.map((p, i) => (
        <motion.div
          key={p.type}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08 }}
          viewport={{ once: true }}
          className={`rounded-2xl p-6 shadow-md text-[#3C2F2F] ${
            cardColors[i % cardColors.length]
          } bg-opacity-90 hover:shadow-xl hover:scale-105 transition-all duration-300 border border-white/50 backdrop-blur-sm`}
        >
          <div className="text-3xl font-bold mb-2 drop-shadow-sm">{p.type}</div>
          <div className="text-base font-semibold mb-1">{p.title}</div>
          <p className="text-sm opacity-90 leading-relaxed">{p.blurb}</p>
        </motion.div>
      ))}
    </div>
  );
}