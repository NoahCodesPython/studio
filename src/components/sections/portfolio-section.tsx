
import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import { Button } from "../ui/button";

const projects = [
  {
    id: 1,
    title: 'Community Discord Bot',
    description: 'A feature-rich Discord bot developed to enhance community engagement and server moderation. Built with JavaScript and Node.js, leveraging the Discord.js library.',
    imageUrl: 'https://placehold.co/600x400',
    dataAiHint: 'community chat',
    tags: ['Discord.js', 'Node.js', 'JavaScript', 'Community Tools'],
    liveLink: '#', // Replace with actual link
    codeLink: '#'  // Replace with actual link
  },
  {
    id: 2,
    title: 'Personal Portfolio Website',
    description: 'My first portfolio website, showcasing my projects and skills. Developed using HTML, CSS, and a touch of JavaScript for interactivity.',
    imageUrl: 'https://placehold.co/600x400',
    dataAiHint: 'web design',
    tags: ['HTML', 'CSS', 'JavaScript', 'Web Development'],
    liveLink: '#', // Replace with actual link
    codeLink: '#'  // Replace with actual link
  },
  {
    id: 3,
    title: 'Data Analysis Mini-Project',
    description: 'An introductory project exploring data analysis techniques using Python and MySQL. Focused on cleaning, analyzing, and visualizing a sample dataset.',
    imageUrl: 'https://placehold.co/600x400',
    dataAiHint: 'data charts',
    tags: ['Python', 'MySQL', 'Data Analysis', 'Pandas'],
    liveLink: '#', // Replace with actual link
    codeLink: '#'  // Replace with actual link
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
