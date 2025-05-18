"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

const generateMonthlyData = (month: number) => {
  const daysInMonth = new Date(2025, month + 1, 0).getDate()

  return Array.from({ length: daysInMonth }, (_, i) => {
    const day = i + 1
    const baseTemp = month < 6 ? 20 + month * 2 : 32 - (month - 6) * 2
    const randomVariation = Math.random() * 8 - 4

    return {
      day: day,
      temperature: Math.round((baseTemp + randomVariation) * 10) / 10,
      rainfall: Math.round(Math.random() * 20 * 10) / 10,
      humidity: Math.round((50 + Math.random() * 30) * 10) / 10,
    }
  })
}

export default function WeatherHistory() {
  const [selectedMonth, setSelectedMonth] = useState("4") // May (0-indexed)
  const [selectedMetric, setSelectedMetric] = useState("temperature")

  const data = generateMonthlyData(Number.parseInt(selectedMonth))

  const metricConfig = {
    temperature: {
      color: "#ff7c43",
      unit: "°C",
      label: "Temperature",
    },
    rainfall: {
      color: "#1e88e5",
      unit: "mm",
      label: "Rainfall",
    },
    humidity: {
      color: "#43a047",
      unit: "%",
      label: "Humidity",
    },
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <Select value={selectedMonth} onValueChange={setSelectedMonth}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select month" />
          </SelectTrigger>
          <SelectContent>
            {months.map((month, index) => (
              <SelectItem key={index} value={index.toString()}>
                {month}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Tabs value={selectedMetric} onValueChange={setSelectedMetric} className="w-full sm:w-auto">
          <TabsList>
            <TabsTrigger value="temperature">Temperature</TabsTrigger>
            <TabsTrigger value="rainfall">Rainfall</TabsTrigger>
            <TabsTrigger value="humidity">Humidity</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis
                  label={{
                    value: `${metricConfig[selectedMetric as keyof typeof metricConfig].label} (${metricConfig[selectedMetric as keyof typeof metricConfig].unit})`,
                    angle: -90,
                    position: "insideLeft",
                  }}
                />
                <Tooltip
                  formatter={(value) => [
                    `${value} ${metricConfig[selectedMetric as keyof typeof metricConfig].unit}`,
                    metricConfig[selectedMetric as keyof typeof metricConfig].label,
                  ]}
                  labelFormatter={(label) => `Day ${label}`}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey={selectedMetric}
                  stroke={metricConfig[selectedMetric as keyof typeof metricConfig].color}
                  activeDot={{ r: 8 }}
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-sm font-medium text-muted-foreground">Avg. Temperature</div>
            <div className="text-2xl font-bold mt-1">
              {Math.round(data.reduce((sum, day) => sum + day.temperature, 0) / data.length)}°C
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm font-medium text-muted-foreground">Total Rainfall</div>
            <div className="text-2xl font-bold mt-1">
              {Math.round(data.reduce((sum, day) => sum + day.rainfall, 0))} mm
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm font-medium text-muted-foreground">Avg. Humidity</div>
            <div className="text-2xl font-bold mt-1">
              {Math.round(data.reduce((sum, day) => sum + day.humidity, 0) / data.length)}%
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
