import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

export default function ContestLoading() {
  return (
    <div className="w-full mt-2 grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in duration-200">
      {/* Left panel */}
      <div className="lg:col-span-2 space-y-8">
        {/* Timer header — actual Card with same structure */}
        <Card className="bg-card border border-border rounded-md">
          <CardHeader className="pb-3 border-b border-border">
            <div className="flex justify-between items-center">
              <div className="h-6 w-[180px] bg-neutral-200 dark:bg-neutral-800 rounded-sm animate-pulse" />
              <div className="font-mono text-2xl font-bold tracking-tighter px-3 py-1 rounded-sm bg-neutral-100 dark:bg-neutral-800">
                <div className="h-8 w-[72px] bg-neutral-200 dark:bg-neutral-700 rounded-sm animate-pulse" />
              </div>
            </div>
          </CardHeader>
          <div className="h-0.5 w-full bg-neutral-200 dark:bg-neutral-800" />
          <CardContent className="pt-4">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3 bg-neutral-50 dark:bg-neutral-900 p-3 rounded-sm border border-border">
              <div className="flex items-start gap-2 flex-1">
                <div className="w-4 h-4 bg-amber-500/20 rounded-sm shrink-0 mt-0.5 animate-pulse" />
                <div className="space-y-1 flex-1">
                  <div className="h-3 w-full max-w-[360px] bg-neutral-200 dark:bg-neutral-800 rounded-sm animate-pulse" />
                  <div className="h-3 w-[200px] bg-neutral-100 dark:bg-neutral-900 rounded-sm animate-pulse" />
                </div>
              </div>
              <div className="h-8 w-[98px] bg-neutral-900 dark:bg-neutral-100 rounded-md opacity-[0.12] shrink-0" />
            </div>
          </CardContent>
        </Card>

        {/* Problem rows — actual bordered container with same padding */}
        <div className="bg-card border border-border rounded-md overflow-hidden">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center justify-between px-4 py-3 border-b border-border last:border-b-0">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="w-7 h-7 bg-neutral-100 dark:bg-neutral-800 rounded-sm shrink-0 animate-pulse" />
                <div className="min-w-0 flex-1">
                  <div className="h-5 bg-neutral-200 dark:bg-neutral-800 rounded-sm animate-pulse" style={{ width: `${200 - i * 24}px`, maxWidth: '100%' }} />
                  <div className="flex items-center gap-2 mt-0.5">
                    <div className="h-3 w-8 bg-neutral-100 dark:bg-neutral-900 rounded-sm animate-pulse" />
                    <div className="w-0.5 h-0.5 bg-neutral-300 dark:bg-neutral-700 rounded-full" />
                    <div className="h-3 w-12 bg-neutral-100 dark:bg-neutral-900 rounded-sm animate-pulse" />
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0 ml-3">
                <div className="h-7 w-[62px] bg-neutral-200 dark:bg-neutral-800 rounded-sm border border-border animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel — standings */}
      <div className="lg:col-span-1 lg:border-l lg:border-border lg:pl-6 space-y-3 sticky top-20">
        <span className="text-xs font-medium uppercase tracking-wider text-neutral-500">Live Standings</span>
        <div className="rounded-md border border-border overflow-hidden bg-card">
          <Table>
            <TableHeader>
              <TableRow className="bg-neutral-50 dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-900">
                <TableHead className="w-10 text-center text-[10px] uppercase tracking-wider text-neutral-500 font-medium">#</TableHead>
                <TableHead className="text-[10px] uppercase tracking-wider text-neutral-500 font-medium">Handle</TableHead>
                <TableHead className="text-right pr-4 text-[10px] uppercase tracking-wider text-neutral-500 font-medium">Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...Array(4)].map((_, i) => (
                <TableRow key={i}>
                  <TableCell className="text-center">
                    <div className="h-4 w-4 bg-neutral-200 dark:bg-neutral-800 rounded-sm animate-pulse mx-auto" />
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <div className="h-5 bg-neutral-200 dark:bg-neutral-800 rounded-sm animate-pulse" style={{ width: `${64 + (i % 2) * 20}px` }} />
                      <div className="h-3 bg-neutral-100 dark:bg-neutral-900 rounded-sm animate-pulse" style={{ width: `${48 + (i % 3) * 8}px` }} />
                    </div>
                  </TableCell>
                  <TableCell className="text-right pr-4">
                    <div className="h-5 w-6 bg-neutral-200 dark:bg-neutral-800 rounded-sm animate-pulse ml-auto" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
