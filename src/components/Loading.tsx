import { Loader2 } from "lucide-react"

export function LoadingSpinner({ className }: { className?: string }) {
  return <Loader2 className={`h-8 w-8 animate-spin text-foreground ${className}`} />
}

export function FullPageLoading() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-background/80 backdrop-blur-sm z-50 fixed inset-0">
      <div className="flex flex-col items-center gap-3">
        <div className="relative">
          <Loader2 className="h-10 w-10 animate-spin text-foreground" />
        </div>
        <p className="text-neutral-500 text-sm font-medium">Loading...</p>
      </div>
    </div>
  )
}
