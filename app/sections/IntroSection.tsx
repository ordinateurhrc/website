"use client";

import { type ReactNode, useRef } from "react";

// Internal dependencies
import { type SectionProps } from "@/app/types";
import Terminal from "@/app/components/Terminal";
import useUpdateSelectionInView from "@/utils/useUpdateSelectionInView";

export default function IntroSection({ containerID }: SectionProps): ReactNode {
  const sectionRef = useRef(null);
  useUpdateSelectionInView(sectionRef, "Home");

  return (
    <div
      ref={sectionRef}
      id={containerID}
      className="mx-auto flex h-screen w-full max-w-view items-center justify-center bg-gradient-to-b from-black-light to-gpt-medium p-4 text-white"
    >
      <Terminal />
    </div>
  );
}
