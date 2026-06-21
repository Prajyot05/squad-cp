'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function CreateContestPage() {
  const router = useRouter()
  const [title, setTitle] = useState('Practice Contest')
  const [level, setLevel] = useState(10)
  const [duration, setDuration] = useState(120)
  const [tags, setTags] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    const tagArray = tags.split(',').map(t => t.trim()).filter(t => t.length > 0)

    try {
      const res = await fetch('/api/contests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          title, 
          level: Number(level), 
          duration_min: Number(duration), 
          tag_filter: tagArray 
        })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      
      router.push(`/contests/${data.contestId}`)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-xl mx-auto mt-10">
      <Card>
        <CardHeader>
          <CardTitle>Create Contest</CardTitle>
          <CardDescription>Configure your custom practice session.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input value={title} onChange={e => setTitle(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label>Level (1 - 109)</Label>
              <Input type="number" min={1} max={109} value={level} onChange={e => setLevel(e.target.value as any)} required />
            </div>
            <div className="space-y-2">
              <Label>Duration (Minutes)</Label>
              <Input type="number" min={15} max={300} step={15} value={duration} onChange={e => setDuration(e.target.value as any)} required />
            </div>
            <div className="space-y-2">
              <Label>Tags (Comma separated, optional)</Label>
              <Input placeholder="dp, graphs, greedy" value={tags} onChange={e => setTags(e.target.value)} />
              <p className="text-xs text-muted-foreground">Leave empty for random problems from any category.</p>
            </div>
            
            {error && <p className="text-sm text-destructive">{error}</p>}
            
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? 'Creating...' : 'Create Contest'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
