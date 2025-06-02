
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
    viewBox="0 0 24 24" // Standard square viewBox
    fill="currentColor"
    role="img"
    className={className}
  >
    <title>Discord</title>
    {/* Path from a reliable source, designed for 24x24 viewBox */}
    <path d="M20.317 4.369a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.078.037c-.21.375-.443.804-.608 1.251a18.29 18.29 0 00-5.484 0 12.14 12.14 0 00-.608-1.25.074.074 0 00-.078-.038 19.791 19.791 0 00-4.885 1.515.068.068 0 00-.022.095c.433.804.804 1.577.994 2.266a17.646 17.646 0 00-1.608 3.645.074.074 0 00.042.1c1.43.711 2.747 1.251 3.956 1.577a.074.074 0 00.088-.019c.21-.243.38-.51.508-.799a10.562 10.562 0 01-1.577-.608.074.074 0 01-.019-.095c.032-.074.064-.148.095-.223a12.14 12.14 0 001.023 1.578.074.074 0 00.095.019c.54-.21.994-.443 1.392-.672a.074.074 0 00.022-.095c-.15-.3-.244-.6-.307-.919a14.097 14.097 0 003.098.01.074.074 0 00.022.095c-.063.318-.158.618-.307.919a.074.074 0 00.022.095c.398.229.852.462 1.392.672a.074.074 0 00.095-.019 12.14 12.14 0 001.023-1.578c.031.075.063.149.095.223a.074.074 0 01-.019.095 10.562 10.562 0 01-1.577.608.074.074 0 00.088.019c1.209-.326 2.526-.866 3.956-1.577a.074.074 0 00.042-.1 17.646 17.646 0 00-1.608-3.645c.19-.69.561-1.463.994-2.266a.068.068 0 00-.022-.095zm-8.038 9.023c-.638 0-1.137-.54-1.137-1.222s.499-1.222 1.137-1.222c.638 0 1.137.54 1.137 1.222s-.499 1.222-1.137 1.222zm4.015 0c-.638 0-1.137-.54-1.137-1.222s.499-1.222 1.137-1.222c.638 0 1.137.54 1.137 1.222s-.499 1.222-1.137 1.222z" />
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
      icon: <DiscordIcon className="h-5 w-5 text-primary" />,
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
