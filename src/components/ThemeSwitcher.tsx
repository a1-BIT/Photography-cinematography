"use client";

import { useEffect, useState } from "react";

const themes = [
  { id: "ivory", label: "Ivory", color: "#f4f3ed" },
  { id: "sage", label: "Sage", color: "#e7ede3" },
  { id: "midnight", label: "Midnight", color: "#17212c" },
  { id: "white", label: "Pure white", color: "#ffffff" },
] as const;
type Theme = (typeof themes)[number]["id"];
const storageKey = "frame-and-films-theme";

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute(
    "content", themes.find(item => item.id === theme)!.color,
  );
}

export function ThemeSwitcher() {
  // Start with the same value on the server and client to keep hydration consistent.
  const [theme, setTheme] = useState<Theme>("ivory");

  useEffect(() => {
    try {
      // Keep the theme chosen before the brand rename.
      const saved = localStorage.getItem(storageKey) ?? localStorage.getItem("myview-theme");
      const match = themes.find(item => item.id === saved);
      if (match) {
        applyTheme(match.id);
        setTheme(match.id);
      }
    } catch {
      // Switching still works when browser storage is unavailable.
    }
  }, []);

  function selectTheme(next: Theme) {
    applyTheme(next);
    setTheme(next);
    try { localStorage.setItem(storageKey, next); } catch { /* Storage is optional. */ }
  }

  return (
    <div className="theme-switcher" role="group" aria-label="Website theme">
      {themes.map(item => (
        <button
          key={item.id}
          type="button"
          className="theme-swatch"
          data-palette={item.id}
          aria-label={`${item.label} theme`}
          aria-pressed={theme === item.id}
          title={`${item.label} theme`}
          onClick={() => selectTheme(item.id)}
        >
          <span className="swatch-color" aria-hidden="true">
            {theme === item.id && <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="m3 8 3 3 7-7" /></svg>}
          </span>
        </button>
      ))}
    </div>
  );
}
