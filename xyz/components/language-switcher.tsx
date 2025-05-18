"use client"

import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Globe } from "lucide-react"

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Globe className="h-5 w-5" />
          <span className="sr-only">Switch language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setLanguage("en")} className={language === "en" ? "bg-accent" : ""}>
          English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("hi")} className={language === "hi" ? "bg-accent" : ""}>
          हिंदी (Hindi)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("pa")} className={language === "pa" ? "bg-accent" : ""}>
          ਪੰਜਾਬੀ (Punjabi)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("ta")} className={language === "ta" ? "bg-accent" : ""}>
          தமிழ் (Tamil)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("te")} className={language === "te" ? "bg-accent" : ""}>
          తెలుగు (Telugu)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
