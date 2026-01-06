// src/pages/TherapySession.jsx
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ChatSidebar from "../components/ChatSidebar";
import ChatWindow from "../components/ChatWindow";
import LibraryViewer from "../components/LibraryViewer"; // NEW import
import api from "../lib/api";

// 🎙️ Web Speech API setup
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = SpeechRecognition
  ? new SpeechRecognition()
  : null;

if (recognition) {
  recognition.continuous = false;
  recognition.lang = "en-US";
  recognition.interimResults = false;
}
{/* ---------------- LEFT CARD ---------------- */}

// YOUR BASE_PROMPTS (unchanged)
const BASE_PROMPTS = {
  INFP: "I'm a warm, reflective companion. Encourage gentle reflection, validate feelings, and suggest 1 grounding practice.",
  INFJ: "Calm, insightful listener. Help reflect on values and suggest one small step toward purpose.",
  INTJ: "Practical, strategic coach: offer clear steps and a short plan to try.",
  ISTJ: "Structured and reliable guidance: provide checklists and one practical habit to test.",
  ENFP: "Enthusiastic and encouraging: validate ideas and propose one playful small experiment.",
  ENFJ: "Supportive and action-oriented: help convert values into a 2-step plan.",
  ENTJ: "Direct, high-level planner: propose priorities and an accountability step.",
  INTP: "Curious and clarifying: ask a question to refine the problem and suggest a simple experiment.",
  ISFP: "Gentle sensory grounding: suggest creative/physical practices and validate feelings.",
  ISFJ: "Nurturing and concrete: offer caring routines and one boundary suggestion.",
  ESFP: "Present-focused, energetic support: propose a short experiential practice to try now.",
  ESTP: "Action-first, pragmatic: suggest a hands-on step and short reflection.",
  ENTP: "Brainstorm-friendly coach: offer 2 quick alternative approaches to try.",
  ESTJ: "Organized, no-nonsense guidance: provide a small plan with timelines.",
  ESFJ: "Warm, relational guidance: suggest connection-centered steps and self-care micro-habits.",
  ISTP: "Practical troubleshooting: suggest an experiment and how to measure results.",
};

// Helper: localStorage keys
const LS_CHATS_KEY = "therapy_chats_v1";
const LS_LIBRARY_KEY = "therapy_library_v1";

function speak(text) {
  if (!window.speechSynthesis) return;

  // stop any previous speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = 0.95;
  utterance.pitch = 1;
  utterance.volume = 1;

  const voices = window.speechSynthesis.getVoices();
  const preferred =
    voices.find(v => v.name.includes("Google")) ||
    voices.find(v => v.lang === "en-US");

  if (preferred) utterance.voice = preferred;

  window.speechSynthesis.speak(utterance);
}


