import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-6 text-center">
      <p className="text-sm">
        © {new Date().getFullYear()} Personify — Know Yourself Better 🌱
      </p>
    </footer>
  );
}
