"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { collection, addDoc, query, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Truck, Phone, Calendar, MapPin } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface Transporter {
  id: string
  name: string
  route: string
  pricePerKm: number
  availability: string
  contact: string
  region: string
}

export function LogisticsFinder() {
  const [transporters, setTransporters] = useState<Transporter[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedRegion, setSelectedRegion] = useState<string>("")
  const { user, userData } = useAuth()
  const { toast } = useToast()

  // Form state for transport request
  const [formData, setFormData] = useState({
    pickupLocation: "",
    deliveryLocation: "",
    cargoType: "",
    weight: "",
    date: "",
    contactNumber: "",
    additionalInfo: "",
  })

  useEffect(() => {
    const fetchTransporters = async () => {
      try {
        const q = query(collection(db, "transporters"))
        const querySnapshot = await getDocs(q)

        const transporterData: Transporter[] = []
        querySnapshot.forEach((doc) => {
          transporterData.push({
            id: doc.id,
            ...(doc.data() as Omit<Transporter, "id">),
          })
        })

        setTransporters(transporterData)
      } catch (error) {
        console.error("Error fetching transporters:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchTransporters()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to submit a transport request",
        variant: "destructive",
      })
      return
    }

    try {
      await addDoc(collection(db, "transportRequests"), {
        userId: user.uid,
        userName: userData?.name,
        userRegion: userData?.region,
        ...formData,
        status: "pending",
        createdAt: new Date(),
      })

      toast({
        title: "Request submitted",
        description: "Your transport request has been submitted successfully",
      })

      // Reset form
      setFormData({
        pickupLocation: "",
        deliveryLocation: "",
        cargoType: "",
        weight: "",
        date: "",
        contactNumber: "",
        additionalInfo: "",
      })
    } catch (error) {
      console.error("Error submitting transport request:", error)
      toast({
        title: "Error",
        description: "Failed to submit transport request. Please try again.",
        variant: "destructive",
      })
    }
  }

  const filteredTransporters = selectedRegion ? transporters.filter((t) => t.region === selectedRegion) : transporters

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Truck className="h-5 w-5 text-green-600" />
          <CardTitle>Logistics & Transport</CardTitle>
        </div>
        <CardDescription>Find transporters for your agricultural produce or request transport services</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="find">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="find">Find Transporters</TabsTrigger>
            <TabsTrigger value="request">Request Transport</TabsTrigger>
          </TabsList>

          <TabsContent value="find">
            <div className="mb-4">
              <Label htmlFor="region-filter">Filter by Region</Label>
              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger id="region-filter">
                  <SelectValue placeholder="All Regions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Regions</SelectItem>
                  {Array.from(new Set(transporters.map((t) => t.region))).map((region) => (
                    <SelectItem key={region} value={region}>
                      {region}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {loading ? (
              <p>Loading transporters...</p>
            ) : filteredTransporters.length > 0 ? (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Route</TableHead>
                      <TableHead>Region</TableHead>
                      <TableHead>Price/Km</TableHead>
                      <TableHead>Availability</TableHead>
                      <TableHead>Contact</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTransporters.map((transporter) => (
                      <TableRow key={transporter.id}>
                        <TableCell className="font-medium">{transporter.name}</TableCell>
                        <TableCell>{transporter.route}</TableCell>
                        <TableCell>{transporter.region}</TableCell>
                        <TableCell>₹{transporter.pricePerKm}/km</TableCell>
                        <TableCell>{transporter.availability}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm" className="h-8 gap-1">
                            <Phone className="h-3 w-3" />
                            Call
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-8">
                <Truck className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                <h3 className="text-lg font-medium">No transporters found</h3>
                <p className="text-sm text-muted-foreground">Try changing your filter or check back later</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="request">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="pickupLocation">Pickup Location</Label>
                  <div className="relative">
                    <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="pickupLocation"
                      name="pickupLocation"
                      placeholder="Enter pickup location"
                      className="pl-8"
                      value={formData.pickupLocation}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deliveryLocation">Delivery Location</Label>
                  <div className="relative">
                    <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="deliveryLocation"
                      name="deliveryLocation"
                      placeholder="Enter delivery location"
                      className="pl-8"
                      value={formData.deliveryLocation}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cargoType">Cargo Type</Label>
                  <Input
                    id="cargoType"
                    name="cargoType"
                    placeholder="E.g., Rice, Wheat, Vegetables"
                    value={formData.cargoType}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    id="weight"
                    name="weight"
                    type="number"
                    placeholder="Approximate weight in kg"
                    value={formData.weight}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Pickup Date</Label>
                  <div className="relative">
                    <Calendar className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="date"
                      name="date"
                      type="date"
                      className="pl-8"
                      value={formData.date}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactNumber">Contact Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="contactNumber"
                      name="contactNumber"
                      placeholder="Your contact number"
                      className="pl-8"
                      value={formData.contactNumber}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="additionalInfo">Additional Information</Label>
                <Textarea
                  id="additionalInfo"
                  name="additionalInfo"
                  placeholder="Any special requirements or instructions"
                  value={formData.additionalInfo}
                  onChange={handleInputChange}
                />
              </div>

              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={!user}>
                Submit Transport Request
              </Button>

              {!user && (
                <p className="text-xs text-muted-foreground text-center">
                  Please sign in to submit a transport request
                </p>
              )}
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
