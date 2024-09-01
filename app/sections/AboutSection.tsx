"use client";

import { ReactNode, useRef } from "react";
import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";

// Internal dependencies
import { type SectionProps } from "@/app/types";
import useUpdateSelectionInView from "@/utils/useUpdateSelectionInView";

export default function AboutSection({
  containerID,
  content
}: SectionProps): ReactNode {
  const sectionRef = useRef(null);
  useUpdateSelectionInView(sectionRef, "About");

  return (
    <div
      ref={sectionRef}
      id={containerID}
      className="relative z-0 mx-auto h-screen w-full max-w-view bg-gpt-darker text-white"
    >
      {/* Spacer */}
      <div className="h-[15%] bg-gpt-medium"></div>
      {/* Content */}
      <div className="h-[70%] overflow-auto bg-gpt-darker">
        <Prompt prompt={content.sections.about.prompt} />
        <Answer answer={content.sections.about.answer} />
        {/* Dummy element to represent the bottom */}
        <div className="h-4"></div>
      </div>
      {/* Textbox */}
      <Textbox />
    </div>
  );
}

function Prompt({ prompt }: { prompt: string }): ReactNode {
  return (
    <div className="flex gap-2 bg-gpt-darker p-4 py-8">
      <div className="flex w-[20%] grow-[2] basis-0 justify-center">
        <FaUserCircle size={30} />
      </div>
      <div className="grow-[10] basis-0">
        <p>{prompt}</p>
      </div>
    </div>
  );
}

function Answer({ answer }: { answer: string }): ReactNode {
  return (
    <div className="flex gap-2 bg-gpt-medium p-4 py-8">
      <div className="flex grow-[2] basis-0 items-baseline justify-center pt-2">
        <Image
          src="/logo.png"
          alt="Ordinateur Logo"
          width={30}
          height={30}
          className="h-auto"
        />
      </div>
      <div className="grow-[10] basis-0">
        <TypeAnimation
          sequence={[2000, answer]}
          preRenderFirstString={false}
          speed={20}
          wrapper="p"
        />
      </div>
    </div>
  );
}

function Textbox(): ReactNode {
  return (
    <div className="absolute bottom-8 left-0 z-10 flex w-full flex-col items-center justify-center gap-2">
      <input
        type="text"
        className="inline-block w-[90%] rounded-[4px] border-none bg-gpt-dark p-2 px-4 text-white shadow-sm"
        placeholder="Type in your message..."
      />
      <p className="text-center text-[0.8rem]">Powered by CatGPT ;-P</p>
    </div>
  );
}
