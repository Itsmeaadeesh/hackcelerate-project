"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { MapPin, Phone, Clock, Calendar, Building, Truck } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { useLanguage } from "@/contexts/language-context"

interface Market {
  id: number
  name: string
  distance: number
  address: string
  phone: string
  tradingHours: string
  tradingDays: string[]
  mainCrops: string[]
  facilities: string[]
  averageArrival: string
  state: string
  district: string
  type: "APMC" | "Private" | "Cooperative"
}

export default function NearbyMarkets() {
  const { t } = useLanguage()
  const [markets, setMarkets] = useState<Market[]>([])
  const [filteredMarkets, setFilteredMarkets] = useState<Market[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedState, setSelectedState] = useState<string>("all")
  const [selectedDistrict, setSelectedDistrict] = useState<string>("all")
  const [selectedType, setSelectedType] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("distance")
  const [searchTerm, setSearchTerm] = useState("")

  // States data
  const states = [
    "Andhra Pradesh",
    "Bihar",
    "Gujarat",
    "Haryana",
    "Karnataka",
    "Madhya Pradesh",
    "Maharashtra",
    "Punjab",
    "Rajasthan",
    "Tamil Nadu",
    "Telangana",
    "Uttar Pradesh",
    "West Bengal",
  ]

  // Districts data (simplified for demo)
  const districts: Record<string, string[]> = {
    Punjab: ["Amritsar", "Ludhiana", "Patiala", "Jalandhar", "Bathinda"],
    Haryana: ["Karnal", "Hisar", "Ambala", "Gurugram", "Rohtak"],
    "Uttar Pradesh": ["Lucknow", "Kanpur", "Agra", "Varanasi", "Meerut"],
    "Madhya Pradesh": ["Bhopal", "Indore", "Gwalior", "Jabalpur", "Ujjain"],
    Maharashtra: ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad"],
  }

  useEffect(() => {
    // Simulate API call
    const fetchMarkets = async () => {
      setLoading(true)
      // In a real app, this would be an API call to a location service
      setTimeout(() => {
        const mockMarkets: Market[] = [
          {
            id: 1,
            name: "Khanna Grain Market",
            distance: 5.2,
            address: "G.T. Road, Khanna, Punjab",
            phone: "+91 1234567890",
            tradingHours: "8:00 AM - 6:00 PM",
            tradingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            mainCrops: ["Wheat", "Rice", "Maize"],
            facilities: ["Electronic Weighing", "Storage", "Banking", "Transport"],
            averageArrival: "500-700 quintals/day",
            state: "Punjab",
            district: "Ludhiana",
            type: "APMC",
          },
          {
            id: 2,
            name: "Ludhiana Mandi",
            distance: 12.8,
            address: "Gill Road, Ludhiana, Punjab",
            phone: "+91 9876543210",
            tradingHours: "7:00 AM - 7:00 PM",
            tradingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            mainCrops: ["Wheat", "Rice", "Vegetables", "Fruits"],
            facilities: ["Electronic Weighing", "Storage", "Banking", "Transport", "Cold Storage"],
            averageArrival: "800-1000 quintals/day",
            state: "Punjab",
            district: "Ludhiana",
            type: "APMC",
          },
          {
            id: 3,
            name: "Jalandhar Grain Market",
            distance: 28.5,
            address: "Nakodar Road, Jalandhar, Punjab",
            phone: "+91 8765432109",
            tradingHours: "8:00 AM - 5:00 PM",
            tradingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            mainCrops: ["Wheat", "Maize", "Potatoes"],
            facilities: ["Electronic Weighing", "Storage", "Transport"],
            averageArrival: "300-500 quintals/day",
            state: "Punjab",
            district: "Jalandhar",
            type: "APMC",
          },
          {
            id: 4,
            name: "Patiala Vegetable Market",
            distance: 35.2,
            address: "Rajpura Road, Patiala, Punjab",
            phone: "+91 7654321098",
            tradingHours: "6:00 AM - 8:00 PM",
            tradingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            mainCrops: ["Vegetables", "Fruits", "Spices"],
            facilities: ["Electronic Weighing", "Cold Storage", "Transport"],
            averageArrival: "200-300 quintals/day",
            state: "Punjab",
            district: "Patiala",
            type: "APMC",
          },
          {
            id: 5,
            name: "Karnal Grain Market",
            distance: 42.7,
            address: "GT Road, Karnal, Haryana",
            phone: "+91 9988776655",
            tradingHours: "7:30 AM - 6:30 PM",
            tradingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            mainCrops: ["Wheat", "Rice", "Maize", "Barley"],
            facilities: ["Electronic Weighing", "Storage", "Banking", "Transport"],
            averageArrival: "600-800 quintals/day",
            state: "Haryana",
            district: "Karnal",
            type: "APMC",
          },
          {
            id: 6,
            name: "Ambala Wholesale Market",
            distance: 55.3,
            address: "Ambala Cantt, Haryana",
            phone: "+91 9876123450",
            tradingHours: "7:00 AM - 6:00 PM",
            tradingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            mainCrops: ["Wheat", "Rice", "Pulses", "Oilseeds"],
            facilities: ["Electronic Weighing", "Storage", "Banking"],
            averageArrival: "400-600 quintals/day",
            state: "Haryana",
            district: "Ambala",
            type: "APMC",
          },
          {
            id: 7,
            name: "Hisar Agricultural Market",
            distance: 78.9,
            address: "Delhi Road, Hisar, Haryana",
            phone: "+91 8877665544",
            tradingHours: "8:00 AM - 5:30 PM",
            tradingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            mainCrops: ["Cotton", "Wheat", "Mustard", "Gram"],
            facilities: ["Electronic Weighing", "Storage", "Banking", "Transport"],
            averageArrival: "500-700 quintals/day",
            state: "Haryana",
            district: "Hisar",
            type: "APMC",
          },
          {
            id: 8,
            name: "Bathinda Cotton Market",
            distance: 62.1,
            address: "Goniana Road, Bathinda, Punjab",
            phone: "+91 9911223344",
            tradingHours: "8:30 AM - 6:00 PM",
            tradingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            mainCrops: ["Cotton", "Wheat", "Mustard"],
            facilities: ["Electronic Weighing", "Storage", "Banking", "Transport"],
            averageArrival: "400-600 quintals/day",
            state: "Punjab",
            district: "Bathinda",
            type: "APMC",
          },
          {
            id: 9,
            name: "Amritsar Grain Market",
            distance: 85.4,
            address: "GT Road, Amritsar, Punjab",
            phone: "+91 8899776655",
            tradingHours: "7:00 AM - 6:00 PM",
            tradingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            mainCrops: ["Wheat", "Rice", "Maize"],
            facilities: ["Electronic Weighing", "Storage", "Banking", "Transport"],
            averageArrival: "700-900 quintals/day",
            state: "Punjab",
            district: "Amritsar",
            type: "APMC",
          },
          {
            id: 10,
            name: "Rohtak Mandi",
            distance: 92.7,
            address: "Delhi Road, Rohtak, Haryana",
            phone: "+91 7788990011",
            tradingHours: "7:30 AM - 5:30 PM",
            tradingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            mainCrops: ["Wheat", "Rice", "Bajra", "Jowar"],
            facilities: ["Electronic Weighing", "Storage", "Banking"],
            averageArrival: "300-500 quintals/day",
            state: "Haryana",
            district: "Rohtak",
            type: "APMC",
          },
          {
            id: 11,
            name: "Farmer's Direct Market",
            distance: 8.3,
            address: "Model Town, Ludhiana, Punjab",
            phone: "+91 9988776655",
            tradingHours: "9:00 AM - 5:00 PM",
            tradingDays: ["Wednesday", "Saturday", "Sunday"],
            mainCrops: ["Vegetables", "Fruits", "Dairy"],
            facilities: ["Electronic Weighing", "Parking"],
            averageArrival: "50-100 quintals/day",
            state: "Punjab",
            district: "Ludhiana",
            type: "Cooperative",
          },
          {
            id: 12,
            name: "Agri Business Center",
            distance: 15.6,
            address: "Industrial Area, Ludhiana, Punjab",
            phone: "+91 9876543210",
            tradingHours: "10:00 AM - 6:00 PM",
            tradingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            mainCrops: ["Wheat", "Rice", "Maize", "Pulses"],
            facilities: ["Electronic Weighing", "Storage", "Processing", "Export Facilitation"],
            averageArrival: "200-300 quintals/day",
            state: "Punjab",
            district: "Ludhiana",
            type: "Private",
          },
        ]

        setMarkets(mockMarkets)
        setFilteredMarkets(mockMarkets)
        setLoading(false)
      }, 1500)
    }

    fetchMarkets()
  }, [])

  // Filter and sort markets
  useEffect(() => {
    let result = [...markets]

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      result = result.filter(
        (market) =>
          market.name.toLowerCase().includes(term) ||
          market.address.toLowerCase().includes(term) ||
          market.district.toLowerCase().includes(term) ||
          market.state.toLowerCase().includes(term) ||
          market.mainCrops.some((crop) => crop.toLowerCase().includes(term)),
      )
    }

    // Apply state filter
    if (selectedState !== "all") {
      result = result.filter((market) => market.state === selectedState)
    }

    // Apply district filter
    if (selectedDistrict !== "all") {
      result = result.filter((market) => market.district === selectedDistrict)
    }

    // Apply type filter
    if (selectedType !== "all") {
      result = result.filter((market) => market.type === selectedType)
    }

    // Apply sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case "distance":
          return a.distance - b.distance
        case "name":
          return a.name.localeCompare(b.name)
        case "arrival":
          // Extract the first number from averageArrival for sorting
          const aArrival = Number.parseInt(a.averageArrival.split("-")[0])
          const bArrival = Number.parseInt(b.averageArrival.split("-")[0])
          return bArrival - aArrival
        default:
          return a.distance - b.distance
      }
    })

    setFilteredMarkets(result)
  }, [markets, searchTerm, selectedState, selectedDistrict, selectedType, sortBy])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-48 w-full" />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Input
            type="search"
            placeholder="Search markets by name, location, or crop"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <Select
            value={selectedState}
            onValueChange={(value) => {
              setSelectedState(value)
              setSelectedDistrict("all")
            }}
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Select state" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All States</SelectItem>
              {states.map((state) => (
                <SelectItem key={state} value={state}>
                  {state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedDistrict} onValueChange={setSelectedDistrict} disabled={selectedState === "all"}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Select district" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Districts</SelectItem>
              {selectedState !== "all" &&
                districts[selectedState]?.map((district) => (
                  <SelectItem key={district} value={district}>
                    {district}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>

          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Market type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="APMC">APMC</SelectItem>
              <SelectItem value="Private">Private</SelectItem>
              <SelectItem value="Cooperative">Cooperative</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="distance">Distance</SelectItem>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="arrival">Arrival Volume</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredMarkets.length === 0 ? (
          <div className="col-span-2 text-center py-8">
            <p className="text-lg text-muted-foreground">No markets found matching your criteria.</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setSearchTerm("")
                setSelectedState("all")
                setSelectedDistrict("all")
                setSelectedType("all")
                setSortBy("distance")
              }}
            >
              Reset Filters
            </Button>
          </div>
        ) : (
          filteredMarkets.map((market) => (
            <Card key={market.id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{market.name}</CardTitle>
                    <CardDescription>{market.address}</CardDescription>
                  </div>
                  <Badge variant="outline">{market.distance} km</Badge>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{market.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{market.tradingHours}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{market.tradingDays.join(", ")}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {market.type} | {market.district}, {market.state}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Truck className="h-4 w-4 text-muted-foreground" />
                    <span>Average Arrival: {market.averageArrival}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {market.mainCrops.map((crop, index) => (
                      <Badge key={index} variant="secondary">
                        {crop}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {market.facilities.map((facility, index) => (
                      <Badge key={index} variant="outline" className="bg-muted">
                        {facility}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full gap-2">
                  <MapPin className="h-4 w-4" />
                  Get Directions
                </Button>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
