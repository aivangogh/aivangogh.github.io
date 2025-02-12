import { cn } from "../../lib/utils";
import { useThemeStore } from "../../stores/useThemeStore";
import { CLI } from "./cli";
import { TitleBar } from "./title-bar";

export function Terminal(props: React.HTMLAttributes<HTMLDivElement>) {
  const currentTheme = useThemeStore((state) => state.getCurrentColorScheme());
  return (
    <>
      <div {...props} className={cn(props.className)}>
        <div
          className="w-full h-full shadow-lg"
          style={{ borderColor: currentTheme?.foreground }}
        >
          <TitleBar className="rounded-t-lg border-t border-x" />
          <CLI className="rounded-b-lg border-x border-b" />
        </div>
      </div>
    </>
  );
}
