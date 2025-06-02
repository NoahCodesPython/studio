
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton"; // For loading state
import { Linkedin, Github, Youtube } from "lucide-react"; 

// Define the DiscordIcon component here for use in this file
const DiscordIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    role="img"
    className={className}
  >
    <title>Discord</title>
    <path d="M20.228 0S16.812.003 15.322 1.636C13.218 1.173 10.703 1.166 8.678 1.636 7.188.003 3.772 0 3.772 0s3.76 3.272 3.76 7.13c0 3.27-1.91 4.01-3.76 4.01S0 18.008 0 18.008s3.004 2.73 6.83 2.73c4.745 0 6.848-3.38 6.848-3.38S12.11 19.227 10.31 20.73c-1.628 1.37-3.48 2.15-3.48 2.15s.44-.627.832-1.14c2.498-3.22 2.958-7.23 2.958-7.23s1.49.637 3.318.637c1.83 0 3.318-.638 3.318-.638s.46 4.01 2.958 7.23c.392.512.832 1.14.832 1.14s-1.852-.78-3.48-2.15c-1.8-.185-3.322-1.848-3.322-1.848s2.102 3.38 6.848 3.38c3.825 0 6.828-2.73 6.828-2.73S20.228 14.41 20.228 11.14c0-3.858 3.772-7.13 3.772-7.13S20.228 0 20.228 0zM7.83 11.917c-1.048 0-1.89-.85-1.89-1.893s.842-1.894 1.89-1.894c1.047 0 1.89.85 1.89 1.894 0 1.043-.843 1.893-1.89 1.893zm8.34 0c-1.048 0-1.89-.85-1.89-1.893s.842-1.894 1.89-1.894c1.047 0 1.89.85 1.89 1.894.002 1.043-.842 1.893-1.89 1.893z"/>
  </svg>
);

interface IntroSectionProps {
  ownerName: string;
  ownerProfession: string;
  generatedIntro: string;
  isGenerating: boolean;
}

export default function IntroSection({ ownerName, ownerProfession, generatedIntro, isGenerating }: IntroSectionProps) {
  const socialLinks = [
    {
      name: "LinkedIn",
      url: "#", // Replace with your LinkedIn URL
      icon: <Linkedin className="h-6 w-6" />,
    },
    {
      name: "GitHub",
      url: "#", // Replace with your GitHub URL
      icon: <Github className="h-6 w-6" />,
    },
    {
      name: "Discord",
      url: "#", // Replace with your Discord invite or server link
      icon: <DiscordIcon className="h-6 w-6" />, // Replaced MessageSquare
    },
    {
      name: "YouTube",
      url: "#", // Replace with your YouTube channel URL
      icon: <Youtube className="h-6 w-6" />,
    },
  ];

  return (
    <section id="home" className="container mx-auto px-4 py-12 text-center min-h-[calc(100vh-4rem)] flex flex-col justify-center items-center">
      <div className="max-w-3xl w-full">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Hi, I&apos;m <span className="text-primary">{ownerName}</span>
        </h1>
        <p className="text-xl md:text-2xl text-foreground/80 mb-8">
          A {ownerProfession} exploring web development, bot creation, and data analysis.
        </p>

        <Card className="text-left shadow-xl">
          <CardHeader>
            <CardTitle>Welcome!</CardTitle>
            <CardDescription>Thanks for visiting my personal space on the web.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-4 border rounded-md bg-muted/50 min-h-[100px]">
              {isGenerating ? (
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <p className="text-sm text-muted-foreground text-center pt-2">Personalizing your welcome...</p>
                </div>
              ) : (
                <p className="text-foreground whitespace-pre-line">{generatedIntro}</p>
              )}
            </div>
            <div className="mt-6 flex justify-center space-x-6">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${ownerName}'s ${link.name} profile`}
                  className="text-foreground/70 hover:text-primary transition-colors"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
    
