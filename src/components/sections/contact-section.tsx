
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Mail, Phone, MessageSquare, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import React from 'react';

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
      value: "charan.nihaal.r@example.com", // Replace with your actual email
      icon: <Mail className="h-5 w-5 text-primary" />,
      href: "mailto:charan.nihaal.r@example.com", // Replace with your actual email
    },
    {
      method: "Phone",
      value: "+1 (555) 000-0000", // Replace with your actual phone or remove if not applicable
      icon: <Phone className="h-5 w-5 text-primary" />,
      href: "tel:+15550000000", // Replace with your actual phone
    },
    {
      method: "Discord",
      value: "charann#1234", // Replace with your actual Discord username
      icon: <MessageSquare className="h-5 w-5 text-primary" />,
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
            Feel free to reach out directly using the methods below.
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
                    (detail.method === "Phone" && detail.value.includes("555-000-0000")) ? null : ( // Conditionally render phone
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
                    )
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
