import { db } from '@/lib/db'
import { Card, CardContent } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Trophy, Medal, Award } from 'lucide-react'
import { cn } from '@/lib/utils'

function RankMedal({ rank }: { rank: number }) {
  if (rank === 1) return <div className="mx-auto w-8 h-8 rounded-full bg-yellow-400/20 text-yellow-500 flex items-center justify-center font-bold border border-yellow-400/50 shadow-sm shadow-yellow-400/20"><Trophy className="w-4 h-4" /></div>
  if (rank === 2) return <div className="mx-auto w-8 h-8 rounded-full bg-slate-300/20 text-slate-400 flex items-center justify-center font-bold border border-slate-300/50 shadow-sm shadow-slate-300/20"><Medal className="w-4 h-4" /></div>
  if (rank === 3) return <div className="mx-auto w-8 h-8 rounded-full bg-amber-600/20 text-amber-600 flex items-center justify-center font-bold border border-amber-600/50 shadow-sm shadow-amber-600/20"><Award className="w-4 h-4" /></div>
  return <div className="mx-auto w-8 h-8 flex items-center justify-center text-muted-foreground font-semibold">{rank}</div>
}

export default async function LeaderboardPage() {
  const users = await db.profile.findMany({
    orderBy: { skill_rating: 'desc' },
    take: 50
  })

  const getRatingColor = (rating: number) => {
    if (rating < 1000) return "bg-gray-500/10 text-gray-500 border-gray-500/20"
    if (rating < 1200) return "bg-green-500/10 text-green-500 border-green-500/20"
    if (rating < 1500) return "bg-blue-500/10 text-blue-500 border-blue-500/20"
    return "bg-purple-500/10 text-purple-500 border-purple-500/20"
  }

  return (
    <div className="max-w-4xl mx-auto mt-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center space-y-2 mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight">Global Leaderboard</h1>
        <p className="text-muted-foreground text-lg">Top 50 SquadCP participants ranked by Skill Rating.</p>
      </div>
      
      {users.length > 0 && (
        <div className="grid grid-cols-3 gap-4 mb-8 items-end px-4 sm:px-12">
          {users[1] && (
            <Card className="glass border-slate-300/30 bg-gradient-to-t from-slate-300/5 to-transparent relative overflow-hidden order-1">
              <div className="absolute top-0 inset-x-0 h-1 bg-slate-400" />
              <CardContent className="p-6 text-center space-y-2">
                <Medal className="w-8 h-8 text-slate-400 mx-auto" />
                <h3 className="font-bold text-lg truncate">{users[1].username}</h3>
                <Badge variant="outline" className={cn("mt-1", getRatingColor(users[1].skill_rating))}>{users[1].skill_rating}</Badge>
              </CardContent>
            </Card>
          )}
          {users[0] && (
            <Card className="glass border-yellow-400/30 bg-gradient-to-t from-yellow-400/5 to-transparent relative overflow-hidden order-2 scale-110 z-10 shadow-xl shadow-yellow-400/5">
              <div className="absolute top-0 inset-x-0 h-1 bg-yellow-400" />
              <CardContent className="p-6 text-center space-y-2">
                <Trophy className="w-10 h-10 text-yellow-500 mx-auto" />
                <h3 className="font-bold text-xl truncate">{users[0].username}</h3>
                <Badge variant="outline" className={cn("mt-1", getRatingColor(users[0].skill_rating))}>{users[0].skill_rating}</Badge>
              </CardContent>
            </Card>
          )}
          {users[2] && (
            <Card className="glass border-amber-600/30 bg-gradient-to-t from-amber-600/5 to-transparent relative overflow-hidden order-3">
              <div className="absolute top-0 inset-x-0 h-1 bg-amber-600" />
              <CardContent className="p-6 text-center space-y-2">
                <Award className="w-8 h-8 text-amber-600 mx-auto" />
                <h3 className="font-bold text-lg truncate">{users[2].username}</h3>
                <Badge variant="outline" className={cn("mt-1", getRatingColor(users[2].skill_rating))}>{users[2].skill_rating}</Badge>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      <Card className="glass overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50 border-b-border/50">
                <TableHead className="w-20 text-center">Rank</TableHead>
                <TableHead>User</TableHead>
                <TableHead className="text-right">Level</TableHead>
                <TableHead className="text-right">Skill Rating</TableHead>
                <TableHead className="text-right">Contests</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user: any, idx: number) => (
                <TableRow key={user.id} className="hover:bg-muted/30 transition-colors">
                  <TableCell className="p-2">
                    <RankMedal rank={idx + 1} />
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-semibold text-foreground">{user.username}</span>
                      {user.cf_handle && (
                        <a href={`https://codeforces.com/profile/${user.cf_handle}`} target="_blank" rel="noreferrer" className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                          {user.cf_handle}
                        </a>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-medium text-foreground">{user.current_level}</TableCell>
                  <TableCell className="text-right">
                    <Badge variant="outline" className={getRatingColor(user.skill_rating)}>{user.skill_rating}</Badge>
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">{user.skill_contests}</TableCell>
                </TableRow>
              ))}
              {users.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-12 text-muted-foreground">No users yet. Be the first to join!</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  )
}
