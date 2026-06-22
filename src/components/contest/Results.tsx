import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Trophy, TrendingUp, TrendingDown, ChevronLeft, Target, CheckCircle2, XCircle, ExternalLink } from 'lucide-react'
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
          <CardTitle className="text-sm font-semibold text-foreground">Final Results | {contest.title}</CardTitle>
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
      
      <div className="pt-6 space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2 text-foreground">
          <Target className="w-5 h-5 text-primary" /> Contest Problems
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {contest.problems.map((cp: any, idx: number) => {
            const letter = String.fromCharCode(65 + idx)
            const cfUrl = `https://codeforces.com/problemset/problem/${cp.problem.cf_contest_id}/${cp.problem.cf_index}`
            
            const mySub = contest.submissions?.find((s: any) => s.user_id === currentUserId && s.problem_slot === cp.slot)
            const isSolved = mySub?.verdict === 'AC'
            const isAttempted = mySub && mySub.verdict !== 'AC'

            const getRatingColor = (rating: number) => {
              if (rating < 1000) return "text-gray-500 border-gray-500/30 bg-gray-500/10"
              if (rating < 1200) return "text-green-500 border-green-500/30 bg-green-500/10"
              if (rating < 1500) return "text-blue-500 border-blue-500/30 bg-blue-500/10"
              return "text-purple-500 border-purple-500/30 bg-purple-500/10"
            }

            const formatTime = (secs: number) => {
              const m = Math.floor(secs / 60)
              const s = secs % 60
              return `${m}m ${s}s`
            }

            return (
              <Card key={cp.id} className={cn(
                "glass flex flex-col justify-between overflow-hidden relative",
                isSolved ? "border-green-500/50 bg-green-500/5" :
                isAttempted ? "border-red-500/50 bg-red-500/5" : ""
              )}>
                <div className={cn(
                  "absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl -z-10",
                  isSolved ? "from-green-500/20 to-transparent" : 
                  isAttempted ? "from-red-500/20 to-transparent" : 
                  "from-primary/10 to-transparent"
                )} />
                <CardContent className="p-5">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-lg leading-tight w-[80%] line-clamp-2">
                      <span className={cn("mr-2", isSolved ? "text-green-500" : isAttempted ? "text-red-500" : "text-primary")}>{letter}.</span> 
                      {cp.problem.name}
                    </h3>
                    <Badge variant="outline" className={cn("font-mono font-bold ml-2 shrink-0", getRatingColor(cp.problem.rating))}>
                      {cp.problem.rating}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-end mt-6">
                    <div className="text-sm font-semibold flex items-center gap-1.5">
                      {isSolved ? (
                        <div className="flex flex-col">
                          <span className="text-green-500 flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> {cp.max_points} pts</span>
                          <span className="text-xs font-mono text-muted-foreground mt-1">Solved in {formatTime(mySub.elapsed_sec)}</span>
                        </div>
                      ) : isAttempted ? (
                        <div className="flex flex-col">
                          <span className="text-red-500 flex items-center gap-1"><XCircle className="w-4 h-4" /> {mySub.score || 0} pts</span>
                          <span className="text-xs font-mono text-muted-foreground mt-1">Failed at {formatTime(mySub.elapsed_sec)}</span>
                        </div>
                      ) : (
                        <span className="text-muted-foreground flex items-center gap-1.5"><div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center font-mono text-[10px]">{letter}</div> {cp.max_points} pts</span>
                      )}
                    </div>
                    <a href={cfUrl} target="_blank" rel="noopener noreferrer" className={cn(
                      buttonVariants({ variant: isSolved ? 'outline' : 'secondary', size: 'sm' }), 
                      "gap-1.5 transition-colors",
                      isSolved ? "text-green-500 border-green-500/30 hover:bg-green-500/10 hover:text-green-500" : ""
                    )}>
                      {isSolved ? 'Review' : 'Try Again'} <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
      
      <div className="pt-2 flex justify-center">
        <Link href="/" className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), "gap-2 text-neutral-500 hover:text-foreground text-xs")}>
          <ChevronLeft className="w-3.5 h-3.5" /> Back to Dashboard
        </Link>
      </div>
    </div>
  )
}
