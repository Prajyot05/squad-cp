'use client'

import { useState, useEffect } from 'react'
import { Bell, Check, Trash } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export function NotificationBell({ userId }: { userId: string }) {
  const [notifications, setNotifications] = useState<any[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    fetchNotifications()

    // Subscribe to real-time notifications
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          setNotifications((prev) => [payload.new, ...prev])
          setUnreadCount((prev) => prev + 1)
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [userId])

  const fetchNotifications = async () => {
    try {
      const res = await fetch('/api/notifications')
      const data = await res.json()
      if (data.notifications) {
        setNotifications(data.notifications)
        setUnreadCount(data.notifications.filter((n: any) => !n.is_read).length)
      }
    } catch (e) {
      console.error('Failed to fetch notifications')
    }
  }

  const markAsRead = async (id?: string) => {
    try {
      await fetch('/api/notifications', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: id ? [id] : undefined }),
      })
      if (id) {
        setNotifications((prev) =>
          prev.map((n) => (n.id === id ? { ...n, is_read: true } : n))
        )
        setUnreadCount((prev) => Math.max(0, prev - 1))
      } else {
        setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })))
        setUnreadCount(0)
      }
    } catch (e) {
      console.error('Failed to mark notification as read')
    }
  }

  const handleNotificationClick = (n: any) => {
    if (!n.is_read) {
      markAsRead(n.id)
    }
    if (n.type === 'contest_created' && n.team_id) {
      router.push(`/teams/${n.team_id}`)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <div className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10 relative text-neutral-500 hover:text-foreground cursor-pointer">
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-background" />
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 bg-card border-border shadow-lg text-foreground">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-neutral-50/50 dark:bg-neutral-900/50">
          <h3 className="font-semibold text-sm">Notifications</h3>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={() => markAsRead()} className="h-auto p-1 px-2 text-[10px] text-primary hover:text-primary/80 uppercase tracking-wider">
              Mark all as read
            </Button>
          )}
        </div>
        <div className="max-h-[350px] overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-8 text-center text-sm text-neutral-500 flex flex-col items-center gap-2">
              <Bell className="w-8 h-8 text-neutral-300 dark:text-neutral-700 mb-2" />
              You're all caught up!
            </div>
          ) : (
            notifications.map((n) => (
              <DropdownMenuItem
                key={n.id}
                onClick={() => handleNotificationClick(n)}
                className={`flex flex-col items-start px-4 py-3 cursor-pointer gap-1.5 border-b border-border last:border-0 rounded-none focus:bg-accent ${!n.is_read ? 'bg-primary/5 dark:bg-primary/10' : ''
                  }`}
              >
                <div className="flex w-full items-center justify-between gap-2">
                  <span className={`text-sm font-semibold line-clamp-1 ${!n.is_read ? 'text-foreground' : 'text-neutral-600 dark:text-neutral-400'}`}>
                    {n.title}
                  </span>
                  {!n.is_read && <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />}
                </div>
                <span className="text-xs text-neutral-500 line-clamp-2 leading-relaxed">{n.message}</span>
                <span className="text-[10px] text-neutral-400 font-mono mt-0.5">
                  {new Date(n.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </DropdownMenuItem>
            ))
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
