export default function ContestLoading() {
  return (
    <div className="max-w-6xl mx-auto mt-2 grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in duration-200">
      {/* Left panel */}
      <div className="lg:col-span-2 space-y-5">
        {/* Timer header card */}
        <div className="bg-card border border-border rounded-md">
          <div className="p-4 border-b border-border flex justify-between items-center">
            <div className="h-5 w-44 bg-neutral-200 dark:bg-neutral-800 rounded-sm" />
            <div className="h-9 w-[5.5rem] bg-neutral-100 dark:bg-neutral-900 rounded-sm" />
          </div>
          <div className="h-0.5 w-full bg-neutral-200 dark:bg-neutral-800" />
          <div className="p-4">
            <div className="bg-neutral-50 dark:bg-neutral-900 border border-border rounded-sm p-3 flex flex-col sm:flex-row justify-between items-center gap-3">
              <div className="flex items-start gap-2 flex-1">
                <div className="w-4 h-4 bg-amber-500/20 rounded-sm shrink-0 mt-0.5" />
                <div className="space-y-1 flex-1">
                  <div className="h-2.5 w-full max-w-xs bg-neutral-200 dark:bg-neutral-800 rounded-sm" />
                  <div className="h-2.5 w-3/4 max-w-[200px] bg-neutral-100 dark:bg-neutral-900 rounded-sm" />
                </div>
              </div>
              <div className="h-8 w-24 bg-neutral-900 dark:bg-neutral-100 rounded-md opacity-20 shrink-0" />
            </div>
          </div>
        </div>

        {/* Problem rows */}
        <div className="bg-card border border-border rounded-md overflow-hidden">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center justify-between px-4 py-3.5 border-b border-border last:border-b-0">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-7 h-7 bg-neutral-100 dark:bg-neutral-800 rounded-sm shrink-0" />
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="h-3.5 bg-neutral-200 dark:bg-neutral-800 rounded-sm" style={{ width: `${65 - i * 8}%` }} />
                  <div className="flex items-center gap-2">
                    <div className="h-2.5 w-8 bg-neutral-100 dark:bg-neutral-900 rounded-sm" />
                    <div className="w-0.5 h-0.5 bg-neutral-300 dark:bg-neutral-700 rounded-full" />
                    <div className="h-2.5 w-12 bg-neutral-100 dark:bg-neutral-900 rounded-sm" />
                  </div>
                </div>
              </div>
              <div className="h-7 w-16 bg-neutral-200 dark:bg-neutral-800 rounded-sm shrink-0 ml-3" />
            </div>
          ))}
        </div>
      </div>

      {/* Right panel — standings */}
      <div className="lg:col-span-1 lg:border-l lg:border-border lg:pl-6 space-y-3">
        <div className="h-3 w-24 bg-neutral-200 dark:bg-neutral-800 rounded-sm" />
        <div className="bg-card border border-border rounded-md overflow-hidden">
          {/* Table header */}
          <div className="bg-neutral-50 dark:bg-neutral-900 px-4 py-2.5 flex items-center border-b border-border">
            <div className="h-2.5 w-5 bg-neutral-200 dark:bg-neutral-800 rounded-sm" />
            <div className="h-2.5 w-14 bg-neutral-200 dark:bg-neutral-800 rounded-sm ml-4 flex-1" />
            <div className="h-2.5 w-10 bg-neutral-200 dark:bg-neutral-800 rounded-sm" />
          </div>
          {/* Rows */}
          {[...Array(4)].map((_, i) => (
            <div key={i} className="px-4 py-3 border-b border-border last:border-b-0 flex items-center">
              <div className="h-3 w-4 bg-neutral-200 dark:bg-neutral-800 rounded-sm" />
              <div className="ml-4 flex-1 space-y-1">
                <div className="h-3.5 w-20 bg-neutral-200 dark:bg-neutral-800 rounded-sm" />
                <div className="h-2 w-14 bg-neutral-100 dark:bg-neutral-900 rounded-sm" />
              </div>
              <div className="h-3.5 w-6 bg-neutral-200 dark:bg-neutral-800 rounded-sm" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
