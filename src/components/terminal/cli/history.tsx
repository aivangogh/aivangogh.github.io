"use client";

import { useEffect } from "react";
import { useHistoryStore } from "../../../stores/useHistoryStore";
import { useThemeStore } from "../../../stores/useThemeStore";
import { PS1 } from "./ps1";

export function History() {
  const { getCurrentColorScheme } = useThemeStore();
  const currentTheme = getCurrentColorScheme();
  const { history } = useHistoryStore();

  useEffect(() => {
    console.log("History updated:", history); // Add this debug log
  }, [history]);

  return (
    <>
      {history.map(({ command, outputs }, index) => (
        <div style={{ color: currentTheme?.foreground }}>
          <div className="flex flex-col md:flex-row">
            <PS1 />

            <div className="flex">
              <p className="visible md:hidden">❯</p>
              <div key={index} className="px-2">
                {command}
              </div>
            </div>
          </div>
          {outputs &&
            outputs.map((output, outputIndex) => (
              <div
                className="whitespace-pre"
                key={`output-${index}-${outputIndex}`}
              >
                {output}
              </div>
            ))}
        </div>
      ))}
    </>
  );
}
