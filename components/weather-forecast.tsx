"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Cloud, CloudRain, CloudSun, Sun } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

interface ForecastDay {
  day: string
  date: string
  temperature: {
    high: number
    low: number
  }
  condition: string
  icon: React.ReactNode
  precipitation: number
}

interface ForecastHour {
  time: string
  temperature: number
  condition: string
  icon: React.ReactNode
  precipitation: number
}

interface WeatherForecastProps {
  type: "daily" | "hourly"
}

export default function WeatherForecast({ type }: WeatherForecastProps) {
  const [forecast, setForecast] = useState<ForecastDay[] | ForecastHour[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const fetchForecast = async () => {
      setLoading(true)
      // In a real app, this would be an API call to a weather service
      setTimeout(() => {
        if (type === "daily") {
          const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
          const today = new Date()

          const mockDailyForecast: ForecastDay[] = Array.from({ length: 7 }, (_, i) => {
            const date = new Date(today)
            date.setDate(today.getDate() + i)
            const dayName = days[date.getDay()]
            const dateStr = `${date.getDate()}/${date.getMonth() + 1}`

            const icons = [
              <Sun key={i} className="h-8 w-8 text-yellow-500" />,
              <CloudSun key={i} className="h-8 w-8 text-blue-400" />,
              <Cloud key={i} className="h-8 w-8 text-blue-500" />,
              <CloudRain key={i} className="h-8 w-8 text-blue-600" />,
            ]

            return {
              day: i === 0 ? "Today" : dayName,
              date: dateStr,
              temperature: {
                high: Math.floor(25 + Math.random() * 10),
                low: Math.floor(15 + Math.random() * 5),
              },
              condition: ["Sunny", "Partly Cloudy", "Cloudy", "Rainy"][Math.floor(Math.random() * 4)],
              icon: icons[Math.floor(Math.random() * icons.length)],
              precipitation: Math.floor(Math.random() * 100),
            }
          })

          setForecast(mockDailyForecast)
        } else {
          const mockHourlyForecast: ForecastHour[] = Array.from({ length: 24 }, (_, i) => {
            const hour = i % 12 === 0 ? 12 : i % 12
            const ampm = i < 12 || i === 24 ? "AM" : "PM"

            const icons = [
              <Sun key={i} className="h-6 w-6 text-yellow-500" />,
              <CloudSun key={i} className="h-6 w-6 text-blue-400" />,
              <Cloud key={i} className="h-6 w-6 text-blue-500" />,
              <CloudRain key={i} className="h-6 w-6 text-blue-600" />,
            ]

            return {
              time: `${hour} ${ampm}`,
              temperature: Math.floor(20 + Math.random() * 15),
              condition: ["Sunny", "Partly Cloudy", "Cloudy", "Rainy"][Math.floor(Math.random() * 4)],
              icon: icons[Math.floor(Math.random() * icons.length)],
              precipitation: Math.floor(Math.random() * 100),
            }
          })

          setForecast(mockHourlyForecast)
        }

        setLoading(false)
      }, 1500)
    }

    fetchForecast()
  }, [type])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: type === "daily" ? 7 : 8 }).map((_, i) => (
          <Skeleton key={i} className="h-32 w-full" />
        ))}
      </div>
    )
  }

  if (type === "daily") {
    const dailyForecast = forecast as ForecastDay[]

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {dailyForecast.map((day, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="font-bold">{day.day}</div>
                <div className="text-sm text-muted-foreground">{day.date}</div>
                <div className="flex justify-center my-3">{day.icon}</div>
                <div className="text-sm">{day.condition}</div>
                <div className="flex justify-center gap-2 mt-2">
                  <span className="font-bold">{day.temperature.high}°</span>
                  <span className="text-muted-foreground">{day.temperature.low}°</span>
                </div>
                <div className="text-xs text-muted-foreground mt-1">Precipitation: {day.precipitation}%</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  } else {
    const hourlyForecast = forecast as ForecastHour[]

    return (
      <div className="flex overflow-x-auto pb-4 gap-3">
        {hourlyForecast.map((hour, index) => (
          <Card key={index} className="min-w-[100px]">
            <CardContent className="p-3 text-center">
              <div className="font-medium">{hour.time}</div>
              <div className="flex justify-center my-2">{hour.icon}</div>
              <div className="font-bold">{hour.temperature}°</div>
              <div className="text-xs text-muted-foreground mt-1">{hour.precipitation}%</div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }
}
