
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const ownerInfo = {
  name: "Charan Nihaal R",
  profession: "College Student",
};

export default function IntroSection() {
  const generalWelcomeMessage = `Hello! I'm ${ownerInfo.name}, a ${ownerInfo.profession} passionate about technology. I enjoy building Discord bots, crafting webpages with HTML & CSS, and I'm currently advancing my Python skills, learning Java, and honing my JavaScript abilities. I'm also developing my expertise in MySQL and Data Analysis. Explore my projects and connect with me!`;

  return (
    <section id="home" className="container mx-auto px-4 py-12 text-center min-h-[calc(100vh-4rem)] flex flex-col justify-center items-center">
      <div className="max-w-3xl w-full">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Hi, I&apos;m <span className="text-primary">{ownerInfo.name}</span>
        </h1>
        <p className="text-xl md:text-2xl text-foreground/80 mb-8">
          A {ownerInfo.profession} exploring web development, bot creation, and data analysis.
        </p>

        <Card className="text-left shadow-xl">
          <CardHeader>
            <CardTitle>Welcome!</CardTitle>
            <CardDescription>Thanks for visiting my personal space on the web.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-4 border rounded-md bg-muted/50">
              <p className="text-foreground whitespace-pre-line">{generalWelcomeMessage}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
