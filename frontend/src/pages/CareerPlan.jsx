import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import RoadmapResult from "./RoadmapResult";

export default function CareerPlan() {
  // Read values passed from CareerCounseling
  const [searchParams] = useSearchParams();
  const prefilledCareer = searchParams.get("career") || "";
  const mbtiType = searchParams.get("mbti") || "";

  // Main state
  const [career, setCareer] = useState(prefilledCareer);
  const [status, setStatus] = useState("");
  const [schoolCollege, setSchoolCollege] = useState("");
  const [degree, setDegree] = useState("");
  const [studyField, setStudyField] = useState("");
  const [workingField, setWorkingField] = useState("");
  const [experience, setExperience] = useState("");
  const [financial, setFinancial] = useState("");
  const [country, setCountry] = useState("");
  const [timeCommitment, setTimeCommitment] = useState("");
  const [skills, setSkills] = useState("");

  // 🔑 This is REQUIRED
  const [submittedData, setSubmittedData] = useState(null);

  // ---------------- SUBMIT ----------------
const handleSubmit = async (e) => {
  e.preventDefault();

const formData = {
  mbti: mbtiType,
  career,
  status,
  experience: Number(experience) || 0,
  financial,
  country,
  time_commitment: Number(timeCommitment) || 0,
  skills,
  study_field: studyField,
working_field: workingField,
degree,

  interests: skills ? skills.split(",").map(s => s.trim()) : [],
};


  try {
    const res = await fetch("http://127.0.0.1:5000/api/roadmap", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (!data.success) {
      alert("Failed to generate roadmap");
      return;
    }

    // 🔥 THIS is what RoadmapResult should receive
    setSubmittedData(data.roadmap);
  } catch (err) {
    console.error("Roadmap error:", err);
    alert("Server error");
  }
};


  // ---------------- SHOW ROADMAP ----------------
  if (submittedData) {
    return <RoadmapResult roadmap={submittedData} />;

  }

  // ---------------- FORM UI ----------------
  return (
    <div
      className="min-h-screen flex items-start justify-center pt-20 p-4"
      style={{
        backgroundImage: `url('/src/assets/images/bg.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#2B1F24",
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-lg border border-white/20
                   rounded-3xl p-8 w-full max-w-md text-white
                   space-y-6 shadow-2xl"
      >
        <h1 className="text-3xl font-bold text-[#F7A9B8] text-center mb-4">
          Career Planning Form
        </h1>

        {/* Career */}
        <div className="space-y-1">
          <label className="text-gray-200 font-medium">
            Selected Career (From Counseling)
          </label>
          <input
            type="text"
            value={career}
            onChange={(e) => setCareer(e.target.value)}
            className="bg-white/15 text-white rounded-xl p-3
                       border border-white/30"
          />
        </div>

        {/* Status */}
        <div className="space-y-2">
          <label className="text-gray-200 font-medium">Current Status</label>
          <div className="bg-white/10 p-3 rounded-xl border border-white/20 space-y-2">
            {["Studying", "Working"].map((opt) => (
              <label key={opt} className="flex items-center gap-3">
                <input
                  type="radio"
                  name="status"
                  value={opt}
                  checked={status === opt}
                  onChange={(e) => setStatus(e.target.value)}
                  className="accent-[#F7A9B8] w-5 h-5"
                />
                <span>{opt}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Studying */}
        {status === "Studying" && (
          <div className="space-y-3">
            <select
              value={schoolCollege}
              onChange={(e) => setSchoolCollege(e.target.value)}
              className="bg-white/15 text-white rounded-xl p-3 border border-white/30 w-full"
            >
              <option value="">School or College?</option>
              <option className="text-black" value="School">School</option>
              <option className="text-black" value="College">College</option>
            </select>

            {schoolCollege === "College" && (
              <>
                <select
                  value={degree}
                  onChange={(e) => setDegree(e.target.value)}
                  className="bg-white/15 text-white rounded-xl p-3 border border-white/30 w-full"
                >
                  <option value="">Degree</option>
                  <option className="text-black" value="UG">UG</option>
                  <option className="text-black" value="PG">PG</option>
                </select>

                <input
                  type="text"
                  placeholder="What are you studying?"
                  value={studyField}
                  onChange={(e) => setStudyField(e.target.value)}
                  className="bg-white/15 text-white rounded-xl p-3 border border-white/30 w-full"
                />
              </>
            )}
          </div>
        )}

        {/* Working */}
        {status === "Working" && (
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Which field?"
              value={workingField}
              onChange={(e) => setWorkingField(e.target.value)}
              className="bg-white/15 text-white rounded-xl p-3 border border-white/30 w-full"
            />
            <input
              type="number"
              placeholder="Years of experience"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="bg-white/15 text-white rounded-xl p-3 border border-white/30 w-full"
            />
          </div>
        )}

        {/* Financial */}
        <div className="space-y-2">
          <label className="text-gray-200 font-medium">Financial Stability</label>
          <div className="bg-white/10 p-3 rounded-xl border border-white/20 space-y-2">
            {["Low", "Medium", "High"].map((opt) => (
              <label key={opt} className="flex items-center gap-3">
                <input
                  type="radio"
                  name="financial"
                  value={opt}
                  checked={financial === opt}
                  onChange={(e) => setFinancial(e.target.value)}
                  className="accent-[#F7A9B8] w-5 h-5"
                />
                <span>{opt}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Country */}
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="bg-white/15 text-white rounded-xl p-3 border border-white/30 w-full"
        >
          <option value="">Country</option>
          {["USA", "India", "UK", "Canada", "Australia"].map((c) => (
            <option key={c} className="text-black" value={c}>{c}</option>
          ))}
        </select>

        {/* Time */}
        <input
          type="text"
          placeholder="Time commitment (e.g. 5 hrs/week)"
          value={timeCommitment}
          onChange={(e) => setTimeCommitment(e.target.value)}
          className="bg-white/15 text-white rounded-xl p-3 border border-white/30 w-full"
        />

        {/* Skills */}
        <input
          type="text"
          placeholder="Skills"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          className="bg-white/15 text-white rounded-xl p-3 border border-white/30 w-full"
        />

        <button
          type="submit"
          className="w-full bg-[#F7A9B8] text-[#2B1F24]
                     font-semibold rounded-xl py-3"
        >
          Generate Roadmap
        </button>
      </form>
    </div>
  );
}
