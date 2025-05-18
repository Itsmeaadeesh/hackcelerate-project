"use client"

import type React from "react"

// Adapted from https://github.com/shadcn-ui/ui/blob/main/apps/www/registry/default/ui/use-toast.ts
import { useState, useEffect, useCallback, useRef } from "react"

export type ToastProps = {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: React.ReactNode
  variant?: "default" | "destructive"
}

const TOAST_LIMIT = 5
const TOAST_REMOVE_DELAY = 5000

type ToasterToast = ToastProps

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

type ToastActionType = (props: ToastProps) => void

export const useToast = () => {
  const [toasts, setToasts] = useState<ToasterToast[]>([])

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const dismiss = useCallback((toastId?: string) => {
    setToasts((toasts) => toasts.filter((toast) => toast.id !== toastId))
  }, [])

  const toast: ToastActionType = useCallback(
    (props) => {
      const id = genId()

      const newToast = {
        ...props,
        id,
      }

      setToasts((prevToasts) => {
        const nextToasts = [...prevToasts, newToast].slice(-TOAST_LIMIT)

        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
        }

        timeoutRef.current = setTimeout(() => {
          dismiss(id)
        }, TOAST_REMOVE_DELAY)

        return nextToasts
      })

      return id
    },
    [dismiss],
  )

  return {
    toast,
    dismiss,
    toasts,
  }
}
