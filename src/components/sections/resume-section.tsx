
"use client";

import React, { useRef, useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Download, Eye } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function ResumeSection() {
  const resumePdfUrl = "/resume_placeholder.pdf"; 
  const downloadFilename = "Charan_Nihaal_R_Resume.pdf";
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

  return (
    <section 
      id="resume" 
      ref={sectionRef}
      className={cn("container mx-auto px-4 animate-on-scroll", isVisible ? "is-visible" : "")}
    >
      <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-20 tracking-tight">My Resume</h2> {/* Increased margin-bottom */}
      <Card className="shadow-xl border-primary/10 hover:shadow-2xl transition-all duration-300 ease-in-out hover:border-primary/30 interactive-scale"> {/* Added interactive-scale and hover border */}
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Professional Experience & Skills</CardTitle>
          <CardDescription className="text-md text-foreground/70 pt-1">
            Explore my professional background. You can view the full resume in a new tab or download it.
            An embedded preview is also available, though some browsers might restrict it.
            (Ensure 'resume_placeholder.pdf' is in the 'public' folder.)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="btn-gradient shadow-md hover:shadow-lg primary-glow interactive-scale">
              <a href={resumePdfUrl} target="_blank" rel="noopener noreferrer" aria-label="View Charan's Resume in a new tab">
                <Eye className="mr-2 h-4 w-4" /> View Resume (PDF)
              </a>
            </Button>
            <Button variant="outline" asChild className="hover:bg-accent/10 hover:text-accent-foreground hover:border-accent interactive-scale">
              <a href={resumePdfUrl} download={downloadFilename} aria-label="Download Charan's Resume">
                <Download className="mr-2 h-4 w-4" /> Download Resume
              </a>
            </Button>
          </div>
          
          <div className="text-center mb-3">
            <p className="text-sm text-muted-foreground">Embedded Preview:</p>
          </div>
          <div className="aspect-[8.5/11] w-full max-w-4xl mx-auto border-2 border-primary/20 rounded-lg overflow-hidden bg-muted shadow-inner">
            <iframe
              src={resumePdfUrl}
              title="Charan's Resume Preview"
              className="w-full h-full"
              aria-label="Embedded Resume PDF Preview"
            />
          </div>
          <p className="text-center text-sm text-muted-foreground mt-6">
            If the preview is blank, please use the 
            <a href={resumePdfUrl} target="_blank" rel="noopener noreferrer" className="underline font-medium text-primary hover:text-primary/80 mx-1">
              View Resume
            </a> 
            button.
          </p>
        </CardContent>
      </Card>
    </section>
  );
}
