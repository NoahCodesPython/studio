"use client";

import React, { useRef, useEffect, useState } from 'react';
import {
  IoLogoJavascript,
  IoLogoPython,
  IoLogoReact,
  IoLogoNodejs,
  IoLogoHtml5,
  IoLogoCss3,
} from 'react-icons/io5';
import { FaJava, FaGitAlt } from 'react-icons/fa';
import { TbBrandNextjs, TbBrandTailwind, TbDatabase } from 'react-icons/tb';
import { BsDiscord } from 'react-icons/bs';
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const skills = [
  { name: "JavaScript", icon: <IoLogoJavascript className="h-10 w-10" /> },
  { name: "Python", icon: <IoLogoPython className="h-10 w-10" /> },
  { name: "Java", icon: <FaJava className="h-10 w-10" /> },
  { name: "React", icon: <IoLogoReact className="h-10 w-10" /> },
  { name: "Next.js", icon: <TbBrandNextjs className="h-10 w-10" /> },
  { name: "Node.js", icon: <IoLogoNodejs className="h-10 w-10" /> },
  { name: "Tailwind CSS", icon: <TbBrandTailwind className="h-10 w-10" /> },
  { name: "MySQL", icon: <TbDatabase className="h-10 w-10" /> },
  { name: "HTML5", icon: <IoLogoHtml5 className="h-10 w-10" /> },
  { name: "CSS3", icon: <IoLogoCss3 className="h-10 w-10" /> },
  { name: "Discord", icon: <BsDiscord className="h-10 w-10" /> },
  { name: "Git", icon: <FaGitAlt className="h-10 w-10" /> },
];

export default function SkillsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );

    const current = sectionRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className={cn("container mx-auto px-4 animate-on-scroll", isVisible && "is-visible")}
    >
      <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-20 tracking-tight">
        My Tech Stack
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 max-w-5xl mx-auto">
        {skills.map((skill) => (
          <Card
            key={skill.name}
            className="group flex flex-col items-center justify-center p-6 text-center shadow-lg transition-all duration-300 ease-in-out hover:shadow-primary/20 hover:shadow-2xl hover:-translate-y-2 border-transparent hover:border-primary/30 bg-card/50"
          >
            <div className="text-primary transition-colors duration-300 group-hover:text-accent">
              {skill.icon}
            </div>
            <p className="mt-4 font-semibold text-foreground">{skill.name}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}