import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function CreateContestLoading() {
  return (
    <div className="w-full mt-2 animate-in fade-in duration-200">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
        {/* Left Column - Context */}
        <div className="md:col-span-4 space-y-4">
          <div className="h-9 w-[220px] bg-neutral-200 dark:bg-neutral-800 rounded-sm animate-pulse" />
          <div className="space-y-2">
            <div className="h-6 w-full bg-neutral-100 dark:bg-neutral-900 rounded-sm animate-pulse" />
            <div className="h-6 w-[90%] bg-neutral-100 dark:bg-neutral-900 rounded-sm animate-pulse" />
            <div className="h-6 w-[75%] bg-neutral-100 dark:bg-neutral-900 rounded-sm animate-pulse" />
          </div>
          <div className="hidden md:block pt-6 border-t border-border mt-8">
            <div className="h-5 w-[100px] bg-neutral-200 dark:bg-neutral-800 rounded-sm animate-pulse mb-4" />
            <div className="space-y-3">
              <div className="h-5 w-[85%] bg-neutral-100 dark:bg-neutral-900 rounded-sm animate-pulse ml-4" />
              <div className="h-5 w-[95%] bg-neutral-100 dark:bg-neutral-900 rounded-sm animate-pulse ml-4" />
              <div className="h-5 w-[80%] bg-neutral-100 dark:bg-neutral-900 rounded-sm animate-pulse ml-4" />
            </div>
          </div>
        </div>

        {/* Right Column - Form */}
        <div className="md:col-span-8 md:max-w-2xl">
          <Card className="bg-card border border-border rounded-md shadow-sm">
            <CardHeader className="pb-4 border-b border-border bg-neutral-50/50 dark:bg-neutral-900/50">
              <span className="text-base font-semibold">Contest Configuration</span>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-8">
                {/* Title */}
                <div className="space-y-2.5">
                  <span className="text-sm font-medium text-neutral-500">Contest Title</span>
                  <div className="h-11 w-full bg-transparent border border-border rounded-sm animate-pulse" />
                </div>

                {/* Difficulty Section */}
                <div className="space-y-4 bg-neutral-50 dark:bg-neutral-900 p-5 rounded-md border border-border">
                  <div className="space-y-2.5">
                    <span className="flex items-center gap-2 text-sm font-medium text-foreground">
                      <div className="w-4 h-4 bg-neutral-300 dark:bg-neutral-700 rounded-sm" />
                      Difficulty Level (1 to 109)
                    </span>
                    <div className="h-4 w-[300px] bg-neutral-200 dark:bg-neutral-800 rounded-sm animate-pulse" />
                    <div className="h-11 w-[200px] bg-card border border-border rounded-sm animate-pulse" />
                  </div>
                  <div className="bg-card p-4 rounded-sm border border-border">
                    <span className="text-xs text-neutral-500 font-medium uppercase tracking-wider block mb-3">Estimated Problem Ratings</span>
                    <div className="flex flex-wrap gap-2">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="h-7 w-[52px] bg-neutral-200 dark:bg-neutral-800 rounded-sm border border-border animate-pulse" />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Duration */}
                <div className="space-y-3">
                  <span className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <div className="w-4 h-4 bg-neutral-300 dark:bg-neutral-700 rounded-sm" />
                    Duration
                  </span>
                  <div className="grid grid-cols-4 gap-3">
                    {[30, 60, 90, 120].map((mins, i) => (
                      <div key={mins} className={`h-11 rounded-md flex items-center justify-center text-base font-mono ${i === 3 ? 'bg-neutral-900 dark:bg-neutral-100 opacity-[0.12]' : 'bg-card border border-border'}`}>
                        {i !== 3 && <div className="h-5 w-8 bg-neutral-200 dark:bg-neutral-800 rounded-sm animate-pulse" />}
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-3 pt-2">
                    <div className="w-28 h-11 bg-transparent border border-border rounded-sm animate-pulse" />
                    <span className="text-sm text-neutral-500">Custom minutes</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-2 text-sm font-medium text-foreground">
                      <div className="w-4 h-4 bg-neutral-300 dark:bg-neutral-700 rounded-sm" />
                      Tags (Optional)
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3 min-h-[32px]">
                    <div className="h-8 w-[140px] bg-neutral-100 dark:bg-neutral-900 rounded-sm animate-pulse" />
                  </div>
                  <div className="h-11 w-full bg-transparent border border-border rounded-sm animate-pulse" />
                </div>

                {/* Submit */}
                <div className="h-12 w-full bg-neutral-900 dark:bg-neutral-100 rounded-md opacity-[0.12] mt-4" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
