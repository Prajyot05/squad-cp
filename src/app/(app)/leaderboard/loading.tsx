import { Card, CardContent } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

export default function LeaderboardLoading() {
  return (
    <div className="max-w-4xl mx-auto mt-2 space-y-6 animate-in fade-in duration-200">
      {/* Header — matches: text-2xl + text-sm */}
      <div className="space-y-1">
        <div className="h-8 w-[156px] bg-neutral-200 dark:bg-neutral-800 rounded-sm animate-pulse" />
        <div className="h-5 w-[320px] bg-neutral-100 dark:bg-neutral-900 rounded-sm animate-pulse" />
      </div>

      {/* Podium — uses actual Card/CardContent with identical classes */}
      <div className="grid grid-cols-3 gap-3 items-end px-2 sm:px-8">
        {/* Silver */}
        <Card className="bg-card border border-border rounded-md border-t-2 border-t-neutral-400 order-1">
          <CardContent className="p-5 text-center space-y-1.5">
            <div className="w-6 h-6 bg-neutral-300/20 rounded-sm mx-auto animate-pulse" />
            <div className="h-5 w-[72px] bg-neutral-200 dark:bg-neutral-800 rounded-sm animate-pulse mx-auto" />
            <div className="h-4 w-10 bg-neutral-100 dark:bg-neutral-900 rounded-sm animate-pulse mx-auto" />
          </CardContent>
        </Card>
        {/* Gold */}
        <Card className="bg-card border border-border rounded-md border-t-2 border-t-amber-500 order-2 scale-105 z-10 shadow-sm">
          <CardContent className="p-5 text-center space-y-1.5">
            <div className="w-7 h-7 bg-amber-500/15 rounded-sm mx-auto animate-pulse" />
            <div className="h-6 w-[88px] bg-neutral-200 dark:bg-neutral-800 rounded-sm animate-pulse mx-auto" />
            <div className="h-5 w-12 bg-neutral-200 dark:bg-neutral-800 rounded-sm animate-pulse mx-auto" />
          </CardContent>
        </Card>
        {/* Bronze */}
        <Card className="bg-card border border-border rounded-md border-t-2 border-t-amber-700 order-3">
          <CardContent className="p-5 text-center space-y-1.5">
            <div className="w-6 h-6 bg-amber-700/15 rounded-sm mx-auto animate-pulse" />
            <div className="h-5 w-[72px] bg-neutral-200 dark:bg-neutral-800 rounded-sm animate-pulse mx-auto" />
            <div className="h-4 w-10 bg-neutral-100 dark:bg-neutral-900 rounded-sm animate-pulse mx-auto" />
          </CardContent>
        </Card>
      </div>

      {/* Table — uses actual Table components for identical cell sizing */}
      <Card className="bg-card border border-border rounded-md overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-neutral-50 dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-900">
                <TableHead className="w-16 text-center text-[10px] uppercase tracking-wider text-neutral-500 font-medium">Rank</TableHead>
                <TableHead className="text-[10px] uppercase tracking-wider text-neutral-500 font-medium">User</TableHead>
                <TableHead className="text-right text-[10px] uppercase tracking-wider text-neutral-500 font-medium">Level</TableHead>
                <TableHead className="text-right text-[10px] uppercase tracking-wider text-neutral-500 font-medium">Rating</TableHead>
                <TableHead className="text-right text-[10px] uppercase tracking-wider text-neutral-500 font-medium">Contests</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...Array(8)].map((_, i) => (
                <TableRow key={i}>
                  <TableCell className="p-2">
                    <div className="mx-auto w-7 h-7 bg-neutral-100 dark:bg-neutral-800 rounded-sm animate-pulse" />
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <div className="h-5 bg-neutral-200 dark:bg-neutral-800 rounded-sm animate-pulse" style={{ width: `${80 + (i % 3) * 20}px` }} />
                      <div className="h-3 bg-neutral-100 dark:bg-neutral-900 rounded-sm animate-pulse" style={{ width: `${60 + (i % 2) * 16}px` }} />
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="h-5 w-6 bg-neutral-200 dark:bg-neutral-800 rounded-sm animate-pulse ml-auto" />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="h-5 w-10 bg-neutral-200 dark:bg-neutral-800 rounded-sm animate-pulse ml-auto" />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="h-4 w-4 bg-neutral-100 dark:bg-neutral-900 rounded-sm animate-pulse ml-auto" />
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
