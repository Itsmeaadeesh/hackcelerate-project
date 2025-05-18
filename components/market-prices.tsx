"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { ArrowDown, ArrowRight, ArrowUp, Minus, Search } from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/contexts/language-context"

interface MarketPrice {
  id: number
  crop: string
  variety: string
  price: number
  minPrice: number
  maxPrice: number
  unit: string
  market: string
  district: string
  state: string
  change: number
  lastUpdated: string
}

interface MarketPricesProps {
  limit?: number
  detailed?: boolean
}

// Major crop categories
const cropCategories = [
  { value: "all", label: "All Categories" },
  { value: "cereals", label: "Cereals" },
  { value: "pulses", label: "Pulses" },
  { value: "oilseeds", label: "Oilseeds" },
  { value: "vegetables", label: "Vegetables" },
  { value: "fruits", label: "Fruits" },
  { value: "spices", label: "Spices" },
  { value: "cash", label: "Cash Crops" },
]

// Generate mock data for all states and districts
const generateMockPrices = () => {
  const crops = {
    cereals: [
      { name: "Wheat", varieties: ["Sharbati", "Lokwan", "Dara"] },
      { name: "Rice", varieties: ["Basmati", "Sona Masuri", "Ponni"] },
      { name: "Maize", varieties: ["Yellow", "White", "Sweet Corn"] },
      { name: "Barley", varieties: ["Feed", "Malt"] },
      { name: "Jowar", varieties: ["White", "Yellow"] },
      { name: "Bajra", varieties: ["Hybrid", "Local"] },
    ],
    pulses: [
      { name: "Chickpea (Gram)", varieties: ["Desi", "Kabuli"] },
      { name: "Pigeon Pea (Tur/Arhar)", varieties: ["Local", "Hybrid"] },
      { name: "Black Gram (Urad)", varieties: ["Whole", "Split"] },
      { name: "Green Gram (Moong)", varieties: ["Whole", "Split"] },
      { name: "Lentil (Masoor)", varieties: ["Red", "Brown"] },
    ],
    oilseeds: [
      { name: "Soybean", varieties: ["Yellow", "Black"] },
      { name: "Mustard", varieties: ["Yellow", "Brown"] },
      { name: "Groundnut", varieties: ["Bold", "Small"] },
      { name: "Sunflower", varieties: ["Black", "Striped"] },
      { name: "Sesame", varieties: ["White", "Black", "Brown"] },
    ],
    vegetables: [
      { name: "Potato", varieties: ["Table", "Seed"] },
      { name: "Onion", varieties: ["Red", "White"] },
      { name: "Tomato", varieties: ["Hybrid", "Local"] },
      { name: "Cauliflower", varieties: ["Local"] },
      { name: "Cabbage", varieties: ["Local"] },
    ],
    fruits: [
      { name: "Apple", varieties: ["Delicious", "Kinnaur"] },
      { name: "Banana", varieties: ["Robusta", "Cavendish"] },
      { name: "Mango", varieties: ["Alphonso", "Dasheri", "Langra"] },
      { name: "Orange", varieties: ["Nagpur", "Kinnow"] },
      { name: "Grapes", varieties: ["Thompson", "Black"] },
    ],
    spices: [
      { name: "Turmeric", varieties: ["Finger", "Bulb"] },
      { name: "Chilli", varieties: ["Red", "Green"] },
      { name: "Coriander", varieties: ["Local"] },
      { name: "Cumin", varieties: ["Local"] },
      { name: "Garlic", varieties: ["Local"] },
    ],
    cash: [
      { name: "Cotton", varieties: ["Long Staple", "Medium Staple"] },
      { name: "Sugarcane", varieties: ["Early", "General"] },
      { name: "Jute", varieties: ["White", "Tossa"] },
      { name: "Coffee", varieties: ["Arabica", "Robusta"] },
      { name: "Tea", varieties: ["Leaf", "Dust"] },
    ],
  }

  const states = [
    {
      name: "Punjab",
      districts: ["Amritsar", "Ludhiana", "Patiala", "Jalandhar", "Bathinda"],
    },
    {
      name: "Haryana",
      districts: ["Karnal", "Hisar", "Ambala", "Gurugram", "Rohtak"],
    },
    {
      name: "Uttar Pradesh",
      districts: ["Lucknow", "Kanpur", "Agra", "Varanasi", "Meerut"],
    },
    {
      name: "Madhya Pradesh",
      districts: ["Bhopal", "Indore", "Gwalior", "Jabalpur", "Ujjain"],
    },
    {
      name: "Maharashtra",
      districts: ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad"],
    },
    {
      name: "Rajasthan",
      districts: ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Bikaner"],
    },
    {
      name: "Gujarat",
      districts: ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Gandhinagar"],
    },
    {
      name: "Karnataka",
      districts: ["Bengaluru", "Mysuru", "Hubballi", "Mangaluru", "Belagavi"],
    },
    {
      name: "Tamil Nadu",
      districts: ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem"],
    },
    {
      name: "Andhra Pradesh",
      districts: ["Visakhapatnam", "Vijayawada", "Guntur", "Tirupati", "Nellore"],
    },
    {
      name: "Telangana",
      districts: ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Khammam"],
    },
    {
      name: "West Bengal",
      districts: ["Kolkata", "Howrah", "Durgapur", "Asansol", "Siliguri"],
    },
    {
      name: "Bihar",
      districts: ["Patna", "Gaya", "Muzaffarpur", "Bhagalpur", "Darbhanga"],
    },
  ]

  const mockPrices: MarketPrice[] = []
  let id = 1

  // Generate prices for each state, district, and crop
  states.forEach((state) => {
    state.districts.forEach((district) => {
      // For each district, add 1-3 mandis
      const mandiCount = Math.floor(Math.random() * 3) + 1
      for (let m = 0; m < mandiCount; m++) {
        const mandiName = `${district} ${m === 0 ? "Main" : m === 1 ? "Rural" : "Sub"} Mandi`

        // Add crops from different categories
        Object.keys(crops).forEach((category) => {
          // Add 2-3 random crops from each category
          const categoryItems = crops[category as keyof typeof crops]
          const selectedCrops = categoryItems
            .sort(() => 0.5 - Math.random())
            .slice(0, Math.floor(Math.random() * 2) + 1)

          selectedCrops.forEach((crop) => {
            // Add 1-2 varieties for each crop
            const selectedVarieties = crop.varieties
              .sort(() => 0.5 - Math.random())
              .slice(0, Math.floor(Math.random() * 2) + 1)

            selectedVarieties.forEach((variety) => {
              // Base price depends on crop type
              let basePrice = 0
              switch (category) {
                case "cereals":
                  basePrice = Math.floor(Math.random() * 1000) + 1500
                  break
                case "pulses":
                  basePrice = Math.floor(Math.random() * 2000) + 3000
                  break
                case "oilseeds":
                  basePrice = Math.floor(Math.random() * 3000) + 4000
                  break
                case "vegetables":
                  basePrice = Math.floor(Math.random() * 1000) + 1000
                  break
                case "fruits":
                  basePrice = Math.floor(Math.random() * 3000) + 2000
                  break
                case "spices":
                  basePrice = Math.floor(Math.random() * 5000) + 5000
                  break
                case "cash":
                  basePrice = Math.floor(Math.random() * 2000) + 3000
                  break
                default:
                  basePrice = Math.floor(Math.random() * 1000) + 1000
              }

              const minPrice = basePrice - Math.floor(Math.random() * 200)
              const maxPrice = basePrice + Math.floor(Math.random() * 200)
              const change = Math.floor(Math.random() * 200) - 100

              // Generate a random date within the last week
              const today = new Date()
              const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
              const randomDate = new Date(lastWeek.getTime() + Math.random() * (today.getTime() - lastWeek.getTime()))
              const formattedDate = randomDate.toISOString().split("T")[0]

              mockPrices.push({
                id: id++,
                crop: crop.name,
                variety: variety,
                price: basePrice,
                minPrice: minPrice,
                maxPrice: maxPrice,
                unit: category === "vegetables" || category === "fruits" ? "kg" : "quintal",
                market: mandiName,
                district: district,
                state: state.name,
                change: change,
                lastUpdated: formattedDate,
              })
            })
          })
        })
      }
    })
  })

  return mockPrices
}

