'use client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { format } from 'date-fns'

export default function RatingGraph({ history, currentRating }: { history: any[], currentRating: number }) {
  // history is ordered by created_at desc. We need asc for chart.
  const chartData = [...history].reverse().map((h, i) => ({
    date: format(new Date(h.created_at), 'MMM dd'),
    rating: h.skill_after,
    title: h.contest?.title || `Contest #${i+1}`
  }))

  // Ensure we have at least one point
  if (chartData.length === 0) {
    chartData.push({ date: format(new Date(), 'MMM dd'), rating: currentRating, title: 'Current' })
  }

  // Calculate min and max for YAxis to give the graph some breathing room
  const ratings = chartData.map(d => d.rating)
  const minRating = Math.max(0, Math.min(...ratings) - 200)
  const maxRating = Math.max(...ratings) + 200

  return (
    <Card className="bg-card border border-border rounded-md h-full">
      <CardHeader className="pb-3 border-b border-border mb-4 bg-neutral-50 dark:bg-neutral-900/50">
        <CardTitle className="text-base font-semibold">Skill Rating Progression</CardTitle>
      </CardHeader>
      <CardContent className="h-[250px] w-full pt-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <XAxis 
              dataKey="date" 
              stroke="#888888" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false} 
            />
            <YAxis 
              stroke="#888888" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false} 
              tickFormatter={(value) => `${value}`}
              domain={[minRating, maxRating]}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '6px' }}
              labelStyle={{ color: 'hsl(var(--foreground))' }}
              itemStyle={{ color: '#10b981' }}
              formatter={(value: any) => [value, 'Rating']}
              labelFormatter={(label, payload) => {
                const title = payload && payload[0]?.payload?.title;
                return title ? `${title} (${label})` : label;
              }}
            />
            <Line 
              type="monotone" 
              dataKey="rating" 
              stroke="#10b981" 
              strokeWidth={3} 
              dot={{ r: 4, fill: '#10b981' }} 
              activeDot={{ r: 6 }} 
              animationDuration={1500}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
