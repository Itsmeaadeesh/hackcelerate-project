"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { ArrowUp, ArrowDown } from "lucide-react"

// Major crop categories and their crops
const cropOptions = [
  {
    category: "Cereals",
    crops: [
      { value: "wheat", label: "Wheat", color: "#f59e0b" },
      { value: "rice", label: "Rice (Basmati)", color: "#10b981" },
      { value: "maize", label: "Maize (Corn)", color: "#3b82f6" },
      { value: "barley", label: "Barley", color: "#8b5cf6" },
    ],
  },
  {
    category: "Pulses",
    crops: [
      { value: "gram", label: "Chickpea (Gram)", color: "#ec4899" },
      { value: "tur", label: "Pigeon Pea (Tur/Arhar)", color: "#f43f5e" },
      { value: "moong", label: "Green Gram (Moong)", color: "#84cc16" },
    ],
  },
  {
    category: "Oilseeds",
    crops: [
      { value: "soybean", label: "Soybean", color: "#facc15" },
      { value: "mustard", label: "Mustard", color: "#eab308" },
      { value: "groundnut", label: "Groundnut", color: "#d97706" },
    ],
  },
  {
    category: "Vegetables",
    crops: [
      { value: "potato", label: "Potato", color: "#a16207" },
      { value: "onion", label: "Onion", color: "#ef4444" },
      { value: "tomato", label: "Tomato", color: "#dc2626" },
    ],
  },
]

// Flatten the crops array for easy access
const allCrops = cropOptions.flatMap((category) => category.crops)

const generatePriceData = (crop: string, period: string) => {
  let data = []
  let basePrice = 0
  let volatility = 0
  let trend = 0 // -1 for downward, 0 for stable, 1 for upward

  // Set base price and volatility based on crop
  const cropInfo = allCrops.find((c) => c.value === crop)
  if (!cropInfo) return []

  switch (crop) {
    case "wheat":
      basePrice = 2200
      volatility = 50
      trend = 0.5
      break
    case "rice":
      basePrice = 3700
      volatility = 80
      trend = 1
      break
    case "maize":
      basePrice = 1800
      volatility = 60
      trend = -0.5
      break
    case "barley":
      basePrice = 1600
      volatility = 40
      trend = 0
      break
    case "gram":
      basePrice = 4500
      volatility = 100
      trend = 1
      break
    case "tur":
      basePrice = 6000
      volatility = 120
      trend = 0.8
      break
    case "moong":
      basePrice = 7000
      volatility = 150
      trend = -0.3
      break
    case "soybean":
      basePrice = 3800
      volatility = 90
      trend = 0.7
      break
    case "mustard":
      basePrice = 4200
      volatility = 70
      trend = 0.2
      break
    case "groundnut":
      basePrice = 5500
      volatility = 110
      trend = -0.1
      break
    case "potato":
      basePrice = 1200
      volatility = 200
      trend = -0.8
      break
    case "onion":
      basePrice = 1500
      volatility = 300
      trend = -0.6
      break
    case "tomato":
      basePrice = 2000
      volatility = 400
      trend = 0.4
      break
    default:
      basePrice = 2000
      volatility = 100
      trend = 0
  }

  if (period === "weekly") {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    data = days.map((day, index) => {
      const trendFactor = trend * index * 10
      const randomVariation = (Math.random() * 2 - 1) * volatility
      const mspLine = crop === "wheat" || crop === "rice" ? basePrice * 0.9 : null

      return {
        name: day,
        price: Math.round(basePrice + trendFactor + randomVariation),
        average: Math.round(basePrice - 20 + Math.random() * 40),
        msp: mspLine,
      }
    })
  } else if (period === "monthly") {
    data = Array.from({ length: 30 }, (_, i) => {
      const day = i + 1
      const trendFactor = trend * i * 5
      const seasonalFactor = Math.sin(i / 5) * (volatility / 2)
      const randomVariation = (Math.random() * 2 - 1) * volatility
      const mspLine = crop === "wheat" || crop === "rice" ? basePrice * 0.9 : null

      return {
        name: day,
        price: Math.round(basePrice + trendFactor + seasonalFactor + randomVariation),
        average: Math.round(basePrice + seasonalFactor - 50 + Math.random() * 100),
        msp: mspLine,
      }
    })
  } else if (period === "yearly") {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    data = months.map((month, index) => {
      const trendFactor = trend * index * 20
      const seasonalFactor = Math.sin(index / 2) * volatility
      const randomVariation = (Math.random() * 2 - 1) * volatility
      const mspLine = crop === "wheat" || crop === "rice" ? basePrice * 0.9 : null

      return {
        name: month,
        price: Math.round(basePrice + trendFactor + seasonalFactor + randomVariation),
        average: Math.round(basePrice + seasonalFactor - 100 + Math.random() * 200),
        msp: mspLine,
      }
    })
  }

  return data
}

