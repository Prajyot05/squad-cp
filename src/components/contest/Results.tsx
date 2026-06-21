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
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {winner && (
        <div className="bg-gradient-to-r from-yellow-400/20 via-yellow-500/10 to-transparent border border-yellow-400/30 p-6 rounded-2xl flex items-center gap-6">
          <div className="w-16 h-16 rounded-full bg-yellow-400/20 text-yellow-500 flex items-center justify-center shrink-0 shadow-inner">
            <Trophy className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-yellow-600 dark:text-yellow-500 uppercase tracking-wider mb-1">Contest Winner</h2>
            <p className="text-3xl font-extrabold">{winner.user.username}</p>
            <p className="text-muted-foreground mt-1 text-sm font-medium">Scored {winner.total_score} points with {winner.problems_solved} problems solved.</p>
          </div>
        </div>
      )}

      <Card className="glass border-border/50 shadow-md">
        <CardHeader className="border-b border-border/50 bg-muted/10">
          <CardTitle className="text-xl">Final Results: {contest.title}</CardTitle>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30">
                <TableHead className="w-16 text-center">Rank</TableHead>
                <TableHead>User</TableHead>
                <TableHead className="text-right">Score</TableHead>
                <TableHead className="text-right">Skill Rating</TableHead>
                <TableHead className="text-right pr-6">Level</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sorted.map((p) => {
                const skillDelta = p.skill_after - p.skill_before
                const levelDelta = p.level_after - p.level_before
                const isMe = p.user_id === currentUserId
                
                return (
                  <TableRow key={p.id} className={cn(isMe ? 'bg-primary/5' : '', "hover:bg-muted/30 transition-colors")}>
                    <TableCell className="text-center font-bold font-mono text-lg">
                      {p.final_rank === 1 ? '🥇' : p.final_rank === 2 ? '🥈' : p.final_rank === 3 ? '🥉' : p.final_rank}
                    </TableCell>
                    <TableCell className="font-semibold text-foreground">
                      {p.user.username} {isMe && <Badge variant="outline" className="ml-2 text-[10px] bg-primary/10 text-primary border-primary/20">YOU</Badge>}
                    </TableCell>
                    <TableCell className="text-right font-mono font-bold text-lg">{p.total_score}</TableCell>
                    <TableCell className="text-right">
                      <span className="font-mono">{p.skill_after}</span>
                      <span className={`ml-2 text-xs font-bold inline-flex items-center w-12 ${skillDelta > 0 ? 'text-emerald-500' : skillDelta < 0 ? 'text-destructive' : 'text-muted-foreground'}`}>
                        {skillDelta > 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : skillDelta < 0 ? <TrendingDown className="w-3 h-3 mr-1" /> : ''}
                        {skillDelta > 0 ? '+' : ''}{skillDelta}
                      </span>
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      <span className="font-bold">{p.level_after}</span>
                      {levelDelta !== 0 && (
                        <span className={`ml-2 text-xs font-bold inline-flex items-center ${levelDelta > 0 ? 'text-emerald-500' : 'text-destructive'}`}>
                          {levelDelta > 0 ? '↑' : '↓'} {Math.abs(levelDelta)}
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
      
      <div className="pt-4 flex justify-center">
        <Link href="/" className={cn(buttonVariants({ variant: 'outline' }), "gap-2 shadow-sm")}>
          <ChevronLeft className="w-4 h-4" /> Back to Dashboard
        </Link>
      </div>
    </div>
  )
}
