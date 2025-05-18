"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search } from "lucide-react"

const cropLibrary = [
  {
    id: "wheat",
    name: "Wheat",
    scientificName: "Triticum aestivum",
    category: "Cereal",
    seasons: ["Rabi"],
    waterRequirement: "Medium (450-650 mm)",
    soilTypes: ["Loamy", "Clay Loam", "Sandy Loam"],
    growthDuration: "120-150 days",
    description:
      "Wheat is a staple food crop grown worldwide. It's a cool-season crop that requires moderate temperatures for optimal growth.",
    cultivation: [
      "Prepare the land by plowing and leveling.",
      "Sow seeds at a depth of 5-6 cm with row spacing of 20-22.5 cm.",
      "Apply basal dose of fertilizers before sowing.",
      "First irrigation should be given 20-25 days after sowing.",
      "Subsequent irrigations at crown root initiation, tillering, jointing, flowering, and grain filling stages.",
      "Harvest when the crop turns golden yellow and grain becomes hard.",
    ],
    pests: ["Aphids", "Termites", "Army Worm"],
    diseases: ["Leaf Rust", "Powdery Mildew", "Loose Smut"],
  },
  {
    id: "rice",
    name: "Rice",
    scientificName: "Oryza sativa",
    category: "Cereal",
    seasons: ["Kharif"],
    waterRequirement: "High (1200-1600 mm)",
    soilTypes: ["Clay", "Clay Loam", "Silt Loam"],
    growthDuration: "90-150 days",
    description:
      "Rice is a major food staple and the most important crop for more than half of the world's population. It's grown in flooded fields called paddies.",
    cultivation: [
      "Prepare nursery beds and sow pre-soaked seeds.",
      "Prepare main field by puddling and leveling.",
      "Transplant 20-25 days old seedlings at 20x15 cm spacing.",
      "Maintain 2-5 cm water level in the field.",
      "Apply fertilizers in split doses.",
      "Harvest when 80-85% of grains turn golden yellow.",
    ],
    pests: ["Stem Borer", "Brown Plant Hopper", "Leaf Folder"],
    diseases: ["Blast", "Bacterial Leaf Blight", "Sheath Blight"],
  },
  {
    id: "maize",
    name: "Maize (Corn)",
    scientificName: "Zea mays",
    category: "Cereal",
    seasons: ["Kharif", "Rabi"],
    waterRequirement: "Medium (500-800 mm)",
    soilTypes: ["Loamy", "Sandy Loam", "Silt Loam"],
    growthDuration: "80-110 days",
    description:
      "Maize is a versatile crop used for human consumption, animal feed, and industrial products. It's one of the most widely distributed crops in the world.",
    cultivation: [
      "Prepare fine seedbed by plowing and harrowing.",
      "Sow seeds at 4-5 cm depth with 60x20 cm spacing.",
      "Apply basal dose of fertilizers at sowing.",
      "First irrigation immediately after sowing if soil is dry.",
      "Subsequent irrigations at knee-high stage, tasseling, and grain filling.",
      "Harvest when cobs turn yellowish and grains become hard.",
    ],
    pests: ["Fall Armyworm", "Stem Borer", "Shoot Fly"],
    diseases: ["Leaf Blight", "Downy Mildew", "Stalk Rot"],
  },
]

export default function CropDetails() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCrop, setSelectedCrop] = useState(cropLibrary[0].id)

  const filteredCrops = cropLibrary.filter(
    (crop) =>
      crop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crop.scientificName.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const cropData = cropLibrary.find((crop) => crop.id === selectedCrop)

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search crops..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-1 space-y-2">
          {filteredCrops.map((crop) => (
            <Button
              key={crop.id}
              variant={selectedCrop === crop.id ? "default" : "outline"}
              className="w-full justify-start"
              onClick={() => setSelectedCrop(crop.id)}
            >
              {crop.name}
            </Button>
          ))}
        </div>

        <div className="md:col-span-3">
          {cropData && (
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                  <div>
                    <CardTitle>{cropData.name}</CardTitle>
                    <CardDescription>{cropData.scientificName}</CardDescription>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">{cropData.category}</Badge>
                    {cropData.seasons.map((season) => (
                      <Badge key={season}>{season}</Badge>
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="overview">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="cultivation">Cultivation</TabsTrigger>
                    <TabsTrigger value="pests">Pests & Diseases</TabsTrigger>
                    <TabsTrigger value="varieties">Varieties</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-4 mt-4">
                    <p>{cropData.description}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                      <div>
                        <h4 className="font-medium mb-2">Growing Season</h4>
                        <p className="text-sm text-muted-foreground">{cropData.seasons.join(", ")}</p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Growth Duration</h4>
                        <p className="text-sm text-muted-foreground">{cropData.growthDuration}</p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Water Requirement</h4>
                        <p className="text-sm text-muted-foreground">{cropData.waterRequirement}</p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Suitable Soil Types</h4>
                        <p className="text-sm text-muted-foreground">{cropData.soilTypes.join(", ")}</p>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="cultivation" className="mt-4">
                    <h4 className="font-medium mb-2">Cultivation Practices</h4>
                    <ol className="space-y-2 list-decimal list-inside">
                      {cropData.cultivation.map((step, index) => (
                        <li key={index} className="text-sm text-muted-foreground">
                          {step}
                        </li>
                      ))}
                    </ol>
                  </TabsContent>

                  <TabsContent value="pests" className="mt-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium mb-2">Common Pests</h4>
                        <ul className="space-y-2 list-disc list-inside">
                          {cropData.pests.map((pest, index) => (
                            <li key={index} className="text-sm text-muted-foreground">
                              {pest}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Common Diseases</h4>
                        <ul className="space-y-2 list-disc list-inside">
                          {cropData.diseases.map((disease, index) => (
                            <li key={index} className="text-sm text-muted-foreground">
                              {disease}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="varieties" className="mt-4">
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">Information about varieties will be available soon.</p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
