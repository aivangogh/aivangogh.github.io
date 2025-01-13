import { cn } from "../../../lib/utils";
import { Input } from "./input";
import { PS1 } from "./ps1";

type Props = {
  className?: string;
}

function CLI({ className }: Props) {
  return (
    <>
      <div className={cn("h-[calc(100vh-3.5rem)] rounded-b-xl bg-black", className)}>
        <div className="flex gap-1">
          <PS1 />
          <Input />
        </div> 
      </div>
    </>
  )
}

export { CLI }
