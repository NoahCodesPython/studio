
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton"; // For loading state

interface IntroSectionProps {
  ownerName: string;
  ownerProfession: string;
  generatedIntro: string;
  isGenerating: boolean;
}

export default function IntroSection({ ownerName, ownerProfession, generatedIntro, isGenerating }: IntroSectionProps) {
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
            {/* Example of where a custom welcome message from overlay input could be displayed if not using AI for it directly */}
            {/* {viewerProfile && !isGenerating && (
              <p className="custom-welcome-message">
                It's great to have you here, {viewerProfile}!
              </p>
            )} */}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
