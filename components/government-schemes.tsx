"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { ArrowRight, Calendar, FileText } from "lucide-react"
import Link from "next/link"

interface Scheme {
  id: number
  title: string
  description: string
  category: string
  deadline: string
  eligibility: string[]
  benefits: string[]
  applicationUrl: string
}

interface GovernmentSchemesProps {
  limit?: number
  detailed?: boolean
}

export default function GovernmentSchemes({ limit, detailed = false }: GovernmentSchemesProps) {
  const [schemes, setSchemes] = useState<Scheme[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const fetchSchemes = async () => {
      setLoading(true)
      // In a real app, this would be an API call to a government service
      setTimeout(() => {
        const mockSchemes: Scheme[] = [
          {
            id: 1,
            title: "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)",
            description: "Income support scheme that provides direct cash transfers to farmers' bank accounts.",
            category: "Financial Support",
            deadline: "Ongoing",
            eligibility: [
              "All landholding farmers with cultivable land",
              "Subject to certain exclusions for higher income groups",
              "Valid bank account and land records required",
            ],
            benefits: [
              "₹6,000 per year in three equal installments",
              "Direct transfer to bank account",
              "No loan repayment required",
            ],
            applicationUrl: "https://pmkisan.gov.in/",
          },
          {
            id: 2,
            title: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
            description:
              "Crop insurance scheme to provide financial support to farmers suffering crop loss/damage due to unforeseen events.",
            category: "Insurance",
            deadline: "Seasonal (Before sowing)",
            eligibility: [
              "All farmers growing notified crops",
              "Both loanee and non-loanee farmers eligible",
              "Must apply before the notified cut-off date",
            ],
            benefits: [
              "Comprehensive risk coverage for pre-sowing to post-harvest losses",
              "Low premium rates",
              "Use of technology for quick claim settlement",
            ],
            applicationUrl: "https://pmfby.gov.in/",
          },
          {
            id: 3,
            title: "Kisan Credit Card (KCC)",
            description: "Provides farmers with affordable credit for their agricultural operations.",
            category: "Credit",
            deadline: "Ongoing",
            eligibility: [
              "All farmers, tenant farmers, sharecroppers, and self-help groups",
              "Good credit history",
              "Land ownership documents or tenancy agreement",
            ],
            benefits: [
              "Short-term loans for cultivation needs",
              "Post-harvest expenses and marketing loans",
              "Working capital for maintenance of farm assets",
              "Investment credit for agriculture and allied activities",
            ],
            applicationUrl: "https://www.nabard.org/content.aspx?id=591",
          },
          {
            id: 4,
            title: "Soil Health Card Scheme",
            description:
              "Provides information on soil health to farmers to help them improve productivity through judicious use of inputs.",
            category: "Technical Support",
            deadline: "Ongoing",
            eligibility: ["All farmers with agricultural land", "No specific eligibility criteria"],
            benefits: [
              "Free soil testing",
              "Crop-wise recommendations of nutrients and fertilizers",
              "Information on soil health indicators",
              "Advice on soil-related constraints",
            ],
            applicationUrl: "https://soilhealth.dac.gov.in/",
          },
          {
            id: 5,
            title: "National Mission for Sustainable Agriculture (NMSA)",
            description: "Promotes sustainable agriculture through climate change adaptation measures.",
            category: "Sustainability",
            deadline: "Ongoing",
            eligibility: [
              "Farmers in identified climate-vulnerable districts",
              "Farmers adopting sustainable agriculture practices",
              "Application through local agriculture department",
            ],
            benefits: [
              "Subsidies for micro-irrigation systems",
              "Support for organic farming",
              "Assistance for water conservation structures",
              "Climate-resilient seed varieties",
            ],
            applicationUrl: "https://nmsa.dac.gov.in/",
          },
        ]

        setSchemes(mockSchemes)
        setLoading(false)
      }, 1500)
    }

    fetchSchemes()
  }, [])

  const displaySchemes = limit ? schemes.slice(0, limit) : schemes

  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: limit || 3 }).map((_, i) => (
          <Skeleton key={i} className="h-24 w-full" />
        ))}
      </div>
    )
  }

  if (detailed) {
    return (
      <div className="space-y-6">
        {displaySchemes.map((scheme) => (
          <Card key={scheme.id}>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                <div>
                  <CardTitle>{scheme.title}</CardTitle>
                  <CardDescription>{scheme.description}</CardDescription>
                </div>
                <Badge>{scheme.category}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2">Eligibility</h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    {scheme.eligibility.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Benefits</h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    {scheme.benefits.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-4 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>
                  <span className="font-medium">Application Deadline:</span> {scheme.deadline}
                </span>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full sm:w-auto">
                <a href={scheme.applicationUrl} target="_blank" rel="noopener noreferrer">
                  Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {displaySchemes.map((scheme) => (
        <div key={scheme.id} className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FileText className="h-5 w-5 text-green-600" />
            <div>
              <div className="font-medium">{scheme.title}</div>
              <div className="text-sm text-muted-foreground line-clamp-1">{scheme.description}</div>
            </div>
          </div>
          <Badge variant="outline">{scheme.category}</Badge>
        </div>
      ))}
      {limit && schemes.length > limit && (
        <Button asChild variant="link" className="px-0">
          <Link href="/schemes">
            View All Schemes <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      )}
    </div>
  )
}
