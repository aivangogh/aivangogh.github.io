import { cn } from "../../lib/utils"

type Props = {
  className?: string
}

function Actions() {
  return (
    <>
      <div className="flex items-center gap-1.5">
        <div className="h-2.5 w-2.5 rounded-full bg-red-500"></div>
        <div className="h-2.5 w-2.5 rounded-full bg-yellow-500"></div>
        <div className="h-2.5 w-2.5 rounded-full bg-green-500"></div>
      </div>
    </>
  )
}

function Title() {
  return (
    <>
      <div className="flex items-center">
        <span className="text-white text-xs">My Porfolio</span>
      </div>
    </>
  )
}

function TitleBar({ className }: Props) {
  return (
    <>
      <div className={cn("flex items-center justify-between px-2 py-1 rounded-t-xl", className)} >
        <Actions /> 
        <Title />
        <div className="w-12"/>
      </div>
    </>
  )
}

export { TitleBar }

