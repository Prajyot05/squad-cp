import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

export default function ProfileLoading() {
  return (
    <div className="max-w-5xl mx-auto mt-2 space-y-6 animate-in fade-in duration-200">
      {/* Profile header — exact same wrapper classes */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-5 bg-card p-5 rounded-md border border-border">
        <div className="w-20 h-20 rounded-md bg-neutral-200 dark:bg-neutral-800 border border-border animate-pulse" />
        <div className="text-center md:text-left flex-1">
          <div className="h-8 w-[180px] bg-neutral-200 dark:bg-neutral-800 rounded-sm animate-pulse mx-auto md:mx-0" />
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mt-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-neutral-100 dark:bg-neutral-800 border border-border animate-pulse">
              <div className="w-3 h-3 bg-neutral-300 dark:bg-neutral-700 rounded-sm" />
              <div className="h-4 w-[72px] bg-neutral-300 dark:bg-neutral-700 rounded-sm" />
            </div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-neutral-100 dark:bg-neutral-800 border border-border animate-pulse">
              <div className="w-3 h-3 bg-neutral-300 dark:bg-neutral-700 rounded-sm" />
              <div className="h-4 w-[80px] bg-neutral-300 dark:bg-neutral-700 rounded-sm" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats grid — actual Card components, matching text-2xl heights */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {['Skill Rating', 'Contests', 'Level', 'Peak Level'].map((label) => (
          <Card key={label} className="bg-card border border-border rounded-md">
            <CardHeader className="pb-1">
              <span className="text-[10px] text-neutral-500 font-medium uppercase tracking-wider">{label}</span>
            </CardHeader>
            <CardContent>
              <div className="h-8 w-[52px] bg-neutral-200 dark:bg-neutral-800 rounded-sm animate-pulse" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Rating History — actual Table components with real headers */}
      <Card className="bg-card border border-border rounded-md overflow-hidden">
        <CardHeader className="border-b border-border bg-neutral-50 dark:bg-neutral-900 py-3">
          <span className="text-sm font-semibold text-foreground">Rating History</span>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-neutral-50 dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-900">
                <TableHead className="text-[10px] uppercase tracking-wider text-neutral-500 font-medium">Contest</TableHead>
                <TableHead className="text-center text-[10px] uppercase tracking-wider text-neutral-500 font-medium">Rank</TableHead>
                <TableHead className="text-center text-[10px] uppercase tracking-wider text-neutral-500 font-medium">Score</TableHead>
                <TableHead className="text-right text-[10px] uppercase tracking-wider text-neutral-500 font-medium">Level</TableHead>
                <TableHead className="text-right pr-4 text-[10px] uppercase tracking-wider text-neutral-500 font-medium">Rating</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...Array(5)].map((_, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <div className="h-5 bg-neutral-200 dark:bg-neutral-800 rounded-sm animate-pulse" style={{ width: `${100 + (i % 3) * 30}px` }} />
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="h-4 w-6 bg-neutral-100 dark:bg-neutral-900 rounded-sm animate-pulse mx-auto" />
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="h-5 w-8 bg-neutral-200 dark:bg-neutral-800 rounded-sm animate-pulse mx-auto" />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="h-5 w-12 bg-neutral-200 dark:bg-neutral-800 rounded-sm animate-pulse ml-auto" />
                  </TableCell>
                  <TableCell className="text-right pr-4">
                    <div className="flex items-center justify-end gap-2">
                      <div className="h-5 w-10 bg-neutral-200 dark:bg-neutral-800 rounded-sm animate-pulse" />
                      <div className="h-4 w-8 bg-neutral-100 dark:bg-neutral-900 rounded-sm animate-pulse" />
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
