"use client";

import { type ReactNode, type FC, useState } from "react";

// Internal dependencies
import type { SectionProps } from "@/app/types";
import NavContext from "@/app/NavContext";
import Header from "@/app/components/Header";
import IntroSection from "@/app/sections/IntroSection";
import AboutSection from "@/app/sections/AboutSection";

interface SectionRoute {
  name: string;
  href: string;
  component: FC<SectionProps>;
}

const sectionRoutes = [
  { name: "Home", href: "#home", component: IntroSection },
  { name: "About", href: "#about", component: AboutSection }
] as SectionRoute[];

const navLinks = sectionRoutes.map(({ name, href }) => ({ name, href }));

export default function Home(): ReactNode {
  const [currentSection, setCurrentSection] = useState("#home");

  return (
    <NavContext.Provider
      value={{
        currentSection,
        updateCurrentSection: (newSection: string) =>
          setCurrentSection(newSection)
      }}
    >
      <>
        <Header navLinks={navLinks} />
        {sectionRoutes.map(({ href, component: Section }) => (
          <Section key={Section.name} containerID={href.substring(1)} />
        ))}
      </>
    </NavContext.Provider>
  );
}
