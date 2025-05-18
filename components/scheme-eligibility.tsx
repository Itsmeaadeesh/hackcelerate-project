"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Check, X } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"

interface SchemeResult {
  id: number
  title: string
  category: string
  eligible: boolean
  reason?: string
}

export default function SchemeEligibility() {
  const { t } = useLanguage()
  const [landOwnership, setLandOwnership] = useState("own")
  const [landSize, setLandSize] = useState<number>(2)
  const [farmingType, setFarmingType] = useState("conventional")
  const [crops, setCrops] = useState<string[]>(["wheat"])
  const [annualIncome, setAnnualIncome] = useState<number>(150000)
  const [results, setResults] = useState<SchemeResult[] | null>(null)

  const checkEligibility = () => {
    // This is a simplified eligibility check for demonstration purposes
    // In a real app, this would involve more complex rules and API calls

    const mockResults: SchemeResult[] = [
      {
        id: 1,
        title: "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)",
        category: "Financial Support",
        eligible: landOwnership === "own" && annualIncome < 200000,
        reason:
          landOwnership !== "own"
            ? "Only for land-owning farmers"
            : annualIncome >= 200000
              ? "Income exceeds eligibility limit"
              : undefined,
      },
      {
        id: 2,
        title: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
        category: "Insurance",
        eligible: true,
        reason: undefined,
      },
      {
        id: 3,
        title: "Kisan Credit Card (KCC)",
        category: "Credit",
        eligible: landOwnership === "own" || landOwnership === "leased",
        reason: landOwnership === "none" ? "Requires land ownership or lease agreement" : undefined,
      },
      {
        id: 4,
        title: "Soil Health Card Scheme",
        category: "Technical Support",
        eligible: true,
        reason: undefined,
      },
      {
        id: 5,
        title: "National Mission for Sustainable Agriculture (NMSA)",
        category: "Sustainability",
        eligible: farmingType === "organic" || farmingType === "natural",
        reason: farmingType === "conventional" ? "Only for organic/natural farming practices" : undefined,
      },
    ]

    setResults(mockResults)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Eligibility Checker</CardTitle>
          <CardDescription>Enter your details to check eligibility for various agricultural schemes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="land-ownership">Land Ownership Status</Label>
                <Select value={landOwnership} onValueChange={setLandOwnership}>
                  <SelectTrigger id="land-ownership">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="own">Own Land</SelectItem>
                    <SelectItem value="leased">Leased Land</SelectItem>
                    <SelectItem value="sharecropping">Sharecropping</SelectItem>
                    <SelectItem value="none">No Land</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="land-size">Land Size (Acres)</Label>
                <Input
                  id="land-size"
                  type="number"
                  min="0"
                  step="0.5"
                  value={landSize}
                  onChange={(e) => setLandSize(Number.parseFloat(e.target.value) || 0)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="farming-type">Farming Type</Label>
                <Select value={farmingType} onValueChange={setFarmingType}>
                  <SelectTrigger id="farming-type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="conventional">Conventional</SelectItem>
                    <SelectItem value="organic">Organic</SelectItem>
                    <SelectItem value="natural">Natural Farming</SelectItem>
                    <SelectItem value="mixed">Mixed Farming</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="annual-income">Annual Income (₹)</Label>
                <Input
                  id="annual-income"
                  type="number"
                  min="0"
                  step="10000"
                  value={annualIncome}
                  onChange={(e) => setAnnualIncome(Number.parseInt(e.target.value) || 0)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Main Crops</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="wheat"
                    checked={crops.includes("wheat")}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setCrops([...crops, "wheat"])
                      } else {
                        setCrops(crops.filter((crop) => crop !== "wheat"))
                      }
                    }}
                  />
                  <Label htmlFor="wheat" className="text-sm">
                    Wheat
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="rice"
                    checked={crops.includes("rice")}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setCrops([...crops, "rice"])
                      } else {
                        setCrops(crops.filter((crop) => crop !== "rice"))
                      }
                    }}
                  />
                  <Label htmlFor="rice" className="text-sm">
                    Rice
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="maize"
                    checked={crops.includes("maize")}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setCrops([...crops, "maize"])
                      } else {
                        setCrops(crops.filter((crop) => crop !== "maize"))
                      }
                    }}
                  />
                  <Label htmlFor="maize" className="text-sm">
                    Maize
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="pulses"
                    checked={crops.includes("pulses")}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setCrops([...crops, "pulses"])
                      } else {
                        setCrops(crops.filter((crop) => crop !== "pulses"))
                      }
                    }}
                  />
                  <Label htmlFor="pulses" className="text-sm">
                    Pulses
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="vegetables"
                    checked={crops.includes("vegetables")}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setCrops([...crops, "vegetables"])
                      } else {
                        setCrops(crops.filter((crop) => crop !== "vegetables"))
                      }
                    }}
                  />
                  <Label htmlFor="vegetables" className="text-sm">
                    Vegetables
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="fruits"
                    checked={crops.includes("fruits")}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setCrops([...crops, "fruits"])
                      } else {
                        setCrops(crops.filter((crop) => crop !== "fruits"))
                      }
                    }}
                  />
                  <Label htmlFor="fruits" className="text-sm">
                    Fruits
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="oilseeds"
                    checked={crops.includes("oilseeds")}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setCrops([...crops, "oilseeds"])
                      } else {
                        setCrops(crops.filter((crop) => crop !== "oilseeds"))
                      }
                    }}
                  />
                  <Label htmlFor="oilseeds" className="text-sm">
                    Oilseeds
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="cotton"
                    checked={crops.includes("cotton")}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setCrops([...crops, "cotton"])
                      } else {
                        setCrops(crops.filter((crop) => crop !== "cotton"))
                      }
                    }}
                  />
                  <Label htmlFor="cotton" className="text-sm">
                    Cotton
                  </Label>
                </div>
              </div>
            </div>
          </div>

          <Button onClick={checkEligibility} className="w-full mt-6">
            Check Eligibility
          </Button>
        </CardContent>
      </Card>

      {results && (
        <Card>
          <CardHeader>
            <CardTitle>Eligibility Results</CardTitle>
            <CardDescription>Based on the information provided</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {results.map((result) => (
                <div key={result.id} className="flex items-start justify-between border-b pb-4 last:border-0 last:pb-0">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{result.title}</h3>
                      <Badge variant="outline">{result.category}</Badge>
                    </div>
                    {result.reason && <p className="text-sm text-muted-foreground mt-1">{result.reason}</p>}
                  </div>
                  <div className="flex items-center">
                    {result.eligible ? (
                      <Badge className="bg-green-500">
                        <Check className="h-4 w-4 mr-1" /> Eligible
                      </Badge>
                    ) : (
                      <Badge variant="destructive">
                        <X className="h-4 w-4 mr-1" /> Not Eligible
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full sm:w-auto">
              <Link href="/schemes">
                View All Schemes <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}
