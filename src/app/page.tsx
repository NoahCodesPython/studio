
"use client";

import React, { useState, useEffect } from 'react';
import IntroSection from "@/components/sections/intro-section";
import PortfolioSection from "@/components/sections/portfolio-section";
import ResumeSection from "@/components/sections/resume-section";
import ContactSection from "@/components/sections/contact-section";
import { Separator } from "@/components/ui/separator";
import WelcomeOverlay from '@/components/welcome-overlay';
import { generateIntro, type GenerateIntroInput } from '@/ai/flows/generate-intro';
import SkillsSection from '@/components/sections/skills-section';

const ownerInfo = {
  name: "Charan Nihaal",
  profession: "College Student",
};

export default function Home() {
  const [showOverlay, setShowOverlay] = useState(true);
  const [isOverlayClosing, setIsOverlayClosing] = useState(false);
  const [viewerProfile, setViewerProfile] = useState('');
  const [introMessage, setIntroMessage] = useState('');
  const [isGeneratingIntro, setIsGeneratingIntro] = useState(false);
  const [initialLoadDone, setInitialLoadDone] = useState(false);

  const defaultWelcomeMessage = `Hello! I'm ${ownerInfo.name}, a ${ownerInfo.profession} passionate about technology. I enjoy building Discord bots, crafting webpages with HTML & CSS, and I'm currently advancing my Python skills, learning Java, and honing my JavaScript abilities. I'm also developing my expertise in MySQL and Data Analysis. Explore my projects and connect with me!`;

  useEffect(() => {
    setIntroMessage(defaultWelcomeMessage);
    setInitialLoadDone(true);
  }, []);


  const handlePersonalizedIntro = async (profile?: string) => {
    setIsGeneratingIntro(true);
    setIntroMessage("Crafting your personalized welcome...");

    const input: GenerateIntroInput = {
      viewerProfile: profile,
      ownerName: ownerInfo.name,
      ownerProfession: ownerInfo.profession,
    };

    try {
      const result = await generateIntro(input);
      setIntroMessage(result.introMessage);
    } catch (error) {
      console.error("Error generating intro:", error);
      setIntroMessage(defaultWelcomeMessage);
    } finally {
      setIsGeneratingIntro(false);
    }
  };

  const handleConfirm = (inputValue: string) => {
    setIsOverlayClosing(true);
    setViewerProfile(inputValue);
    handlePersonalizedIntro(inputValue);
    setTimeout(() => {
      setShowOverlay(false);
      setIsOverlayClosing(false);
    }, 400);
  };

  const handleSkip = () => {
    setIsOverlayClosing(true);
    setViewerProfile('');
    setIntroMessage(defaultWelcomeMessage);
    setIsGeneratingIntro(false);
    setTimeout(() => {
      setShowOverlay(false);
      setIsOverlayClosing(false);
    }, 400);
  };

  if (!initialLoadDone) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading portfolio...
      </div>
    );
  }

  return (
    <>
      {showOverlay && (
        <WelcomeOverlay
          onConfirm={handleConfirm}
          onSkip={handleSkip}
          className={isOverlayClosing ? 'welcome-overlay closing' : 'welcome-overlay'}
          title={`Welcome to ${ownerInfo.name}'s Portfolio!`}
          description="To help me personalize your visit, please tell me a bit about yourself (e.g., Recruiter, Fellow Developer, Friend)."
          inputPlaceholder="Your role or how you know me"
          confirmButtonText="Personalize Experience"
          skipButtonText="View General Site"
          aria-label={`Welcome to ${ownerInfo.name}'s Portfolio!`}
        />
      )}
      <div className={`main-content ${showOverlay && !isOverlayClosing ? 'blurred' : ''} flex flex-col items-center space-y-16 md:space-y-24 py-8 md:py-12`}>
        <IntroSection
          ownerName={ownerInfo.name}
          ownerProfession={ownerInfo.profession}
          generatedIntro={introMessage}
          isGenerating={isGeneratingIntro}
        />
        <Separator className="my-8 md:my-12 max-w-sm md:max-w-md mx-auto" />
        <SkillsSection />
        <Separator className="my-8 md:my-12 max-w-sm md:max-w-md mx-auto" />
        <PortfolioSection />
        <Separator className="my-8 md:my-12 max-w-sm md:max-w-md mx-auto" />
        <ResumeSection />
        <Separator className="my-8 md:my-12 max-w-sm md:max-w-md mx-auto" />
        <ContactSection />
      </div>
    </>
  );
}
