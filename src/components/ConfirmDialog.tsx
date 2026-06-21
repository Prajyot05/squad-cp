"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { ReactNode } from "react"

interface ConfirmDialogProps {
  trigger: ReactNode
  title: string
  description: string
  onConfirm: () => void
  confirmText?: string
  cancelText?: string
  variant?: "default" | "destructive"
}

export function ConfirmDialog({
  trigger,
  title,
  description,
  onConfirm,
  confirmText = "Continue",
  cancelText = "Cancel",
  variant = "default"
}: ConfirmDialogProps) {
  return (
    <AlertDialog>
      {/* @ts-ignore */}
      <AlertDialogTrigger render={trigger} />
      <AlertDialogContent className="bg-card border border-border rounded-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-foreground font-semibold">{title}</AlertDialogTitle>
          <AlertDialogDescription className="text-neutral-500 text-sm">{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="text-xs">{cancelText}</AlertDialogCancel>
          <AlertDialogAction 
            onClick={onConfirm}
            className={variant === "destructive" ? "bg-transparent border border-red-500/50 text-red-500 hover:bg-red-500 hover:text-white transition-colors text-xs" : "bg-foreground text-background hover:bg-foreground/90 text-xs"}
          >
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
