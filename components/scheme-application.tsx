"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"

export function SchemeApplication() {
  const { t } = useLanguage()
  const [selectedScheme, setSelectedScheme] = useState("pmkisan")

  const schemes = {
    pmkisan: {
      name: "PM-KISAN",
      description: "Provides income support to small and marginal farmers.",
      eligibility: "All small and marginal farmers with cultivable land.",
      benefits: "₹6,000 per year in three equal installments.",
      documents: ["Aadhaar card", "Land records", "Bank account details"],
    },
    pmfby: {
      name: "PM Fasal Bima Yojana",
      description: "Provides crop insurance to farmers against crop loss.",
      eligibility: "All farmers growing notified crops.",
      benefits: "Financial support in case of crop loss due to natural calamities.",
      documents: ["Aadhaar card", "Land records", "Bank account details", "Crop sowing details"],
    },
    soilhealth: {
      name: "Soil Health Card",
      description: "Provides information on soil health to farmers.",
      eligibility: "All farmers with agricultural land.",
      benefits: "Free soil testing and recommendations for fertilizer use.",
      documents: ["Aadhaar card", "Land records"],
    },
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <Button
          variant={selectedScheme === "pmkisan" ? "default" : "outline"}
          onClick={() => setSelectedScheme("pmkisan")}
          className="justify-start"
        >
          PM-KISAN
        </Button>
        <Button
          variant={selectedScheme === "pmfby" ? "default" : "outline"}
          onClick={() => setSelectedScheme("pmfby")}
          className="justify-start"
        >
          PM Fasal Bima Yojana
        </Button>
        <Button
          variant={selectedScheme === "soilhealth" ? "default" : "outline"}
          onClick={() => setSelectedScheme("soilhealth")}
          className="justify-start"
        >
          Soil Health Card
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{schemes[selectedScheme as keyof typeof schemes].name}</CardTitle>
          <CardDescription>{schemes[selectedScheme as keyof typeof schemes].description}</CardDescription>
        </CardHeader>
        <CardContent>Application process and required documents for the selected scheme.</CardContent>
      </Card>
    </div>
  )
}

export default SchemeApplication
