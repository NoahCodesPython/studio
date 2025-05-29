
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton"; // For loading state
import { Linkedin, Github, Youtube } from "lucide-react"; // Added icons

// Discord "Clyde" mark icon SVG
const DiscordIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-6 w-6"
  >
    <path d="M20.297 0H3.703C1.658 0 0 1.621 0 3.635v16.73C0 22.379 1.658 24 3.703 24h12.302l1.018-1.082-1.167-1.345 1.138-1.264 1.185 1.264 1.175-1.264.903.953L24 20.365V3.635C24 1.621 22.342 0 20.297 0zM8.02 16.542c-1.22 0-2.212-1.01-2.212-2.25S6.8 12.042 8.02 12.042s2.212 1.01 2.212 2.25-1.001 2.25-2.212 2.25zm7.96 0c-1.22 0-2.212-1.01-2.212-2.25s.992-2.25 2.212-2.25 2.212 1.01 2.212 2.25-.992 2.25-2.212 2.25z"/>
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
      icon: <DiscordIcon />,
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
