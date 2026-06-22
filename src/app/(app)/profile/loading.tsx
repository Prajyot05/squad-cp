export default function ProfileLoading() {
  return (
    <div className="max-w-5xl mx-auto mt-2 space-y-6 animate-in fade-in duration-200">
      {/* Profile header */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-5 bg-card p-5 rounded-md border border-border">
        <div className="w-20 h-20 rounded-md bg-neutral-200 dark:bg-neutral-800" />
        <div className="text-center md:text-left flex-1 space-y-3">
          <div className="h-7 w-40 bg-neutral-200 dark:bg-neutral-800 rounded-sm mx-auto md:mx-0" />
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
            <div className="h-6 w-24 bg-neutral-100 dark:bg-neutral-900 rounded-sm border border-border" />
            <div className="h-6 w-28 bg-neutral-100 dark:bg-neutral-900 rounded-sm border border-border" />
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {['Skill Rating', 'Contests', 'Level', 'Peak Level'].map((label) => (
          <div key={label} className="bg-card border border-border rounded-md p-4 space-y-2">
            <div className="h-2.5 w-20 bg-neutral-100 dark:bg-neutral-900 rounded-sm" />
            <div className="h-7 w-14 bg-neutral-200 dark:bg-neutral-800 rounded-sm" />
          </div>
        ))}
      </div>

      {/* Rating History table */}
      <div className="bg-card border border-border rounded-md overflow-hidden">
        <div className="border-b border-border bg-neutral-50 dark:bg-neutral-900 py-3 px-6">
          <div className="h-4 w-28 bg-neutral-200 dark:bg-neutral-800 rounded-sm" />
        </div>
        {/* Header row */}
        <div className="bg-neutral-50 dark:bg-neutral-900 px-4 py-2.5 flex items-center border-b border-border">
          <div className="h-2.5 w-16 bg-neutral-200 dark:bg-neutral-800 rounded-sm flex-1" />
          <div className="h-2.5 w-10 bg-neutral-200 dark:bg-neutral-800 rounded-sm mx-4" />
          <div className="h-2.5 w-10 bg-neutral-200 dark:bg-neutral-800 rounded-sm mx-4" />
          <div className="h-2.5 w-10 bg-neutral-200 dark:bg-neutral-800 rounded-sm mx-4" />
          <div className="h-2.5 w-14 bg-neutral-200 dark:bg-neutral-800 rounded-sm" />
        </div>
        {/* Rows */}
        {[...Array(5)].map((_, i) => (
          <div key={i} className="px-4 py-3 flex items-center border-b border-border last:border-b-0">
            <div className="h-3.5 w-32 bg-neutral-200 dark:bg-neutral-800 rounded-sm flex-1" />
            <div className="h-3 w-8 bg-neutral-100 dark:bg-neutral-900 rounded-sm mx-4" />
            <div className="h-3 w-8 bg-neutral-200 dark:bg-neutral-800 rounded-sm mx-4" />
            <div className="h-3 w-12 bg-neutral-200 dark:bg-neutral-800 rounded-sm mx-4" />
            <div className="flex items-center gap-1">
              <div className="h-3.5 w-10 bg-neutral-200 dark:bg-neutral-800 rounded-sm" />
              <div className="h-3 w-8 bg-neutral-100 dark:bg-neutral-900 rounded-sm" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
