export default function LeaderboardLoading() {
  return (
    <div className="max-w-4xl mx-auto mt-2 space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="space-y-1">
        <div className="h-7 w-40 bg-neutral-200 dark:bg-neutral-800 rounded-sm" />
        <div className="h-4 w-72 bg-neutral-100 dark:bg-neutral-900 rounded-sm" />
      </div>

      {/* Podium */}
      <div className="grid grid-cols-3 gap-3 items-end px-2 sm:px-8">
        {/* Silver */}
        <div className="bg-card border border-border rounded-md border-t-2 border-t-neutral-400 order-1">
          <div className="p-5 flex flex-col items-center space-y-2">
            <div className="w-6 h-6 bg-neutral-200 dark:bg-neutral-800 rounded-sm" />
            <div className="h-4 w-16 bg-neutral-200 dark:bg-neutral-800 rounded-sm" />
            <div className="h-3 w-10 bg-neutral-100 dark:bg-neutral-900 rounded-sm" />
          </div>
        </div>
        {/* Gold */}
        <div className="bg-card border border-border rounded-md border-t-2 border-t-amber-500 order-2 scale-105 shadow-sm">
          <div className="p-5 flex flex-col items-center space-y-2">
            <div className="w-7 h-7 bg-amber-500/20 rounded-sm" />
            <div className="h-5 w-20 bg-neutral-200 dark:bg-neutral-800 rounded-sm" />
            <div className="h-4 w-12 bg-neutral-200 dark:bg-neutral-800 rounded-sm" />
          </div>
        </div>
        {/* Bronze */}
        <div className="bg-card border border-border rounded-md border-t-2 border-t-amber-700 order-3">
          <div className="p-5 flex flex-col items-center space-y-2">
            <div className="w-6 h-6 bg-neutral-200 dark:bg-neutral-800 rounded-sm" />
            <div className="h-4 w-16 bg-neutral-200 dark:bg-neutral-800 rounded-sm" />
            <div className="h-3 w-10 bg-neutral-100 dark:bg-neutral-900 rounded-sm" />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-md overflow-hidden">
        {/* Header row */}
        <div className="bg-neutral-50 dark:bg-neutral-900 px-4 py-2.5 flex items-center gap-4 border-b border-border">
          <div className="h-3 w-10 bg-neutral-200 dark:bg-neutral-800 rounded-sm" />
          <div className="h-3 w-12 bg-neutral-200 dark:bg-neutral-800 rounded-sm flex-1" />
          <div className="h-3 w-10 bg-neutral-200 dark:bg-neutral-800 rounded-sm" />
          <div className="h-3 w-12 bg-neutral-200 dark:bg-neutral-800 rounded-sm" />
          <div className="h-3 w-16 bg-neutral-200 dark:bg-neutral-800 rounded-sm" />
        </div>
        {/* Rows */}
        {[...Array(10)].map((_, i) => (
          <div key={i} className="px-4 py-3 flex items-center gap-4 border-b border-border last:border-b-0">
            <div className="w-7 h-7 flex items-center justify-center">
              <div className="h-3 w-4 bg-neutral-200 dark:bg-neutral-800 rounded-sm" />
            </div>
            <div className="flex-1 space-y-1">
              <div className="h-3.5 w-24 bg-neutral-200 dark:bg-neutral-800 rounded-sm" />
              <div className="h-2.5 w-16 bg-neutral-100 dark:bg-neutral-900 rounded-sm" />
            </div>
            <div className="h-3.5 w-6 bg-neutral-200 dark:bg-neutral-800 rounded-sm" />
            <div className="h-3.5 w-10 bg-neutral-200 dark:bg-neutral-800 rounded-sm" />
            <div className="h-3 w-4 bg-neutral-100 dark:bg-neutral-900 rounded-sm" />
          </div>
        ))}
      </div>
    </div>
  )
}
