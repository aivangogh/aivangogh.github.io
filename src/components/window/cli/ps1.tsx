"use client";

import { useEffect } from "react";
import { useThemeStore } from "../../../stores/useThemeStore";

function PS1() {
  const hostname = window.location.hostname;
  const { getCurrentColorScheme, setCurrentColorScheme } = useThemeStore();
  const currentTheme = getCurrentColorScheme();

  useEffect(() => {
    if (!currentTheme) {
      setCurrentColorScheme("AyuDark");
    }
  }, []);

  if (!currentTheme) {
    return null; // or a loading state
  }

  return (
    <h1 className="font-bold flex">
      <span
        style={{ color: currentTheme.yellow }}
      >
        guest
      </span>
      <span style={{ color: currentTheme.white }}>@</span>
      <span style={{ color: currentTheme.green }}>{hostname}</span>
      <span style={{ color: currentTheme.white }}>:~$</span>
    </h1>
  );
}

export { PS1 };
