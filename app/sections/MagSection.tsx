"use client";

import { type ReactNode, useRef } from "react";

// Internal dependencies
import { type SectionProps } from "@/app/types";
import useUpdateSelectionInView from "@/utils/useUpdateSelectionInView";

export default function MagSection({ containerID }: SectionProps): ReactNode {
  const sectionRef = useRef(null);
  useUpdateSelectionInView(sectionRef, "Mag");

  return (
    <div
      ref={sectionRef}
      id={containerID}
      className="mx-auto flex h-screen w-full max-w-view items-center justify-center bg-black-dark p-4 text-white"
    >
      This is supposed to be the Magazine section.
    </div>
  );
}
