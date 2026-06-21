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
      <Card className="w-full max-w-md border border-border rounded-md shadow-lg z-10">
        <CardHeader className="text-center pt-8">
          <div className="mx-auto mb-4 bg-neutral-100 dark:bg-neutral-800 p-2 rounded-md border border-border w-fit">
            <Image src="/logo.png" alt="SquadCP Logo" width={236} height={192} className="h-14 w-auto rounded-sm" priority />
          </div>
          <CardTitle className="text-xl font-bold tracking-tight text-foreground">Almost there!</CardTitle>
          <CardDescription className="text-xs text-neutral-500">We need a bit more info before you can start.</CardDescription>
        </CardHeader>
        <CardContent className="px-8 pb-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="username" className="text-xs font-medium text-neutral-500 uppercase tracking-wider">SquadCP Username</Label>
              <Input 
                id="username" 
                value={username} 
                onChange={e => setUsername(e.target.value)} 
                required 
                placeholder="CoolCoder99" 
                className="h-10 bg-transparent border-border rounded-sm focus:border-foreground focus:ring-0 text-sm"
              />
              <p className="text-[10px] text-neutral-400 ml-1">Letters, numbers, spaces, and underscores only. Min 3 characters.</p>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="cfHandle" className="text-xs font-medium text-neutral-500 uppercase tracking-wider">Codeforces Handle</Label>
              <Input 
                id="cfHandle" 
                value={cfHandle} 
                onChange={e => setCfHandle(e.target.value)} 
                required 
                placeholder="tourist" 
                className="h-10 bg-transparent border-border rounded-sm focus:border-foreground focus:ring-0 text-sm font-mono"
              />
              <p className="text-[10px] text-neutral-400 ml-1">Your exact username on codeforces.com</p>
            </div>
            
            <Button type="submit" className="w-full h-11 font-medium bg-foreground text-background hover:bg-foreground/90" disabled={isWorking}>
              {verifying ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Verifying CF handle...</>
              ) : loading ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving profile...</>
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
