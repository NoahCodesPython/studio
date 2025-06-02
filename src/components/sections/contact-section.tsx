
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
    viewBox="0 0 24 24"
    fill="currentColor"
    role="img"
    className={className}
  >
    <title>Discord</title>
    <path d="M20.228 0S16.812.003 15.322 1.636C13.218 1.173 10.703 1.166 8.678 1.636 7.188.003 3.772 0 3.772 0s3.76 3.272 3.76 7.13c0 3.27-1.91 4.01-3.76 4.01S0 18.008 0 18.008s3.004 2.73 6.83 2.73c4.745 0 6.848-3.38 6.848-3.38S12.11 19.227 10.31 20.73c-1.628 1.37-3.48 2.15-3.48 2.15s.44-.627.832-1.14c2.498-3.22 2.958-7.23 2.958-7.23s1.49.637 3.318.637c1.83 0 3.318-.638 3.318-.638s.46 4.01 2.958 7.23c.392.512.832 1.14.832 1.14s-1.852-.78-3.48-2.15c-1.8-.185-3.322-1.848-3.322-1.848s2.102 3.38 6.848 3.38c3.825 0 6.828-2.73 6.828-2.73S20.228 14.41 20.228 11.14c0-3.858 3.772-7.13 3.772-7.13S20.228 0 20.228 0zM7.83 11.917c-1.048 0-1.89-.85-1.89-1.893s.842-1.894 1.89-1.894c1.047 0 1.89.85 1.89 1.894 0 1.043-.843 1.893-1.89 1.893zm8.34 0c-1.048 0-1.89-.85-1.89-1.893s.842-1.894 1.89-1.894c1.047 0 1.89.85 1.89 1.894.002 1.043-.842 1.893-1.89 1.893z"/>
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
      icon: <DiscordIcon className="h-5 w-5 text-primary" />, // Replaced MessageSquare
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
