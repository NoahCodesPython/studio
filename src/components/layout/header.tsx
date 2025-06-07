
"use client";

import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "@/components/ui/button";
import { CodeXml } from "lucide-react";
import React, { useState, useEffect } from 'react';

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#resume", label: "Resume" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out 
                  ${isScrolled ? 'bg-background/90 backdrop-blur-lg shadow-lg' : 'bg-transparent backdrop-blur-none shadow-none'}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link 
            href="#home" 
            className="flex items-center gap-2 text-2xl font-bold text-primary hover:text-primary/80 transition-transform duration-200 ease-out hover:scale-105"
          >
            <CodeXml className="h-7 w-7 transition-transform duration-300 group-hover:rotate-12" />
            Charan
          </Link>
          <nav className="hidden md:flex space-x-1">
            {navLinks.map((link) => (
              <Button key={link.href} variant="ghost" asChild
                className="hover:bg-accent/20"
              >
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
