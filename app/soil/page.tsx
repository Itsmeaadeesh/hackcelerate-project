import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LocationSelector } from "@/components/location-selector"
import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"
import SoilHealthTips from "@/components/soil-health-tips"
import SoilTestingGuide from "@/components/soil-testing-guide"
import FertilizerCalculator from "@/components/fertilizer-calculator"

export default function SoilPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Soil Health</h1>
          <p className="text-muted-foreground">Tips and insights for maintaining optimal soil health</p>
        </div>
        <div className="flex items-center gap-4">
          <LocationSelector />
          <Button variant="outline" size="sm">
            <Upload className="mr-2 h-4 w-4" />
            Upload Soil Test
          </Button>
        </div>
      </div>

      <Tabs defaultValue="tips" className="space-y-4">
        <TabsList>
          <TabsTrigger value="tips">Soil Health Tips</TabsTrigger>
          <TabsTrigger value="testing">Soil Testing</TabsTrigger>
          <TabsTrigger value="fertilizer">Fertilizer Calculator</TabsTrigger>
        </TabsList>

        <TabsContent value="tips" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Soil Health Management</CardTitle>
              <CardDescription>Best practices for maintaining soil fertility</CardDescription>
            </CardHeader>
            <CardContent>
              <SoilHealthTips detailed />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="testing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Soil Testing Guide</CardTitle>
              <CardDescription>How to test your soil and interpret results</CardDescription>
            </CardHeader>
            <CardContent>
              <SoilTestingGuide />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fertilizer" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Fertilizer Calculator</CardTitle>
              <CardDescription>Calculate optimal fertilizer application based on soil test results</CardDescription>
            </CardHeader>
            <CardContent>
              <FertilizerCalculator />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
