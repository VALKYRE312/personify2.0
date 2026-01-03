import React, { useState } from "react";
import { motion } from "framer-motion";

export default function FlipCard({ front, back, height = "h-80" }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className={`relative w-full ${height} cursor-pointer perspective`}
      onClick={() => setFlipped(!flipped)}
    >
      {/* Inner wrapper for flip */}
      <motion.div
        className="relative w-full h-full preserve-3d transition-transform duration-700"
        animate={{ rotateY: flipped ? 180 : 0 }}
      >
        {/* FRONT */}
        <div className="absolute inset-0 backface-hidden">
          {front}
        </div>

        {/* BACK */}
        <div className="absolute inset-0 backface-hidden rotate-y-180">
          <div className="
            w-full h-full
            backdrop-blur-xl bg-white/20
            border border-white/30
            rounded-xl shadow-lg
            p-5 flex flex-col items-start justify-center text-white
          ">
            {back}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