export default function TherapySession() {
  const navigate = useNavigate();
  const location = useLocation();
  // prefer passed-in type (from PersonalizedTherapy button), fallback to INFP
  const defaultType = (location.state && location.state.type) || "INFP";

  // top-level state
  const [chats, setChats] = useState(() => {
    try {
      const raw = localStorage.getItem(LS_CHATS_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  const [library, setLibrary] = useState(() => {
    try {
      const raw = localStorage.getItem(LS_LIBRARY_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  // <-- ADD view state here (chat | library) -->
  const [view, setView] = useState("chat");

  // active chat id
  const [activeChatId, setActiveChatId] = useState(() => {
    const saved = chats && chats.length ? chats[0]?.id : null;
    return saved || null;
  });

  // transient UI state for the open chat
  const [messages, setMessages] = useState(() => {
    // if we have an active chat, initialize below in effect; else intro will be set when new chat created
    return [];
  });
  const [input, setInput] = useState("");
  const [waiting, setWaiting] = useState(false);
  const [showAttach, setShowAttach] = useState(false);
  const [listening, setListening] = useState(false);

  const inputRef = useRef(null);

  // NEW: keeps an always up-to-date reference of messages
const latestMessagesRef = useRef([]);
useEffect(() => {
  latestMessagesRef.current = messages;
}, [messages]);

useEffect(() => {
  window.speechSynthesis.getVoices();
}, []);

  // When activeChat changes (or at mount), load messages for that chat.
  useEffect(() => {
    if (!activeChatId) {
      // if no active chat, but there are chats, pick the latest
      if (chats.length) {
        setActiveChatId(chats[0].id);
        return;
      }
      return;
    }
    const c = chats.find((x) => x.id === activeChatId);
    if (!c) return;
    setMessages(c.messages ?? []);
    // ensure focus
    setTimeout(() => inputRef.current?.focus(), 50);
  }, [activeChatId, chats]);

  // Persist chats whenever changed
  useEffect(() => {
    localStorage.setItem(LS_CHATS_KEY, JSON.stringify(chats));
  }, [chats]);

  // Persist library whenever changed
  useEffect(() => {
    localStorage.setItem(LS_LIBRARY_KEY, JSON.stringify(library));
  }, [library]);

  // Create a new chat and select it
  function createNewChat(type = defaultType) {
    const id = "chat_" + Date.now();
    const createdAt = Date.now();
    const title = `${type} — ${new Date(createdAt).toLocaleString()}`;
    const initialIntro =
      BASE_PROMPTS[type] ||
      "Hello — I'm here to listen. What would you like to talk about today?";

    const newChat = {
      id,
      title,
      createdAt,
      personalityType: type,
      messages: [{ id: "intro", role: "assistant", text: initialIntro }],
    };

    // add to front and switch view to chat so user sees the new chat
    setChats((prev) => [newChat, ...prev]);
    setActiveChatId(id);
    setView("chat");
    // messages state will be filled by effect when activeChatId updates
  }

  // When user clicks New Chat in sidebar
  function handleNewChat() {
    createNewChat(defaultType);
  }

  // select chat (load messages)
  function handleSelectChat(chatId) {
    setActiveChatId(chatId);
    setView("chat");
  }

  function handleVoiceInput() {
  if (!recognition) {
    alert("Voice recognition not supported in this browser.");
    return;
  }

  // If already listening → stop
  if (listening) {
    recognition.stop();
    setListening(false);
    return;
  }

  setListening(true);

  recognition.start();

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;

    setInput(transcript); // show text in input
    setListening(false);

    // auto-send after voice input
    setTimeout(() => {
      handleSend();
    }, 300);
  };

  recognition.onerror = (event) => {
    console.error("Voice error:", event.error);
    setListening(false);
  };

  recognition.onend = () => {
    setListening(false);
  };
}


// inside TherapySession.jsx — replace existing handleSend with this
async function handleSend() {
  if (!input.trim()) return;
  const text = input.trim();
  setInput("");
  setWaiting(true);

  const userMsg = { id: "u" + Date.now(), role: "user", text };

  // functional update so we get the very-latest messages in one place
  let thinkingId = "thinking-" + Date.now();
  setMessages((prev) => {
    const next = [...prev, userMsg, { id: thinkingId, role: "assistant", text: "Thinking..." }];
    latestMessagesRef.current = next; // keep ref in sync immediately
    return next;
  });

  // optimistic update to chats store
  setChats((prev) =>
    prev.map((c) =>
      c.id === activeChatId ? { ...c, messages: [...(c.messages || []), userMsg, { id: thinkingId, role: "assistant", text: "Thinking..." }] } : c
    )
  );

  try {
    // build exact history from latestMessagesRef (guaranteed up-to-date)
    const historyForBackend = (latestMessagesRef.current || []).map((m) => ({
      role: m.role,
      text: m.type === "image" ? `[image:${m.alt || m.id}]` : (m.text || "")
    }));

    const payload = {
      chatId: activeChatId,
      personalityType: (chats.find((c) => c.id === activeChatId)?.personalityType) || defaultType,
      messages: historyForBackend,
      userMessage: text,
    };

    const res = await api.post("/api/therapy/chat", payload);

const assistantText =
  res.data?.reply || "Sorry — I couldn't generate a response.";



    speak(assistantText);




    // replace the thinking placeholder with the real assistant reply
    setMessages((prev) => {
      const withoutThinking = prev.filter((x) => x.id !== thinkingId);
      const next = [...withoutThinking, { id: "a" + Date.now(), role: "assistant", text: assistantText }];
      latestMessagesRef.current = next;
      return next;
    });

    // persist assistant reply into chats
    setChats((prev) =>
      prev.map((c) =>
        c.id === activeChatId
          ? {
              ...c,
              messages: [
                ...(c.messages || []).filter((x) => x.id !== thinkingId),
                { id: "a" + Date.now(), role: "assistant", text: assistantText },
              ],
            }
          : c
      )
    );
  } catch (err) {
    console.error("handleSend error:", err);
    // convert the thinking placeholder to an error message
    setMessages((prev) =>
      prev.map((x) => (x.id === thinkingId ? { ...x, text: "Sorry — connection error." } : x))
    );
  } finally {
    setWaiting(false);
    inputRef.current?.focus();
  }
}


  // file select handler (images)
  function handleFileSelect(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target.result;
      const imgObj = {
        id: "img_" + Date.now(),
        name: file.name,
        dataUrl,
        uploadedAt: Date.now(),
      };
      // add to library
      setLibrary((prev) => [imgObj, ...(prev || [])]);

      // also add as a chat message for current chat (so they can see it in conversation)
      const imgMessage = { id: "m" + Date.now(), role: "user", type: "image", dataUrl, text: "", alt: file.name };
      setMessages((m) => [...m, imgMessage]);

      setChats((prev) =>
        prev.map((c) => (c.id === activeChatId ? { ...c, messages: [...(c.messages || []), imgMessage] } : c))
      );
    };
    reader.readAsDataURL(file);
    // hide attach menu
    setShowAttach(false);
    // clear input value so same file can be selected again later
    e.target.value = null;
  }

  // If there are no chats on load, create one automatically
  useEffect(() => {
    if (!chats || chats.length === 0) {
      createNewChat(defaultType);
    } else {
      // if we had chats and no activeChatId set, set it to first
      if (!activeChatId) {
        setActiveChatId(chats[0].id);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---- KEEP YOUR generateAssistantStub EXACTLY ----
  function generateAssistantStub(type, userText) {
    switch (type) {
      case "INFP":
        return `I hear you. That sounds emotionally heavy — thank you for sharing. One small thing you could try today: write for 10 minutes about what that feeling wants you to know. Would you like a short grounding exercise?`;
      case "ESTJ":
        return `Thanks — that sounds like something actionable. A practical first step: list the top 2 priorities and pick one to do for 15 minutes. Want help making that checklist?`;
      case "ENFP":
        return `You're full of energy and ideas — nice! Try a tiny experiment: pick one idea and test it for 24 hours. Want me to help you plan it?`;
      default:
        return `Thanks for sharing. Would you like a small, practical step to try or a short reflection prompt to explore this further?`;
    }
  }

  return (
    <div className="h-screen flex flex-col bg-[#1F1518] text-white ">
      {/* TOP BAR */}
      <header className="relative z-50 w-full h-20 border-b border-[#3a2b30] bg-[#1A1114] flex items-center justify-between px-6">
        <h1 className="text-xl font-semibold text-[#F7A9B8]">
          Therapy Session — {(() => {
            const c = chats.find((x) => x.id === activeChatId);
            return c ? c.personalityType : defaultType;
          })()}
        </h1>
        <div className="flex gap-3">
<button
  type="button"
  onClick={() => {
     alert("CLICKED");
    console.log("BACK CLICKED");
    console.log("state.from:", location.state?.from);
    console.log("session.from:", sessionStorage.getItem("therapy_from"));
    navigate("/"); // FORCE HOME
  }}
>
  ← Back
</button>



        </div>
      </header>

      <div className="flex flex-1 min-h-0">

        {/* Sidebar (component) - pass library/open handlers */}
        <ChatSidebar
          chats={chats}
          activeChatId={activeChatId}
          onSelectChat={handleSelectChat}
           onNewChat={handleNewChat}
          library={library}
          onOpenLibrary={() => setView("library")}
          onOpenChat={() => setView("chat")}
        />

        {/* Right column: show library or chat */}
        {view === "library" ? (
          <LibraryViewer
            library={library}
            onOpenImage={(img) => {
              // optional: open the chat and insert image into active chat
              setView("chat");
              // you could also push the image into messages here if desired
            }}
          />
        ) : (
        <ChatWindow
  messages={messages}
  input={input}
  setInput={setInput}
  onSend={handleSend}
  waiting={waiting}
  inputRef={inputRef}
  onVoiceInput={handleVoiceInput}
  listening={listening}
/>

        )}
      </div>
    </div>
  );
}
