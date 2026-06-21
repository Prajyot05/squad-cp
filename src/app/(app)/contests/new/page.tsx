'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { Loader2, Plus, X, Timer, Activity, Hash, Info } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default function CreateContestPage() {
  const router = useRouter()
  const [title, setTitle] = useState('Practice Contest')
  const [level, setLevel] = useState(10)
  const [duration, setDuration] = useState(120)
  const [tags, setTags] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  const VALID_TAGS = [
    '2-sat',
    'binary search',
    'bitmasks',
    'brute force',
    'chinese remainder theorem',
    'combinatorics',
    'communication',
    'constructive algorithms',
    'data structures',
    'dfs and similar',
    'divide and conquer',
    'dp',
    'dsu',
    'expression parsing',
    'fft',
    'flows',
    'games',
    'geometry',
    'graph matchings',
    'graphs',
    'greedy',
    'hashing',
    'implementation',
    'interactive',
    'math',
    'matrices',
    'meet-in-the-middle',
    'number theory',
    'probabilities',
    'schedules',
    'shortest paths',
    'sortings',
    'string suffix structures',
    'strings',
    'ternary search',
    'trees',
    'two pointers'
  ];

  const handleAddTag = (newTag: string | null) => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag])
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(t => t !== tagToRemove))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/contests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          level: Number(level),
          duration_min: Number(duration),
          tag_filter: tags
        })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to create contest')

      toast.success('Contest created successfully!')
      router.push(`/contests/${data.contestId}`)
    } catch (err: any) {
      toast.error(err.message)
      setLoading(false)
    }
  }

  const estimatedRatings = [
    Math.max(800, level * 100),
    Math.max(800, level * 100 + 100),
    Math.max(800, level * 100 + 200),
    Math.max(800, level * 100 + 400),
  ]

  return (
    <div className="max-w-xl mx-auto mt-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Card className="border-border/50 shadow-lg overflow-hidden">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2"><Plus className="w-6 h-6 text-primary" /> Create Contest</CardTitle>
          <CardDescription>Configure your custom practice session and invite your squad.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Contest Title</Label>
              <Input
                id="title"
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
                className="h-11"
              />
            </div>

            <div className="space-y-4 bg-muted/30 p-4 rounded-xl border border-border/50">
              <div className="space-y-2">
                <Label htmlFor="level" className="flex items-center gap-2"><Activity className="w-4 h-4 text-accent" /> Difficulty Level (1 - 109)</Label>
                <Input
                  id="level"
                  type="number"
                  min={1}
                  max={109}
                  value={level}
                  onChange={e => setLevel(Number(e.target.value))}
                  required
                  className="h-11"
                />
              </div>
              <div className="bg-card/50 p-3 rounded-lg border border-border/50">
                <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-2">Estimated Problem Ratings:</p>
                <div className="flex gap-2">
                  {estimatedRatings.map((r, i) => (
                    <Badge key={i} variant="outline" className="font-mono text-primary/80 border-primary/20 bg-primary/5">{r}</Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Label className="flex items-center gap-2"><Timer className="w-4 h-4 text-primary" /> Duration</Label>
              <div className="grid grid-cols-4 gap-2">
                {[30, 60, 90, 120].map(mins => (
                  <Button
                    key={mins}
                    type="button"
                    variant={duration === mins ? "default" : "outline"}
                    className={duration === mins ? "shadow-sm" : ""}
                    onClick={() => setDuration(mins)}
                  >
                    {mins}m
                  </Button>
                ))}
              </div>
              <div className="flex items-center gap-2 mt-2">
                <Input
                  type="number"
                  min={15}
                  max={300}
                  step={15}
                  value={duration}
                  onChange={e => setDuration(Number(e.target.value))}
                  required
                  className="w-24 h-11"
                />
                <span className="text-sm text-muted-foreground">Custom minutes</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label className="flex items-center gap-2"><Hash className="w-4 h-4 text-amber-500" /> Tags (Optional)</Label>
                <TooltipProvider delay={100}>
                  <Tooltip>
                    <TooltipTrigger type="button" className="cursor-help flex items-center">
                      <Info className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors" />
                    </TooltipTrigger>
                    <TooltipContent side="right" className="max-w-xs p-3 bg-popover text-popover-foreground shadow-xl border border-border/50">
                      <div className="space-y-2 text-sm leading-relaxed">
                        <p><strong className="text-foreground">How tags work:</strong></p>
                        <ul className="list-disc pl-4 space-y-1 text-muted-foreground">
                          <li>Every problem in the contest will contain <em>at least one</em> of your selected tags.</li>
                          <li>If no problem matches your tags for a specific rating, the system will search within <strong className="text-foreground">±100 rating points</strong>.</li>
                          <li>If a match still cannot be found, contest creation will fail. We recommend leaving tags empty or using broad tags for difficult contests!</li>
                        </ul>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="flex flex-wrap gap-2 mb-2">
                {tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="px-2 py-1 flex items-center gap-1 text-sm bg-accent/10 text-accent hover:bg-accent/20 border-accent/20">
                    {tag}
                    <button type="button" onClick={() => removeTag(tag)} className="hover:text-destructive transition-colors"><X className="w-3 h-3" /></button>
                  </Badge>
                ))}
              </div>
              <Select key={tags.length} onValueChange={handleAddTag}>
                <SelectTrigger className="w-full h-11 bg-card border-border/60 shadow-sm focus:ring-accent">
                  <SelectValue placeholder="Select a tag to add..." />
                </SelectTrigger>
                <SelectContent className="max-h-64 bg-card border-border/80 shadow-lg p-1">
                  {VALID_TAGS.filter(t => !tags.includes(t)).map(tag => (
                    <SelectItem key={tag} value={tag}>{tag}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" disabled={loading} className="w-full h-12 text-md font-medium shadow-md">
              {loading ? (
                <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Generating Contest...</>
              ) : (
                'Create Contest'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
