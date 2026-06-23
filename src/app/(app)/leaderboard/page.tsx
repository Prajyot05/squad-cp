import { db } from '@/lib/db'
import { Card, CardContent } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Trophy, Medal, Award } from 'lucide-react'

function RankMedal({ rank }: { rank: number }) {
  if (rank === 1) return <div className="mx-auto w-8 h-8 rounded-sm bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold border border-amber-500/20"><Trophy className="w-4 h-4" /></div>
  if (rank === 2) return <div className="mx-auto w-8 h-8 rounded-sm bg-neutral-300/10 text-neutral-400 flex items-center justify-center font-bold border border-neutral-300/20"><Medal className="w-4 h-4" /></div>
  if (rank === 3) return <div className="mx-auto w-8 h-8 rounded-sm bg-amber-700/10 text-amber-700 flex items-center justify-center font-bold border border-amber-700/20"><Award className="w-4 h-4" /></div>
  return <div className="mx-auto w-8 h-8 flex items-center justify-center text-neutral-500 font-mono text-sm font-medium">{rank}</div>
}

export default async function LeaderboardPage() {
  const users = await db.profile.findMany({
    where: { skill_contests: { gt: 0 } },
    orderBy: { skill_rating: 'desc' },
    take: 50
  })

  return (
    <div className="w-full mt-2 space-y-10 animate-in fade-in duration-300">
      <div className="space-y-1.5">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Leaderboard</h1>
        <p className="text-base text-neutral-500">Top 50 participants ranked by Skill Rating.</p>
      </div>
      
      {users.length > 0 && (
        <div className="grid grid-cols-3 gap-6 items-end px-2 sm:px-12 max-w-4xl mx-auto">
          {users[1] && (
            <Card className="bg-card border border-border rounded-md border-t-2 border-t-neutral-400 order-1">
              <CardContent className="p-6 text-center space-y-2">
                <Medal className="w-8 h-8 text-neutral-400 mx-auto" />
                <h3 className="font-bold text-base truncate text-foreground">{users[1].username}</h3>
                <p className="font-mono text-sm text-neutral-500">{users[1].skill_rating}</p>
              </CardContent>
            </Card>
          )}
          {users[0] && (
            <Card className="bg-card border border-border rounded-md border-t-2 border-t-amber-500 order-2 scale-110 z-10 shadow-sm">
              <CardContent className="p-6 text-center space-y-2">
                <Trophy className="w-10 h-10 text-amber-500 mx-auto" />
                <h3 className="font-bold text-lg truncate text-foreground">{users[0].username}</h3>
                <p className="font-mono text-base font-semibold text-foreground">{users[0].skill_rating}</p>
              </CardContent>
            </Card>
          )}
          {users[2] && (
            <Card className="bg-card border border-border rounded-md border-t-2 border-t-amber-700 order-3">
              <CardContent className="p-6 text-center space-y-2">
                <Award className="w-8 h-8 text-amber-700 mx-auto" />
                <h3 className="font-bold text-base truncate text-foreground">{users[2].username}</h3>
                <p className="font-mono text-sm text-neutral-500">{users[2].skill_rating}</p>
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
                <TableHead className="w-20 py-4 text-center text-xs uppercase tracking-wider text-neutral-500 font-medium">Rank</TableHead>
                <TableHead className="py-4 text-xs uppercase tracking-wider text-neutral-500 font-medium">User</TableHead>
                <TableHead className="py-4 text-right text-xs uppercase tracking-wider text-neutral-500 font-medium">Level</TableHead>
                <TableHead className="py-4 text-right text-xs uppercase tracking-wider text-neutral-500 font-medium">Rating</TableHead>
                <TableHead className="py-4 text-right text-xs uppercase tracking-wider text-neutral-500 font-medium">Contests</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user: any, idx: number) => (
                <TableRow key={user.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-900/30 transition-colors">
                  <TableCell className="p-3">
                    <RankMedal rank={idx + 1} />
                  </TableCell>
                  <TableCell className="py-3">
                    <div className="flex flex-col">
                      <span className="font-medium text-base text-foreground">{user.username}</span>
                      {user.cf_handle && (
                        <a href={`https://codeforces.com/profile/${user.cf_handle}`} target="_blank" rel="noreferrer" className="text-xs text-neutral-400 hover:text-foreground transition-colors font-mono">
                          {user.cf_handle}
                        </a>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="py-3 text-right font-mono text-base font-medium text-foreground">{user.current_level}</TableCell>
                  <TableCell className="py-3 text-right">
                    <span className="font-mono text-base font-bold text-foreground">{user.skill_rating}</span>
                  </TableCell>
                  <TableCell className="py-3 text-right font-mono text-sm text-neutral-500">{user.skill_contests}</TableCell>
                </TableRow>
              ))}
              {users.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-16 text-neutral-500 text-base">No users yet. Be the first to join!</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  )
}
