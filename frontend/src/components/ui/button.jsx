import React from "react";

export function Button({
  children,
  onClick,
  type = "button",
  className = "",
  variant = "pink",
}) {
  const baseStyles =
    "px-4 py-2 rounded-full font-medium transition-all duration-300";

  const variants = {
    // ✅ Light pink (Career Counseling)
    pink:
      "bg-[#F7A8B8] text-[#3A2C31] shadow-[inset_0_-3px_6px_rgba(0,0,0,0.15),0_3px_8px_rgba(0,0,0,0.25)] " +
      "hover:bg-[#F4A0AF] hover:shadow-[inset_0_-4px_8px_rgba(0,0,0,0.20),0_4px_10px_rgba(0,0,0,0.3)]",

    // ✅ Darker pink (Personalized Therapy)
    pinkDark:
      "bg-[#EE8FA4] text-[#3A2C31] shadow-[inset_0_-3px_6px_rgba(0,0,0,0.18),0_3px_8px_rgba(0,0,0,0.25)] " +
      "hover:bg-[#E9859A] hover:shadow-[inset_0_-4px_8px_rgba(0,0,0,0.22),0_4px_10px_rgba(0,0,0,0.3)]",

    // ✅ Dark-glass buttons (Share URL / Download JPG)
    glass:
      "bg-[#3A2C31] text-[#FDEFF4]/90 border border-[#A88989]/40 rounded-full " +
      "shadow-[inset_0_0_6px_rgba(255,255,255,0.08),0_2px_6px_rgba(0,0,0,0.25)] " +
      "hover:bg-[#4A3A3F] hover:shadow-[inset_0_0_8px_rgba(255,255,255,0.12),0_3px_8px_rgba(0,0,0,0.3)]",

    // ✅ Transparent pink (Edit Photo)
    softPink:
      "bg-[#F7A8B8]/20 text-[#F7A8B8] border border-[#F7A8B8]/40 rounded-full " +
      "hover:bg-[#F7A8B8]/30 hover:border-[#F7A8B8]/60",

    // fallback
    default: "bg-[#444] text-white",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant] || variants.default} ${className}`}
    >
      {children}
    </button>
  );
}
