"use client";

import { useState, useEffect } from "react";
import { generateIntro, type GenerateIntroInput } from "@/ai/flows/generate-intro";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

const ownerInfo = {
  name: "Alex Persona",
  profession: "Full-Stack Developer & AI Enthusiast",
};

export default function IntroSection() {
  const [viewerProfile, setViewerProfile] = useState("");
  const [generatedIntro, setGeneratedIntro] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Generate a default intro on mount
  useEffect(() => {
    handleGenerateIntro(true); // true for initial load
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const handleGenerateIntro = async (initialLoad = false) => {
    setIsLoading(true);
    setError(null);
    setGeneratedIntro(""); 
    try {
      const input: GenerateIntroInput = {
        ownerName: ownerInfo.name,
        ownerProfession: ownerInfo.profession,
        viewerProfile: initialLoad ? "a potential recruiter or client" : viewerProfile, // Provide a generic profile for initial load
      };
      const result = await generateIntro(input);
      setGeneratedIntro(result.introMessage);
    } catch (e) {
      console.error("Failed to generate intro:", e);
      setError("Sorry, I couldn't generate a personalized greeting at this moment.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleGenerateIntro();
  };

  return (
    <section id="home" className="container mx-auto px-4 py-12 text-center min-h-[calc(100vh-4rem)] flex flex-col justify-center items-center">
      <div className="max-w-3xl w-full">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Hi, I&apos;m <span className="text-primary">{ownerInfo.name}</span>
        </h1>
        <p className="text-xl md:text-2xl text-foreground/80 mb-8">
          A {ownerInfo.profession} passionate about crafting innovative digital experiences.
        </p>

        <Card className="text-left shadow-xl">
          <CardHeader>
            <CardTitle>A Personalized Greeting Just For You</CardTitle>
            <CardDescription>Tell me a bit about yourself, or see a general greeting.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4 mb-6">
              <div>
                <Label htmlFor="viewerProfile" className="sr-only">Your Role/Interests (e.g., recruiter, fellow developer, tech enthusiast)</Label>
                <Input
                  id="viewerProfile"
                  type="text"
                  value={viewerProfile}
                  onChange={(e) => setViewerProfile(e.target.value)}
                  placeholder="Your Role/Interests (e.g., recruiter)"
                  className="bg-background/70"
                />
              </div>
              <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Generate My Greeting"
                )}
              </Button>
            </form>

            {error && <p className="text-destructive mt-4">{error}</p>}
            
            {generatedIntro && !isLoading && (
              <div className="mt-6 p-4 border rounded-md bg-muted/50">
                <p className="text-foreground whitespace-pre-line">{generatedIntro}</p>
              </div>
            )}
             {isLoading && !generatedIntro && ( // Show loader when loading initial or new greeting
              <div className="mt-6 p-4 border rounded-md bg-muted/50 flex items-center justify-center min-h-[5rem]">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
