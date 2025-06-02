
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Mail, Phone, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import React from 'react';

// Define the DiscordIcon component here for use in this file
const DiscordIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16" // Using a 16x16 viewBox
    fill="currentColor"
    role="img"
    className={className}
  >
    <title>Discord</title>
    {/* SVG path from Bootstrap Icons - Discord */}
    <path d="M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.037c.175.38.38.711.576.991a13.95 13.95 0 0 0-2.209 3.075.05.05 0 0 0 .007.054c.25.166.538.373.822.585a14.048 14.048 0 0 0-1.235 2.37.05.05 0 0 0 .046.063c.473.099.974.199 1.495.285a12.62 12.62 0 0 0 1.101.039.05.05 0 0 0 .05-.021c.036-.07.062-.139.08-.205a11.636 11.636 0 0 0-.498-.286.05.05 0 0 1-.014-.089c.027-.049.052-.098.075-.147a10.07 10.07 0 0 0 .399.286.05.05 0 0 0 .036.017c.165.042.33.089.493.134a10.091 10.091 0 0 0 .564.097.05.05 0 0 0 .049-.03c.076-.151.14-.309.19-.475a10.583 10.583 0 0 0 .96-.038.05.05 0 0 0 .049.03c.189.045.374.094.554.143a9.942 9.942 0 0 0 .567.094.05.05 0 0 0 .036-.017c.15-.057.291-.12.424-.192a10.069 10.069 0 0 0 .4.286.05.05 0 0 1-.015.09c-.17.08-.335.158-.498.285a.05.05 0 0 0 .05.022c.02-.067.037-.137.058-.206a.05.05 0 0 0 .049.039c.42.086.912.185 1.495.285a.05.05 0 0 0 .046-.063 13.948 13.948 0 0 0-1.235-2.37c.284-.212.572-.419.822-.585a.05.05 0 0 0 .007-.054 13.95 13.95 0 0 0-2.209-3.075c.196-.28.401-.611.576-.991a.041.041 0 0 0-.021-.037ZM4.746 9.324a1.228 1.228 0 0 1-1.26-1.275 1.228 1.228 0 0 1 1.26-1.275c.699 0 1.275.575 1.266 1.275a1.228 1.228 0 0 1-1.266 1.275Zm6.508 0a1.228 1.228 0 0 1-1.26-1.275 1.228 1.228 0 0 1 1.26-1.275c.699 0 1.275.575 1.266 1.275a1.228 1.228 0 0 1-1.266 1.275Z"/>
  </svg>
);


interface ContactDetail {
  method: string;
  value: string;
  icon: React.ReactNode;
  href?: string;
}

export default function ContactSection() {
  const { toast } = useToast();

  const contactDetails: ContactDetail[] = [
    {
      method: "Email",
      value: "shivanicharan297@gmail.com",
      icon: <Mail className="h-5 w-5 text-primary" />,
      href: "mailto:shivanicharan297@gmail.com",
    },
    {
      method: "Phone",
      value: "+91 9444701683",
      icon: <Phone className="h-5 w-5 text-primary" />,
      href: "tel:+919444701683",
    },
    {
      method: "Discord",
      value: "noah_osmont._.",
      icon: <DiscordIcon className="h-5 w-5 text-primary" />, // Uses h-5 w-5
    },
  ];

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        toast({
          title: `${type} Copied!`,
          description: `${text} copied to clipboard.`,
        });
      })
      .catch(err => {
        console.error("Failed to copy: ", err);
        toast({
          title: "Copy Failed",
          description: "Could not copy text to clipboard.",
          variant: "destructive",
        });
      });
  };

  return (
    <section id="contact" className="container mx-auto px-4 py-12">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Get In Touch</h2>
      <Card className="max-w-2xl mx-auto shadow-xl">
        <CardHeader>
          <CardTitle>Connect With Me</CardTitle>
          <CardDescription>
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of something great.
            Feel free to reveal my contact information below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg hover:no-underline">
                Show Contact Information
              </AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-4 pt-4">
                  {contactDetails.map((detail) => (
                    <li key={detail.method} className="flex items-center justify-between group">
                      <div className="flex items-center gap-3">
                        {detail.icon}
                        <div>
                          <p className="font-semibold">{detail.method}</p>
                          {detail.href ? (
                            <a
                              href={detail.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-muted-foreground hover:text-foreground transition-colors break-all"
                            >
                              {detail.value}
                            </a>
                          ) : (
                            <p className="text-muted-foreground break-all">{detail.value}</p>
                          )}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleCopy(detail.value, detail.method)}
                        aria-label={`Copy ${detail.method}`}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-muted-foreground mt-6 text-center">
                  Looking forward to hearing from you!
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </section>
  );
}
