"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

export default function SoilTestingGuide() {
  return (
    <Tabs defaultValue="guide">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="guide">Testing Guide</TabsTrigger>
        <TabsTrigger value="interpretation">Interpretation</TabsTrigger>
        <TabsTrigger value="labs">Testing Labs</TabsTrigger>
      </TabsList>

      <TabsContent value="guide" className="space-y-4 mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Soil Testing Process</CardTitle>
            <CardDescription>Step-by-step guide to collect and test soil samples</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="step1">
                <AccordionTrigger>Step 1: When to Sample</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-muted-foreground">
                    The best time to sample soil is when the soil is neither too wet nor too dry. Avoid sampling
                    immediately after fertilizer application, lime application, or heavy rainfall. Ideally, sample your
                    soil every 2-3 years, or before planting a new crop.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="step2">
                <AccordionTrigger>Step 2: Collecting Samples</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-muted-foreground mb-2">
                    Divide your field into homogeneous sections based on crop growth, soil type, and management history.
                    For each section:
                  </p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>Take 15-20 samples from random spots within the section</li>
                    <li>Remove surface debris and dig a V-shaped hole 6-8 inches deep</li>
                    <li>Take a slice from the side of the hole</li>
                    <li>Collect the samples in a clean plastic bucket</li>
                    <li>Mix the samples thoroughly to create a composite sample</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="step3">
                <AccordionTrigger>Step 3: Preparing Samples</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-muted-foreground mb-2">After collecting the composite sample:</p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>Spread the soil on a clean paper or cloth to air dry</li>
                    <li>Remove stones, roots, and other debris</li>
                    <li>Break up soil clumps</li>
                    <li>Once dry, place about 500g (1 pound) of soil in a clean plastic bag</li>
                    <li>Label the bag with your name, field identification, and sampling date</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="step4">
                <AccordionTrigger>Step 4: Sending Samples</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-muted-foreground mb-2">Send your samples to a soil testing laboratory:</p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>Fill out the soil test information form completely</li>
                    <li>Indicate the crops you plan to grow</li>
                    <li>
                      Specify any specific tests you want (basic tests include pH, organic matter, phosphorus,
                      potassium, and sometimes micronutrients)
                    </li>
                    <li>Submit the samples and form to the laboratory</li>
                    <li>Results typically take 1-2 weeks</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Button className="mt-6 w-full sm:w-auto">
              <Download className="mr-2 h-4 w-4" />
              Download Complete Guide (PDF)
            </Button>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="interpretation" className="space-y-4 mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Understanding Soil Test Results</CardTitle>
            <CardDescription>How to interpret your soil test report</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Soil pH</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Soil pH affects nutrient availability and microbial activity. Most crops grow best in slightly acidic
                  to neutral soils (pH 6.0-7.0).
                </p>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div className="bg-red-100 p-2 rounded text-center">
                    <div className="font-medium">Acidic</div>
                    <div className="text-muted-foreground">pH &lt; 6.0</div>
                  </div>
                  <div className="bg-green-100 p-2 rounded text-center">
                    <div className="font-medium">Optimal</div>
                    <div className="text-muted-foreground">pH 6.0-7.0</div>
                  </div>
                  <div className="bg-blue-100 p-2 rounded text-center">
                    <div className="font-medium">Alkaline</div>
                    <div className="text-muted-foreground">pH &gt; 7.0</div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Macronutrients</h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium">Nitrogen (N)</h4>
                    <p className="text-sm text-muted-foreground">
                      Essential for leaf and stem growth. Low levels result in yellowing of older leaves and stunted
                      growth.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium">Phosphorus (P)</h4>
                    <p className="text-sm text-muted-foreground">
                      Important for root development and flowering. Deficiency causes purplish leaves and poor root
                      growth.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium">Potassium (K)</h4>
                    <p className="text-sm text-muted-foreground">
                      Enhances disease resistance and water regulation. Deficiency appears as scorching along leaf
                      margins.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Organic Matter</h3>
                <p className="text-sm text-muted-foreground">
                  Organic matter improves soil structure, water retention, and nutrient availability. Ideal levels vary
                  by soil type but generally 3-5% is considered good for agricultural soils.
                </p>
              </div>
            </div>

            <Button className="mt-6 w-full sm:w-auto">
              <Download className="mr-2 h-4 w-4" />
              Download Interpretation Guide (PDF)
            </Button>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="labs" className="space-y-4 mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Soil Testing Laboratories</CardTitle>
            <CardDescription>Recommended labs for soil testing services</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <h3 className="font-medium">Punjab Agricultural University Soil Testing Lab</h3>
                <p className="text-sm text-muted-foreground mt-1">Address: PAU Campus, Ludhiana, Punjab - 141004</p>
                <p className="text-sm text-muted-foreground">Phone: +91 161 2401960</p>
                <p className="text-sm mt-2">
                  Services: Basic soil testing, micronutrient analysis, fertilizer recommendations
                </p>
                <p className="text-sm text-muted-foreground mt-1">Turnaround Time: 7-10 days</p>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="font-medium">Krishi Vigyan Kendra Soil Testing Lab</h3>
                <p className="text-sm text-muted-foreground mt-1">Address: KVK Campus, Jalandhar, Punjab - 144001</p>
                <p className="text-sm text-muted-foreground">Phone: +91 181 2553323</p>
                <p className="text-sm mt-2">Services: Basic soil testing, organic matter analysis, soil health card</p>
                <p className="text-sm text-muted-foreground mt-1">Turnaround Time: 5-7 days</p>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="font-medium">National Soil Testing Laboratory</h3>
                <p className="text-sm text-muted-foreground mt-1">Address: IARI Campus, New Delhi - 110012</p>
                <p className="text-sm text-muted-foreground">Phone: +91 11 25841488</p>
                <p className="text-sm mt-2">
                  Services: Comprehensive soil analysis, heavy metal testing, advanced nutrient profiling
                </p>
                <p className="text-sm text-muted-foreground mt-1">Turnaround Time: 10-14 days</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
