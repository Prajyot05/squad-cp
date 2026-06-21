import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Trophy, Activity } from 'lucide-react'

export default function Standings({ participants }: { participants: any[] }) {
  const sorted = [...participants].sort((a, b) => {
    if (a.total_score !== b.total_score) return b.total_score - a.total_score
    return (a.last_solve_sec || 0) - (b.last_solve_sec || 0)
  })

  return (
    <div className="space-y-4 sticky top-24">
      <div className="flex items-center gap-2 pb-2 border-b border-border/50">
        <Trophy className="w-5 h-5 text-yellow-500" />
        <h3 className="font-bold text-xl tracking-tight">Live Standings</h3>
      </div>
      <div className="rounded-xl border border-border/50 overflow-hidden bg-card/50 glass shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30">
              <TableHead className="w-12 text-center">#</TableHead>
              <TableHead>User</TableHead>
              <TableHead className="text-right pr-4">Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sorted.map((p, idx) => (
              <TableRow key={p.id} className="hover:bg-muted/30 transition-colors">
                <TableCell className="text-center font-bold text-muted-foreground">{idx + 1}</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-semibold flex items-center gap-1.5">
                      {p.user.username}
                      {p.total_score > 0 && <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" title="Active" />}
                    </span>
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{p.user.cf_handle || 'Unlinked'}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right pr-4">
                  <Badge variant={p.total_score > 0 ? "default" : "secondary"} className="font-mono text-sm px-2">
                    {p.total_score}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
            {sorted.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-8 text-muted-foreground">
                  <div className="flex flex-col items-center gap-2">
                    <Activity className="w-6 h-6 text-muted-foreground/50" />
                    <span>No participants yet</span>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