export default function MarketTrends() {
  const [selectedCrop, setSelectedCrop] = useState("wheat")
  const [selectedPeriod, setSelectedPeriod] = useState("monthly")

  const data = generatePriceData(selectedCrop, selectedPeriod)
  const cropInfo = allCrops.find((c) => c.value === selectedCrop)

  // Calculate statistics
  const currentPrice = data[data.length - 1]?.price || 0
  const startPrice = data[0]?.price || 0
  const priceChange = currentPrice - startPrice
  const priceChangePercent = startPrice > 0 ? (priceChange / startPrice) * 100 : 0
  const averagePrice = Math.round(data.reduce((sum, item) => sum + item.price, 0) / data.length)
  const highestPrice = Math.max(...data.map((item) => item.price))
  const lowestPrice = Math.min(...data.map((item) => item.price))

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <Select value={selectedCrop} onValueChange={setSelectedCrop}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select crop" />
          </SelectTrigger>
          <SelectContent>
            {cropOptions.map((category) => (
              <div key={category.category}>
                <div className="px-2 py-1.5 text-sm font-semibold">{category.category}</div>
                {category.crops.map((crop) => (
                  <SelectItem key={crop.value} value={crop.value}>
                    {crop.label}
                  </SelectItem>
                ))}
                {cropOptions.indexOf(category) < cropOptions.length - 1 && <div className="h-px my-1 bg-muted"></div>}
              </div>
            ))}
          </SelectContent>
        </Select>

        <Tabs value={selectedPeriod} onValueChange={setSelectedPeriod} className="w-full sm:w-auto">
          <TabsList>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="yearly">Yearly</TabsTrigger>
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
                <XAxis
                  dataKey="name"
                  label={{
                    value:
                      selectedPeriod === "weekly" ? "Day" : selectedPeriod === "monthly" ? "Day of Month" : "Month",
                    position: "insideBottom",
                    offset: -5,
                  }}
                />
                <YAxis
                  label={{
                    value: "Price (₹/quintal)",
                    angle: -90,
                    position: "insideLeft",
                  }}
                />
                <Tooltip
                  formatter={(value) => [`₹${value}`, "Price"]}
                  labelFormatter={(label) =>
                    selectedPeriod === "weekly" ? label : selectedPeriod === "monthly" ? `Day ${label}` : label
                  }
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="price"
                  name={`Current ${cropInfo?.label || ""} Price`}
                  stroke={cropInfo?.color || "#3b82f6"}
                  activeDot={{ r: 8 }}
                  strokeWidth={2}
                />
                <Line type="monotone" dataKey="average" name="5-Year Average" stroke="#9ca3af" strokeDasharray="5 5" />
                {(selectedCrop === "wheat" || selectedCrop === "rice") && (
                  <Line
                    type="monotone"
                    dataKey="msp"
                    name="Minimum Support Price (MSP)"
                    stroke="#16a34a"
                    strokeWidth={1.5}
                    strokeDasharray="3 3"
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-sm font-medium text-muted-foreground">Current Price</div>
            <div className="text-2xl font-bold mt-1">₹{currentPrice}/quintal</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm font-medium text-muted-foreground">Average Price</div>
            <div className="text-2xl font-bold mt-1">₹{averagePrice}/quintal</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm font-medium text-muted-foreground">Price Change</div>
            <div
              className={`text-2xl font-bold mt-1 flex items-center ${priceChange > 0 ? "text-green-500" : priceChange < 0 ? "text-red-500" : ""}`}
            >
              {priceChange > 0 ? (
                <ArrowUp className="mr-1 h-5 w-5" />
              ) : priceChange < 0 ? (
                <ArrowDown className="mr-1 h-5 w-5" />
              ) : null}
              {priceChange > 0 ? "+" : ""}
              {priceChange} ({priceChangePercent > 0 ? "+" : ""}
              {priceChangePercent.toFixed(1)}%)
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm font-medium text-muted-foreground">Price Range</div>
            <div className="text-2xl font-bold mt-1">
              ₹{lowestPrice} - ₹{highestPrice}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold mb-2">Market Analysis</h3>
          <p className="text-sm text-muted-foreground">
            {priceChangePercent > 5
              ? `${cropInfo?.label || "Crop"} prices are showing a strong upward trend (${priceChangePercent.toFixed(1)}% increase). This might be a good time to hold your produce if storage is available, as prices are expected to rise further.`
              : priceChangePercent < -5
                ? `${cropInfo?.label || "Crop"} prices are showing a significant downward trend (${Math.abs(priceChangePercent).toFixed(1)}% decrease). Consider selling soon if you anticipate further price drops or explore government procurement options where available.`
                : `${cropInfo?.label || "Crop"} prices are relatively stable (${priceChangePercent > 0 ? "+" : ""}${priceChangePercent.toFixed(1)}%). Monitor the market closely for any significant changes before making selling decisions.`}

            {selectedCrop === "wheat" || selectedCrop === "rice"
              ? " Minimum Support Price (MSP) is available for this crop through government procurement centers."
              : ""}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
