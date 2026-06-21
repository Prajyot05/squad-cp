'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'
import { Loader2, RefreshCw, Database } from 'lucide-react'

export default function AdminClientPage({ initialCount, lastFetched }: { initialCount: number, lastFetched?: Date }) {
  const [loading, setLoading] = useState(false)
  const [count, setCount] = useState(initialCount)
  const [fetchedAt, setFetchedAt] = useState<Date | undefined>(lastFetched)

  const handleRefresh = async () => {
    setLoading(true)
    
    toast.promise(
      fetch('/api/admin/refresh-cache', { method: 'POST' }).then(async (res) => {
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || 'Failed to refresh cache')
        return data
      }),
      {
        loading: 'Fetching problems from Codeforces API...',
        success: (data) => {
          setCount(data.upserted)
          setFetchedAt(new Date())
          setLoading(false)
          return `Successfully synchronized ${data.upserted} problems.`
        },
        error: (err) => {
          setLoading(false)
          return err.message
        }
      }
    )
  }

  const formatRelativeTime = (date?: Date) => {
    if (!date) return 'Never'
    const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })
    const daysDifference = Math.round((date.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    if (daysDifference === 0) return 'Today'
    return rtf.format(daysDifference, 'day')
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8 mt-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
      
      <Card className="glass border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Database className="w-5 h-5 text-primary" /> Problem Cache</CardTitle>
          <CardDescription>Manage the local Codeforces problem cache.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4 bg-muted/30 p-4 rounded-xl border border-border/50">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-1">Problems Available</p>
              <p className="text-3xl font-bold font-mono text-primary">{count}</p>
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-1">Last Synchronized</p>
              <p className="text-lg font-medium">{formatRelativeTime(fetchedAt)}</p>
              {fetchedAt && <p className="text-xs text-muted-foreground">{new Date(fetchedAt).toLocaleString()}</p>}
            </div>
          </div>
          
          <div className="pt-2">
            <Button onClick={handleRefresh} disabled={loading} className="w-full sm:w-auto h-11 gap-2 shadow-sm">
              {loading ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Synchronizing...</>
              ) : (
                <><RefreshCw className="w-4 h-4" /> Refresh Problem Cache</>
              )}
            </Button>
            <p className="text-xs text-muted-foreground mt-3">This operation fetches the latest problemset from Codeforces and updates the local database. It may take a few seconds.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
