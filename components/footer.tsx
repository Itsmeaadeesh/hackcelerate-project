import Link from "next/link";
import { Leaf } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t py-6 md:py-10">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex flex-col items-center gap-4 md:items-start md:gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-green-600" />
            <span className="font-bold text-xl">HariBhari</span>
          </Link>
          <p className="text-center text-sm text-muted-foreground md:text-left">
            Your all-in-one smart farming assistant. &copy; {new Date().getFullYear()} HariBhari.
          </p>
        </div>
        <div className="flex flex-col items-center gap-4 md:flex-row md:gap-6">
          <nav className="flex gap-4 md:gap-6">
            {/* Use the route URL, not file path */}
            <Link href="/about" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              About
            </Link>
            <Link href="/contact" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Contact
            </Link>
            <Link href="/privacy" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Privacy
            </Link>
            <Link href="/terms" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Terms
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
