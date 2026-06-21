'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Image from 'next/image'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

export default function SetupForm({ userId }: { userId: string }) {
  const [username, setUsername] = useState('')
  const [cfHandle, setCfHandle] = useState('')
  const [loading, setLoading] = useState(false)
  const [verifying, setVerifying] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (username.length < 3) {
      toast.error('Username must be at least 3 characters long')
      return
    }
    
    if (!/^[a-zA-Z0-9_ ]+$/.test(username)) {
      toast.error('Username can only contain letters, numbers, spaces, and underscores')
      return
    }

    setVerifying(true)
    try {
      // Verify Codeforces handle directly on client side to show immediate feedback
      const cfRes = await fetch(`https://codeforces.com/api/user.info?handles=${cfHandle}`)
      const cfData = await cfRes.json()
      
      if (cfData.status !== "OK") {
        toast.error('Invalid Codeforces handle. Please check and try again.')
        setVerifying(false)
        return
      }
    } catch (err) {
      toast.error('Could not verify Codeforces handle right now. Trying to save anyway...')
    }
    setVerifying(false)
    
    setLoading(true)
    try {
      const res = await fetch('/api/profile/setup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, cfHandle })
      })
      
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to setup profile')
      
      toast.success('Profile created successfully! Redirecting...')
      window.location.href = '/'
    } catch (err: any) {
      toast.error(err.message)
      setLoading(false)
    }
  }

  const isWorking = loading || verifying

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-4 bg-background relative">
      <Card className="w-full max-w-md border-border/50 shadow-xl z-10">
        <CardHeader className="text-center pt-8">
          <div className="mx-auto mb-4 bg-background p-2 rounded-2xl shadow-sm border border-border/50">
            <Image src="/logo.png" alt="SquadCP Logo" width={64} height={64} className="rounded-xl" style={{ width: 'auto', height: 'auto' }} priority />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">Almost there!</CardTitle>
          <CardDescription>We need a bit more info before you can start.</CardDescription>
        </CardHeader>
        <CardContent className="px-8 pb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username">SquadCP Username</Label>
              <Input 
                id="username" 
                value={username} 
                onChange={e => setUsername(e.target.value)} 
                required 
                placeholder="CoolCoder99" 
                className="h-11"
              />
              <p className="text-xs text-muted-foreground ml-1">Letters, numbers, spaces, and underscores only. Min 3 characters.</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="cfHandle">Codeforces Handle</Label>
              <Input 
                id="cfHandle" 
                value={cfHandle} 
                onChange={e => setCfHandle(e.target.value)} 
                required 
                placeholder="tourist" 
                className="h-11"
              />
              <p className="text-xs text-muted-foreground ml-1">Your exact username on codeforces.com</p>
            </div>
            
            <Button type="submit" className="w-full h-12 text-md font-medium" disabled={isWorking}>
              {verifying ? (
                <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Verifying CF handle...</>
              ) : loading ? (
                <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Saving profile...</>
              ) : (
                'Save Profile & Continue'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
