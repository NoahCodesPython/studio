
"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github } from "lucide-react";
import { Button } from "../ui/button";
import { generateProjectImage, type GenerateProjectImageInput } from '@/ai/flows/generate-project-image';
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  dataAiHint: string;
  tags: string[];
  liveLink?: string;
  codeLink?: string;
  currentImageUrl: string;
  isLoadingImage: boolean;
}

const initialProjectsData: Project[] = [
  {
    id: 1,
    title: 'Aquire Bot',
    description: 'A feature-rich Discord bot developed to enhance community engagement and server moderation. Built with JavaScript and Node.js, leveraging the Discord.js library.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'community chat app',
    tags: ['Discord.js', 'Node.js', 'JavaScript', 'Community'],
    liveLink: 'https://discord.com/api/oauth2/authorize?client_id=816987224662999040&permissions=8&scope=bot%20applications.commands',
    codeLink: 'https://github.com/NoahCodesPython/Aquire',
    currentImageUrl: 'https://placehold.co/600x400.png',
    isLoadingImage: true
  },
  {
    id: 2,
    title: 'Personal Portfolio Website',
    description: 'This very portfolio website, showcasing my projects and skills. Developed using Next.js, React, Tailwind CSS, ShadCN UI, and Genkit for AI features.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'modern web design code',
    tags: ['Next.js', 'React', 'Tailwind', 'ShadCN', 'Genkit'],
    liveLink: '#',
    codeLink: '#',
    currentImageUrl: 'https://placehold.co/600x400.png',
    isLoadingImage: true
  },
  {
    id: 3,
    title: 'Data Analysis Mini-Project',
    description: 'An introductory project exploring data analysis techniques using Python and MySQL. Focused on cleaning, analyzing, and visualizing a sample dataset with Pandas and Matplotlib.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'data charts graphs python',
    tags: ['Python', 'MySQL', 'Data Analysis', 'Pandas', 'Matplotlib'],
    codeLink: '#',
    currentImageUrl: 'https://placehold.co/600x400.png',
    isLoadingImage: true
  },
  {
    id: 4,
    title: 'Animated Welcome NPM Package',
    description: 'An npm package that empowers Discord bot developers to create custom, animated welcome GIFs for new server members. Utilizes Node.js and image manipulation.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'discord bot animation',
    tags: ['NPM', 'Node.js', 'JavaScript', 'Discord', 'GIF', 'Canvas'],
    liveLink: 'https://www.npmjs.com/package/animated-welcome',
    codeLink: 'https://github.com/NoahCodesPython/animated-welcome',
    currentImageUrl: 'https://placehold.co/600x400.png',
    isLoadingImage: true
  },
];

export default function PortfolioSection() {
  const [projects, setProjects] = useState<Project[]>(
    initialProjectsData.map(p => ({
      ...p,
      currentImageUrl: p.imageUrl,
      isLoadingImage: true
    }))
  );
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  useEffect(() => {
    const fetchImages = async () => {
      const updatedProjectsPromises = initialProjectsData.map(async (projectData) => {
        try {
          const promptText = `A stunning, professional digital art image for a software project card. Project Title: "${projectData.title}". Keywords for style/content: ${projectData.dataAiHint}. Focus on a modern, clean, vibrant aesthetic suitable for a tech portfolio. Aspect ratio 16:9.`;
          const input: GenerateProjectImageInput = { prompt: promptText };
          const result = await generateProjectImage(input);

          if (result.imageDataUri && result.imageDataUri.startsWith('data:image')) {
            return { ...projectData, currentImageUrl: result.imageDataUri, isLoadingImage: false };
          }
          return { ...projectData, currentImageUrl: projectData.imageUrl, isLoadingImage: false };
        } catch (error) {
          console.error(`Failed to generate image for project "${projectData.title}":`, error);
          return { ...projectData, currentImageUrl: projectData.imageUrl, isLoadingImage: false };
        }
      });

      const resolvedProjects = await Promise.all(updatedProjectsPromises);
      setProjects(resolvedProjects);
    };

    fetchImages();
  }, []);

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className={cn("container mx-auto px-4 animate-on-scroll", isVisible ? "is-visible" : "")}
    >
      <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-20 tracking-tight">My Work</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {projects.map((project) => (
          <Card
            key={project.id}
            className="group flex flex-col overflow-hidden shadow-lg hover:shadow-primary/20 hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-2 border bg-gradient-to-br from-card to-card/80 hover:border-accent"
          >
            <div className="relative w-full h-52 bg-muted flex items-center justify-center overflow-hidden">
              {project.isLoadingImage ? (
                <Skeleton className="w-full h-full bg-primary/10" />
              ) : (
                <Image
                  src={project.currentImageUrl}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                  data-ai-hint={project.dataAiHint}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
            </div>
            <CardHeader className="pb-3">
              <CardTitle className="text-xl font-semibold tracking-wide">{project.title}</CardTitle>
              <CardDescription className="h-24 overflow-y-auto text-sm text-foreground/70 pt-1">{project.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow pt-2">
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 text-xs px-3 py-1.5 rounded-full cursor-default">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-start gap-3 pt-0 border-t border-border/50 p-4">
              {project.liveLink && (
                <Button variant="default" size="sm" asChild className="btn-gradient shadow-md hover:shadow-lg primary-glow interactive-scale">
                  <a href={project.liveLink} target={project.liveLink === "#" ? "_self" : "_blank"} rel="noopener noreferrer">
                    Live Demo <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              )}
              {project.codeLink && (
                <Button variant="outline" size="sm" asChild className="hover:bg-accent/10 hover:text-accent-foreground hover:border-accent interactive-scale">
                   <a href={project.codeLink} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" /> Code
                  </a>
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
