"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LocationSelector } from "@/components/location-selector"
import { Button } from "@/components/ui/button"
import { Download, Calendar, Info, Share2 } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import MarketPrices from "@/components/market-prices"
import MarketTrends from "@/components/market-trends"
import NearbyMarkets from "@/components/nearby-markets"

export default function MarketPage() {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState("prices")

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t("market.title")}</h1>
          <p className="text-muted-foreground">{t("market.subtitle")}</p>
        </div>
        <div className="flex items-center gap-4">
          <LocationSelector />
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="prices">Market Prices</TabsTrigger>
          <TabsTrigger value="trends">Price Trends</TabsTrigger>
          <TabsTrigger value="nearby">Nearby Markets</TabsTrigger>
        </TabsList>

        <TabsContent value="prices" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Comprehensive Market Prices</CardTitle>
              <CardDescription>
                View current market prices for all major crops across India's agricultural markets
              </CardDescription>
            </CardHeader>
            <CardContent>
              <MarketPrices detailed={true} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Price Trends Analysis</CardTitle>
              <CardDescription>Track price trends over time to make informed selling decisions</CardDescription>
            </CardHeader>
            <CardContent>
              <MarketTrends />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="nearby">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Nearby Agricultural Markets</CardTitle>
              <CardDescription>Find markets close to your location with current trading information</CardDescription>
            </CardHeader>
            <CardContent>
              <NearbyMarkets />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <Info className="h-5 w-5 mr-2" />
              Market Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Our market data is sourced from official Agricultural Produce Market Committees (APMCs) and updated daily.
              Prices may vary based on quality, quantity, and local market conditions.
            </p>
            <Button variant="link" className="p-0 h-auto mt-2">
              Learn more about our data sources
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <Share2 className="h-5 w-5 mr-2" />
              Price Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Set up price alerts to get notified when prices for your crops reach your target levels.
            </p>
            <Button className="w-full mt-4">Set Up Price Alerts</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Market Calendar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              View upcoming market days, auctions, and special trading events in your area.
            </p>
            <Button variant="outline" className="w-full mt-4">
              View Market Calendar
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
