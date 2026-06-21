import { db } from '@/lib/db'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'

export default async function LeaderboardPage() {
  const users = await db.profile.findMany({
    orderBy: { skill_rating: 'desc' },
    take: 50
  })

  return (
    <div className="max-w-4xl mx-auto mt-10 space-y-6">
      <h1 className="text-4xl font-extrabold tracking-tight">Global Leaderboard</h1>
      <p className="text-muted-foreground text-lg">Top 50 SquadCP participants ranked by Skill Rating.</p>
      
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                <TableHead className="w-16 text-center">Rank</TableHead>
                <TableHead>User</TableHead>
                <TableHead className="text-right">Level</TableHead>
                <TableHead className="text-right">Skill Rating</TableHead>
                <TableHead className="text-right">Contests</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user: any, idx: number) => (
                <TableRow key={user.id}>
                  <TableCell className="text-center font-bold">{idx + 1}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-semibold">{user.username}</span>
                      <span className="text-xs text-muted-foreground">{user.cf_handle || 'No CF Linked'}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-medium">{user.current_level}</TableCell>
                  <TableCell className="text-right">
                    <Badge variant="secondary" className="text-sm">{user.skill_rating}</Badge>
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">{user.skill_contests}</TableCell>
                </TableRow>
              ))}
              {users.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">No users yet.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
