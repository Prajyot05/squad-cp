import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function DashboardLoading() {
  return (
    <div className="space-y-10 w-full animate-in fade-in duration-200">
      {/* Header — matches: text-3xl + text-base mt-1 + lg button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <div className="h-9 w-[380px] bg-neutral-200 dark:bg-neutral-800 rounded-sm animate-pulse" />
          <div className="h-6 w-[280px] bg-neutral-100 dark:bg-neutral-900 rounded-sm animate-pulse mt-2" />
        </div>
        <div className="h-11 w-[164px] bg-neutral-900 dark:bg-neutral-100 rounded-md opacity-[0.12]" />
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Skill Rating card */}
        <Card className="bg-card border border-border rounded-md">
          <CardHeader className="pb-3">
            <div className="h-5 w-[100px] bg-neutral-200 dark:bg-neutral-800 rounded-sm animate-pulse" />
          </CardHeader>
          <CardContent className="pb-6">
            <div className="flex items-baseline gap-3">
              <div className="h-12 w-[110px] bg-neutral-200 dark:bg-neutral-800 rounded-sm animate-pulse" />
              <div className="h-6 w-14 bg-emerald-500/20 rounded-sm animate-pulse" />
            </div>
            <div className="h-5 w-[160px] bg-neutral-100 dark:bg-neutral-900 rounded-sm animate-pulse mt-4" />
          </CardContent>
        </Card>

        {/* Current Level card */}
        <Card className="bg-card border border-border rounded-md">
          <CardHeader className="pb-3">
            <div className="h-5 w-[120px] bg-neutral-200 dark:bg-neutral-800 rounded-sm animate-pulse" />
          </CardHeader>
          <CardContent className="pb-6">
            <div className="flex items-baseline gap-2">
              <div className="h-12 w-16 bg-neutral-200 dark:bg-neutral-800 rounded-sm animate-pulse" />
              <div className="h-5 w-12 bg-neutral-100 dark:bg-neutral-900 rounded-sm animate-pulse" />
            </div>
            <div className="mt-4 w-full bg-neutral-200 dark:bg-neutral-800 rounded-sm h-1.5" />
            <div className="h-5 w-[100px] bg-neutral-100 dark:bg-neutral-900 rounded-sm animate-pulse mt-4" />
          </CardContent>
        </Card>

        {/* Codeforces card */}
        <Card className="bg-card border border-border rounded-md flex flex-col justify-between">
          <CardHeader className="pb-3">
            <div className="h-5 w-[90px] bg-neutral-200 dark:bg-neutral-800 rounded-sm animate-pulse" />
          </CardHeader>
          <CardContent className="pb-6 flex flex-col justify-between flex-1">
            <div className="mb-4">
              <div className="h-8 w-[160px] bg-neutral-200 dark:bg-neutral-800 rounded-sm animate-pulse" />
              <div className="h-5 w-[110px] bg-neutral-100 dark:bg-neutral-900 rounded-sm animate-pulse mt-2" />
            </div>
            <div className="h-10 w-full bg-neutral-200 dark:bg-neutral-800 rounded-md animate-pulse border border-border" />
          </CardContent>
        </Card>
      </div>

      {/* Recent Contests */}
      <div className="pt-2">
        <div className="h-7 w-[180px] bg-neutral-200 dark:bg-neutral-800 rounded-sm animate-pulse mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="bg-card border border-border rounded-md flex flex-col justify-between">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-5">
                  <div className="h-6 w-[160px] bg-neutral-200 dark:bg-neutral-800 rounded-sm animate-pulse" />
                  <div className="h-6 w-[70px] bg-neutral-100 dark:bg-neutral-900 rounded-sm animate-pulse border border-border" />
                </div>
                <div className="text-sm space-y-2.5 mb-6">
                  {['Level', 'Duration', 'Score'].map(label => (
                    <div key={label} className="flex justify-between border-b border-border pb-1.5">
                      <div className="h-5 w-16 bg-neutral-100 dark:bg-neutral-900 rounded-sm animate-pulse" />
                      <div className="h-5 w-12 bg-neutral-200 dark:bg-neutral-800 rounded-sm animate-pulse" />
                    </div>
                  ))}
                </div>
                <div className="h-10 w-full bg-neutral-200 dark:bg-neutral-800 rounded-md animate-pulse border border-border" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
