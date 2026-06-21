'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function AdminClientPage({ initialCount, lastFetched }: { initialCount: number, lastFetched?: Date }) {
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<'idle' | 'fetching' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const [count, setCount] = useState(initialCount)

  const handleRefresh = async () => {
    setLoading(true)
    setStatus('fetching')
    setMessage('Fetching problems from Codeforces...')
    try {
      const res = await fetch('/api/admin/refresh-cache', { method: 'POST' })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to refresh cache')
      
      setStatus('success')
      setMessage(`Successfully upserted ${data.upserted} problems.`)
      
      setTimeout(() => window.location.reload(), 1500)
    } catch (err: any) {
      setStatus('error')
      setMessage(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8 mt-10">
      <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Problem Cache</CardTitle>
          <CardDescription>Manage the local Codeforces problem cache.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Problems in Cache</p>
              <p className="text-2xl font-semibold">{count}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Last Fetched</p>
              <p className="text-lg font-medium">{lastFetched ? new Date(lastFetched).toLocaleString() : 'Never'}</p>
            </div>
          </div>
          
          <div className="pt-4 flex flex-col space-y-2">
            <Button onClick={handleRefresh} disabled={loading} className="w-fit">
              {loading ? 'Refreshing...' : '🔄 Refresh Problem Cache'}
            </Button>
            {status !== 'idle' && (
              <p className={`text-sm ${status === 'error' ? 'text-destructive' : 'text-green-600'}`}>
                Status: {message}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
