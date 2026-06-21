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
    <div className="max-w-2xl mx-auto space-y-6 mt-2">
      <h1 className="text-2xl font-bold tracking-tight text-foreground">Admin</h1>
      
      <Card className="bg-card border border-border rounded-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm font-semibold"><Database className="w-4 h-4 text-neutral-400" /> Problem Cache</CardTitle>
          <CardDescription className="text-xs text-neutral-500">Manage the local Codeforces problem cache.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid grid-cols-2 gap-4 bg-neutral-50 dark:bg-neutral-900 p-4 rounded-sm border border-border">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-wider text-neutral-500 mb-1">Problems Available</p>
              <p className="text-2xl font-bold font-mono text-foreground">{count}</p>
            </div>
            <div>
              <p className="text-[10px] font-medium uppercase tracking-wider text-neutral-500 mb-1">Last Synchronized</p>
              <p className="text-sm font-medium text-foreground">{formatRelativeTime(fetchedAt)}</p>
              {fetchedAt && <p className="text-[10px] text-neutral-400 font-mono">{new Date(fetchedAt).toLocaleString()}</p>}
            </div>
          </div>
          
          <div className="pt-1">
            <Button onClick={handleRefresh} disabled={loading} className="w-full sm:w-auto h-9 gap-2 bg-foreground text-background hover:bg-foreground/90 text-xs">
              {loading ? (
                <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Synchronizing...</>
              ) : (
                <><RefreshCw className="w-3.5 h-3.5" /> Refresh Problem Cache</>
              )}
            </Button>
            <p className="text-[10px] text-neutral-400 mt-2">Fetches the latest problemset from Codeforces and updates the local database.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
