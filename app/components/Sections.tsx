"use client";

import { type ReactNode } from "react";
import { useState } from "react";

// Internal dependencies
import type { Content, SectionRoute } from "@/app/types";
import NavContext from "@/app/contexts/NavContext";

interface SectionsProps {
  sectionRoutes: SectionRoute[];
  content: Content;
}

export default function Sections({
  sectionRoutes,
  content
}: SectionsProps): ReactNode {
  const [currentSection, setCurrentSection] = useState("#home");

  return (
    <NavContext.Provider
      value={{
        currentSection,
        updateCurrentSection: (newSection: string) =>
          setCurrentSection(newSection)
      }}
    >
      {sectionRoutes.map(({ href, component: Section }) => (
        <Section
          key={Section.name}
          containerID={href.substring(1)}
          content={content}
        />
      ))}
    </NavContext.Provider>
  );
}
