
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton"; // For loading state
import { Linkedin, Github, Youtube } from "lucide-react";

// Define the DiscordIcon component here for use in this file
const DiscordIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24" // Standard square viewBox
    fill="currentColor"
    role="img"
    className={className}
  >
    <title>Discord</title>
    {/* Path from a reliable source, designed for 24x24 viewBox */}
    <path d="M20.317 4.369a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.078.037c-.21.375-.443.804-.608 1.251a18.29 18.29 0 00-5.484 0 12.14 12.14 0 00-.608-1.25.074.074 0 00-.078-.038 19.791 19.791 0 00-4.885 1.515.068.068 0 00-.022.095c.433.804.804 1.577.994 2.266a17.646 17.646 0 00-1.608 3.645.074.074 0 00.042.1c1.43.711 2.747 1.251 3.956 1.577a.074.074 0 00.088-.019c.21-.243.38-.51.508-.799a10.562 10.562 0 01-1.577-.608.074.074 0 01-.019-.095c.032-.074.064-.148.095-.223a12.14 12.14 0 001.023 1.578.074.074 0 00.095.019c.54-.21.994-.443 1.392-.672a.074.074 0 00.022-.095c-.15-.3-.244-.6-.307-.919a14.097 14.097 0 003.098.01.074.074 0 00.022.095c-.063.318-.158.618-.307.919a.074.074 0 00.022.095c.398.229.852.462 1.392.672a.074.074 0 00.095-.019 12.14 12.14 0 001.023-1.578c.031.075.063.149.095.223a.074.074 0 01-.019.095 10.562 10.562 0 01-1.577.608.074.074 0 00.088.019c1.209-.326 2.526-.866 3.956-1.577a.074.074 0 00.042-.1 17.646 17.646 0 00-1.608-3.645c.19-.69.561-1.463.994-2.266a.068.068 0 00-.022-.095zm-8.038 9.023c-.638 0-1.137-.54-1.137-1.222s.499-1.222 1.137-1.222c.638 0 1.137.54 1.137 1.222s-.499 1.222-1.137 1.222zm4.015 0c-.638 0-1.137-.54-1.137-1.222s.499-1.222 1.137-1.222c.638 0 1.137.54 1.137 1.222s-.499 1.222-1.137 1.222z" />
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
      icon: <DiscordIcon className="h-6 w-6" />,
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
