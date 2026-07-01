import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Activity } from 'lucide-react'

export default function Standings({ participants, contest }: { participants: any[], contest?: any }) {
  const sorted = [...participants].sort((a, b) => {
    if (a.total_score !== b.total_score) return b.total_score - a.total_score
    return (a.last_solve_sec || 0) - (b.last_solve_sec || 0)
  })

  // If team mode, we only need one participant to represent the team score since they are synced
  const displayItems = contest?.is_team_mode && sorted.length > 0 ? [sorted[0]] : sorted

  return (
    <div className="space-y-3 sticky top-20">
      <h3 className="text-xs font-medium uppercase tracking-wider text-neutral-500 pb-2 border-b border-border">
        {contest?.is_team_mode ? 'Team Standings' : 'Live Standings'}
      </h3>
      <div className="rounded-md border border-border overflow-hidden bg-card">
        <Table>
          <TableHeader>
            <TableRow className="bg-neutral-50 dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-900">
              <TableHead className="w-10 text-center text-[10px] uppercase tracking-wider text-neutral-500 font-medium">#</TableHead>
              <TableHead className="text-[10px] uppercase tracking-wider text-neutral-500 font-medium">{contest?.is_team_mode ? 'Team' : 'Handle'}</TableHead>
              <TableHead className="text-right pr-4 text-[10px] uppercase tracking-wider text-neutral-500 font-medium">
                Score
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayItems.map((p, idx) => (
              <TableRow key={p.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition-colors">
                <TableCell className="text-center font-mono text-xs font-medium text-neutral-500">{idx + 1}</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium text-sm text-foreground flex items-center gap-1.5">
                      {contest?.is_team_mode ? contest.team?.name : p.user.username}
                      {p.total_score > 0 && <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" title="Active" />}
                    </span>
                    {!contest?.is_team_mode && (
                      <span className="text-[10px] text-neutral-400 font-mono">{p.user.cf_handle || 'unlinked'}</span>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-right pr-4">
                  <div className="flex flex-col items-end">
                    <span className={`font-mono text-sm font-bold ${p.total_score > 0 ? 'text-emerald-500' : 'text-neutral-500'}`}>
                      {p.total_score}
                    </span>
                    {(p.wrong_attempts || 0) > 0 && (
                      <span className="text-[10px] text-red-500/80 font-mono mt-0.5" title="Points lost due to wrong submissions (-50 per wrong attempt)">
                        -{p.wrong_attempts * 50} pts penalty
                      </span>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {displayItems.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-8 text-neutral-500">
                  <div className="flex flex-col items-center gap-2">
                    <Activity className="w-5 h-5 text-neutral-400" />
                    <span className="text-xs">No participants yet</span>
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
