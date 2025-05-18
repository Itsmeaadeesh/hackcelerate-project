"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { ArrowRight, Droplets, Sun, ThermometerSun } from "lucide-react"
import Link from "next/link"

interface Crop {
  id: number
  name: string
  suitability: number
  season: string
  waterRequirement: "Low" | "Medium" | "High"
  soilType: string[]
  growthDuration: string
  description: string
}

interface CropRecommendationsProps {
  limit?: number
  detailed?: boolean
}

export default function CropRecommendations({ limit, detailed = false }: CropRecommendationsProps) {
  const [crops, setCrops] = useState<Crop[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const fetchCrops = async () => {
      setLoading(true)
      // In a real app, this would be an API call to an agricultural service
      setTimeout(() => {
        const mockCrops: Crop[] = [
          {
            id: 1,
            name: "Wheat",
            suitability: 95,
            season: "Rabi",
            waterRequirement: "Medium",
            soilType: ["Loamy", "Clay Loam"],
            growthDuration: "120-150 days",
            description:
              "Wheat is a staple food crop that thrives in cool weather. It's ideal for your region's climate and soil conditions.",
          },
          {
            id: 2,
            name: "Rice",
            suitability: 85,
            season: "Kharif",
            waterRequirement: "High",
            soilType: ["Clay", "Clay Loam"],
            growthDuration: "90-120 days",
            description:
              "Rice is a water-intensive crop that grows well in humid conditions with consistent rainfall or irrigation.",
          },
          {
            id: 3,
            name: "Maize (Corn)",
            suitability: 80,
            season: "Kharif",
            waterRequirement: "Medium",
            soilType: ["Loamy", "Sandy Loam"],
            growthDuration: "80-110 days",
            description: "Maize is a versatile crop that adapts well to various soil types and climatic conditions.",
          },
          {
            id: 4,
            name: "Chickpea",
            suitability: 90,
            season: "Rabi",
            waterRequirement: "Low",
            soilType: ["Sandy Loam", "Loamy"],
            growthDuration: "90-120 days",
            description: "Chickpea is a drought-tolerant legume that improves soil fertility by fixing nitrogen.",
          },
          {
            id: 5,
            name: "Mustard",
            suitability: 75,
            season: "Rabi",
            waterRequirement: "Low",
            soilType: ["Loamy", "Sandy Loam"],
            growthDuration: "110-140 days",
            description:
              "Mustard is a cold-tolerant oilseed crop that requires minimal irrigation and can grow in moderately fertile soils.",
          },
        ]

        setCrops(mockCrops)
        setLoading(false)
      }, 1500)
    }

    fetchCrops()
  }, [])

  const displayCrops = limit ? crops.slice(0, limit) : crops

  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: limit || 3 }).map((_, i) => (
          <Skeleton key={i} className="h-24 w-full" />
        ))}
      </div>
    )
  }

  if (detailed) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {displayCrops.map((crop) => (
          <Card key={crop.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{crop.name}</CardTitle>
                  <CardDescription>Suitability: {crop.suitability}%</CardDescription>
                </div>
                <Badge variant={crop.suitability > 85 ? "default" : "secondary"}>{crop.season}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{crop.description}</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Droplets className="h-4 w-4 text-blue-500" />
                  <div className="text-sm">
                    <div className="font-medium">Water Need</div>
                    <div className="text-muted-foreground">{crop.waterRequirement}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <ThermometerSun className="h-4 w-4 text-orange-500" />
                  <div className="text-sm">
                    <div className="font-medium">Growth Period</div>
                    <div className="text-muted-foreground">{crop.growthDuration}</div>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <div className="text-sm font-medium">Suitable Soil Types</div>
                <div className="flex flex-wrap gap-2 mt-1">
                  {crop.soilType.map((soil, index) => (
                    <Badge key={index} variant="outline">
                      {soil}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" size="sm" className="w-full">
                <Link href={`/crops/${crop.id}`}>
                  View Detailed Guide <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {displayCrops.map((crop) => (
        <div key={crop.id} className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sun className="h-5 w-5 text-yellow-500" />
            <div>
              <div className="font-medium">{crop.name}</div>
              <div className="text-sm text-muted-foreground">{crop.season} season</div>
            </div>
          </div>
          <Badge variant={crop.suitability > 85 ? "default" : "secondary"}>{crop.suitability}% match</Badge>
        </div>
      ))}
      {limit && crops.length > limit && (
        <Button asChild variant="link" className="px-0">
          <Link href="/crops">
            View All Recommendations <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      )}
    </div>
  )
}
