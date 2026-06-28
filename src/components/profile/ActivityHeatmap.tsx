'use client'
import { ActivityCalendar } from 'react-activity-calendar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { format, subDays } from 'date-fns'
import { useTheme } from 'next-themes'

export default function ActivityHeatmap({ history }: { history: any[] }) {
  const { theme, systemTheme } = useTheme()
  const currentTheme = theme === 'system' ? systemTheme : theme

  // Build 365 days base
  const dataMap = new Map()
  for (let i = 365; i >= 0; i--) {
    const d = subDays(new Date(), i)
    dataMap.set(format(d, 'yyyy-MM-dd'), 0)
  }

  // Populate from history
  history.forEach(h => {
    const d = format(new Date(h.created_at), 'yyyy-MM-dd')
    if (dataMap.has(d)) {
      dataMap.set(d, dataMap.get(d) + 1) // +1 contest
    }
  })

  const data = Array.from(dataMap.entries()).map(([date, count]) => {
    return {
      date,
      count,
      level: count === 0 ? 0 : count === 1 ? 1 : count <= 2 ? 2 : count <= 4 ? 3 : 4
    }
  })

  return (
    <Card className="bg-card border border-border rounded-md">
      <CardHeader className="pb-3 border-b border-border mb-4 bg-neutral-50 dark:bg-neutral-900/50">
        <CardTitle className="text-base font-semibold">Activity (365 Days)</CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto flex justify-center py-2">
        <div className="min-w-fit">
          <ActivityCalendar
            data={data}
            theme={{
              light: ['#f3f4f6', '#a7f3d0', '#34d399', '#10b981', '#047857'],
              dark: ['#1f2937', '#064e3b', '#047857', '#10b981', '#34d399'],
            }}
            colorScheme={currentTheme === 'dark' ? 'dark' : 'light'}
            labels={{
              legend: {
                less: 'Less',
                more: 'More'
              },
              months: [
                'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
              ],
              totalCount: '{{count}} contests in the last year'
            }}
          />
        </div>
      </CardContent>
    </Card>
  )
}
