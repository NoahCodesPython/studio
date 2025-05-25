import IntroSection from "@/components/sections/intro-section";
import PortfolioSection from "@/components/sections/portfolio-section";
import ResumeSection from "@/components/sections/resume-section";
import ContactSection from "@/components/sections/contact-section";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <div className="flex flex-col items-center space-y-16 md:space-y-24 py-8 md:py-12">
      <IntroSection />
      <Separator className="my-8 md:my-12 max-w-sm md:max-w-md mx-auto" />
      <PortfolioSection />
      <Separator className="my-8 md:my-12 max-w-sm md:max-w-md mx-auto" />
      <ResumeSection />
      <Separator className="my-8 md:my-12 max-w-sm md:max-w-md mx-auto" />
      <ContactSection />
    </div>
  );
}