export default function MarketPrices({ limit, detailed = false }: MarketPricesProps) {
  const { t } = useLanguage()
  const [prices, setPrices] = useState<MarketPrice[]>([])
  const [filteredPrices, setFilteredPrices] = useState<MarketPrice[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedState, setSelectedState] = useState<string>("all")
  const [selectedDistrict, setSelectedDistrict] = useState<string>("all")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("crop")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")

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
    Rajasthan: ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Bikaner"],
    Gujarat: ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Gandhinagar"],
    Karnataka: ["Bengaluru", "Mysuru", "Hubballi", "Mangaluru", "Belagavi"],
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem"],
    "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Tirupati", "Nellore"],
    Telangana: ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Khammam"],
    "West Bengal": ["Kolkata", "Howrah", "Durgapur", "Asansol", "Siliguri"],
    Bihar: ["Patna", "Gaya", "Muzaffarpur", "Bhagalpur", "Darbhanga"],
  }

  useEffect(() => {
    // Simulate API call
    const fetchPrices = async () => {
      setLoading(true)
      // In a real app, this would be an API call to a market price service
      setTimeout(() => {
        const mockPrices = generateMockPrices()
        setPrices(mockPrices)
        setFilteredPrices(mockPrices)
        setLoading(false)
      }, 1500)
    }

    fetchPrices()
  }, [])

  // Filter and sort prices
  useEffect(() => {
    let result = [...prices]

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      result = result.filter(
        (price) =>
          price.crop.toLowerCase().includes(term) ||
          price.variety.toLowerCase().includes(term) ||
          price.market.toLowerCase().includes(term) ||
          price.state.toLowerCase().includes(term) ||
          price.district.toLowerCase().includes(term),
      )
    }

    // Apply state filter
    if (selectedState !== "all") {
      result = result.filter((price) => price.state === selectedState)
    }

    // Apply district filter
    if (selectedDistrict !== "all") {
      result = result.filter((price) => price.district === selectedDistrict)
    }

    // Apply category filter (would need to map crops to categories in a real app)
    if (selectedCategory !== "all") {
      // This is a simplified version - in a real app, you'd have a proper mapping
      const categoryMap: Record<string, string[]> = {
        cereals: ["Wheat", "Rice", "Maize", "Barley", "Jowar", "Bajra"],
        pulses: [
          "Chickpea (Gram)",
          "Pigeon Pea (Tur/Arhar)",
          "Black Gram (Urad)",
          "Green Gram (Moong)",
          "Lentil (Masoor)",
        ],
        oilseeds: ["Soybean", "Mustard", "Groundnut", "Sunflower", "Sesame"],
        vegetables: ["Potato", "Onion", "Tomato", "Cauliflower", "Cabbage"],
        fruits: ["Apple", "Banana", "Mango", "Orange", "Grapes"],
        spices: ["Turmeric", "Chilli", "Coriander", "Cumin", "Garlic"],
        cash: ["Cotton", "Sugarcane", "Jute", "Coffee", "Tea"],
      }

      result = result.filter((price) => categoryMap[selectedCategory]?.includes(price.crop))
    }

    // Apply sorting
    result.sort((a, b) => {
      let valueA, valueB

      switch (sortBy) {
        case "crop":
          valueA = a.crop
          valueB = b.crop
          break
        case "variety":
          valueA = a.variety
          valueB = b.variety
          break
        case "state":
          valueA = a.state
          valueB = b.state
          break
        case "district":
          valueA = a.district
          valueB = b.district
          break
        case "market":
          valueA = a.market
          valueB = b.market
          break
        case "price":
          valueA = a.price
          valueB = b.price
          break
        case "minPrice":
          valueA = a.minPrice
          valueB = b.minPrice
          break
        case "maxPrice":
          valueA = a.maxPrice
          valueB = b.maxPrice
          break
        case "change":
          valueA = a.change
          valueB = b.change
          break
        case "lastUpdated":
          valueA = a.lastUpdated
          valueB = b.lastUpdated
          break
        default:
          valueA = a.crop
          valueB = b.crop
      }

      if (typeof valueA === "string" && typeof valueB === "string") {
        return sortOrder === "asc" ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA)
      } else {
        return sortOrder === "asc" ? (valueA as number) - (valueB as number) : (valueB as number) - (valueA as number)
      }
    })

    setFilteredPrices(result)
  }, [prices, searchTerm, selectedState, selectedDistrict, selectedCategory, sortBy, sortOrder])

  const displayPrices = limit ? filteredPrices.slice(0, limit) : filteredPrices

  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: limit || 3 }).map((_, i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    )
  }

  if (detailed) {
    return (
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder={t("market.search")}
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {cropCategories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={selectedState}
              onValueChange={(value) => {
                setSelectedState(value)
                setSelectedDistrict("all")
              }}
            >
              <SelectTrigger className="w-[180px]">
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
              <SelectTrigger className="w-[180px]">
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
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead
                className="cursor-pointer"
                onClick={() => {
                  setSortBy("crop")
                  setSortOrder(sortBy === "crop" ? (sortOrder === "asc" ? "desc" : "asc") : "asc")
                }}
              >
                {t("market.crop")} {sortBy === "crop" && (sortOrder === "asc" ? "↑" : "↓")}
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => {
                  setSortBy("variety")
                  setSortOrder(sortBy === "variety" ? (sortOrder === "asc" ? "desc" : "asc") : "asc")
                }}
              >
                Variety {sortBy === "variety" && (sortOrder === "asc" ? "↑" : "↓")}
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => {
                  setSortBy("price")
                  setSortOrder(sortBy === "price" ? (sortOrder === "asc" ? "desc" : "asc") : "asc")
                }}
              >
                Modal Price (₹) {sortBy === "price" && (sortOrder === "asc" ? "↑" : "↓")}
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => {
                  setSortBy("minPrice")
                  setSortOrder(sortBy === "minPrice" ? (sortOrder === "asc" ? "desc" : "asc") : "asc")
                }}
              >
                Min Price (₹) {sortBy === "minPrice" && (sortOrder === "asc" ? "↑" : "↓")}
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => {
                  setSortBy("maxPrice")
                  setSortOrder(sortBy === "maxPrice" ? (sortOrder === "asc" ? "desc" : "asc") : "asc")
                }}
              >
                Max Price (₹) {sortBy === "maxPrice" && (sortOrder === "asc" ? "↑" : "↓")}
              </TableHead>
              <TableHead>Unit</TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => {
                  setSortBy("market")
                  setSortOrder(sortBy === "market" ? (sortOrder === "asc" ? "desc" : "asc") : "asc")
                }}
              >
                {t("market.mandi")} {sortBy === "market" && (sortOrder === "asc" ? "↑" : "↓")}
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => {
                  setSortBy("district")
                  setSortOrder(sortBy === "district" ? (sortOrder === "asc" ? "desc" : "asc") : "asc")
                }}
              >
                {t("market.district")} {sortBy === "district" && (sortOrder === "asc" ? "↑" : "↓")}
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => {
                  setSortBy("state")
                  setSortOrder(sortBy === "state" ? (sortOrder === "asc" ? "desc" : "asc") : "asc")
                }}
              >
                {t("market.state")} {sortBy === "state" && (sortOrder === "asc" ? "↑" : "↓")}
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => {
                  setSortBy("change")
                  setSortOrder(sortBy === "change" ? (sortOrder === "asc" ? "desc" : "asc") : "asc")
                }}
              >
                Change {sortBy === "change" && (sortOrder === "asc" ? "↑" : "↓")}
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => {
                  setSortBy("lastUpdated")
                  setSortOrder(sortBy === "lastUpdated" ? (sortOrder === "asc" ? "desc" : "asc") : "asc")
                }}
              >
                {t("market.date")} {sortBy === "lastUpdated" && (sortOrder === "asc" ? "↑" : "↓")}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayPrices.map((price) => (
              <TableRow key={price.id}>
                <TableCell className="font-medium">{price.crop}</TableCell>
                <TableCell>{price.variety}</TableCell>
                <TableCell>₹{price.price}</TableCell>
                <TableCell>₹{price.minPrice}</TableCell>
                <TableCell>₹{price.maxPrice}</TableCell>
                <TableCell>{price.unit}</TableCell>
                <TableCell>{price.market}</TableCell>
                <TableCell>{price.district}</TableCell>
                <TableCell>{price.state}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    {price.change > 0 ? (
                      <>
                        <ArrowUp className="h-4 w-4 text-green-500" />
                        <span className="text-green-500">₹{price.change}</span>
                      </>
                    ) : price.change < 0 ? (
                      <>
                        <ArrowDown className="h-4 w-4 text-red-500" />
                        <span className="text-red-500">₹{Math.abs(price.change)}</span>
                      </>
                    ) : (
                      <>
                        <Minus className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">No change</span>
                      </>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">{price.lastUpdated}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {displayPrices.map((price) => (
        <div key={price.id} className="flex items-center justify-between">
          <div>
            <div className="font-medium">
              {price.crop} <Badge variant="outline">{price.variety}</Badge>
            </div>
            <div className="text-sm text-muted-foreground">
              {price.market}, {price.district}, {price.state}
            </div>
          </div>
          <div className="text-right">
            <div className="font-bold">
              ₹{price.price}/{price.unit}
            </div>
            <div className="flex items-center justify-end gap-1 text-sm">
              {price.change > 0 ? (
                <>
                  <ArrowUp className="h-3 w-3 text-green-500" />
                  <span className="text-green-500">₹{price.change}</span>
                </>
              ) : price.change < 0 ? (
                <>
                  <ArrowDown className="h-3 w-3 text-red-500" />
                  <span className="text-red-500">₹{Math.abs(price.change)}</span>
                </>
              ) : (
                <span className="text-muted-foreground">No change</span>
              )}
            </div>
          </div>
        </div>
      ))}
      {limit && filteredPrices.length > limit && (
        <Button asChild variant="link" className="px-0">
          <Link href="/market">
            View All Prices <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      )}
    </div>
  )
}
