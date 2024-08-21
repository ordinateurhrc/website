"use client";

import type { ReactNode } from "react";

// Internal dependencies
import { type SectionProps } from "@/app/types";

export default function AboutSection({ containerID }: SectionProps): ReactNode {
  return (
    <div
      id={containerID}
      className="content mx-auto flex h-screen w-full max-w-view items-center justify-center bg-black-dark p-4 text-white"
    >
      This is supposed to be the About section.
    </div>
  );
}
