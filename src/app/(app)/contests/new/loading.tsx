export default function CreateContestLoading() {
  return (
    <div className="max-w-xl mx-auto mt-2 animate-in fade-in duration-200">
      <div className="bg-card border border-border rounded-md overflow-hidden">
        {/* Card header */}
        <div className="p-6 space-y-1.5">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-neutral-200 dark:bg-neutral-800 rounded-sm" />
            <div className="h-5 w-32 bg-neutral-200 dark:bg-neutral-800 rounded-sm" />
          </div>
          <div className="h-3 w-64 bg-neutral-100 dark:bg-neutral-900 rounded-sm" />
        </div>

        {/* Form content */}
        <div className="px-6 pb-6 space-y-5">
          {/* Title field */}
          <div className="space-y-1.5">
            <div className="h-2.5 w-24 bg-neutral-200 dark:bg-neutral-800 rounded-sm" />
            <div className="h-10 w-full bg-neutral-50 dark:bg-neutral-900 rounded-sm border border-border" />
          </div>

          {/* Difficulty section */}
          <div className="bg-neutral-50 dark:bg-neutral-900 p-4 rounded-sm border border-border space-y-4">
            <div className="space-y-1.5">
              <div className="h-2.5 w-36 bg-neutral-200 dark:bg-neutral-800 rounded-sm" />
              <div className="h-10 w-full bg-card rounded-sm border border-border" />
            </div>
            <div className="bg-card p-3 rounded-sm border border-border space-y-2">
              <div className="h-2.5 w-28 bg-neutral-200 dark:bg-neutral-800 rounded-sm" />
              <div className="flex gap-1.5">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-5 w-12 bg-neutral-200 dark:bg-neutral-800 rounded-sm" />
                ))}
              </div>
            </div>
          </div>

          {/* Duration */}
          <div className="space-y-2">
            <div className="h-2.5 w-16 bg-neutral-200 dark:bg-neutral-800 rounded-sm" />
            <div className="grid grid-cols-4 gap-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className={`h-9 rounded-md border ${i === 3 ? 'bg-neutral-900 dark:bg-neutral-100 opacity-20 border-transparent' : 'bg-card border-border'}`} />
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <div className="h-2.5 w-28 bg-neutral-200 dark:bg-neutral-800 rounded-sm" />
            <div className="h-10 w-full bg-neutral-50 dark:bg-neutral-900 rounded-sm border border-border" />
          </div>

          {/* Submit button */}
          <div className="h-11 w-full bg-neutral-900 dark:bg-neutral-100 rounded-md opacity-20" />
        </div>
      </div>
    </div>
  )
}
