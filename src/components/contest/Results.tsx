import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

export default function Results({ contest, standings, currentUserId }: { contest: any, standings: any[], currentUserId: string }) {
  const sorted = [...standings].sort((a, b) => (a.final_rank || 999) - (b.final_rank || 999))

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Contest Results: {contest.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Rank</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Skill Rating</TableHead>
                <TableHead>Level</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sorted.map((p) => {
                const skillDelta = p.skill_after - p.skill_before
                const levelDelta = p.level_after - p.level_before
                const isMe = p.user_id === currentUserId
                
                return (
                  <TableRow key={p.id} className={isMe ? 'bg-muted/50' : ''}>
                    <TableCell className="font-bold">{p.final_rank}</TableCell>
                    <TableCell>{p.user.username}</TableCell>
                    <TableCell>{p.total_score}</TableCell>
                    <TableCell>
                      {p.skill_after} 
                      <span className={`ml-2 text-xs font-semibold ${skillDelta > 0 ? 'text-green-600' : skillDelta < 0 ? 'text-red-600' : 'text-muted-foreground'}`}>
                        {skillDelta > 0 ? '+' : ''}{skillDelta}
                      </span>
                    </TableCell>
                    <TableCell>
                      {p.level_after}
                      {levelDelta !== 0 && (
                        <span className={`ml-2 text-xs font-semibold ${levelDelta > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {levelDelta > 0 ? '+' : ''}{levelDelta}
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
    </div>
  )
}
