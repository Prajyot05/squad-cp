import { Card, CardContent, CardHeader, CardDescription, CardTitle } from '@/components/ui/card'

export default function AdminLoading() {
  return (
    <div className="max-w-2xl mx-auto space-y-6 mt-2 animate-in fade-in duration-200">
      {/* Header — matches: text-2xl font-bold */}
      <div className="h-8 w-[72px] bg-neutral-200 dark:bg-neutral-800 rounded-sm animate-pulse" />

      {/* Problem Cache card — uses actual Card components */}
      <Card className="bg-card border border-border rounded-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm font-semibold">
            <div className="w-4 h-4 bg-neutral-300 dark:bg-neutral-700 rounded-sm animate-pulse" />
            Problem Cache
          </CardTitle>
          <CardDescription className="text-xs text-neutral-500">Manage the local Codeforces problem cache.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          {/* Stats panel — identical wrapper classes */}
          <div className="grid grid-cols-2 gap-4 bg-neutral-50 dark:bg-neutral-900 p-4 rounded-sm border border-border">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-wider text-neutral-500 mb-1">Problems Available</p>
              <div className="h-8 w-[64px] bg-neutral-200 dark:bg-neutral-800 rounded-sm animate-pulse" />
            </div>
            <div>
              <p className="text-[10px] font-medium uppercase tracking-wider text-neutral-500 mb-1">Last Synchronized</p>
              <div className="h-5 w-[56px] bg-neutral-200 dark:bg-neutral-800 rounded-sm animate-pulse" />
              <div className="h-3 w-[140px] bg-neutral-100 dark:bg-neutral-900 rounded-sm animate-pulse mt-1" />
            </div>
          </div>

          {/* Button area */}
          <div className="pt-1">
            <div className="h-9 w-[178px] bg-neutral-900 dark:bg-neutral-100 rounded-md opacity-[0.12]" />
            <div className="h-3 w-[380px] max-w-full bg-neutral-100 dark:bg-neutral-900 rounded-sm animate-pulse mt-2" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
