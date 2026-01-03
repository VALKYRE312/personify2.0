import React from "react";
import PersonalityBar from "./PersonalityBar";

const TRAIT_CONFIG = [
  {
    key: "Energy",
    leftKey: "E",
    rightKey: "I",
    leftLabel: "Extraverted",
    rightLabel: "Introverted",
    color: "#3AA6A6",
  },
  {
    key: "Mind",
    leftKey: "N",
    rightKey: "S",
    leftLabel: "Intuitive",
    rightLabel: "Observant",
    color: "#D7A33A",
  },
  {
    key: "Nature",
    leftKey: "T",
    rightKey: "F",
    leftLabel: "Thinking",
    rightLabel: "Feeling",
    color: "#5EB26E",
  },
  {
    key: "Tactics",
    leftKey: "J",
    rightKey: "P",
    leftLabel: "Judging",
    rightLabel: "Prospecting",
    color: "#A06ACB",
  },
];

export default function PersonalityDimensions({ breakdown }) {
  if (!breakdown) return null;

  return (
    <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-[#DCC7AA]/20 shadow-lg">
      <h3 className="text-lg font-semibold mb-4 text-[#DCC7AA]">
        Your Personality Dimensions
      </h3>

      {TRAIT_CONFIG.map((trait) => {
        const data = breakdown[trait.key];
        if (!data) return null;

        const leftValue = data[trait.leftKey] ?? 0;
        const rightValue = data[trait.rightKey] ?? 0;

        return (
          <PersonalityBar
            key={trait.key}
            title={trait.key}
            leftLabel={trait.leftLabel}
            rightLabel={trait.rightLabel}
            leftValue={leftValue}
            rightValue={rightValue}
            color={trait.color}
          />
        );
      })}
    </div>
  );
}
