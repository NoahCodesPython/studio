import { Button } from "@/components/ui/button";
import { Download, Eye } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ResumeSection() {
  const resumePdfUrl = "/resume_placeholder.pdf"; // User needs to place their resume PDF here in /public folder

  return (
    <section id="resume" className="container mx-auto px-4 py-12">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">My Resume</h2>
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle>Professional Experience & Skills</CardTitle>
          <CardDescription>
            Below is an overview of my professional background. You can view the full resume in your browser or download it.
            Please note: A placeholder PDF is used. Replace 'public/resume_placeholder.pdf' with your actual resume.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <a href={resumePdfUrl} target="_blank" rel="noopener noreferrer">
                <Eye className="mr-2 h-4 w-4" /> View Resume (PDF)
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href={resumePdfUrl} download="resume_alex_persona.pdf">
                <Download className="mr-2 h-4 w-4" /> Download Resume
              </a>
            </Button>
          </div>
          
          <div className="aspect-[8.5/11] w-full max-w-4xl mx-auto border rounded-lg overflow-hidden bg-muted">
            <iframe
              src={resumePdfUrl}
              title="Resume"
              className="w-full h-full"
              aria-label="Embedded Resume PDF"
            />
          </div>
          <p className="text-center text-sm text-muted-foreground mt-4">
            If the PDF does not display, please use the download button or ensure you have a PDF viewer enabled in your browser.
          </p>
        </CardContent>
      </Card>
    </section>
  );
}
