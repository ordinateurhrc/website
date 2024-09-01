import { type ReactNode } from "react";
import { Frame } from "@react95/core";
import { Explorer100 } from "@react95/icons";

export default function GlitchScreen(): ReactNode {
  return (
    <div className="fixed left-0 top-0 z-[20000] flex h-max-screen w-full items-center justify-center bg-black-light p-8 text-white">
      <Frame className="flex h-[80%] w-full flex-col items-center gap-4">
        <div>
          <Explorer100 />
        </div>
        <div>Your potato PC is too slow to handle this page.</div>
      </Frame>
    </div>
  );
}
