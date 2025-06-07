
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Linkedin, Github, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";

// Define the DiscordIcon component here for use in this file
const DiscordIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16" // Using a 16x16 viewBox
    fill="currentColor"
    role="img"
    className={className}
  >
    <title>Discord</title>
    {/* SVG path from Bootstrap Icons - Discord */}
    <path d="M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.037c.175.38.38.711.576.991a13.95 13.95 0 0 0-2.209 3.075.05.05 0 0 0 .007.054c.25.166.538.373.822.585a14.048 14.048 0 0 0-1.235 2.37.05.05 0 0 0 .046.063c.473.099.974.199 1.495.285a12.62 12.62 0 0 0 1.101.039.05.05 0 0 0 .05-.021c.036-.07.062-.139.08-.205a11.636 11.636 0 0 0-.498-.286.05.05 0 0 1-.014-.089c.027-.049.052-.098.075-.147a10.07 10.07 0 0 0 .399.286.05.05 0 0 0 .036.017c.165.042.33.089.493.134a10.091 10.091 0 0 0 .564.097.05.05 0 0 0 .049-.03c.076-.151.14-.309.19-.475a10.583 10.583 0 0 0 .96-.038.05.05 0 0 0 .049.03c.189.045.374.094.554.143a9.942 9.942 0 0 0 .567.094.05.05 0 0 0 .036-.017c.15-.057.291-.12.424-.192a10.069 10.069 0 0 0 .4.286.05.05 0 0 1-.015.09c-.17.08-.335.158-.498.285a.05.05 0 0 0 .05.022c.02-.067.037-.137.058-.206a.05.05 0 0 0 .049.039c.42.086.912.185 1.495.285a.05.05 0 0 0 .046-.063 13.948 13.948 0 0 0-1.235-2.37c.284-.212.572-.419.822-.585a.05.05 0 0 0 .007-.054 13.95 13.95 0 0 0-2.209-3.075c.196-.28.401-.611.576-.991a.041.041 0 0 0-.021-.037ZM4.746 9.324a1.228 1.228 0 0 1-1.26-1.275 1.228 1.228 0 0 1 1.26-1.275c.699 0 1.275.575 1.266 1.275a1.228 1.228 0 0 1-1.266 1.275Zm6.508 0a1.228 1.228 0 0 1-1.26-1.275 1.228 1.228 0 0 1 1.26-1.275c.699 0 1.275.575 1.266 1.275a1.228 1.228 0 0 1-1.266 1.275Z"/>
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
      url: "#", // Replace with your actual LinkedIn URL
      icon: <Linkedin className="h-8 w-8" />, 
    },
    {
      name: "GitHub",
      url: "#", // Replace with your actual GitHub URL
      icon: <Github className="h-8 w-8" />, 
    },
    {
      name: "Discord",
      url: "#", // Replace with your Discord invite or server link
      icon: <DiscordIcon className="h-8 w-8" />, 
    },
    {
      name: "YouTube",
      url: "#", // Replace with your actual YouTube URL
      icon: <Youtube className="h-8 w-8" />, 
    },
  ];

  return (
    <section id="home" className="container mx-auto px-4 text-center min-h-[calc(100vh-4rem)] flex flex-col justify-center items-center">
      <div className="max-w-3xl w-full">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight">
          Hi, I&apos;m <span className="text-primary animate-pulse">{ownerName}</span>
        </h1>
        <p className="text-xl md:text-2xl text-foreground/80 mb-10">
          A {ownerProfession} exploring web development, bot creation, and data analysis.
        </p>

        <Card className="text-left shadow-xl bg-card/80 backdrop-blur-sm border-primary/20">
          <CardHeader>
            <CardTitle className="text-2xl">Welcome to My Digital Space!</CardTitle>
            <CardDescription className="text-md">I&apos;m excited to share my journey and projects with you.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-6 border border-dashed border-primary/30 rounded-lg bg-muted/50 min-h-[120px]">
              {isGenerating ? (
                <div className="space-y-3">
                  <Skeleton className="h-5 w-full bg-primary/20" />
                  <Skeleton className="h-5 w-5/6 bg-primary/20" />
                  <Skeleton className="h-5 w-3/4 bg-primary/20" />
                  <p className="text-sm text-muted-foreground text-center pt-3">Crafting your personalized welcome...</p>
                </div>
              ) : (
                <p className="text-foreground text-lg leading-relaxed whitespace-pre-line">{generatedIntro}</p>
              )}
            </div>
            <div className="mt-8 flex justify-center space-x-6">
              {socialLinks.map((link) => (
                <Button
                  key={link.name}
                  variant="ghost"
                  size="icon"
                  asChild
                  className="rounded-full hover:bg-accent/20 hover:text-accent-foreground transition-all duration-300 ease-in-out transform hover:scale-110 p-0 w-auto h-auto" // Adjusted to allow icon to define size
                >
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit ${ownerName}'s ${link.name} profile`}
                    className="p-2" // Add padding around the icon itself
                  >
                    {link.icon}
                  </a>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
