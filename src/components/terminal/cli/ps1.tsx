"use client";

import { useThemeStore } from "../../../stores/useThemeStore";

function PS1() {
  const hostname = window.location.hostname;
  const currentTheme = useThemeStore((state) => state.getCurrentColorScheme());

  return (
    <h1 className="font-medium flex">
      <span style={{ color: currentTheme?.yellow }}>guest</span>
      <span style={{ color: currentTheme?.foreground }}>@</span>
      <span className="whitespace-nowrap" style={{ color: currentTheme?.green }}>{hostname}</span>
      <span style={{ color: currentTheme?.foreground }}>:~$</span>
    </h1>
  );
}

export { PS1 };
