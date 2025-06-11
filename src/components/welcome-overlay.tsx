
"use client";

import type { ChangeEvent, FC } from 'react';
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface WelcomeOverlayProps {
  onConfirm: (inputValue: string) => void;
  onSkip: () => void;
  className?: string;
  title?: string;
  description?: string;
  inputPlaceholder?: string;
  confirmButtonText?: string;
  skipButtonText?: string;
}

const WelcomeOverlay: FC<WelcomeOverlayProps> = ({
  onConfirm,
  onSkip,
  className,
  title = "Welcome!",
  description = "Help us personalize your experience.",
  inputPlaceholder = "Your name or position (e.g., Recruiter, Friend)",
  confirmButtonText = "Confirm",
  skipButtonText = "Skip for now",
}) => {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleConfirm = () => {
    onConfirm(inputValue);
  };

  const handleSkip = () => {
    onSkip();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="welcome-heading" // Existing label by reference
      aria-label={title} // Direct accessible name as an addition/fallback
      className={className ? `${className} fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md` : "fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md"}
    >
      <Card className="w-full max-w-md animated-welcome-card" aria-describedby="welcome-description">
        <CardHeader>
          <CardTitle id="welcome-heading" className="text-xl sm:text-2xl md:text-3xl font-bold text-center tracking-tight">
            {title}
          </CardTitle>
          <CardDescription id="welcome-description" className="text-sm text-center pt-1">{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <Input
            ref={inputRef}
            type="text"
            placeholder={inputPlaceholder}
            value={inputValue}
            onChange={handleInputChange}
            aria-label={inputPlaceholder} // Label for the input itself
            className="w-full text-sm md:text-base py-3"
          />
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row justify-end gap-3 pt-6">
          <Button variant="outline" onClick={handleSkip} className="interactive-scale">
            {skipButtonText}
          </Button>
          <Button onClick={handleConfirm} disabled={!inputValue.trim()} className="interactive-scale btn-gradient primary-glow">
            {confirmButtonText}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default WelcomeOverlay;
