"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, RefreshCw } from "lucide-react"

interface FertilizerRecommendation {
  nitrogen: number
  phosphorus: number
  potassium: number
  urea: number
  dap: number
  mop: number
}

export default function FertilizerCalculator() {
  const [cropType, setCropType] = useState("wheat")
  const [areaUnit, setAreaUnit] = useState("acre")
  const [area, setArea] = useState<number>(1)
  const [soilNitrogen, setSoilNitrogen] = useState<number>(280)
  const [soilPhosphorus, setSoilPhosphorus] = useState<number>(25)
  const [soilPotassium, setSoilPotassium] = useState<number>(180)
  const [recommendation, setRecommendation] = useState<FertilizerRecommendation | null>(null)

  const calculateFertilizer = () => {
    // This is a simplified calculation for demonstration purposes
    // In a real app, this would be based on more complex formulas and crop-specific requirements

    let cropRequirements = {
      nitrogen: 0,
      phosphorus: 0,
      potassium: 0,
    }

    // Set crop nutrient requirements (kg/acre)
    switch (cropType) {
      case "wheat":
        cropRequirements = { nitrogen: 120, phosphorus: 60, potassium: 40 }
        break
      case "rice":
        cropRequirements = { nitrogen: 100, phosphorus: 50, potassium: 50 }
        break
      case "maize":
        cropRequirements = { nitrogen: 150, phosphorus: 75, potassium: 50 }
        break
      case "potato":
        cropRequirements = { nitrogen: 180, phosphorus: 100, potassium: 150 }
        break
      default:
        cropRequirements = { nitrogen: 100, phosphorus: 50, potassium: 40 }
    }

    // Convert to selected area unit if not acre
    let areaMultiplier = 1
    if (areaUnit === "hectare") {
      areaMultiplier = 2.47 // 1 hectare = 2.47 acres
    } else if (areaUnit === "bigha") {
      areaMultiplier = 0.625 // 1 bigha = 0.625 acres (varies by region)
    }

    // Calculate required nutrients based on soil test values and crop requirements
    const nitrogenDeficit = Math.max(0, cropRequirements.nitrogen - soilNitrogen / 10) * area * areaMultiplier
    const phosphorusDeficit = Math.max(0, cropRequirements.phosphorus - soilPhosphorus * 2.29) * area * areaMultiplier
    const potassiumDeficit = Math.max(0, cropRequirements.potassium - soilPotassium * 1.2) * area * areaMultiplier

    // Convert nutrient requirements to fertilizer quantities
    // Urea: 46% N, DAP: 18% N and 46% P2O5, MOP: 60% K2O
    const ureaRequired = Math.round((nitrogenDeficit * 100) / 46)
    const dapRequired = Math.round((phosphorusDeficit * 100) / 46)
    const mopRequired = Math.round((potassiumDeficit * 100) / 60)

    setRecommendation({
      nitrogen: Math.round(nitrogenDeficit),
      phosphorus: Math.round(phosphorusDeficit),
      potassium: Math.round(potassiumDeficit),
      urea: ureaRequired,
      dap: dapRequired,
      mop: mopRequired,
    })
  }

  const resetForm = () => {
    setCropType("wheat")
    setAreaUnit("acre")
    setArea(1)
    setSoilNitrogen(280)
    setSoilPhosphorus(25)
    setSoilPotassium(180)
    setRecommendation(null)
  }

  return (
    <Tabs defaultValue="calculator">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="calculator">Calculator</TabsTrigger>
        <TabsTrigger value="guide">Usage Guide</TabsTrigger>
      </TabsList>

      <TabsContent value="calculator" className="space-y-4 mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Fertilizer Calculator</CardTitle>
            <CardDescription>Calculate fertilizer requirements based on soil test results</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="crop-type">Crop Type</Label>
                  <Select value={cropType} onValueChange={setCropType}>
                    <SelectTrigger id="crop-type">
                      <SelectValue placeholder="Select crop" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="wheat">Wheat</SelectItem>
                      <SelectItem value="rice">Rice</SelectItem>
                      <SelectItem value="maize">Maize (Corn)</SelectItem>
                      <SelectItem value="potato">Potato</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <Label htmlFor="area">Area</Label>
                    <Input
                      id="area"
                      type="number"
                      min="0.1"
                      step="0.1"
                      value={area}
                      onChange={(e) => setArea(Number.parseFloat(e.target.value) || 0)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="area-unit">Unit</Label>
                    <Select value={areaUnit} onValueChange={setAreaUnit}>
                      <SelectTrigger id="area-unit">
                        <SelectValue placeholder="Select unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="acre">Acre</SelectItem>
                        <SelectItem value="hectare">Hectare</SelectItem>
                        <SelectItem value="bigha">Bigha</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Soil Test Results</Label>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nitrogen" className="text-xs">
                      Nitrogen (kg/ha)
                    </Label>
                    <Input
                      id="nitrogen"
                      type="number"
                      min="0"
                      value={soilNitrogen}
                      onChange={(e) => setSoilNitrogen(Number.parseInt(e.target.value) || 0)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phosphorus" className="text-xs">
                      Phosphorus (kg/ha)
                    </Label>
                    <Input
                      id="phosphorus"
                      type="number"
                      min="0"
                      value={soilPhosphorus}
                      onChange={(e) => setSoilPhosphorus(Number.parseInt(e.target.value) || 0)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="potassium" className="text-xs">
                      Potassium (kg/ha)
                    </Label>
                    <Input
                      id="potassium"
                      type="number"
                      min="0"
                      value={soilPotassium}
                      onChange={(e) => setSoilPotassium(Number.parseInt(e.target.value) || 0)}
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button onClick={calculateFertilizer} className="flex-1">
                  Calculate
                </Button>
                <Button variant="outline" onClick={resetForm}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
              </div>
            </div>

            {recommendation && (
              <div className="mt-6 border rounded-lg p-4">
                <h3 className="font-medium text-lg mb-4">Fertilizer Recommendation</h3>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium">Nutrient Requirements (kg)</h4>
                    <div className="grid grid-cols-3 gap-4 mt-2">
                      <div className="bg-green-50 p-2 rounded text-center">
                        <div className="text-xs text-muted-foreground">Nitrogen (N)</div>
                        <div className="font-bold">{recommendation.nitrogen}</div>
                      </div>
                      <div className="bg-blue-50 p-2 rounded text-center">
                        <div className="text-xs text-muted-foreground">Phosphorus (P)</div>
                        <div className="font-bold">{recommendation.phosphorus}</div>
                      </div>
                      <div className="bg-purple-50 p-2 rounded text-center">
                        <div className="text-xs text-muted-foreground">Potassium (K)</div>
                        <div className="font-bold">{recommendation.potassium}</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium">Fertilizer Quantities (kg)</h4>
                    <div className="grid grid-cols-3 gap-4 mt-2">
                      <div className="border p-2 rounded text-center">
                        <div className="text-xs text-muted-foreground">Urea</div>
                        <div className="font-bold">{recommendation.urea}</div>
                      </div>
                      <div className="border p-2 rounded text-center">
                        <div className="text-xs text-muted-foreground">DAP</div>
                        <div className="font-bold">{recommendation.dap}</div>
                      </div>
                      <div className="border p-2 rounded text-center">
                        <div className="text-xs text-muted-foreground">MOP</div>
                        <div className="font-bold">{recommendation.mop}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <Button className="mt-4 w-full sm:w-auto">
                  <Download className="mr-2 h-4 w-4" />
                  Download Recommendation
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="guide" className="space-y-4 mt-4">
        <Card>
          <CardHeader>
            <CardTitle>How to Use the Fertilizer Calculator</CardTitle>
            <CardDescription>Guide to get accurate fertilizer recommendations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">Step 1: Enter Crop Information</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Select your crop type from the dropdown menu. Different crops have different nutrient requirements.
                  Then enter the area you plan to cultivate and select the appropriate unit (acre, hectare, or bigha).
                </p>
              </div>

              <div>
                <h3 className="font-medium">Step 2: Enter Soil Test Results</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Input your soil test results for nitrogen, phosphorus, and potassium. These values should be in kg/ha
                  as reported in your soil test report. If you don't have soil test results, you can use the default
                  values, but the recommendations will be less accurate.
                </p>
              </div>

              <div>
                <h3 className="font-medium">Step 3: Calculate and Interpret</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Click the "Calculate" button to generate fertilizer recommendations. The results show both the
                  nutrient requirements (N, P, K) and the equivalent amounts of common fertilizers (Urea, DAP, MOP)
                  needed for your field.
                </p>
              </div>

              <div>
                <h3 className="font-medium">Important Notes</h3>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 mt-1">
                  <li>
                    The calculator provides general recommendations. Adjust based on local conditions and expert advice.
                  </li>
                  <li>Apply fertilizers in split doses for better nutrient utilization.</li>
                  <li>Consider using organic fertilizers and biofertilizers along with chemical fertilizers.</li>
                  <li>Soil pH affects nutrient availability. Correct soil pH issues before applying fertilizers.</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
