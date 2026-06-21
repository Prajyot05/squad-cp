import { LucideIcon } from "lucide-react"
import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description: string
  action?: ReactNode
  className?: string
}

export function EmptyState({ icon: Icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center text-center p-8 border border-dashed border-neutral-300 dark:border-neutral-700 rounded-md bg-neutral-50 dark:bg-neutral-900/50", className)}>
      <div className="bg-neutral-100 dark:bg-neutral-800 p-3 rounded-md mb-4">
        <Icon className="h-6 w-6 text-neutral-400" />
      </div>
      <h3 className="text-lg font-semibold text-foreground tracking-tight mb-1">{title}</h3>
      <p className="text-sm text-neutral-500 max-w-sm mb-5">{description}</p>
      {action && <div>{action}</div>}
    </div>
  )
}
