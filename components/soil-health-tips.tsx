"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

interface SoilTip {
  id: number
  title: string
  description: string
  category: "general" | "nutrient" | "conservation" | "organic"
  image?: string
}

interface SoilHealthTipsProps {
  limit?: number
  detailed?: boolean
}

export default function SoilHealthTips({ limit, detailed = false }: SoilHealthTipsProps) {
  const [tips, setTips] = useState<SoilTip[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState<string>("all")

  useEffect(() => {
    // Simulate API call
    const fetchTips = async () => {
      setLoading(true)
      // In a real app, this would be an API call to a content service
      setTimeout(() => {
        const mockTips: SoilTip[] = [
          {
            id: 1,
            title: "Regular Soil Testing",
            description:
              "Test your soil at least once every two years to monitor nutrient levels, pH, and organic matter content. This helps in making informed decisions about fertilizer application and soil amendments.",
            category: "general",
          },
          {
            id: 2,
            title: "Crop Rotation",
            description:
              "Implement a crop rotation plan to prevent nutrient depletion, break pest cycles, and improve soil structure. Different crops have different nutrient requirements and root structures.",
            category: "conservation",
          },
          {
            id: 3,
            title: "Cover Cropping",
            description:
              "Plant cover crops during off-seasons to prevent soil erosion, suppress weeds, and add organic matter to the soil. Leguminous cover crops like clover and vetch also fix nitrogen.",
            category: "conservation",
          },
          {
            id: 4,
            title: "Balanced Fertilization",
            description:
              "Apply fertilizers based on soil test results and crop requirements. Over-fertilization can lead to nutrient runoff, water pollution, and soil acidification.",
            category: "nutrient",
          },
          {
            id: 5,
            title: "Composting",
            description:
              "Use compost to add organic matter to the soil, improve soil structure, and enhance microbial activity. Compost also helps in recycling farm waste and reducing the need for chemical fertilizers.",
            category: "organic",
          },
        ]

        setTips(mockTips)
        setLoading(false)
      }, 1500)
    }

    fetchTips()
  }, [])

  const filteredTips = activeCategory === "all" ? tips : tips.filter((tip) => tip.category === activeCategory)

  const displayTips = limit ? filteredTips.slice(0, limit) : filteredTips

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
      <div className="space-y-4">
        <Tabs defaultValue="all" onValueChange={setActiveCategory}>
          <TabsList className="grid grid-cols-5 w-full">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="nutrient">Nutrient</TabsTrigger>
            <TabsTrigger value="conservation">Conservation</TabsTrigger>
            <TabsTrigger value="organic">Organic</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {displayTips.map((tip) => (
            <Card key={tip.id}>
              <CardHeader>
                <CardTitle>{tip.title}</CardTitle>
                <CardDescription>
                  Category: {tip.category.charAt(0).toUpperCase() + tip.category.slice(1)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{tip.description}</p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" size="sm">
                  <Link href={`/soil/tips/${tip.id}`}>
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {displayTips.map((tip) => (
        <div key={tip.id}>
          <h4 className="font-medium">{tip.title}</h4>
          <p className="text-sm text-muted-foreground line-clamp-2">{tip.description}</p>
        </div>
      ))}
      {limit && tips.length > limit && (
        <Button asChild variant="link" className="px-0">
          <Link href="/soil">
            View All Tips <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      )}
    </div>
  )
}
