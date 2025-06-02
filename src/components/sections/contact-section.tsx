
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
    viewBox="0 0 128 96" // Updated viewBox
    fill="currentColor"
    role="img"
    className={className}
  >
    <title>Discord</title>
    {/* Updated path data */}
    <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-9.86,1.15A145.53,145.53,0,0,0,49,5.09a105.38,105.38,0,0,0-27.2,17.65C1.53,30.83-.17,43.14.02,55.24A83.47,83.47,0,0,0,33.1,95.68a77.35,77.35,0,0,0,11.47-2.22A146.17,146.17,0,0,0,64.21,88a144.26,144.26,0,0,0,19.64,5.53,79.65,79.65,0,0,0,11.63,2.27,83.47,83.47,0,0,0,32.31-40.11c.8-5.36.61-10.68-.32-15.83A44.44,44.44,0,0,0,116,21.63a104.72,104.72,0,0,0-8.26-13.56ZM42.45,65.69C36.65,65.69,32,60.6,32,54.36s4.65-11.34,10.45-11.34,10.45,5.09,10.36,11.34S48.24,65.69,42.45,65.69Zm43.22,0C79.87,65.69,75.22,60.6,75.22,54.36s4.65-11.34,10.45-11.34,10.45,5.09,10.36,11.34S91.89,65.69,85.67,65.69Z" />
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
