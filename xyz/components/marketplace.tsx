"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { collection, addDoc, query, getDocs, where } from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { db, storage } from "@/lib/firebase"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ShoppingBag, Search, Plus, Upload, X, Phone } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface MarketplaceListing {
  id: string
  userId: string
  userName: string
  userRegion: string
  productName: string
  category: string
  price: number
  unit: string
  imageURL: string
  description: string
  contactInfo: string
  createdAt: any
}

const categories = ["Seeds", "Fertilizers", "Pesticides", "Equipment", "Tools", "Produce", "Livestock", "Other"]

export function Marketplace() {
  const [listings, setListings] = useState<MarketplaceListing[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const { user, userData } = useAuth()
  const { toast } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Form state for new listing
  const [formData, setFormData] = useState({
    productName: "",
    category: "",
    price: "",
    unit: "per kg",
    description: "",
    contactInfo: "",
  })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const q = query(collection(db, "marketplace"), where("active", "==", true))
        const querySnapshot = await getDocs(q)

        const listingData: MarketplaceListing[] = []
        querySnapshot.forEach((doc) => {
          const data = doc.data()
          listingData.push({
            id: doc.id,
            ...data,
            createdAt: data.createdAt?.toDate?.() || new Date(),
          } as MarketplaceListing)
        })

        // Sort by most recent first
        listingData.sort((a, b) => b.createdAt - a.createdAt)
        setListings(listingData)
      } catch (error) {
        console.error("Error fetching marketplace listings:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchListings()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setImageFile(file)

      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user || !userData) {
      toast({
        title: "Authentication required",
        description: "Please sign in to create a listing",
        variant: "destructive",
      })
      return
    }

    if (!imageFile) {
      toast({
        title: "Image required",
        description: "Please upload an image for your listing",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Upload image to Firebase Storage
      const storageRef = ref(storage, `marketplace/${user.uid}/${Date.now()}_${imageFile.name}`)
      const uploadResult = await uploadBytes(storageRef, imageFile)
      const imageURL = await getDownloadURL(uploadResult.ref)

      // Create listing in Firestore
      const listingData = {
        userId: user.uid,
        userName: userData.name,
        userRegion: userData.region,
        productName: formData.productName,
        category: formData.category,
        price: Number.parseFloat(formData.price),
        unit: formData.unit,
        imageURL,
        description: formData.description,
        contactInfo: formData.contactInfo || userData.email,
        active: true,
        createdAt: new Date(),
      }

      const docRef = await addDoc(collection(db, "marketplace"), listingData)

      toast({
        title: "Listing created",
        description: "Your product has been listed successfully",
      })

      // Reset form and close dialog
      setFormData({
        productName: "",
        category: "",
        price: "",
        unit: "per kg",
        description: "",
        contactInfo: "",
      })
      setImageFile(null)
      setImagePreview(null)
      setDialogOpen(false)

      // Add the new listing to the state
      setListings((prev) => [
        {
          id: docRef.id,
          ...listingData,
        } as MarketplaceListing,
        ...prev,
      ])
    } catch (error) {
      console.error("Error creating listing:", error)
      toast({
        title: "Error",
        description: "Failed to create listing. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const filteredListings = listings.filter((listing) => {
    const matchesSearch =
      listing.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = selectedCategory ? listing.category === selectedCategory : true

    return matchesSearch && matchesCategory
  })

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-green-600" />
            <CardTitle>Marketplace</CardTitle>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-green-600 hover:bg-green-700">
                <Plus className="h-4 w-4 mr-2" />
                List Product
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
              <DialogHeader>
                <DialogTitle>List a Product</DialogTitle>
                <DialogDescription>
                  Fill in the details below to list your product in the marketplace.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="productName">Product Name</Label>
                      <Input
                        id="productName"
                        name="productName"
                        value={formData.productName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select
                        name="category"
                        value={formData.category}
                        onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="price">Price (₹)</Label>
                      <Input
                        id="price"
                        name="price"
                        type="number"
                        value={formData.price}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="unit">Unit</Label>
                      <Select
                        name="unit"
                        value={formData.unit}
                        onValueChange={(value) => setFormData((prev) => ({ ...prev, unit: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select unit" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="per kg">per kg</SelectItem>
                          <SelectItem value="per quintal">per quintal</SelectItem>
                          <SelectItem value="per piece">per piece</SelectItem>
                          <SelectItem value="per acre">per acre</SelectItem>
                          <SelectItem value="per bag">per bag</SelectItem>
                          <SelectItem value="per liter">per liter</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactInfo">Contact Information (optional)</Label>
                    <Input
                      id="contactInfo"
                      name="contactInfo"
                      value={formData.contactInfo}
                      onChange={handleInputChange}
                      placeholder="Phone number or email"
                    />
                    <p className="text-xs text-muted-foreground">If left blank, your account email will be used.</p>
                  </div>
                  <div className="space-y-2">
                    <Label>Product Image</Label>
                    <div className="flex items-center gap-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Image
                      </Button>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                        accept="image/*"
                        className="hidden"
                      />
                    </div>
                    {imagePreview && (
                      <div className="relative mt-2 rounded-md overflow-hidden h-40">
                        <img
                          src={imagePreview || "/placeholder.svg"}
                          alt="Product preview"
                          className="w-full h-full object-cover"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute top-2 right-2 h-6 w-6"
                          onClick={() => {
                            setImageFile(null)
                            setImagePreview(null)
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-green-600 hover:bg-green-700" disabled={isSubmitting}>
                    {isSubmitting ? "Creating..." : "Create Listing"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        <CardDescription>Buy and sell agricultural products, seeds, equipment, and more</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category || ""}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <p>Loading marketplace listings...</p>
          </div>
        ) : filteredListings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto max-h-[calc(100vh-300px)] p-1">
            {filteredListings.map((listing) => (
              <Card key={listing.id} className="overflow-hidden">
                <div className="aspect-video w-full overflow-hidden bg-muted">
                  <img
                    src={listing.imageURL || "/placeholder.svg"}
                    alt={listing.productName}
                    className="h-full w-full object-cover"
                  />
                </div>
                <CardHeader className="p-4">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{listing.productName}</CardTitle>
                    <Badge>{listing.category}</Badge>
                  </div>
                  <CardDescription className="line-clamp-2">{listing.description}</CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="flex justify-between items-center">
                    <p className="text-lg font-bold">
                      ₹{listing.price} <span className="text-sm font-normal">{listing.unit}</span>
                    </p>
                    <Button variant="outline" size="sm" className="h-8 gap-1">
                      <Phone className="h-3 w-3" />
                      Contact
                    </Button>
                  </div>
                  <Separator className="my-3" />
                  <div className="flex justify-between items-center text-xs text-muted-foreground">
                    <span>{listing.userName}</span>
                    <span>{listing.userRegion}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <ShoppingBag className="h-12 w-12 text-muted-foreground mb-2" />
            <h3 className="text-lg font-medium">No listings found</h3>
            <p className="text-sm text-muted-foreground">
              Try adjusting your search or filter criteria, or create a new listing.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
