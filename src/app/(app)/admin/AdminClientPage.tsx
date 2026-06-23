'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'
import { Loader2, RefreshCw, Database, ShieldAlert } from 'lucide-react'

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
    <div className="w-full mt-2 animate-in fade-in duration-300">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
        {/* Left Column - Context */}
        <div className="md:col-span-4 space-y-4">
          <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
            <ShieldAlert className="w-6 h-6 text-red-500" /> 
            Admin Portal
          </h1>
          <p className="text-base text-neutral-500 leading-relaxed">
            Manage system-wide configurations and data caches. Actions performed here affect the entire platform.
          </p>
        </div>

        {/* Right Column - Controls */}
        <div className="md:col-span-8 md:max-w-2xl space-y-6">
          <Card className="bg-card border border-border rounded-md shadow-sm">
            <CardHeader className="pb-4 border-b border-border bg-neutral-50/50 dark:bg-neutral-900/50">
              <CardTitle className="flex items-center gap-2 text-base font-semibold">
                <Database className="w-4 h-4 text-neutral-500" /> 
                Problem Cache
              </CardTitle>
              <CardDescription className="text-sm text-neutral-500">Manage the local Codeforces problem cache.</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="grid grid-cols-2 gap-6 bg-neutral-50 dark:bg-neutral-900 p-5 rounded-md border border-border">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-neutral-500 mb-2">Problems Available</p>
                  <p className="text-3xl font-bold font-mono text-foreground">{count}</p>
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-neutral-500 mb-2">Last Synchronized</p>
                  <p className="text-base font-medium text-foreground">{formatRelativeTime(fetchedAt)}</p>
                  {fetchedAt && <p className="text-xs text-neutral-400 font-mono mt-1">{new Date(fetchedAt).toLocaleString()}</p>}
                </div>
              </div>

              <div className="pt-2 border-t border-border mt-6">
                <Button onClick={handleRefresh} disabled={loading} className="w-full sm:w-auto h-11 gap-2 bg-foreground text-background hover:bg-foreground/90 text-sm font-medium mt-6">
                  {loading ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Synchronizing...</>
                  ) : (
                    <><RefreshCw className="w-4 h-4" /> Refresh Problem Cache</>
                  )}
                </Button>
                <p className="text-xs text-neutral-500 mt-3">Fetches the latest problemset from Codeforces and updates the local database. This may take a few moments.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
