import { Card, CardContent } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

export default function LeaderboardLoading() {
  return (
    <div className="w-full mt-2 space-y-10 animate-in fade-in duration-200">
      {/* Header — matches: text-3xl + text-base */}
      <div className="space-y-1.5">
        <div className="h-9 w-[180px] bg-neutral-200 dark:bg-neutral-800 rounded-sm animate-pulse" />
        <div className="h-6 w-[340px] bg-neutral-100 dark:bg-neutral-900 rounded-sm animate-pulse" />
      </div>

      {/* Podium */}
      <div className="grid grid-cols-3 gap-6 items-end px-2 sm:px-12 max-w-4xl mx-auto">
        {/* Silver */}
        <Card className="bg-card border border-border rounded-md border-t-2 border-t-neutral-400 order-1">
          <CardContent className="p-6 text-center space-y-2">
            <div className="w-8 h-8 bg-neutral-300/20 rounded-sm mx-auto animate-pulse" />
            <div className="h-6 w-[80px] bg-neutral-200 dark:bg-neutral-800 rounded-sm animate-pulse mx-auto" />
            <div className="h-5 w-12 bg-neutral-100 dark:bg-neutral-900 rounded-sm animate-pulse mx-auto" />
          </CardContent>
        </Card>
        {/* Gold */}
        <Card className="bg-card border border-border rounded-md border-t-2 border-t-amber-500 order-2 scale-110 z-10 shadow-sm">
          <CardContent className="p-6 text-center space-y-2">
            <div className="w-10 h-10 bg-amber-500/15 rounded-sm mx-auto animate-pulse" />
            <div className="h-7 w-[96px] bg-neutral-200 dark:bg-neutral-800 rounded-sm animate-pulse mx-auto" />
            <div className="h-6 w-14 bg-neutral-200 dark:bg-neutral-800 rounded-sm animate-pulse mx-auto" />
          </CardContent>
        </Card>
        {/* Bronze */}
        <Card className="bg-card border border-border rounded-md border-t-2 border-t-amber-700 order-3">
          <CardContent className="p-6 text-center space-y-2">
            <div className="w-8 h-8 bg-amber-700/15 rounded-sm mx-auto animate-pulse" />
            <div className="h-6 w-[80px] bg-neutral-200 dark:bg-neutral-800 rounded-sm animate-pulse mx-auto" />
            <div className="h-5 w-12 bg-neutral-100 dark:bg-neutral-900 rounded-sm animate-pulse mx-auto" />
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <Card className="bg-card border border-border rounded-md overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-neutral-50 dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-900">
                <TableHead className="w-20 py-4 text-center text-xs uppercase tracking-wider text-neutral-500 font-medium">Rank</TableHead>
                <TableHead className="py-4 text-xs uppercase tracking-wider text-neutral-500 font-medium">User</TableHead>
                <TableHead className="py-4 text-right text-xs uppercase tracking-wider text-neutral-500 font-medium">Level</TableHead>
                <TableHead className="py-4 text-right text-xs uppercase tracking-wider text-neutral-500 font-medium">Rating</TableHead>
                <TableHead className="py-4 text-right text-xs uppercase tracking-wider text-neutral-500 font-medium">Contests</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...Array(8)].map((_, i) => (
                <TableRow key={i}>
                  <TableCell className="p-3">
                    <div className="mx-auto w-8 h-8 bg-neutral-100 dark:bg-neutral-800 rounded-sm animate-pulse" />
                  </TableCell>
                  <TableCell className="py-3">
                    <div className="flex flex-col gap-1.5">
                      <div className="h-6 bg-neutral-200 dark:bg-neutral-800 rounded-sm animate-pulse" style={{ width: `${100 + (i % 3) * 20}px` }} />
                      <div className="h-4 bg-neutral-100 dark:bg-neutral-900 rounded-sm animate-pulse" style={{ width: `${80 + (i % 2) * 16}px` }} />
                    </div>
                  </TableCell>
                  <TableCell className="py-3 text-right">
                    <div className="h-6 w-8 bg-neutral-200 dark:bg-neutral-800 rounded-sm animate-pulse ml-auto" />
                  </TableCell>
                  <TableCell className="py-3 text-right">
                    <div className="h-6 w-12 bg-neutral-200 dark:bg-neutral-800 rounded-sm animate-pulse ml-auto" />
                  </TableCell>
                  <TableCell className="py-3 text-right">
                    <div className="h-5 w-5 bg-neutral-100 dark:bg-neutral-900 rounded-sm animate-pulse ml-auto" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  )
}
