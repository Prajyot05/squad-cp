import { Card, CardContent, CardHeader } from '@/components/ui/card'

export default function AdminLoading() {
  return (
    <div className="w-full mt-2 animate-in fade-in duration-200">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
        {/* Left Column - Context */}
        <div className="md:col-span-4 space-y-4">
          <div className="h-9 w-[220px] bg-neutral-200 dark:bg-neutral-800 rounded-sm animate-pulse" />
          <div className="space-y-2">
            <div className="h-6 w-full bg-neutral-100 dark:bg-neutral-900 rounded-sm animate-pulse" />
            <div className="h-6 w-[90%] bg-neutral-100 dark:bg-neutral-900 rounded-sm animate-pulse" />
          </div>
        </div>

        {/* Right Column - Controls */}
        <div className="md:col-span-8 md:max-w-2xl space-y-6">
          {/* Problem Cache card */}
          <Card className="bg-card border border-border rounded-md shadow-sm">
            <CardHeader className="pb-4 border-b border-border bg-neutral-50/50 dark:bg-neutral-900/50">
              <div className="space-y-1.5">
                <span className="flex items-center gap-2 text-base font-semibold">
                  <div className="w-4 h-4 bg-neutral-300 dark:bg-neutral-700 rounded-sm animate-pulse" />
                  Problem Cache
                </span>
                <span className="text-sm text-neutral-500 block">Manage the local Codeforces problem cache.</span>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              {/* Stats panel */}
              <div className="grid grid-cols-2 gap-6 bg-neutral-50 dark:bg-neutral-900 p-5 rounded-md border border-border">
                <div>
                  <span className="text-xs font-medium uppercase tracking-wider text-neutral-500 mb-2 block">Problems Available</span>
                  <div className="h-9 w-[80px] bg-neutral-200 dark:bg-neutral-800 rounded-sm animate-pulse" />
                </div>
                <div>
                  <span className="text-xs font-medium uppercase tracking-wider text-neutral-500 mb-2 block">Last Synchronized</span>
                  <div className="h-6 w-[70px] bg-neutral-200 dark:bg-neutral-800 rounded-sm animate-pulse" />
                  <div className="h-4 w-[160px] bg-neutral-100 dark:bg-neutral-900 rounded-sm animate-pulse mt-1.5" />
                </div>
              </div>

              {/* Button area */}
              <div className="pt-2 border-t border-border mt-6">
                <div className="h-11 w-[220px] bg-neutral-900 dark:bg-neutral-100 rounded-md opacity-[0.12] mt-6" />
                <div className="h-4 w-full max-w-[480px] bg-neutral-100 dark:bg-neutral-900 rounded-sm animate-pulse mt-3" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
