import { db } from '@/lib/db'
import { Card, CardContent } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Trophy, Medal, Award } from 'lucide-react'
import { cn } from '@/lib/utils'

function RankMedal({ rank }: { rank: number }) {
  if (rank === 1) return <div className="mx-auto w-7 h-7 rounded-sm bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold border border-amber-500/20"><Trophy className="w-3.5 h-3.5" /></div>
  if (rank === 2) return <div className="mx-auto w-7 h-7 rounded-sm bg-neutral-300/10 text-neutral-400 flex items-center justify-center font-bold border border-neutral-300/20"><Medal className="w-3.5 h-3.5" /></div>
  if (rank === 3) return <div className="mx-auto w-7 h-7 rounded-sm bg-amber-700/10 text-amber-700 flex items-center justify-center font-bold border border-amber-700/20"><Award className="w-3.5 h-3.5" /></div>
  return <div className="mx-auto w-7 h-7 flex items-center justify-center text-neutral-500 font-mono text-xs font-medium">{rank}</div>
}

export default async function LeaderboardPage() {
  const users = await db.profile.findMany({
    where: { skill_contests: { gt: 0 } },
    orderBy: { skill_rating: 'desc' },
    take: 50
  })

  return (
    <div className="max-w-4xl mx-auto mt-2 space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Leaderboard</h1>
        <p className="text-sm text-neutral-500">Top 50 participants ranked by Skill Rating.</p>
      </div>

      {users.length > 0 && (
        <div className="grid grid-cols-3 gap-3 items-end px-2 sm:px-8">
          {users[1] && (
            <Card className="bg-card border border-border rounded-md border-t-2 border-t-neutral-400 order-1">
              <CardContent className="p-5 text-center space-y-1.5">
                <Medal className="w-6 h-6 text-neutral-400 mx-auto" />
                <h3 className="font-bold text-sm truncate text-foreground">{users[1].username}</h3>
                <p className="font-mono text-xs text-neutral-500">{users[1].skill_rating}</p>
              </CardContent>
            </Card>
          )}
          {users[0] && (
            <Card className="bg-card border border-border rounded-md border-t-2 border-t-amber-500 order-2 scale-105 z-10 shadow-sm">
              <CardContent className="p-5 text-center space-y-1.5">
                <Trophy className="w-7 h-7 text-amber-500 mx-auto" />
                <h3 className="font-bold text-base truncate text-foreground">{users[0].username}</h3>
                <p className="font-mono text-sm font-semibold text-foreground">{users[0].skill_rating}</p>
              </CardContent>
            </Card>
          )}
          {users[2] && (
            <Card className="bg-card border border-border rounded-md border-t-2 border-t-amber-700 order-3">
              <CardContent className="p-5 text-center space-y-1.5">
                <Award className="w-6 h-6 text-amber-700 mx-auto" />
                <h3 className="font-bold text-sm truncate text-foreground">{users[2].username}</h3>
                <p className="font-mono text-xs text-neutral-500">{users[2].skill_rating}</p>
              </CardContent>
            </Card>
          )}
        </div>
      )}

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
              {users.map((user: any, idx: number) => (
                <TableRow key={user.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-900/30 transition-colors">
                  <TableCell className="p-2">
                    <RankMedal rank={idx + 1} />
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium text-sm text-foreground">{user.username}</span>
                      {user.cf_handle && (
                        <a href={`https://codeforces.com/profile/${user.cf_handle}`} target="_blank" rel="noreferrer" className="text-[10px] text-neutral-400 hover:text-foreground transition-colors font-mono">
                          {user.cf_handle}
                        </a>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-mono text-sm font-medium text-foreground">{user.current_level}</TableCell>
                  <TableCell className="text-right">
                    <span className="font-mono text-sm font-bold text-foreground">{user.skill_rating}</span>
                  </TableCell>
                  <TableCell className="text-right font-mono text-xs text-neutral-500">{user.skill_contests}</TableCell>
                </TableRow>
              ))}
              {users.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-12 text-neutral-500 text-sm">No users yet. Be the first to join!</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  )
}
