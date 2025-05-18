import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LocationSelector } from "@/components/location-selector"
import { Button } from "@/components/ui/button"
import { Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import GovernmentSchemes from "@/components/government-schemes"
import SchemeEligibility from "@/components/scheme-eligibility"
import SchemeApplication from "@/components/scheme-application"

export default function SchemesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Government Schemes</h1>
          <p className="text-muted-foreground">Information about agricultural schemes and subsidies</p>
        </div>
        <div className="flex items-center gap-4">
          <LocationSelector />
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search schemes..." className="pl-8 w-[200px]" />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>

      <Tabs defaultValue="schemes" className="space-y-4">
        <TabsList>
          <TabsTrigger value="schemes">Available Schemes</TabsTrigger>
          <TabsTrigger value="eligibility">Check Eligibility</TabsTrigger>
          <TabsTrigger value="application">Application Process</TabsTrigger>
        </TabsList>

        <TabsContent value="schemes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Available Government Schemes</CardTitle>
              <CardDescription>Agricultural subsidies and support programs</CardDescription>
            </CardHeader>
            <CardContent>
              <GovernmentSchemes detailed />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="eligibility" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Eligibility Checker</CardTitle>
              <CardDescription>Find out which schemes you're eligible for</CardDescription>
            </CardHeader>
            <CardContent>
              <SchemeEligibility />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="application" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Application Process</CardTitle>
              <CardDescription>Step-by-step guide to applying for schemes</CardDescription>
            </CardHeader>
            <CardContent>
              <SchemeApplication />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
