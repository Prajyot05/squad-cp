import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

export default function ProfileLoading() {
  return (
    <div className="w-full mt-2 space-y-10 animate-in fade-in duration-200">
      {/* Profile header */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 bg-card p-8 rounded-md border border-border">
        <div className="w-28 h-28 rounded-md bg-neutral-200 dark:bg-neutral-800 border border-border animate-pulse" />
        <div className="text-center md:text-left flex-1 mt-2 md:mt-0">
          <div className="h-9 w-[220px] bg-neutral-200 dark:bg-neutral-800 rounded-sm animate-pulse mx-auto md:mx-0" />
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-neutral-100 dark:bg-neutral-800 border border-border animate-pulse">
              <div className="w-4 h-4 bg-neutral-300 dark:bg-neutral-700 rounded-sm" />
              <div className="h-5 w-[80px] bg-neutral-300 dark:bg-neutral-700 rounded-sm" />
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-neutral-100 dark:bg-neutral-800 border border-border animate-pulse">
              <div className="w-4 h-4 bg-neutral-300 dark:bg-neutral-700 rounded-sm" />
              <div className="h-5 w-[90px] bg-neutral-300 dark:bg-neutral-700 rounded-sm" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {['Skill Rating', 'Contests', 'Level', 'Peak Level'].map((label) => (
          <Card key={label} className="bg-card border border-border rounded-md">
            <CardHeader className="pb-3">
              <span className="text-xs text-neutral-500 font-medium uppercase tracking-wider">{label}</span>
            </CardHeader>
            <CardContent className="pb-6">
              <div className="h-9 w-[60px] bg-neutral-200 dark:bg-neutral-800 rounded-sm animate-pulse" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Rating History */}
      <Card className="bg-card border border-border rounded-md overflow-hidden">
        <CardHeader className="border-b border-border bg-neutral-50 dark:bg-neutral-900 py-4 px-6">
          <span className="text-base font-semibold text-foreground">Rating History</span>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-neutral-50 dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-900">
                <TableHead className="py-4 px-6 text-xs uppercase tracking-wider text-neutral-500 font-medium">Contest</TableHead>
                <TableHead className="py-4 text-center text-xs uppercase tracking-wider text-neutral-500 font-medium">Rank</TableHead>
                <TableHead className="py-4 text-center text-xs uppercase tracking-wider text-neutral-500 font-medium">Score</TableHead>
                <TableHead className="py-4 text-right text-xs uppercase tracking-wider text-neutral-500 font-medium">Level</TableHead>
                <TableHead className="py-4 px-6 text-right text-xs uppercase tracking-wider text-neutral-500 font-medium">Rating</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...Array(5)].map((_, i) => (
                <TableRow key={i}>
                  <TableCell className="py-4 px-6">
                    <div className="h-6 bg-neutral-200 dark:bg-neutral-800 rounded-sm animate-pulse" style={{ width: `${120 + (i % 3) * 40}px` }} />
                  </TableCell>
                  <TableCell className="py-4 text-center">
                    <div className="h-5 w-8 bg-neutral-100 dark:bg-neutral-900 rounded-sm animate-pulse mx-auto" />
                  </TableCell>
                  <TableCell className="py-4 text-center">
                    <div className="h-6 w-10 bg-neutral-200 dark:bg-neutral-800 rounded-sm animate-pulse mx-auto" />
                  </TableCell>
                  <TableCell className="py-4 text-right">
                    <div className="h-6 w-14 bg-neutral-200 dark:bg-neutral-800 rounded-sm animate-pulse ml-auto" />
                  </TableCell>
                  <TableCell className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <div className="h-6 w-12 bg-neutral-200 dark:bg-neutral-800 rounded-sm animate-pulse" />
                      <div className="h-4 w-10 bg-neutral-100 dark:bg-neutral-900 rounded-sm animate-pulse" />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
