"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ModeToggle } from "@/components/mode-toggle"
import { LanguageSwitcher } from "@/components/language-switcher"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/contexts/language-context"
import { Cloud, Leaf, LineChart, Droplets, FileText, Menu, Home, LayoutDashboard, CreditCard, User } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

export default function Navbar() {
  const pathname = usePathname()
  const { t } = useLanguage()

  // Mock user data - in a real app, this would come from authentication
  const user = {
    name: "User Farmer",
    email: "farmer@example.com",
    plan: "basic", // basic, silver, gold, platinum
  }

  const routes = [
    {
      name: t("nav.home"),
      path: "/",
      icon: <Home className="h-5 w-5" />,
    },
    {
      name: t("nav.dashboard"),
      path: "/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      name: t("nav.weather"),
      path: "/weather",
      icon: <Cloud className="h-5 w-5" />,
    },
    {
      name: t("nav.crops"),
      path: "/crops",
      icon: <Leaf className="h-5 w-5" />,
    },
    {
      name: t("nav.market"),
      path: "/market",
      icon: <LineChart className="h-5 w-5" />,
    },
    {
      name: t("nav.soil"),
      path: "/soil",
      icon: <Droplets className="h-5 w-5" />,
    },
    {
      name: t("nav.schemes"),
      path: "/schemes",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      name: t("nav.membership"),
      path: "/membership",
      icon: <CreditCard className="h-5 w-5" />,
    },
  ]

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case "basic":
        return "bg-gray-500"
      case "silver":
        return "bg-gray-300"
      case "gold":
        return "bg-yellow-400"
      case "platinum":
        return "bg-purple-400"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="mr-2 md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[240px] sm:w-[300px]">
            <nav className="flex flex-col gap-4 mt-8">
              {routes.map((route) => (
                <Link
                  key={route.path}
                  href={route.path}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 text-lg rounded-md hover:bg-accent",
                    pathname === route.path ? "bg-accent font-medium" : "text-muted-foreground",
                  )}
                >
                  {route.icon}
                  {route.name}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
        <Link href="/" className="flex items-center gap-2 mr-6">
          <Leaf className="h-6 w-6 text-green-600" />
          <span className="font-bold text-xl hidden sm:inline-block">{t("app.name")}</span>
        </Link>
        <nav className="hidden md:flex items-center gap-5 text-sm">
          {routes.map((route) => (
            <Link
              key={route.path}
              href={route.path}
              className={cn(
                "flex items-center gap-1.5 font-medium",
                pathname === route.path ? "text-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {route.icon}
              {route.name}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <LanguageSwitcher />
          <ModeToggle />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className={getPlanColor(user.plan)}>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <Badge
                  className="absolute -top-2 -right-2 px-1 py-0 text-[10px] capitalize"
                  variant={user.plan === "basic" ? "outline" : "default"}
                >
                  {user.plan}
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>{t("nav.profile")}</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard className="mr-2 h-4 w-4" />
                <span>{t("nav.membership")}</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>{t("nav.logout")}</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button asChild className="hidden sm:flex">
            <Link href="/dashboard">{t("home.getStarted")}</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
