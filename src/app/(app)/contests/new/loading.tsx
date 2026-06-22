import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

export default function CreateContestLoading() {
  return (
    <div className="max-w-xl mx-auto mt-2 animate-in fade-in duration-200">
      <Card className="bg-card border border-border rounded-md overflow-hidden">
        <CardHeader>
          <CardTitle className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <div className="w-5 h-5 bg-neutral-300 dark:bg-neutral-700 rounded-sm animate-pulse" />
            Create Contest
          </CardTitle>
          <CardDescription className="text-xs text-neutral-500">Configure your practice session and invite your squad.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-5">
            {/* Title field */}
            <div className="space-y-1.5">
              <span className="text-xs font-medium text-neutral-500 uppercase tracking-wider">Contest Title</span>
              <div className="h-10 w-full bg-neutral-50 dark:bg-neutral-900 rounded-sm border border-border animate-pulse" />
            </div>

            {/* Difficulty section */}
            <div className="space-y-4 bg-neutral-50 dark:bg-neutral-900 p-4 rounded-sm border border-border">
              <div className="space-y-1.5">
                <span className="flex items-center gap-2 text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  <div className="w-3.5 h-3.5 bg-neutral-300 dark:bg-neutral-700 rounded-sm" />
                  Difficulty Level (1–109)
                </span>
                <div className="h-10 w-full bg-card rounded-sm border border-border animate-pulse" />
              </div>
              <div className="bg-card p-3 rounded-sm border border-border">
                <p className="text-[10px] text-neutral-500 font-medium uppercase tracking-wider mb-2">Estimated Ratings</p>
                <div className="flex gap-1.5">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-5 w-[46px] bg-neutral-200 dark:bg-neutral-800 rounded-sm border border-border animate-pulse" />
                  ))}
                </div>
              </div>
            </div>

            {/* Duration */}
            <div className="space-y-2">
              <span className="flex items-center gap-2 text-xs font-medium text-neutral-500 uppercase tracking-wider">
                <div className="w-3.5 h-3.5 bg-neutral-300 dark:bg-neutral-700 rounded-sm" />
                Duration
              </span>
              <div className="grid grid-cols-4 gap-2">
                {[30, 60, 90, 120].map((mins, i) => (
                  <div key={mins} className={`h-9 rounded-md flex items-center justify-center text-sm font-mono ${i === 3 ? 'bg-neutral-900 dark:bg-neutral-100 opacity-[0.12]' : 'bg-card border border-border'}`}>
                    {i !== 3 && <div className="h-4 w-8 bg-neutral-200 dark:bg-neutral-800 rounded-sm animate-pulse" />}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 mt-2">
                <div className="w-24 h-10 bg-neutral-50 dark:bg-neutral-900 rounded-sm border border-border animate-pulse" />
                <span className="text-xs text-neutral-400">Custom minutes</span>
              </div>
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <span className="flex items-center gap-2 text-xs font-medium text-neutral-500 uppercase tracking-wider">
                <div className="w-3.5 h-3.5 bg-neutral-300 dark:bg-neutral-700 rounded-sm" />
                Tags (Optional)
              </span>
              <div className="h-10 w-full bg-neutral-50 dark:bg-neutral-900 rounded-sm border border-border animate-pulse" />
            </div>

            {/* Submit */}
            <div className="h-11 w-full bg-neutral-900 dark:bg-neutral-100 rounded-md opacity-[0.12]" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
