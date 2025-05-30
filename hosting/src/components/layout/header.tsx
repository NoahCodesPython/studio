"use client";

import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "@/components/ui/button";
import { CodeXml } from "lucide-react";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#resume", label: "Resume" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="#home" className="flex items-center gap-2 text-2xl font-bold text-primary hover:text-primary/90 transition-colors">
            <CodeXml className="h-7 w-7" />
            Charan
          </Link>
          <nav className="hidden md:flex space-x-4">
            {navLinks.map((link) => (
              <Button key={link.href} variant="ghost" asChild>
                <Link href={link.href} className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
                  {link.label}
                </Link>
              </Button>
            ))}
          </nav>
          <div className="flex items-center">
            <ThemeToggle />
            {/* Mobile menu can be added here if needed */}
          </div>
        </div>
      </div>
    </header>
  );
}
