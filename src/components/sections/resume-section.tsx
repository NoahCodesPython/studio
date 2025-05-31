
import { Button } from "@/components/ui/button";
import { Download, Eye } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ResumeSection() {
  // The PDF file MUST be placed in the 'public' directory at the root of your project.
  // For example, if your resume is 'resume_placeholder.pdf', its path in the project
  // should be 'public/resume_placeholder.pdf'. The URL will then be '/resume_placeholder.pdf'.
  const resumePdfUrl = "/resume_placeholder.pdf"; 
  const downloadFilename = "Charan_Resume.pdf"; // Desired filename for download

  return (
    <section id="resume" className="container mx-auto px-4 py-12">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">My Resume</h2>
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle>Professional Experience & Skills</CardTitle>
          <CardDescription>
            Explore my professional background below. You can view the full resume in a new tab or download it using the buttons.
            An embedded preview is also available, though some browsers might restrict it.
            <br />
            (Ensure 'resume_placeholder.pdf' is in the 'public' folder of your project.)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <a href={resumePdfUrl} target="_blank" rel="noopener noreferrer" aria-label="View Charan's Resume in a new tab">
                <Eye className="mr-2 h-4 w-4" /> View Resume (PDF)
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href={resumePdfUrl} download={downloadFilename} aria-label="Download Charan's Resume">
                <Download className="mr-2 h-4 w-4" /> Download Resume
              </a>
            </Button>
          </div>
          
          <div className="text-center mb-2">
            <p className="text-sm text-muted-foreground">Embedded Preview:</p>
          </div>
          <div className="aspect-[8.5/11] w-full max-w-4xl mx-auto border rounded-lg overflow-hidden bg-muted">
            <iframe
              src={resumePdfUrl}
              title="Charan's Resume Preview"
              className="w-full h-full"
              aria-label="Embedded Resume PDF Preview"
            />
          </div>
          <p className="text-center text-sm text-muted-foreground mt-4">
            If the preview above is blank or shows an error, please use the 
            <a href={resumePdfUrl} target="_blank" rel="noopener noreferrer" className="underline font-medium text-primary hover:text-primary/80 mx-1">
              View Resume (PDF)
            </a> 
            button to open it directly in a new tab, or download it.
          </p>
        </CardContent>
      </Card>
    </section>
  );
}
