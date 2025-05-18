"use client"

import { useEffect, useState } from "react"
import { collection, onSnapshot, query, orderBy, limit } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LineChart, LayoutListIcon as LineUp, Search } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

interface MandiRate {
  id: string
  commodity: string
  market: string
  state: string
  minPrice: number
  maxPrice: number
  modalPrice: number
  updatedAt: string
}

export function MandiRates() {
  const [rates, setRates] = useState<MandiRate[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedState, setSelectedState] = useState<string>("")
  const [states, setStates] = useState<string[]>([])

  useEffect(() => {
    const q = query(collection(db, "mandiRates"), orderBy("updatedAt", "desc"), limit(100))

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const mandiData: MandiRate[] = []
      const uniqueStates = new Set<string>()

      snapshot.forEach((doc) => {
        const data = doc.data() as Omit<MandiRate, "id">
        mandiData.push({
          id: doc.id,
          ...data,
        })
        uniqueStates.add(data.state)
      })

      setRates(mandiData)
      setStates(Array.from(uniqueStates).sort())
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const filteredRates = rates.filter((rate) => {
    const matchesSearch =
      rate.commodity.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rate.market.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesState = selectedState ? rate.state === selectedState : true

    return matchesSearch && matchesState
  })

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <LineChart className="h-5 w-5 text-green-600" />
          <CardTitle>Real-Time Mandi Rates</CardTitle>
        </div>
        <CardDescription>Latest agricultural commodity prices from mandis across India</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by commodity or market..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={selectedState} onValueChange={setSelectedState}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by state" />
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
        </div>

        {loading ? (
          <div className="space-y-2">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
          </div>
        ) : filteredRates.length > 0 ? (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Commodity</TableHead>
                  <TableHead>Market</TableHead>
                  <TableHead>State</TableHead>
                  <TableHead className="text-right">Min Price (₹)</TableHead>
                  <TableHead className="text-right">Max Price (₹)</TableHead>
                  <TableHead className="text-right">Modal Price (₹)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRates.map((rate) => (
                  <TableRow key={rate.id}>
                    <TableCell className="font-medium">{rate.commodity}</TableCell>
                    <TableCell>{rate.market}</TableCell>
                    <TableCell>{rate.state}</TableCell>
                    <TableCell className="text-right">{rate.minPrice}</TableCell>
                    <TableCell className="text-right">{rate.maxPrice}</TableCell>
                    <TableCell className="text-right">{rate.modalPrice}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <LineUp className="h-12 w-12 text-muted-foreground mb-2" />
            <h3 className="text-lg font-medium">No matching rates found</h3>
            <p className="text-sm text-muted-foreground">Try adjusting your search or filter criteria</p>
          </div>
        )}

        <p className="text-xs text-muted-foreground mt-4">
          Last updated: {rates.length > 0 ? new Date(rates[0].updatedAt).toLocaleString() : "Loading..."}
        </p>
      </CardContent>
    </Card>
  )
}
