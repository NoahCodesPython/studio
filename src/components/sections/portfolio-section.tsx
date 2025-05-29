
"use client";

import React, { useState, useEffect } from 'react';
import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import { Button } from "../ui/button";
import { generateProjectImage, type GenerateProjectImageInput } from '@/ai/flows/generate-project-image';
import { Skeleton } from "@/components/ui/skeleton";

interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string; // Original placeholder
  dataAiHint: string; // Hint for AI image generation prompt AND for Unsplash
  tags: string[];
  liveLink: string;
  codeLink: string;
  currentImageUrl: string; // Could be placeholder or AI generated
  isLoadingImage: boolean;
}

const initialProjectsData = [
  {
    id: 1,
    title: 'Community Discord Bot',
    description: 'A feature-rich Discord bot developed to enhance community engagement and server moderation. Built with JavaScript and Node.js, leveraging the Discord.js library.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'community chat app',
    tags: ['Discord.js', 'Node.js', 'JavaScript', 'Community Tools'],
    liveLink: '#', 
    codeLink: '#'
  },
  {
    id: 2,
    title: 'Personal Portfolio Website',
    description: 'My first portfolio website, showcasing my projects and skills. Developed using HTML, CSS, and a touch of JavaScript for interactivity.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'web design code',
    tags: ['HTML', 'CSS', 'JavaScript', 'Web Development'],
    liveLink: '#', 
    codeLink: '#'
  },
  {
    id: 3,
    title: 'Data Analysis Mini-Project',
    description: 'An introductory project exploring data analysis techniques using Python and MySQL. Focused on cleaning, analyzing, and visualizing a sample dataset.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'data charts graphs',
    tags: ['Python', 'MySQL', 'Data Analysis', 'Pandas'],
    liveLink: '#', 
    codeLink: '#'
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

  useEffect(() => {
    const fetchImages = async () => {
      const updatedProjectsPromises = initialProjectsData.map(async (projectData) => {
        try {
          // Construct a descriptive prompt for image generation
          const promptText = `A visually appealing, professional digital art image for a software project card. Project Title: "${projectData.title}". Description: "${projectData.description.substring(0, 150)}". Keywords for style/content: ${projectData.dataAiHint}. Focus on a modern, clean aesthetic suitable for a tech portfolio.`;
          const input: GenerateProjectImageInput = { prompt: promptText };
          const result = await generateProjectImage(input);
          
          if (result.imageDataUri && result.imageDataUri.startsWith('data:image')) {
            return { ...projectData, currentImageUrl: result.imageDataUri, isLoadingImage: false };
          } else {
            console.warn(`Received invalid or empty imageDataUri for project: ${projectData.title}. Falling back to placeholder.`);
            return { ...projectData, currentImageUrl: projectData.imageUrl, isLoadingImage: false };
          }
        } catch (error) {
          console.error(`Failed to generate image for project "${projectData.title}":`, error);
          return { ...projectData, currentImageUrl: projectData.imageUrl, isLoadingImage: false }; // Fallback to placeholder on error
        }
      });

      const resolvedProjects = await Promise.all(updatedProjectsPromises);
      setProjects(resolvedProjects);
    };

    // Check if GOOGLE_API_KEY might be available (basic check, actual availability determined by Genkit)
    // This is a conceptual check; in a real app, you might have a global state or env var check accessible here.
    // For now, we'll assume it might be configured and attempt generation.
    // If API key isn't set, Genkit calls will fail gracefully as per flow's error handling.
    fetchImages();
  }, []);

  return (
    <section id="portfolio" className="container mx-auto px-4 py-12">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">My Portfolio</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <Card key={project.id} className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-1">
            <div className="relative w-full h-48 bg-muted flex items-center justify-center">
              {project.isLoadingImage ? (
                <Skeleton className="w-full h-full" />
              ) : (
                <Image
                  src={project.currentImageUrl}
                  alt={project.title}
                  fill
                  className="object-cover"
                  data-ai-hint={project.dataAiHint} // This is for potential Unsplash integration later
                />
              )}
            </div>
            <CardHeader>
              <CardTitle>{project.title}</CardTitle>
              <CardDescription className="h-20 overflow-y-auto text-sm">{project.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-start gap-2">
              <Button variant="outline" size="sm" asChild>
                <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                  Live Demo <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                 <a href={project.codeLink} target="_blank" rel="noopener noreferrer">
                  View Code <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
