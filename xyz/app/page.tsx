import Link from "next/link"
import { ArrowRight, Cloud, Droplets, Leaf, LineChart, ShieldCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AIChatbot } from "@/components/ai-chatbot"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-green-50 to-white dark:from-green-950/20 dark:to-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-green-700 dark:text-green-400">
                  HariBhari - Smart Farming Assistant
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-600 dark:text-gray-400 md:text-xl">
                  Your all-in-one solution for modern farming. Get real-time weather updates, crop recommendations,
                  market prices, and more.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/dashboard">
                  <Button className="bg-green-600 hover:bg-green-700">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/membership">
                  <Button variant="outline">Learn More</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <Card className="border-green-100 dark:border-green-900">
                <CardHeader>
                  <Cloud className="h-8 w-8 text-green-600 dark:text-green-400 mb-2" />
                  <CardTitle>Real-time Weather Updates</CardTitle>
                  <CardDescription>
                    Get accurate weather forecasts and alerts tailored for your farm location.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/weather">
                    <Button variant="link" className="p-0 text-green-600 dark:text-green-400">
                      Check Weather
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
              <Card className="border-green-100 dark:border-green-900">
                <CardHeader>
                  <Leaf className="h-8 w-8 text-green-600 dark:text-green-400 mb-2" />
                  <CardTitle>Crop Recommendations</CardTitle>
                  <CardDescription>
                    Get personalized crop suggestions based on your soil, season, and region.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/crops">
                    <Button variant="link" className="p-0 text-green-600 dark:text-green-400">
                      View Recommendations
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
              <Card className="border-green-100 dark:border-green-900">
                <CardHeader>
                  <LineChart className="h-8 w-8 text-green-600 dark:text-green-400 mb-2" />
                  <CardTitle>Market Price Tracking</CardTitle>
                  <CardDescription>Stay updated with the latest market prices for your crops.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/market">
                    <Button variant="link" className="p-0 text-green-600 dark:text-green-400">
                      Check Prices
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
              <Card className="border-green-100 dark:border-green-900">
                <CardHeader>
                  <Droplets className="h-8 w-8 text-green-600 dark:text-green-400 mb-2" />
                  <CardTitle>Soil Health Tips</CardTitle>
                  <CardDescription>
                    Learn how to maintain and improve your soil health for better yields.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/soil">
                    <Button variant="link" className="p-0 text-green-600 dark:text-green-400">
                      Explore Tips
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
              <Card className="border-green-100 dark:border-green-900">
                <CardHeader>
                  <ShieldCheck className="h-8 w-8 text-green-600 dark:text-green-400 mb-2" />
                  <CardTitle>Government Schemes</CardTitle>
                  <CardDescription>
                    Access information about government schemes and subsidies for farmers.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/schemes">
                    <Button variant="link" className="p-0 text-green-600 dark:text-green-400">
                      View Schemes
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
              <Card className="border-green-100 dark:border-green-900">
                <CardHeader>
                  <CardTitle>AI Farming Assistant</CardTitle>
                  <CardDescription>
                    Get instant answers to your farming questions with our AI assistant.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/">
                    <Button variant="link" className="p-0 text-green-600 dark:text-green-400">
                      Ask AI Assistant
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-green-50 dark:bg-green-950/10">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-green-700 dark:text-green-400">
                Ask Our AI Farming Assistant
              </h2>
              <p className="text-gray-600 dark:text-gray-400 md:text-xl">
                Get instant answers to your farming questions, crop recommendations, and more.
              </p>
            </div>
            <div className="mx-auto mt-8 max-w-3xl">
              <AIChatbot />
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
