import { Card, CardContent, CardHeader } from '@/components/ui/card'

export default function DashboardLoading() {
  return (
    <div className="space-y-8 mt-2 max-w-5xl mx-auto animate-in fade-in duration-200">
      {/* Header — matches: text-2xl + text-sm mt-1 + button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="h-8 w-80 bg-neutral-200 dark:bg-neutral-800 rounded-sm animate-pulse" />
          <div className="h-5 w-56 bg-neutral-100 dark:bg-neutral-900 rounded-sm animate-pulse mt-1" />
        </div>
        <div className="h-9 w-[145px] bg-neutral-900 dark:bg-neutral-100 rounded-md opacity-[0.12]" />
      </div>

      {/* Stats grid — uses actual Card components for identical spacing */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Skill Rating card */}
        <Card className="bg-card border border-border rounded-md">
          <CardHeader className="pb-2">
            <div className="h-4 w-[88px] bg-neutral-200 dark:bg-neutral-800 rounded-sm animate-pulse" />
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-3">
              <div className="h-10 w-[72px] bg-neutral-200 dark:bg-neutral-800 rounded-sm animate-pulse" />
              <div className="h-4 w-9 bg-emerald-500/20 rounded-sm animate-pulse" />
            </div>
            <div className="h-4 w-[130px] bg-neutral-100 dark:bg-neutral-900 rounded-sm animate-pulse mt-2" />
          </CardContent>
        </Card>

        {/* Current Level card */}
        <Card className="bg-card border border-border rounded-md">
          <CardHeader className="pb-2">
            <div className="h-4 w-[100px] bg-neutral-200 dark:bg-neutral-800 rounded-sm animate-pulse" />
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <div className="h-10 w-10 bg-neutral-200 dark:bg-neutral-800 rounded-sm animate-pulse" />
              <div className="h-4 w-9 bg-neutral-100 dark:bg-neutral-900 rounded-sm animate-pulse" />
            </div>
            <div className="mt-3 w-full bg-neutral-200 dark:bg-neutral-800 rounded-sm h-1" />
            <div className="h-4 w-[72px] bg-neutral-100 dark:bg-neutral-900 rounded-sm animate-pulse mt-2" />
          </CardContent>
        </Card>

        {/* Codeforces card */}
        <Card className="bg-card border border-border rounded-md flex flex-col justify-between">
          <CardHeader className="pb-2">
            <div className="h-4 w-[80px] bg-neutral-200 dark:bg-neutral-800 rounded-sm animate-pulse" />
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <div>
              <div className="h-7 w-[120px] bg-neutral-200 dark:bg-neutral-800 rounded-sm animate-pulse" />
              <div className="h-4 w-[95px] bg-neutral-100 dark:bg-neutral-900 rounded-sm animate-pulse mt-1" />
            </div>
            <div className="h-8 w-full bg-neutral-200 dark:bg-neutral-800 rounded-md animate-pulse border border-border" />
          </CardContent>
        </Card>
      </div>

      {/* Recent Contests */}
      <div className="pt-4">
        <div className="h-6 w-[148px] bg-neutral-200 dark:bg-neutral-800 rounded-sm animate-pulse mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="bg-card border border-border rounded-md flex flex-col justify-between">
              <CardContent className="p-5">
                <div className="flex justify-between items-start mb-4">
                  <div className="h-5 w-[130px] bg-neutral-200 dark:bg-neutral-800 rounded-sm animate-pulse" />
                  <div className="h-5 w-[58px] bg-neutral-100 dark:bg-neutral-900 rounded-sm animate-pulse border border-border" />
                </div>
                <div className="text-xs space-y-1.5 mb-5">
                  {['Level', 'Duration', 'Score'].map(label => (
                    <div key={label} className="flex justify-between border-b border-border pb-1">
                      <div className="h-4 w-14 bg-neutral-100 dark:bg-neutral-900 rounded-sm animate-pulse" />
                      <div className="h-4 w-10 bg-neutral-200 dark:bg-neutral-800 rounded-sm animate-pulse" />
                    </div>
                  ))}
                </div>
                <div className="h-8 w-full bg-neutral-200 dark:bg-neutral-800 rounded-md animate-pulse border border-border" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
