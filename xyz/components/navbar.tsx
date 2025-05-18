"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { LanguageSwitcher } from "@/components/language-switcher"
import { ModeToggle } from "@/components/mode-toggle"
import { useLanguage } from "@/contexts/language-context"

const routes = [
  {
    href: "/dashboard",
    label: {
      en: "Dashboard",
      hi: "डैशबोर्ड",
      pa: "ਡੈਸ਼ਬੋਰਡ",
      ta: "டாஷ்போர்டு",
      te: "డాష్‌బోర్డ్",
    },
  },
  {
    href: "/weather",
    label: {
      en: "Weather",
      hi: "मौसम",
      pa: "ਮੌਸਮ",
      ta: "வானிலை",
      te: "వాతావరణం",
    },
  },
  {
    href: "/crops",
    label: {
      en: "Crops",
      hi: "फसलें",
      pa: "ਫਸਲਾਂ",
      ta: "பயிர்கள்",
      te: "పంటలు",
    },
  },
  {
    href: "/market",
    label: {
      en: "Market",
      hi: "बाज़ार",
      pa: "ਮਾਰਕੀਟ",
      ta: "சந்தை",
      te: "మార్కెట్",
    },
  },
  {
    href: "/soil",
    label: {
      en: "Soil",
      hi: "मिट्टी",
      pa: "ਮਿੱਟੀ",
      ta: "மண்",
      te: "మట్టి",
    },
  },
  {
    href: "/schemes",
    label: {
      en: "Schemes",
      hi: "योजनाएँ",
      pa: "ਯੋਜਨਾਵਾਂ",
      ta: "திட்டங்கள்",
      te: "పథకాలు",
    },
  },
]

export function Navbar() {
  const pathname = usePathname()
  const { language } = useLanguage()

  return (
    <div className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="flex h-16 items-center px-4">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="hidden font-bold text-green-600 dark:text-green-400 md:inline-block text-xl">HariBhari</span>
        </Link>
        <div className="hidden md:flex md:flex-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "px-4 py-2 text-sm font-medium transition-colors hover:text-primary",
                pathname === route.href ? "text-foreground" : "text-foreground/60",
              )}
            >
              {route.label[language as keyof typeof route.label] || route.label.en}
            </Link>
          ))}
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <LanguageSwitcher />
          <ModeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="grid gap-6 text-lg font-medium">
                <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
                  <span className="font-bold text-green-600 dark:text-green-400">HariBhari</span>
                </Link>
                <div className="grid gap-3">
                  {routes.map((route) => (
                    <Link
                      key={route.href}
                      href={route.href}
                      className={cn(
                        "flex items-center gap-2 text-sm font-medium",
                        pathname === route.href ? "text-foreground" : "text-foreground/60",
                      )}
                    >
                      {route.label[language as keyof typeof route.label] || route.label.en}
                    </Link>
                  ))}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </div>
  )
}
