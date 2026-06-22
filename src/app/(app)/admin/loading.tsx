export default function AdminLoading() {
  return (
    <div className="max-w-2xl mx-auto space-y-6 mt-2 animate-in fade-in duration-200">
      {/* Header */}
      <div className="h-7 w-20 bg-neutral-200 dark:bg-neutral-800 rounded-sm" />

      {/* Problem Cache card */}
      <div className="bg-card border border-border rounded-md">
        {/* Card header */}
        <div className="p-6 space-y-1.5">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-neutral-200 dark:bg-neutral-800 rounded-sm" />
            <div className="h-4 w-28 bg-neutral-200 dark:bg-neutral-800 rounded-sm" />
          </div>
          <div className="h-3 w-56 bg-neutral-100 dark:bg-neutral-900 rounded-sm" />
        </div>

        {/* Card content */}
        <div className="px-6 pb-6 space-y-5">
          {/* Stats panel */}
          <div className="grid grid-cols-2 gap-4 bg-neutral-50 dark:bg-neutral-900 p-4 rounded-sm border border-border">
            <div className="space-y-2">
              <div className="h-2.5 w-28 bg-neutral-200 dark:bg-neutral-800 rounded-sm" />
              <div className="h-7 w-16 bg-neutral-200 dark:bg-neutral-800 rounded-sm" />
            </div>
            <div className="space-y-2">
              <div className="h-2.5 w-28 bg-neutral-200 dark:bg-neutral-800 rounded-sm" />
              <div className="h-5 w-14 bg-neutral-200 dark:bg-neutral-800 rounded-sm" />
              <div className="h-2.5 w-32 bg-neutral-100 dark:bg-neutral-900 rounded-sm" />
            </div>
          </div>

          {/* Refresh button */}
          <div className="pt-1 space-y-2">
            <div className="h-9 w-44 bg-neutral-900 dark:bg-neutral-100 rounded-md opacity-20" />
            <div className="h-2.5 w-72 bg-neutral-100 dark:bg-neutral-900 rounded-sm" />
          </div>
        </div>
      </div>
    </div>
  )
}
