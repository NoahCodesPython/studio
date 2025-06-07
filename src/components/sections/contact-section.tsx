
"use client";

import React, { useRef, useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Mail, Phone, Copy, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const DiscordIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="currentColor"
    role="img"
    className={className}
  >
    <title>Discord</title>
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
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);


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
      icon: <DiscordIcon className="h-5 w-5 text-primary" />,
    },
  ];

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        toast({
          title: `${type} Copied!`,
          description: `${text} copied to clipboard.`,
          className: "bg-green-500/10 border-green-500 text-green-700 dark:text-green-400",
        });
      })
      .catch(err => {
        console.error("Failed to copy: ", err);
        toast({
          title: "Copy Failed",
          description: "Could not copy text.",
          variant: "destructive",
        });
      });
  };

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className={cn("container mx-auto px-4 animate-on-scroll", isVisible ? "is-visible" : "")}
    >
      <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-20 tracking-tight">Get In Touch</h2> {/* Increased margin-bottom */}
      <Card className="max-w-2xl mx-auto shadow-xl border-primary/10 hover:shadow-2xl transition-all duration-300 ease-in-out hover:border-primary/30 interactive-scale"> {/* Added interactive-scale and hover border */}
        <CardHeader>
          <CardTitle className="text-2xl font-semibold flex items-center gap-2">
            <Send className="h-6 w-6 text-primary"/> Connect With Me
          </CardTitle>
          <CardDescription className="text-md text-foreground/70 pt-1">
            I&apos;m always open to discussing new projects, creative ideas, or opportunities.
            Reveal my contact information below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1" className="border-b-0">
              <AccordionTrigger className="text-lg hover:no-underline hover:text-primary transition-colors rounded-md px-4 py-4 data-[state=open]:bg-primary/10 data-[state=open]:text-primary data-[state=open]:font-semibold interactive-scale"> {/* Increased padding and interactive scale */}
                Show Contact Information
              </AccordionTrigger>
              <AccordionContent className="pt-6">
                <ul className="space-y-5">
                  {contactDetails.map((detail) => (
                    <li key={detail.method} className="flex items-center justify-between group p-3 rounded-md hover:bg-muted/80 transition-colors">
                      <div className="flex items-center gap-4">
                        <span className="p-2.5 bg-primary/10 rounded-full text-primary"> {/* Slightly larger icon background */}
                          {detail.icon}
                        </span>
                        <div>
                          <p className="font-semibold text-foreground">{detail.method}</p>
                          {detail.href ? (
                            <a
                              href={detail.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-muted-foreground hover:text-primary transition-colors break-all"
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
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-primary interactive-scale" /* Added interactive-scale */
                        onClick={() => handleCopy(detail.value, detail.method)}
                        aria-label={`Copy ${detail.method}`}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-muted-foreground mt-8 text-center">
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
