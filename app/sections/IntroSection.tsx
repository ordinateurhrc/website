"use client";

import type { ReactNode } from "react";

// Internal dependencies
import { type SectionProps } from "@/app/types";
import Terminal from "@/app/components/Terminal";

export default function IntroSection({ containerID }: SectionProps): ReactNode {
  return (
    <div
      id={containerID}
      className="content mx-auto flex h-screen w-full max-w-view items-center justify-center bg-gradient-to-b from-black-light to-gpt-medium p-4 text-white"
    >
      <Terminal />
    </div>
  );
}
