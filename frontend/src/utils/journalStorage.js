// utils/journalStorage.js
export const JOURNAL_KEY = "personify_journal_entries";

export function loadEntries() {
  try {
    return JSON.parse(localStorage.getItem(JOURNAL_KEY)) || [];
  } catch {
    return [];
  }
}

export function saveEntries(entries) {
  localStorage.setItem(JOURNAL_KEY, JSON.stringify(entries));
}
