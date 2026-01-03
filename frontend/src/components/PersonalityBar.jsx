import React from "react";

export default function PersonalityBar({
  title,
  leftLabel,
  rightLabel,
  leftValue,
  rightValue,
  color = "#4A8C8C",
}) {
  // assume leftValue + rightValue ≈ 100
  const total = leftValue + rightValue || 1;
  const rightPercent = (rightValue / total) * 100;

  const isRightDominant = rightValue >= leftValue;
  const dominantLabel = isRightDominant ? rightLabel : leftLabel;
  const dominantPercent = Math.round(
    (Math.max(leftValue, rightValue) / total) * 100
  );

  return (
    <div className="w-full mb-6">
      {/* Title + dominant side, like "58% Introverted" */}
      <h3 className="text-center mb-2 font-semibold" style={{ color }}>
        {dominantPercent}% {dominantLabel}
      </h3>

      {/* Full bar */}
      <div className="relative w-full h-3 rounded-full bg-white/20 overflow-visible">
        {/* Colored background like 16personalities */}
        <div
          className="absolute inset-0"
          style={{ backgroundColor: color, opacity: 0.7,
      zIndex: 1 }}
        />
        {/* Marker dot */}
<div
  className="absolute rounded-full"
  style={{
    width: "16px",
    height: "16px",
    top: "50%",
    left: `calc(${rightPercent}% - 8px)`,
    transform: "translateY(-50%)",
    border: "3px solid white",    // <--- white ring
    backgroundColor: "transparent", // <--- hollow circle
    zIndex: 10,
  }}
/>


      </div>

      {/* Left / Right labels */}
      <div className="flex justify-between text-sm opacity-80 mt-1">
        <span>{leftLabel}</span>
        <span>{rightLabel}</span>
      </div>
    </div>
  );
}
