export default function DashboardLoading() {
  return (
    <div className="space-y-8 mt-2 max-w-5xl mx-auto animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-2">
          <div className="h-7 w-72 bg-neutral-200 dark:bg-neutral-800 rounded-sm" />
          <div className="h-4 w-52 bg-neutral-100 dark:bg-neutral-900 rounded-sm" />
        </div>
        <div className="h-9 w-36 bg-neutral-900 dark:bg-neutral-100 rounded-md opacity-20" />
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Skill Rating */}
        <div className="bg-card border border-border rounded-md p-5 space-y-3">
          <div className="h-3 w-20 bg-neutral-200 dark:bg-neutral-800 rounded-sm" />
          <div className="flex items-baseline gap-3">
            <div className="h-10 w-16 bg-neutral-200 dark:bg-neutral-800 rounded-sm" />
            <div className="h-4 w-10 bg-neutral-100 dark:bg-neutral-900 rounded-sm" />
          </div>
          <div className="h-3 w-28 bg-neutral-100 dark:bg-neutral-900 rounded-sm" />
        </div>
        {/* Current Level */}
        <div className="bg-card border border-border rounded-md p-5 space-y-3">
          <div className="h-3 w-24 bg-neutral-200 dark:bg-neutral-800 rounded-sm" />
          <div className="flex items-baseline gap-2">
            <div className="h-10 w-12 bg-neutral-200 dark:bg-neutral-800 rounded-sm" />
            <div className="h-3 w-10 bg-neutral-100 dark:bg-neutral-900 rounded-sm" />
          </div>
          <div className="w-full bg-neutral-200 dark:bg-neutral-800 rounded-sm h-1" />
          <div className="h-3 w-16 bg-neutral-100 dark:bg-neutral-900 rounded-sm" />
        </div>
        {/* Codeforces */}
        <div className="bg-card border border-border rounded-md p-5 space-y-3">
          <div className="h-3 w-20 bg-neutral-200 dark:bg-neutral-800 rounded-sm" />
          <div className="h-6 w-28 bg-neutral-200 dark:bg-neutral-800 rounded-sm" />
          <div className="h-3 w-24 bg-neutral-100 dark:bg-neutral-900 rounded-sm" />
          <div className="h-8 w-full bg-neutral-200 dark:bg-neutral-800 rounded-sm mt-2" />
        </div>
      </div>

      {/* Recent Contests */}
      <div className="pt-4 space-y-4">
        <div className="h-5 w-36 bg-neutral-200 dark:bg-neutral-800 rounded-sm" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-card border border-border rounded-md p-5 space-y-4">
              <div className="flex justify-between items-start">
                <div className="h-4 w-32 bg-neutral-200 dark:bg-neutral-800 rounded-sm" />
                <div className="h-5 w-14 bg-neutral-100 dark:bg-neutral-900 rounded-sm" />
              </div>
              <div className="space-y-2">
                {[...Array(3)].map((_, j) => (
                  <div key={j} className="flex justify-between border-b border-border pb-1">
                    <div className="h-3 w-14 bg-neutral-100 dark:bg-neutral-900 rounded-sm" />
                    <div className="h-3 w-10 bg-neutral-200 dark:bg-neutral-800 rounded-sm" />
                  </div>
                ))}
              </div>
              <div className="h-8 w-full bg-neutral-200 dark:bg-neutral-800 rounded-sm" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
