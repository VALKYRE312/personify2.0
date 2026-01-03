import React from "react";
import { motion } from "framer-motion";

const TESTIMONIALS = [
  {
    name: "Aisha",
    text: "I loved how clear and pretty the results were — felt very personal!",
  },
  {
    name: "Ravi",
    text: "Fast and accurate. The visuals helped me understand my traits quickly.",
  },
  {
    name: "Nina",
    text: "Simple quiz but the insights were thoughtful. Great design too!",
  },
];

export default function Testimonials() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {TESTIMONIALS.map((t, i) => (
        <motion.blockquote
          key={t.name}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08 }}
          viewport={{ once: true }}
          className="bg-white/75 backdrop-blur-md border border-gray-100 rounded-2xl p-6 shadow-sm"
        >
          <p className="text-gray-700 mb-4">“{t.text}”</p>
          <div className="text-sm font-semibold text-gray-800">— {t.name}</div>
        </motion.blockquote>
      ))}
    </div>
  );
}