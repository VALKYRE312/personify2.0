import React, { useEffect, useState } from "react";
import { loadEntries, saveEntries } from "../utils/journalStorage";

export default function SelfReflection() {
  const [entries, setEntries] = useState([]);
  const [activeId, setActiveId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    content: "",
    mood: "",
    tags: "",
    imageUrl: null, // base64 image
  });

  useEffect(() => {
    setEntries(loadEntries());
  }, []);

  // ---------------- IMAGE UPLOAD ----------------
  function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm(prev => ({
        ...prev,
        imageUrl: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  }

  // ---------------- SAVE ----------------
  function handleSave(e) {
    e.preventDefault();

    const newEntry = {
      id: activeId || Date.now(),
      title: form.title,
      content: form.content,
      mood: form.mood,
      tags: form.tags.split(",").map(t => t.trim()),
      date: new Date().toLocaleDateString(),
      imageUrl: form.imageUrl || "/journal-default.jpg",
    };

    const updated = activeId
      ? entries.map(e => (e.id === activeId ? newEntry : e))
      : [newEntry, ...entries];

    setEntries(updated);
    saveEntries(updated);
    resetForm();
  }

  // ---------------- SELECT ENTRY ----------------
  function handleSelect(entry) {
    setActiveId(entry.id);
    setForm({
      title: entry.title,
      content: entry.content,
      mood: entry.mood,
      tags: entry.tags.join(", "),
      imageUrl: entry.imageUrl || "/journal-default.jpg",
    });
  }

  // ---------------- DELETE ----------------
  function handleDelete() {
    const updated = entries.filter(e => e.id !== activeId);
    setEntries(updated);
    saveEntries(updated);
    resetForm();
  }

  function resetForm() {
    setForm({
      title: "",
      content: "",
      mood: "",
      tags: "",
      imageUrl: null,
    });
    setActiveId(null);
  }

  // ===================== UI =====================
  return (
    <div
      className="min-h-screen pt-28 pb-16 px-10 flex justify-center
                 bg-cover bg-center bg-no-repeat text-white"
      style={{ backgroundImage: "url('/app-background.jpg')" }}
    >
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8">

        {/* ---------------- SIDEBAR ---------------- */}
        <div
          className="rounded-2xl border border-[#6C5456] p-4 overflow-y-auto"
          style={{
            backgroundImage: "url('/journal-default.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <h3 className="text-xl mb-4">Recent Entries</h3>

          {entries.map(e => (
<div
  key={e.id}
  onClick={() => handleSelect(e)}
  className={`cursor-pointer p-3 mb-2 rounded-xl transition
    bg-[#2D232E]/75
    border border-white/20
    shadow-lg
    ${
      e.id === activeId
        ? "ring-2 ring-pink-300 bg-[#2D232E]/90"
        : "hover:bg-[#2D232E]/85"
    }`}
>

              <div className="font-semibold">{e.title}</div>
              <div className="text-sm opacity-70">{e.date}</div>
            </div>
          ))}
        </div>

        {/* ---------------- MAIN FORM ---------------- */}
      <form
  onSubmit={handleSave}
  style={{
    backgroundImage: "url('/journal-default.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
  className="relative rounded-2xl border border-[#6C5456]
             bg-[#3A2C31]/60 backdrop-blur-md
             p-8 flex flex-col"
>

          <h2 className="text-2xl mb-6">
            {activeId ? "Edit Entry" : "New Journal Entry"}
          </h2>

          <input
            required
            placeholder="Entry title"
            className="w-full p-3 mb-4 rounded-xl
                       bg-[#3A2C31]/50 backdrop-blur-md
                       border border-white/20"
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
          />

          <textarea
            required
            rows={8}
            placeholder="Write your thoughts..."
            className="w-full p-4 mb-4 rounded-2xl
                       bg-[#3A2C31]/50 backdrop-blur-md
                       border border-white/20 resize-none"
            value={form.content}
            onChange={e => setForm({ ...form, content: e.target.value })}
          />

          {/* Upload */}
          <div className="mb-4 p-3 rounded-xl
                          bg-[#3A2C31]/50 backdrop-blur-md
                          border border-white/20">
            <label className="block text-sm mb-2 text-white/80">
              Upload Image (optional)
            </label>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
          </div>

          {/* Image Preview */}
          {form.imageUrl && (
            <div className="mb-6 rounded-xl overflow-hidden
                            border border-white/20">
              <img
                src={form.imageUrl}
                alt="Journal"
                className="w-full max-h-64 object-cover"
              />
            </div>
          )}

          <div className="flex gap-4">
            <button className="bg-pink-300 text-black px-6 py-2 rounded">
              Save
            </button>

            {activeId && (
              <button
                type="button"
                onClick={handleDelete}
                className="bg-red-400 px-6 py-2 rounded"
              >
                Delete
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
