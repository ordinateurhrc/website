"use client";

import { type ReactNode, useState, useRef, useEffect, Fragment } from "react";
import { useInView } from "framer-motion";
import Link from "next/link";

// Internal dependencies
import { type SectionProps } from "@/app/types";
import useUpdateSelectionInView from "@/utils/useUpdateSelectionInView";
import MatrixBackground from "@/app/components/MatrixBackground";

export default function MagSection({
  containerID,
  content
}: SectionProps): ReactNode {
  const sectionRef = useRef(null);
  useUpdateSelectionInView(sectionRef, "Mag");

  const totalVolumes = content.sections.magazine.pastVolumes.length + 1;

  const magBackgroundRef = useRef<HTMLDivElement>(null);
  const [canvasDimensions, setCanvasDimensions] = useState({
    width: 0,
    height: 0
  });

  const assignCanvasDimensions = () => {
    if (!magBackgroundRef.current) return;

    const { width, height } = magBackgroundRef.current.getBoundingClientRect();
    setCanvasDimensions({ width, height });
  };

  useEffect(() => {
    assignCanvasDimensions();
    window.addEventListener("resize", assignCanvasDimensions);
    return () => window.removeEventListener("resize", assignCanvasDimensions);
  }, [magBackgroundRef]);

  const inView = useInView(sectionRef, { amount: 0.25 });

  return (
    <div
      ref={sectionRef}
      id={containerID}
      className="relative z-0 mx-auto flex h-screen w-full max-w-view items-center justify-center p-4 text-white"
    >
      <div
        ref={magBackgroundRef}
        className="-z-1 absolute left-0 top-0 size-full bg-black-medium"
      >
        {inView && (
          <MatrixBackground
            width={canvasDimensions.width}
            height={canvasDimensions.height}
          />
        )}
      </div>
      <div className="z-1 relative flex flex-col items-center justify-center gap-4">
        <h1 className="font-mono text-lg">Bitwise</h1>
        <p className="font-base max-w-[60ch] text-center">
          {content.sections.magazine.tagline}
        </p>
        <ButtonWithGradientBorder
          link={content.sections.magazine.currentVolume}
        >
          Volume {totalVolumes}
        </ButtonWithGradientBorder>
      </div>

      <div className="z-1 absolute bottom-4">
        {content.sections.magazine.pastVolumes.map((volume, index) => (
          <Fragment key={index}>
            <Link href={volume}>Vol {index + 1}</Link>
            {index < totalVolumes - 1 - 1 && <span> | </span>}
          </Fragment>
        ))}
      </div>
    </div>
  );
}

function ButtonWithGradientBorder({
  children,
  link
}: {
  children: ReactNode;
  link: string;
}): ReactNode {
  return (
    <Link href={link}>
      <div className="group relative z-0 box-content inline-block overflow-hidden rounded-lg p-[2px]">
        <div className="absolute left-0 top-0 -z-10 size-full rounded-lg bg-gradient-to-r from-red to-cyan transition-transform duration-300 group-hover:rotate-180"></div>
        <button className="rounded-lg bg-black-dark px-8 py-2 font-bold uppercase text-white">
          {children}
        </button>
      </div>
    </Link>
  );
}
