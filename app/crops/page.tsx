import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LocationSelector } from "@/components/location-selector"
import { Button } from "@/components/ui/button"
import { Filter } from "lucide-react"
import CropRecommendations from "@/components/crop-recommendations"
import CropCalendar from "@/components/crop-calendar"
import CropDetails from "@/components/crop-details"

export default function CropsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Crop Recommendations</h1>
          <p className="text-muted-foreground">Personalized crop suggestions based on your location and season</p>
        </div>
        <div className="flex items-center gap-4">
          <LocationSelector />
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter Options
          </Button>
        </div>
      </div>

      <Tabs defaultValue="recommendations" className="space-y-4">
        <TabsList>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          <TabsTrigger value="calendar">Crop Calendar</TabsTrigger>
          <TabsTrigger value="library">Crop Library</TabsTrigger>
        </TabsList>

        <TabsContent value="recommendations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recommended Crops</CardTitle>
              <CardDescription>Based on your soil type, climate, and market trends</CardDescription>
            </CardHeader>
            <CardContent>
              <CropRecommendations detailed />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendar" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Crop Calendar</CardTitle>
              <CardDescription>Seasonal planting and harvesting schedule</CardDescription>
            </CardHeader>
            <CardContent>
              <CropCalendar />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="library" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Crop Library</CardTitle>
              <CardDescription>Detailed information about various crops</CardDescription>
            </CardHeader>
            <CardContent>
              <CropDetails />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
