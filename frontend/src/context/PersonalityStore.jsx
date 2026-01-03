import React, { createContext, useContext, useEffect, useState } from "react";

const PersonalityCtx = createContext(null);

export function PersonalityProvider({ children }) {
  const [result, setResult] = useState(() => {
    try {
      const raw = localStorage.getItem("pa.result");
      return raw ? JSON.parse(raw) : null;
    } catch { return null; }
  });

  useEffect(() => {
    if (result) localStorage.setItem("pa.result", JSON.stringify(result));
  }, [result]);

  const clear = () => {
    localStorage.removeItem("pa.result");
    setResult(null);
  };

  return (
    <PersonalityCtx.Provider value={{ result, setResult, clear }}>
      {children}
    </PersonalityCtx.Provider>
  );
}

export const usePersonality = () => useContext(PersonalityCtx);
