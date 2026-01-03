// src/components/LibraryViewer.jsx
import React from "react";

export default function LibraryViewer({ library = [], onOpenImage }) {
  return (
    <main className="flex-1 p-6 overflow-auto bg-[#1F1518]">
      <div className="mb-4">
        <h3 className="text-2xl text-[#D8B4B8]">📁 Saved Sessions</h3>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {library.length === 0 ? (
          <div className="text-[#FDEFF4]/80">No images yet — upload from a chat using 📎</div>
        ) : (
          library.map((img) => (
            <div key={img.id} className="bg-[#3A2C31] border border-[#6C5456] p-3 rounded-lg flex items-center gap-4">
              <img src={img.dataUrl} alt={img.name} className="w-32 h-20 object-cover rounded" />
              <div className="flex-1">
                <div className="font-medium text-sm">{img.name}</div>
                <div className="text-xs text-gray-300">{new Date(img.uploadedAt).toLocaleString()}</div>
                <div className="mt-2">
                  <button
                    onClick={() => onOpenImage?.(img)}
                    className="px-3 py-1 text-sm rounded bg-[#F7A9B8] text-black"
                  >
                    Open in chat
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
