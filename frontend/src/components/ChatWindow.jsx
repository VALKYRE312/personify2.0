// src/components/ChatWindow.jsx
import React, { useRef, useEffect } from "react";

export default function ChatWindow({
  messages,
  input,
  setInput,
  onSend,
  waiting,
  inputRef,
   onVoiceInput,
   listening, 
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) containerRef.current.scrollTop = containerRef.current.scrollHeight;
  }, [messages]);

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  }

  return (
    // IMPORTANT: add min-h-0 so the flex child can shrink and the overflow-auto works correctly
    <main className="flex-1 flex flex-col relative min-h-0">
      {/* 
        - add pb-32 (or pb-28) so messages never get hidden beneath the input bar 
        - overflow-auto + h-full behaviour works when parent has min-h-0
      */}
      <div ref={containerRef} className="flex-1 p-6 overflow-auto pb-32">
        {messages.map((m) => (
          <div key={m.id} className={`mb-4 ${m.role === "user" ? "text-right" : "text-left"}`}>
            <div
              className={`inline-block px-4 py-2 rounded ${
                m.role === "user" ? "bg-[#F7A9B8] text-black" : "bg-[#3c2c2f] text-white"
              }`}
            >
             {m.type === "image" ? (
  <img
    src={m.dataUrl}
    alt={m.alt || "upload"}
    className="max-w-xs md:max-w-md rounded max-h-[60vh] object-contain"
    style={{ display: "inline-block" }}
  />
) : (
  m.text
)}

            </div>
          </div>
        ))}
      </div>

      {/* INPUT */}
      {/* Make sure this is absolutely positioned, with a high z-index and the same dark background */}
      <div className="absolute bottom-0 left-0 w-full p-5 bg-[#1F1518] border-t border-[#3a2b30] flex items-center gap-3 z-50">
<button
  onClick={onVoiceInput}
  className={`px-4 py-3 rounded-lg border transition
    ${listening
      ? "bg-red-500 text-white animate-pulse"
      : "bg-[#24181C] border-[#3a2b30] text-white hover:border-[#F7A9B8]"
    }`}
  title="Voice input"
>
  🎙️
</button>



        <textarea
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          rows={1}
          className="flex-1 px-4 py-3 rounded-lg bg-[#24181C] border border-[#3a2b30] text-white outline-none focus:border-[#F7A9B8] transition resize-none"
        />

        <button
          onClick={onSend}
          disabled={waiting}
          className="px-6 py-3 bg-[#F7A9B8] hover:bg-[#F4A7B3] text-black font-medium transition rounded-lg"
        >
          {waiting ? "..." : "Send"}
        </button>
      </div>
    </main>
  );
}
