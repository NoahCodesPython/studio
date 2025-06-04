
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
      className={className ? `${className} fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm` : "fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"}
    >
      <Card className="w-full max-w-md animated-welcome-card" aria-labelledby="welcome-heading">
        <CardHeader>
          <CardTitle id="welcome-heading">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <Input
            ref={inputRef}
            type="text"
            placeholder={inputPlaceholder}
            value={inputValue}
            onChange={handleInputChange}
            aria-label={inputPlaceholder}
            className="w-full"
          />
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row justify-end gap-2 pt-6">
          <Button variant="ghost" onClick={handleSkip}>
            {skipButtonText}
          </Button>
          <Button onClick={handleConfirm} disabled={!inputValue.trim()}>
            {confirmButtonText}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default WelcomeOverlay;
