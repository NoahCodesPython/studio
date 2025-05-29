
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton"; // For loading state
import { Linkedin, Github, Youtube } from "lucide-react"; // Added icons

// A more recognizable Discord icon SVG
const DiscordIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 28 28" // Adjusted viewBox for a more common Discord icon shape
    fill="currentColor" // Standard for Discord logo fill
    className="h-6 w-6"
  >
    <path d="M23.0212 3.441H4.9788C3.88492 3.441 3 4.33536 3 5.4414V20.559C3 21.6651 3.88492 22.5594 4.9788 22.5594H20.2221L23.9065 25.8349C24.0512 25.9622 24.2623 26.0002 24.4388 25.9251C24.6152 25.85 24.7383 25.6773 24.7383 25.486V5.4414C24.7383 4.33536 23.8533 3.441 23.0212 3.441ZM9.40492 16.3021C8.01924 16.3021 6.89992 15.1703 6.89992 13.7703C6.89992 12.3703 8.01924 11.2385 9.40492 11.2385C10.7906 11.2385 11.91 12.3703 11.91 13.7703C11.91 15.1703 10.7906 16.3021 9.40492 16.3021ZM15.3333 16.3021C13.9476 16.3021 12.8283 15.1703 12.8283 13.7703C12.8283 12.3703 13.9476 11.2385 15.3333 11.2385C16.719 11.2385 17.8383 12.3703 17.8383 13.7703C17.8383 15.1703 16.719 16.3021 15.3333 16.3021Z" />
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
