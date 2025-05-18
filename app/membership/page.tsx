"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, CreditCard } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { useToast } from "@/hooks/use-toast"

// Mock Razorpay integration
declare global {
  interface Window {
    Razorpay: any
  }
}

interface PlanFeature {
  name: string
  basic: boolean
  silver: boolean
  gold: boolean
  platinum: boolean
}

export default function MembershipPage() {
  const { t } = useLanguage()
  const { toast } = useToast()
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly")

  // Mock user data - in a real app, this would come from authentication
  const user = {
    name: "Farmer Singh",
    email: "farmer.singh@example.com",
    plan: "silver", // basic, silver, gold, platinum
  }

  const plans = [
    {
      name: t("membership.basic"),
      monthlyPrice: 0,
      yearlyPrice: 0,
      description: "Essential features for small farmers",
      buttonText: user.plan === "basic" ? t("membership.current") : t("membership.subscribe"),
      disabled: user.plan === "basic",
      features: [],
    },
    {
      name: t("membership.silver"),
      monthlyPrice: 199,
      yearlyPrice: 1999,
      description: "Advanced features for growing farms",
      buttonText: user.plan === "silver" ? t("membership.current") : t("membership.subscribe"),
      disabled: user.plan === "silver",
      features: [],
    },
    {
      name: t("membership.gold"),
      monthlyPrice: 499,
      yearlyPrice: 4999,
      description: "Premium features for commercial farms",
      buttonText: user.plan === "gold" ? t("membership.current") : t("membership.subscribe"),
      disabled: user.plan === "gold",
      features: [],
    },
    {
      name: t("membership.platinum"),
      monthlyPrice: 999,
      yearlyPrice: 9999,
      description: "All features plus priority support",
      buttonText: user.plan === "platinum" ? t("membership.current") : t("membership.subscribe"),
      disabled: user.plan === "platinum",
      features: [],
    },
  ]

  const features: PlanFeature[] = [
    { name: "Weather Forecasts", basic: true, silver: true, gold: true, platinum: true },
    { name: "Basic Crop Recommendations", basic: true, silver: true, gold: true, platinum: true },
    { name: "Market Price Updates", basic: true, silver: true, gold: true, platinum: true },
    { name: "Advanced Crop Recommendations", basic: false, silver: true, gold: true, platinum: true },
    { name: "Soil Health Analysis", basic: false, silver: true, gold: true, platinum: true },
    { name: "Personalized Farming Calendar", basic: false, silver: true, gold: true, platinum: true },
    { name: "Market Price Alerts", basic: false, silver: false, gold: true, platinum: true },
    { name: "Crop Disease Detection", basic: false, silver: false, gold: true, platinum: true },
    { name: "Irrigation Scheduling", basic: false, silver: false, gold: true, platinum: true },
    { name: "AI Crop Yield Prediction", basic: false, silver: false, gold: false, platinum: true },
    { name: "Priority Customer Support", basic: false, silver: false, gold: false, platinum: true },
    { name: "Expert Consultation Calls", basic: false, silver: false, gold: false, platinum: true },
  ]

  const handleSubscribe = (planName: string, price: number) => {
    // In a real app, this would integrate with Razorpay
    console.log(`Subscribing to ${planName} plan for ₹${price}`)

    // Mock Razorpay integration
    toast({
      title: "Razorpay Integration",
      description: `Processing payment of ₹${price} for ${planName} plan`,
    })

    // Simulate a successful payment after 2 seconds
    setTimeout(() => {
      toast({
        title: "Subscription Successful",
        description: `You are now subscribed to the ${planName} plan`,
        variant: "success",
      })
    }, 2000)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold tracking-tight mb-2">{t("membership.title")}</h1>
        <p className="text-muted-foreground">{t("membership.subtitle")}</p>
      </div>

      <div className="flex justify-center mb-8">
        <Tabs
          defaultValue="monthly"
          value={billingCycle}
          onValueChange={(value) => setBillingCycle(value as "monthly" | "yearly")}
          className="w-[400px]"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="monthly">{t("membership.monthly")}</TabsTrigger>
            <TabsTrigger value="yearly">{t("membership.yearly")}</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {plans.map((plan, index) => (
          <Card key={index} className={user.plan === plan.name.toLowerCase() ? "border-green-500 border-2" : ""}>
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                ₹{billingCycle === "monthly" ? plan.monthlyPrice : plan.yearlyPrice}
                <span className="text-sm font-normal text-muted-foreground">
                  /{billingCycle === "monthly" ? "month" : "year"}
                </span>
              </div>
              {billingCycle === "yearly" && plan.monthlyPrice > 0 && (
                <Badge className="mt-2 bg-green-500">Save ₹{plan.monthlyPrice * 12 - plan.yearlyPrice}</Badge>
              )}
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                disabled={plan.disabled}
                onClick={() =>
                  handleSubscribe(plan.name, billingCycle === "monthly" ? plan.monthlyPrice : plan.yearlyPrice)
                }
              >
                {plan.disabled ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    {plan.buttonText}
                  </>
                ) : (
                  <>
                    <CreditCard className="mr-2 h-4 w-4" />
                    {plan.buttonText}
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6 text-center">{t("membership.features")}</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left py-4 px-4">{t("membership.features")}</th>
                {plans.map((plan, index) => (
                  <th key={index} className="text-center py-4 px-4">
                    {plan.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {features.map((feature, index) => (
                <tr key={index} className="border-b">
                  <td className="py-4 px-4">{feature.name}</td>
                  <td className="text-center py-4 px-4">
                    {feature.basic ? <Check className="mx-auto h-5 w-5 text-green-500" /> : "-"}
                  </td>
                  <td className="text-center py-4 px-4">
                    {feature.silver ? <Check className="mx-auto h-5 w-5 text-green-500" /> : "-"}
                  </td>
                  <td className="text-center py-4 px-4">
                    {feature.gold ? <Check className="mx-auto h-5 w-5 text-green-500" /> : "-"}
                  </td>
                  <td className="text-center py-4 px-4">
                    {feature.platinum ? <Check className="mx-auto h-5 w-5 text-green-500" /> : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
