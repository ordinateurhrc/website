"use client";

import { type ReactNode } from "react";
import { useState } from "react";
import "@react95/core/themes/win95.css";

// Internal dependencies
import type { Content, SectionRoute } from "@/app/types";
import NavContext from "@/app/contexts/NavContext";
import Header from "@/app/components/Header";
import OtherPages from "@/app/components/OtherPages";
import Footer from "@/app/components/Footer";

interface SectionsProps {
  sectionRoutes: SectionRoute[];
  content: Content;
}

export default function Sections({
  sectionRoutes,
  content
}: SectionsProps): ReactNode {
  const [currentSection, setCurrentSection] = useState("#home");

  const navLinks = sectionRoutes.map(({ name, href }) => ({ name, href }));

  return (
    <NavContext.Provider
      value={{
        currentSection,
        updateCurrentSection: (newSection: string) =>
          setCurrentSection(newSection)
      }}
    >
      <Header navLinks={navLinks} />
      {sectionRoutes.map(({ href, component: Section }) => (
        <Section
          key={Section.name}
          containerID={href.substring(1)}
          content={content}
        />
      ))}
      <OtherPages />
      <Footer content={content} />
    </NavContext.Provider>
  );
}
