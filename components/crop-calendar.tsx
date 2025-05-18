"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"

const cropCalendarData = {
  wheat: {
    name: "Wheat",
    seasons: {
      rabi: {
        sowing: { start: new Date(2025, 9, 15), end: new Date(2025, 10, 15) }, // Oct 15 - Nov 15
        harvesting: { start: new Date(2026, 2, 15), end: new Date(2026, 3, 15) }, // Mar 15 - Apr 15
      },
    },
    activities: [
      { name: "Land Preparation", period: "2 weeks before sowing" },
      { name: "Sowing", period: "Mid-October to Mid-November" },
      { name: "First Irrigation", period: "20-25 days after sowing" },
      { name: "Second Irrigation", period: "40-45 days after sowing" },
      { name: "Third Irrigation", period: "60-65 days after sowing" },
      { name: "Fourth Irrigation", period: "80-85 days after sowing" },
      { name: "Harvesting", period: "Mid-March to Mid-April" },
    ],
  },
  rice: {
    name: "Rice",
    seasons: {
      kharif: {
        sowing: { start: new Date(2025, 5, 1), end: new Date(2025, 6, 15) }, // Jun 1 - Jul 15
        harvesting: { start: new Date(2025, 9, 1), end: new Date(2025, 10, 15) }, // Oct 1 - Nov 15
      },
    },
    activities: [
      { name: "Nursery Preparation", period: "15-20 days before transplanting" },
      { name: "Transplanting", period: "June to mid-July" },
      { name: "Weed Management", period: "15-20 days after transplanting" },
      { name: "First Fertilizer Application", period: "At transplanting" },
      { name: "Second Fertilizer Application", period: "30 days after transplanting" },
      { name: "Harvesting", period: "October to mid-November" },
    ],
  },
  maize: {
    name: "Maize (Corn)",
    seasons: {
      kharif: {
        sowing: { start: new Date(2025, 5, 15), end: new Date(2025, 6, 15) }, // Jun 15 - Jul 15
        harvesting: { start: new Date(2025, 8, 15), end: new Date(2025, 9, 15) }, // Sep 15 - Oct 15
      },
      rabi: {
        sowing: { start: new Date(2025, 9, 15), end: new Date(2025, 10, 15) }, // Oct 15 - Nov 15
        harvesting: { start: new Date(2026, 1, 15), end: new Date(2026, 2, 15) }, // Feb 15 - Mar 15
      },
    },
    activities: [
      { name: "Land Preparation", period: "1-2 weeks before sowing" },
      { name: "Sowing", period: "Kharif: June-July, Rabi: Oct-Nov" },
      { name: "Thinning", period: "15-20 days after germination" },
      { name: "First Irrigation", period: "20-25 days after sowing" },
      { name: "Second Irrigation", period: "40-45 days after sowing" },
      { name: "Harvesting", period: "Kharif: Sep-Oct, Rabi: Feb-Mar" },
    ],
  },
}

export default function CropCalendar() {
  const [selectedCrop, setSelectedCrop] = useState("wheat")
  const [selectedView, setSelectedView] = useState("calendar")
  const [date, setDate] = useState<Date | undefined>(new Date())

  const cropData = cropCalendarData[selectedCrop as keyof typeof cropCalendarData]

  const getDateClass = (date: Date) => {
    const seasons = cropData.seasons

    for (const seasonKey in seasons) {
      const season = seasons[seasonKey as keyof typeof seasons]

      if (date >= season.sowing.start && date <= season.sowing.end) {
        return "bg-green-100 text-green-800 rounded-full"
      }

      if (date >= season.harvesting.start && date <= season.harvesting.end) {
        return "bg-yellow-100 text-yellow-800 rounded-full"
      }
    }

    return ""
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <Select value={selectedCrop} onValueChange={setSelectedCrop}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select crop" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="wheat">Wheat</SelectItem>
            <SelectItem value="rice">Rice</SelectItem>
            <SelectItem value="maize">Maize (Corn)</SelectItem>
          </SelectContent>
        </Select>

        <Tabs value={selectedView} onValueChange={setSelectedView} className="w-full sm:w-auto">
          <TabsList>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
            <TabsTrigger value="activities">Activities</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <TabsContent value="calendar" className="mt-0">
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-center mb-4">
              <div className="flex gap-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm">Sowing Period</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                  <span className="text-sm">Harvesting Period</span>
                </div>
              </div>
            </div>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
              modifiersClassNames={{
                selected: "bg-primary text-primary-foreground",
              }}
              modifiers={{
                sowing: Object.values(cropData.seasons).map((season) => ({
                  from: season.sowing.start,
                  to: season.sowing.end,
                })),
                harvesting: Object.values(cropData.seasons).map((season) => ({
                  from: season.harvesting.start,
                  to: season.harvesting.end,
                })),
              }}
              modifiersStyles={{
                sowing: { backgroundColor: "#10b981", color: "white" },
                harvesting: { backgroundColor: "#f59e0b", color: "white" },
              }}
            />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="activities" className="mt-0">
        <Card>
          <CardContent className="p-4">
            <div className="space-y-4">
              {cropData.activities.map((activity, index) => (
                <div key={index} className="flex items-start gap-4 pb-4 border-b last:border-0">
                  <Badge className="mt-0.5">{index + 1}</Badge>
                  <div>
                    <h4 className="font-medium">{activity.name}</h4>
                    <p className="text-sm text-muted-foreground">{activity.period}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </div>
  )
}
