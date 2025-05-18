"use client"

import { useState, useEffect } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, AlertTriangle, Info } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

interface WeatherAlert {
  id: number
  type: "warning" | "alert" | "info"
  title: string
  description: string
  date: string
}

export default function WeatherAlerts() {
  const [alerts, setAlerts] = useState<WeatherAlert[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const fetchAlerts = async () => {
      setLoading(true)
      // In a real app, this would be an API call to a weather service
      setTimeout(() => {
        const mockAlerts: WeatherAlert[] = [
          {
            id: 1,
            type: "warning",
            title: "Heavy Rain Warning",
            description:
              "Heavy rainfall expected in your area over the next 48 hours. Potential for localized flooding in low-lying areas.",
            date: "May 18, 2025",
          },
          {
            id: 2,
            type: "info",
            title: "Ideal Planting Conditions",
            description:
              "The next week shows optimal conditions for planting wheat and barley. Moderate temperatures and light rainfall expected.",
            date: "May 17, 2025",
          },
          {
            id: 3,
            type: "alert",
            title: "Heat Wave Alert",
            description:
              "Temperatures expected to rise above 38°C next week. Take precautions to protect crops and livestock.",
            date: "May 22, 2025",
          },
        ]

        setAlerts(mockAlerts)
        setLoading(false)
      }, 1500)
    }

    fetchAlerts()
  }, [])

  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-24 w-full" />
        ))}
      </div>
    )
  }

  if (alerts.length === 0) {
    return (
      <div className="text-center py-8">
        <Info className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-medium">No Weather Alerts</h3>
        <p className="text-muted-foreground">There are currently no weather alerts for your area.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {alerts.map((alert) => (
        <Alert key={alert.id} variant={alert.type === "info" ? "default" : "destructive"}>
          {alert.type === "warning" ? (
            <AlertTriangle className="h-4 w-4" />
          ) : alert.type === "alert" ? (
            <AlertCircle className="h-4 w-4" />
          ) : (
            <Info className="h-4 w-4" />
          )}
          <AlertTitle className="flex items-center justify-between">
            {alert.title}
            <span className="text-xs font-normal text-muted-foreground">{alert.date}</span>
          </AlertTitle>
          <AlertDescription>{alert.description}</AlertDescription>
        </Alert>
      ))}
    </div>
  )
}
