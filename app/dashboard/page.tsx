import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import WeatherWidget from "@/components/weather-widget"
import CropRecommendations from "@/components/crop-recommendations"
import MarketPrices from "@/components/market-prices"
import SoilHealthTips from "@/components/soil-health-tips"
import GovernmentSchemes from "@/components/government-schemes"
import { Button } from "@/components/ui/button"
import { Settings } from "lucide-react"
import { LocationSelector } from "@/components/location-selector"

export default function Dashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Your farming insights and recommendations at a glance</p>
        </div>
        <div className="flex items-center gap-4">
          <LocationSelector />
          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
            <span className="sr-only">Settings</span>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="weather">Weather</TabsTrigger>
          <TabsTrigger value="crops">Crops</TabsTrigger>
          <TabsTrigger value="market">Market</TabsTrigger>
          <TabsTrigger value="soil">Soil</TabsTrigger>
          <TabsTrigger value="schemes">Schemes</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Weather</CardTitle>
                <CardDescription>Current weather conditions</CardDescription>
              </CardHeader>
              <CardContent>
                <WeatherWidget />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Crop Recommendations</CardTitle>
                <CardDescription>Based on your location and season</CardDescription>
              </CardHeader>
              <CardContent>
                <CropRecommendations limit={3} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Market Prices</CardTitle>
                <CardDescription>Today's prices for key crops</CardDescription>
              </CardHeader>
              <CardContent>
                <MarketPrices limit={3} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Soil Health</CardTitle>
                <CardDescription>Tips for maintaining soil health</CardDescription>
              </CardHeader>
              <CardContent>
                <SoilHealthTips limit={1} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Government Schemes</CardTitle>
                <CardDescription>Latest agricultural schemes</CardDescription>
              </CardHeader>
              <CardContent>
                <GovernmentSchemes limit={2} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Farming Calendar</CardTitle>
                <CardDescription>Upcoming activities for your crops</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">• Wheat: Time for second irrigation (Next 2 days)</p>
                <p className="text-sm text-muted-foreground">• Rice: Prepare seedbed (Next week)</p>
                <p className="text-sm text-muted-foreground">• Vegetables: Apply organic fertilizer (Today)</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="weather" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Detailed Weather Forecast</CardTitle>
              <CardDescription>7-day forecast for your location</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <WeatherWidget detailed />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="crops" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Crop Recommendations</CardTitle>
              <CardDescription>Personalized for your farm</CardDescription>
            </CardHeader>
            <CardContent>
              <CropRecommendations />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="market" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Market Prices</CardTitle>
              <CardDescription>Current prices across markets</CardDescription>
            </CardHeader>
            <CardContent>
              <MarketPrices />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="soil" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Soil Health Management</CardTitle>
              <CardDescription>Tips and recommendations</CardDescription>
            </CardHeader>
            <CardContent>
              <SoilHealthTips />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schemes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Government Schemes</CardTitle>
              <CardDescription>Agricultural subsidies and programs</CardDescription>
            </CardHeader>
            <CardContent>
              <GovernmentSchemes />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
