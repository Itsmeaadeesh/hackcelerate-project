import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LocationSelector } from "@/components/location-selector"
import WeatherForecast from "@/components/weather-forecast"
import WeatherAlerts from "@/components/weather-alerts"
import WeatherHistory from "@/components/weather-history"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

export default function WeatherPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Weather Forecast</h1>
          <p className="text-muted-foreground">Detailed weather information to plan your farming activities</p>
        </div>
        <div className="flex items-center gap-4">
          <LocationSelector />
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Download Report
          </Button>
        </div>
      </div>

      <Tabs defaultValue="forecast" className="space-y-4">
        <TabsList>
          <TabsTrigger value="forecast">7-Day Forecast</TabsTrigger>
          <TabsTrigger value="hourly">Hourly Forecast</TabsTrigger>
          <TabsTrigger value="alerts">Weather Alerts</TabsTrigger>
          <TabsTrigger value="history">Historical Data</TabsTrigger>
        </TabsList>

        <TabsContent value="forecast" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>7-Day Weather Forecast</CardTitle>
              <CardDescription>Plan your week with accurate weather predictions</CardDescription>
            </CardHeader>
            <CardContent>
              <WeatherForecast type="daily" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="hourly" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Hourly Weather Forecast</CardTitle>
              <CardDescription>Detailed hourly predictions for the next 48 hours</CardDescription>
            </CardHeader>
            <CardContent>
              <WeatherForecast type="hourly" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Weather Alerts</CardTitle>
              <CardDescription>Important weather warnings and advisories</CardDescription>
            </CardHeader>
            <CardContent>
              <WeatherAlerts />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Historical Weather Data</CardTitle>
              <CardDescription>Weather patterns from previous months</CardDescription>
            </CardHeader>
            <CardContent>
              <WeatherHistory />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
