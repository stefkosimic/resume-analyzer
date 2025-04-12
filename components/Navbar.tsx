"use client";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { Sparkles } from "lucide-react";
import Image from "next/image";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl px-4 md:px-0 mx-auto flex h-14 items-center">
        <div className="mr-4 flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Image src="/logo.svg" alt="logo" width={28} height={28} />
            <div>
              <span className="font-bold text-gradient">Resume</span>
              <span className="font-bold">Analyzer</span>
            </div>
          </Link>
        </div>
        <nav className="flex flex-1 justify-center items-center space-x-6 text-sm font-medium">
          {/* <Link
              href="/#features"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Features
            </Link>
            <Link
              href="/#analysis"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Analysis
            </Link> */}
          <Link
            href="/pricing"
            className="transition-colors hover:text-foreground/80 text-foreground"
          >
            Pricing
          </Link>
          <Link
            href="/coming-soon"
            className="transition-colors flex items-center gap-2 hover:text-foreground/80 text-foreground"
          >
            <Sparkles className="h-4 w-4" />
            <span className="hidden md:block">Pro Features</span>
          </Link>
        </nav>
        <div className="flex items-center justify-end space-x-2">
          <nav className="flex items-center space-x-2">
            {/* <Button variant="ghost" size="sm">
              Sign In
            </Button>
            <Button size="sm">Get Started</Button> */}
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </nav>
  );
}
