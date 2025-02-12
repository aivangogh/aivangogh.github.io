"use client";

import { useThemeStore } from "../../../stores/useThemeStore";

function PS1() {
  const hostname = window.location.hostname;
  const currentTheme = useThemeStore((state) => state.getCurrentColorScheme());

  return (
    <h1 className="font-bold flex">
      <span style={{ color: currentTheme?.yellow }}>guest</span>
      <span style={{ color: currentTheme?.white }}>@</span>
      <span style={{ color: currentTheme?.green }}>{hostname}</span>
      <span style={{ color: currentTheme?.white }}>:~$</span>
    </h1>
  );
}

export { PS1 };
