// src/components/ChatSidebar.jsx
import React from "react";

export default function ChatSidebar({
  chats = [],
  activeChatId,
  onSelectChat,
  onNewChat,
  onOpenLibrary,
  onOpenChat,
}) {
  return (
    <aside className="w-64 bg-[#24181C] border-r border-[#3a2b30] p-5 flex flex-col min-h-0">
      
      {/* NEW CHAT */}
      <button
        onClick={() => {
          onNewChat?.();
          onOpenChat?.();
        }}
        className="bg-[#F7A9B8] hover:bg-[#F4A7B3] text-black font-medium transition px-4 py-2 rounded-lg"
      >
        + New Chat
      </button>

      {/* LIBRARY */}
      <button
        onClick={() => onOpenLibrary?.()}
        className="mt-3 w-full flex items-center gap-3 px-4 py-2 rounded-lg bg-[#1F1518] border border-[#3a2b30] text-gray-300"
      >
        <span>📁</span>
        <span>Saved Sessions</span>
      </button>

      {/* TITLE */}
      <h2 className="text-2xl font-semibold text-[#F7A9B8] mt-6">
        Your Chats
      </h2>

      {/* ✅ SCROLLABLE CHAT LIST */}
      <div className="flex-1 overflow-auto mt-3 flex flex-col gap-3 pr-1">
        {chats.map((c) => (
          <button
            key={c.id}
            onClick={() => {
              onSelectChat?.(c.id);
              onOpenChat?.();
            }}
            className={`text-left p-3 rounded border transition ${
              c.id === activeChatId
                ? "border-pink-300 bg-[#2a1d21]"
                : "border-[#3c2c2f] hover:bg-[#2a1d21]"
            }`}
          >
            <div className="text-sm font-medium">{c.title}</div>
            <div className="text-xs text-gray-400">
              {new Date(c.createdAt).toLocaleString()}
            </div>
          </button>
        ))}
      </div>

    </aside>
  );
}
