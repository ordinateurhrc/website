"use client";

import { type ReactNode, useRef, useState, useEffect } from "react";
import { useInView } from "framer-motion";

// Internal dependencies
import { type SectionProps } from "@/app/types";
import useUpdateSelectionInView from "@/utils/useUpdateSelectionInView";
import GlitchScreen from "@/app/components/GlitchScreen";
import TeamCarousel from "@/app/components/TeamCarousel";

// Constants dependencies
import { GLITCH_SCREEN_DURATION } from "@/app/constants";

export default function TeamSection({
  containerID,
  content
}: SectionProps): ReactNode {
  const [showGlitch, setShowGlitch] = useState(false);
  const shownGlitch = useRef(false);

  const sectionRef = useRef(null);
  useUpdateSelectionInView(sectionRef, "Team");

  const handleGlitchClose = () => {
    setShowGlitch(false);
    if (sectionRef.current)
      (sectionRef.current as HTMLElement).scrollIntoView({
        behavior: "instant"
      });
  };

  const inView = useInView(sectionRef, { amount: 0.25 });
  useEffect(() => {
    if (!showGlitch && inView && !shownGlitch.current) {
      setShowGlitch(true);
      setTimeout(() => handleGlitchClose(), GLITCH_SCREEN_DURATION);
      shownGlitch.current = true;
    }
  }, [inView, showGlitch]);

  return (
    <div
      ref={sectionRef}
      id={containerID}
      className="mx-auto flex h-screen w-full max-w-view items-center justify-center bg-retro-light p-4 text-white"
    >
      {showGlitch && (
        <GlitchScreen
          duration={GLITCH_SCREEN_DURATION}
          close={() => handleGlitchClose()}
        />
      )}
      <TeamCarousel content={content} />
    </div>
  );
}
