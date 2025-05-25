import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import { Button } from "../ui/button";

const projects = [
  { 
    id: 1, 
    title: 'AI-Powered Content Platform', 
    description: 'A dynamic web application leveraging Next.js for the frontend and GenAI for intelligent content generation and personalization. Features a custom CMS and user analytics.', 
    imageUrl: 'https://placehold.co/600x400', 
    dataAiHint: 'technology abstract', 
    tags: ['Next.js', 'TypeScript', 'GenAI', 'CMS', 'Analytics'],
    liveLink: '#',
    codeLink: '#'
  },
  { 
    id: 2, 
    title: 'Scalable Microservice Suite', 
    description: 'Developed a suite of microservices for a high-traffic e-commerce platform, focusing on order processing, inventory management, and user authentication using Node.js and Docker.', 
    imageUrl: 'https://placehold.co/600x400', 
    dataAiHint: 'cloud computing', 
    tags: ['Node.js', 'Docker', 'Microservices', 'E-commerce', 'API'],
    liveLink: '#',
    codeLink: '#'
  },
  { 
    id: 3, 
    title: 'Open Source Dev Toolkit', 
    description: 'Contributed to and maintained an open-source developer toolkit that simplifies common development tasks, including code linting, testing, and deployment automation.', 
    imageUrl: 'https://placehold.co/600x400', 
    dataAiHint: 'code editor', 
    tags: ['Open Source', 'CLI', 'JavaScript', 'Automation', 'Testing'],
    liveLink: '#',
    codeLink: '#'
  },
];

export default function PortfolioSection() {
  return (
    <section id="portfolio" className="container mx-auto px-4 py-12">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">My Portfolio</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <Card key={project.id} className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-1">
            <div className="relative w-full h-48">
              <Image
                src={project.imageUrl}
                alt={project.title}
                layout="fill"
                objectFit="cover"
                data-ai-hint={project.dataAiHint}
              />
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
