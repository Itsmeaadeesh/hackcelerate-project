"use client"

import Link from "next/link"
import { Leaf } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Leaf className="h-6 w-6 text-green-600" />
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} HariBhari. {t("footer.rights") || "All rights reserved."}
          </p>
        </div>
        <div className="flex gap-4">
          <Link
            href="/about"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            {t("footer.about") || "About"}
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            {t("footer.contact") || "Contact"}
          </Link>
          <Link
            href="/privacy"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            {t("footer.privacy") || "Privacy"}
          </Link>
          <Link
            href="/terms"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            {t("footer.terms") || "Terms"}
          </Link>
        </div>
      </div>
    </footer>
  )
}
