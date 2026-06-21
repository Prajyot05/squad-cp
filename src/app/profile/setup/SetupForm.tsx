'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function SetupForm({ userId }: { userId: string }) {
  const [username, setUsername] = useState('')
  const [cfHandle, setCfHandle] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    try {
      const res = await fetch('/api/profile/setup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, cfHandle })
      })
      
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to setup profile')
      
      window.location.href = '/'
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex h-screen w-full items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-md border shadow-lg">
        <CardHeader>
          <CardTitle>Complete Your Profile</CardTitle>
          <CardDescription>We need a bit more info before you can start.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">SquadCP Username</Label>
              <Input id="username" value={username} onChange={e => setUsername(e.target.value)} required placeholder="CoolCoder99" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cfHandle">Codeforces Handle</Label>
              <Input id="cfHandle" value={cfHandle} onChange={e => setCfHandle(e.target.value)} required placeholder="tourist" />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" className="w-full" disabled={loading}>Save Profile</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
