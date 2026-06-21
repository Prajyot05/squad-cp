import { createClient } from '@/lib/supabase/server'
import { db } from '@/lib/db'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'

export default async function ProfilePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const profile = await db.profile.findUnique({
    where: { id: user.id }
  })

  const history = await db.ratingHistory.findMany({
    where: { user_id: user.id },
    include: { contest: true },
    orderBy: { created_at: 'desc' }
  })

  return (
    <div className="max-w-4xl mx-auto mt-10 space-y-8">
      <div>
        <h1 className="text-4xl font-extrabold tracking-tight">{profile?.username}</h1>
        <p className="text-muted-foreground mt-2 text-lg">
          {profile?.cf_handle ? `Codeforces: ${profile.cf_handle}` : 'No Codeforces handle linked.'}
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-muted/30">
          <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground font-semibold uppercase tracking-wider">Skill Rating</CardTitle></CardHeader>
          <CardContent><p className="text-3xl font-bold">{profile?.skill_rating}</p></CardContent>
        </Card>
        <Card className="bg-muted/30">
          <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground font-semibold uppercase tracking-wider">Contests Played</CardTitle></CardHeader>
          <CardContent><p className="text-3xl font-bold">{profile?.skill_contests}</p></CardContent>
        </Card>
        <Card className="bg-muted/30">
          <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground font-semibold uppercase tracking-wider">Current Level</CardTitle></CardHeader>
          <CardContent><p className="text-3xl font-bold">{profile?.current_level}</p></CardContent>
        </Card>
        <Card className="bg-muted/30">
          <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground font-semibold uppercase tracking-wider">Highest Level</CardTitle></CardHeader>
          <CardContent><p className="text-3xl font-bold">{profile?.highest_level}</p></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Rating History</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                <TableHead>Contest</TableHead>
                <TableHead className="text-center">Rank</TableHead>
                <TableHead className="text-center">Score</TableHead>
                <TableHead className="text-right">Level Change</TableHead>
                <TableHead className="text-right pr-6">Rating Change</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {history.map((h: any) => {
                const skillDelta = h.skill_after - h.skill_before
                const levelDelta = h.level_after - h.level_before
                return (
                  <TableRow key={h.id.toString()}>
                    <TableCell className="font-medium">{h.contest.title}</TableCell>
                    <TableCell className="text-center">#{h.rank}</TableCell>
                    <TableCell className="text-center">{h.total_score}</TableCell>
                    <TableCell className="text-right">
                      {h.level_after}
                      {levelDelta !== 0 && (
                        <span className={`ml-2 text-xs font-semibold ${levelDelta > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {levelDelta > 0 ? '+' : ''}{levelDelta}
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      <Badge variant="outline" className="mr-2">{h.skill_after}</Badge>
                      <span className={`text-xs font-semibold inline-block w-8 text-right ${skillDelta > 0 ? 'text-green-600' : skillDelta < 0 ? 'text-red-600' : 'text-muted-foreground'}`}>
                        {skillDelta > 0 ? '+' : ''}{skillDelta}
                      </span>
                    </TableCell>
                  </TableRow>
                )
              })}
              {history.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">No rating history yet.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
