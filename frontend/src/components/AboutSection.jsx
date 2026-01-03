import React from "react";
import { motion } from "framer-motion";
import blob1 from "../assets/images/bg.jpg";
import blob2 from "../assets/images/bg.jpg";
import blob3 from "../assets/images/bg.jpg";


export default function AboutSection() {
  return (
    <section className="relative -mt-32 md:-mt-14 px-6 text-[#F7F4F1] flex justify-center overflow-visible z-20 bg-transparent">



      {/* Soft ambient background glow */}
      {/* <div className="absolute inset-0 bg-gradient-to-b from-[#4A8C8C]/20 via-transparent to-[#DCC7AA]/10 pointer-events-none opacity-30" /> */}

      {/* ========= GLASSMORPHISM CARD ========= */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="
          relative max-w-5xl w-full 
          p-12 md:p-16 
          rounded-3xl 
          backdrop-blur-2xl 
          bg-white/8 
          border border-white/15 
          shadow-[0_0_50px_rgba(255,255,255,0.12)] 
        "
      >

        {/* ===== Floating Glass Blobs INSIDE the card ===== */}

    {/* Blob 1 with image */}
<motion.div
  className="absolute w-40 h-40 rounded-3xl overflow-hidden backdrop-blur-xl border border-white/20"
  animate={{ y: [0, -18, 0], opacity: [0.8, 1, 0.8] }}
  transition={{ duration: 6, repeat: Infinity, repeatType: "mirror" }}
  style={{ top: "-20px", left: "-20px" }}
>
  <img 
    src={blob1} 
    alt="" 
    className="w-full h-full object-cover opacity-80"
  />
</motion.div>

{/* Blob 2 with image */}
<motion.div
  className="absolute w-56 h-56 rounded-3xl overflow-hidden backdrop-blur-xl border border-white/20"
  animate={{ y: [0, -24, 0], scale: [1, 1.05, 1] }}
  transition={{ duration: 7, repeat: Infinity, repeatType: "mirror" }}
  style={{ top: "20%", right: "-30px" }}
>
  <img 
    src={blob2} 
    alt="" 
    className="w-full h-full object-cover opacity-80"
  />
</motion.div>

{/* Blob 3 with image */}
<motion.div
  className="absolute w-36 h-36 rounded-3xl overflow-hidden backdrop-blur-xl border border-white/20"
  animate={{ y: [0, -14, 0], opacity: [1, 0.9, 1] }}
  transition={{ duration: 5.5, repeat: Infinity, repeatType: "mirror" }}
  style={{ bottom: "-25px", left: "25%" }}
>
  <img 
    src={blob3} 
    alt="" 
    className="w-full h-full object-cover opacity-80"
  />
</motion.div>



        {/* ========= TEXT INSIDE GLASS PANEL ========= */}
        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">

          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#DCC7AA] drop-shadow-lg">
            ABOUT PERSONIFY
          </h2>

          <p className="text-lg leading-relaxed text-[#F7F4F1]/90">
            <span className="text-[#DCC7AA] font-semibold">Personify</span> blends a 
            psychometric quiz with soft behavioral signals—hesitation, speed,
            confidence—to form a beautifully accurate picture of who you are.
          </p>

          <p className="text-[#F7F4F1]/80 leading-relaxed mx-auto max-w-xl">
            Every part of the experience is crafted to feel warm, emotional, 
            and deeply human. A space where self-discovery feels gentle and luxurious.
          </p>

        </div>

      </motion.div>
    </section>
  );
}
