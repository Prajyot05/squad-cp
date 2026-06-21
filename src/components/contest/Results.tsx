import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Trophy, TrendingUp, TrendingDown, ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function Results({ contest, standings, currentUserId }: { contest: any, standings: any[], currentUserId: string }) {
  const sorted = [...standings].sort((a, b) => (a.final_rank || 999) - (b.final_rank || 999))
  const winner = sorted[0]

  return (
    <div className="space-y-5">
      
      {winner && (
        <div className="border-t-2 border-amber-500 bg-card border border-border rounded-md p-5 flex items-center gap-5">
          <div className="w-12 h-12 rounded-md bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] font-medium uppercase tracking-wider text-amber-500 mb-0.5">Contest Winner</p>
            <p className="text-2xl font-bold text-foreground">{winner.user.username}</p>
            <p className="text-xs text-neutral-500 mt-0.5 font-mono">{winner.total_score} pts · {winner.problems_solved} solved</p>
          </div>
        </div>
      )}

      <Card className="bg-card border border-border rounded-md overflow-hidden">
        <CardHeader className="border-b border-border bg-neutral-50 dark:bg-neutral-900 py-3">
          <CardTitle className="text-sm font-semibold text-foreground">Final Results — {contest.title}</CardTitle>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-neutral-50 dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-900">
                <TableHead className="w-14 text-center text-[10px] uppercase tracking-wider text-neutral-500 font-medium">Rank</TableHead>
                <TableHead className="text-[10px] uppercase tracking-wider text-neutral-500 font-medium">User</TableHead>
                <TableHead className="text-right text-[10px] uppercase tracking-wider text-neutral-500 font-medium">Score</TableHead>
                <TableHead className="text-right text-[10px] uppercase tracking-wider text-neutral-500 font-medium">Skill</TableHead>
                <TableHead className="text-right pr-4 text-[10px] uppercase tracking-wider text-neutral-500 font-medium">Level</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sorted.map((p) => {
                const skillDelta = p.skill_after - p.skill_before
                const levelDelta = p.level_after - p.level_before
                const isMe = p.user_id === currentUserId
                
                return (
                  <TableRow key={p.id} className={cn(isMe ? 'bg-neutral-50 dark:bg-neutral-900/50' : '', "hover:bg-neutral-50 dark:hover:bg-neutral-900/30 transition-colors")}>
                    <TableCell className="text-center font-mono font-bold text-sm">
                      {p.final_rank === 1 ? '🥇' : p.final_rank === 2 ? '🥈' : p.final_rank === 3 ? '🥉' : <span className="text-neutral-500">{p.final_rank}</span>}
                    </TableCell>
                    <TableCell className="font-medium text-sm text-foreground">
                      {p.user.username} {isMe && <Badge variant="outline" className="ml-2 text-[9px] font-mono uppercase bg-neutral-200 dark:bg-neutral-800 text-foreground border-border">YOU</Badge>}
                    </TableCell>
                    <TableCell className="text-right font-mono font-bold text-sm">{p.total_score}</TableCell>
                    <TableCell className="text-right">
                      <span className="font-mono text-sm">{p.skill_after}</span>
                      <span className={cn("ml-2 text-[10px] font-mono font-semibold inline-flex items-center", 
                        skillDelta > 0 ? 'text-emerald-500' : skillDelta < 0 ? 'text-red-500' : 'text-neutral-400')}>
                        {skillDelta > 0 ? <TrendingUp className="w-3 h-3 mr-0.5" /> : skillDelta < 0 ? <TrendingDown className="w-3 h-3 mr-0.5" /> : ''}
                        {skillDelta > 0 ? '+' : ''}{skillDelta}
                      </span>
                    </TableCell>
                    <TableCell className="text-right pr-4">
                      <span className="font-mono font-bold text-sm">{p.level_after}</span>
                      {levelDelta !== 0 && (
                        <span className={cn("ml-1.5 text-[10px] font-mono font-semibold", levelDelta > 0 ? 'text-emerald-500' : 'text-red-500')}>
                          {levelDelta > 0 ? '↑' : '↓'}{Math.abs(levelDelta)}
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <div className="pt-2 flex justify-center">
        <Link href="/" className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), "gap-2 text-neutral-500 hover:text-foreground text-xs")}>
          <ChevronLeft className="w-3.5 h-3.5" /> Back to Dashboard
        </Link>
      </div>
    </div>
  )
}
