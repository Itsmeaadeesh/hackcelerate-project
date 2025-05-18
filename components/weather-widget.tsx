"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Cloud, CloudRain, Thermometer, Wind } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

interface WeatherData {
  temperature: number
  condition: string
  humidity: number
  windSpeed: number
  icon: React.ReactNode
}

interface WeatherWidgetProps {
  detailed?: boolean
}

export default function WeatherWidget({ detailed = false }: WeatherWidgetProps) {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const fetchWeather = async () => {
      setLoading(true)
      // In a real app, this would be an API call to a weather service
      // For demo purposes, we'll use mock data
      setTimeout(() => {
        const mockWeather: WeatherData = {
          temperature: 28,
          condition: "Partly Cloudy",
          humidity: 65,
          windSpeed: 12,
          icon: <Cloud className="h-10 w-10 text-blue-500" />,
        }
        setWeather(mockWeather)
        setLoading(false)
      }, 1500)
    }

    fetchWeather()
  }, [])

  if (loading) {
    return (
      <div className="space-y-3">
        <div className="flex items-center gap-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-4 w-[80px]" />
          </div>
        </div>
        {detailed && (
          <div className="grid grid-cols-3 gap-4 mt-4">
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
          </div>
        )}
      </div>
    )
  }

  if (!weather) {
    return <div>Unable to load weather data</div>
  }

  return (
    <div>
      <div className="flex items-center gap-4">
        {weather.icon}
        <div>
          <div className="text-2xl font-bold">{weather.temperature}°C</div>
          <div className="text-muted-foreground">{weather.condition}</div>
        </div>
      </div>

      {detailed && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <Card>
            <CardContent className="flex items-center gap-2 p-4">
              <Thermometer className="h-5 w-5 text-orange-500" />
              <div>
                <div className="text-sm font-medium">Humidity</div>
                <div className="text-xl font-bold">{weather.humidity}%</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-2 p-4">
              <Wind className="h-5 w-5 text-blue-500" />
              <div>
                <div className="text-sm font-medium">Wind Speed</div>
                <div className="text-xl font-bold">{weather.windSpeed} km/h</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-2 p-4">
              <CloudRain className="h-5 w-5 text-blue-700" />
              <div>
                <div className="text-sm font-medium">Precipitation</div>
                <div className="text-xl font-bold">20%</div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
