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
    <div className="max-w-xl mx-auto mt-2">
      <Card className="bg-card border border-border rounded-md overflow-hidden">
        <CardHeader>
          <CardTitle className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2"><Plus className="w-5 h-5 text-neutral-400" /> Create Contest</CardTitle>
          <CardDescription className="text-xs text-neutral-500">Configure your practice session and invite your squad.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="title" className="text-xs font-medium text-neutral-500 uppercase tracking-wider">Contest Title</Label>
              <Input
                id="title"
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
                className="h-10 bg-transparent border-border rounded-sm focus:border-foreground focus:ring-0 text-sm"
              />
            </div>

            <div className="space-y-4 bg-neutral-50 dark:bg-neutral-900 p-4 rounded-sm border border-border">
              <div className="space-y-1.5">
                <Label htmlFor="level" className="flex items-center gap-2 text-xs font-medium text-neutral-500 uppercase tracking-wider"><Activity className="w-3.5 h-3.5" /> Difficulty Level (1–109)</Label>
                <Input
                  id="level"
                  type="number"
                  min={1}
                  max={109}
                  value={level}
                  onChange={e => setLevel(Number(e.target.value))}
                  required
                  className="h-10 bg-background border-border rounded-sm focus:border-foreground focus:ring-0 text-sm font-mono"
                />
              </div>
              <div className="bg-card p-3 rounded-sm border border-border">
                <p className="text-[10px] text-neutral-500 font-medium uppercase tracking-wider mb-2">Estimated Ratings</p>
                <div className="flex gap-1.5">
                  {estimatedRatings.map((r, i) => (
                    <Badge key={i} variant="outline" className="font-mono text-[10px] text-foreground bg-neutral-100 dark:bg-neutral-800 border-border">{r}</Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-xs font-medium text-neutral-500 uppercase tracking-wider"><Timer className="w-3.5 h-3.5" /> Duration</Label>
              <div className="grid grid-cols-4 gap-2">
                {[30, 60, 90, 120].map(mins => (
                  <Button
                    key={mins}
                    type="button"
                    variant={duration === mins ? "default" : "outline"}
                    className={duration === mins ? "bg-foreground text-background hover:bg-foreground/90 font-mono" : "text-foreground border-border hover:border-neutral-400 dark:hover:border-neutral-600 font-mono"}
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
                  className="w-24 h-10 bg-transparent border-border rounded-sm focus:border-foreground focus:ring-0 text-sm font-mono"
                />
                <span className="text-xs text-neutral-400">Custom minutes</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label className="flex items-center gap-2 text-xs font-medium text-neutral-500 uppercase tracking-wider"><Hash className="w-3.5 h-3.5" /> Tags (Optional)</Label>
                <TooltipProvider delay={100}>
                  <Tooltip>
                    <TooltipTrigger type="button" className="cursor-help flex items-center">
                      <Info className="w-3.5 h-3.5 text-neutral-400 hover:text-foreground transition-colors" />
                    </TooltipTrigger>
                    <TooltipContent side="right" className="max-w-xs p-3 bg-card text-foreground shadow-lg border border-border rounded-sm">
                      <div className="space-y-2 text-xs leading-relaxed">
                        <p><strong>How tags work:</strong></p>
                        <ul className="list-disc pl-4 space-y-1 text-neutral-500">
                          <li>Every problem will contain <em>at least one</em> of your selected tags.</li>
                          <li>If no match for a specific rating, the system searches within <strong className="text-foreground">±100 rating points</strong>.</li>
                          <li>If no match is found, contest creation will fail. Use broad tags for difficult contests!</li>
                        </ul>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {tags.map(tag => (
                  <Badge key={tag} variant="outline" className="px-2 py-0.5 flex items-center gap-1 text-[10px] bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border-border">
                    {tag}
                    <button type="button" onClick={() => removeTag(tag)} className="hover:text-red-500 transition-colors"><X className="w-2.5 h-2.5" /></button>
                  </Badge>
                ))}
              </div>
              <Select key={tags.length} onValueChange={handleAddTag}>
                <SelectTrigger className="w-full h-10 bg-transparent border-border rounded-sm text-sm focus:ring-0 focus:border-foreground">
                  <SelectValue placeholder="Select a tag to add..." />
                </SelectTrigger>
                <SelectContent className="max-h-64 bg-card border-border shadow-lg rounded-sm p-1">
                  {VALID_TAGS.filter(t => !tags.includes(t)).map(tag => (
                    <SelectItem key={tag} value={tag} className="text-sm">{tag}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" disabled={loading} className="w-full h-11 font-medium bg-foreground text-background hover:bg-foreground/90">
              {loading ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating Contest...</>
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
