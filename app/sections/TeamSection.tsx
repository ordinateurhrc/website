"use client";

import { type ReactNode, useRef, useState, useEffect } from "react";
import { useInView } from "framer-motion";

// Internal dependencies
import { type SectionProps } from "@/app/types";
import useUpdateSelectionInView from "@/utils/useUpdateSelectionInView";
import GlitchScreen from "@/app/components/GlitchScreen";

export default function TeamSection({ containerID }: SectionProps): ReactNode {
  const [showGlitch, setShowGlitch] = useState(false);
  const shownGlitch = useRef(false);

  const sectionRef = useRef(null);
  useUpdateSelectionInView(sectionRef, "Team");

  const inView = useInView(sectionRef, { amount: 0.5 });
  useEffect(() => {
    if (!showGlitch && inView && !shownGlitch.current) {
      setShowGlitch(true);
      document.getElementById("team")?.scrollIntoView();
      setTimeout(() => setShowGlitch(false), 5000);
      shownGlitch.current = true;
    }
  }, [inView, showGlitch]);

  return (
    <div
      ref={sectionRef}
      id={containerID}
      className="mx-auto flex h-screen w-full max-w-view items-center justify-center bg-retro-light p-4 text-white"
    >
      {showGlitch && <GlitchScreen />}
    </div>
  );
}
