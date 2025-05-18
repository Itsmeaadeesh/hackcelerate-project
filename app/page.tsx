import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowRight, Cloud, Droplets, LineChart, Leaf, FileText } from "lucide-react"
import WeatherWidget from "@/components/weather-widget"
import { AIChatbot } from "@/components/ai-chatbot"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="py-12 md:py-20">
        <div className="grid grid-cols-1 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-green-700">HariBhari</h1>
            <p className="text-xl md:text-2xl mt-4 text-muted-foreground">Your all-in-one smart farming assistant</p>
            <p className="mt-6 text-lg text-muted-foreground">
              Get real-time weather updates, crop recommendations, market prices, soil health tips, and access to
              government schemes.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
                <Link href="/dashboard">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-center mb-12">Our Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="card-hover border-green-100 dark:border-green-900">
            <CardHeader>
              <Cloud className="h-8 w-8 text-green-600 mb-2" />
              <CardTitle>Weather Updates</CardTitle>
              <CardDescription>Real-time weather forecasts to plan your farming activities</CardDescription>
            </CardHeader>
            <CardContent>
              <WeatherWidget />
              <Button asChild variant="link" className="mt-4 px-0">
                <Link href="/weather">
                  View Detailed Forecast <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="card-hover border-green-100 dark:border-green-900">
            <CardHeader>
              <Leaf className="h-8 w-8 text-green-600 mb-2" />
              <CardTitle>Crop Recommendations</CardTitle>
              <CardDescription>Get personalized crop suggestions based on your region and season</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Our AI-powered system analyzes soil conditions, climate patterns, and market trends to recommend the
                best crops for your farm.
              </p>
              <Button asChild variant="link" className="mt-4 px-0">
                <Link href="/crops">
                  Explore Recommendations <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="card-hover border-green-100 dark:border-green-900">
            <CardHeader>
              <LineChart className="h-8 w-8 text-green-600 mb-2" />
              <CardTitle>Market Prices</CardTitle>
              <CardDescription>Track current market prices for your produce</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Stay updated with real-time market prices across different agricultural markets to sell your produce at
                the best rates.
              </p>
              <Button asChild variant="link" className="mt-4 px-0">
                <Link href="/market">
                  Check Market Prices <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="card-hover border-green-100 dark:border-green-900">
            <CardHeader>
              <Droplets className="h-8 w-8 text-green-600 mb-2" />
              <CardTitle>Soil Health</CardTitle>
              <CardDescription>Tips and insights to maintain optimal soil health</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Learn about soil testing, nutrient management, and conservation practices to improve your farm's
                productivity.
              </p>
              <Button asChild variant="link" className="mt-4 px-0">
                <Link href="/soil">
                  Soil Health Tips <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="card-hover border-green-100 dark:border-green-900">
            <CardHeader>
              <FileText className="h-8 w-8 text-green-600 mb-2" />
              <CardTitle>Government Schemes</CardTitle>
              <CardDescription>Access information about agricultural schemes and subsidies</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Stay informed about government initiatives, subsidies, and support programs designed for farmers.
              </p>
              <Button asChild variant="link" className="mt-4 px-0">
                <Link href="/schemes">
                  View Schemes <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="card-hover border-green-100 dark:border-green-900">
            <CardHeader>
              <CardTitle>AI Farming Assistant</CardTitle>
              <CardDescription>Get instant answers to your farming questions</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Our AI assistant can answer questions about crops, weather, market prices, soil health, and government
                schemes.
              </p>
              <Button asChild variant="link" className="mt-4 px-0">
                <Link href="/assistant">
                  Try AI Assistant <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* AI Assistant Section */}
      <section className="py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">AI Farming Assistant</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Get instant answers to your farming questions. Our AI assistant can help with crop recommendations,
              weather forecasts, market prices, soil health tips, and information about government schemes.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-full bg-green-600 flex items-center justify-center text-white text-xs">
                  ✓
                </div>
                <span>24/7 availability for instant assistance</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-full bg-green-600 flex items-center justify-center text-white text-xs">
                  ✓
                </div>
                <span>Personalized recommendations based on your location</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-full bg-green-600 flex items-center justify-center text-white text-xs">
                  ✓
                </div>
                <span>Up-to-date information on market prices and weather</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-full bg-green-600 flex items-center justify-center text-white text-xs">
                  ✓
                </div>
                <span>Guidance on government schemes and subsidies</span>
              </li>
            </ul>
          </div>
          <div>
            <AIChatbot />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 bg-gradient-primary rounded-lg mt-12 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Farming?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Join thousands of farmers who are using HariBhari to make data-driven decisions and improve their yields.
          </p>
          <Button asChild size="lg" className="bg-white text-green-600 hover:bg-gray-100">
            <Link href="/dashboard">Get Started Now</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
