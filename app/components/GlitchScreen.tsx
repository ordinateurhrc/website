import { type ReactNode, useState, useEffect } from "react";
import { Icwdial101 } from "@react95/icons";
import { Button } from "@react95/core";
import { twMerge } from "tailwind-merge";

// Internal dependencies
import Window from "@/app/components/Window";

// Constants dependencies
import { GLITCH_SCREEN_TEXT, GLITCH_SCREEN_TITLE } from "@/app/constants";

export default function GlitchScreen({
  close,
  duration
}: {
  close: () => void;
  duration: number;
}): ReactNode {
  const numberOfWindows = 5;
  const [timeLeft, setTimeLeft] = useState(Math.floor(duration / 1000));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(time => (time - 1 >= 0 ? time - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  });

  return (
    <div className="fixed left-0 top-0 z-[20000] h-max-screen w-full bg-black-light p-16 text-white">
      {Array.from({ length: numberOfWindows }).map((_, index) => (
        <ErrorWindow
          key={`center-${index}`}
          close={close}
          offset={index - numberOfWindows / 2}
          timeLeft={timeLeft}
          visibleAfter={index * 100}
          position="center"
        />
      ))}
      {Array.from({ length: numberOfWindows }).map((_, index) => (
        <ErrorWindow
          key={`left-${index}`}
          close={close}
          offset={index - numberOfWindows / 2}
          timeLeft={timeLeft}
          visibleAfter={(numberOfWindows + index) * 100}
          position="top-left"
          desktopOnly
        />
      ))}
      {Array.from({ length: numberOfWindows }).map((_, index) => (
        <ErrorWindow
          key={`right-${index}`}
          close={close}
          offset={index - numberOfWindows / 2}
          timeLeft={timeLeft}
          visibleAfter={(2 * numberOfWindows + index) * 100}
          position="bottom-right"
          desktopOnly
        />
      ))}
    </div>
  );
}

function ErrorWindow({
  close,
  className,
  offset,
  timeLeft,
  visibleAfter,
  position,
  desktopOnly = false
}: {
  close: () => void;
  className?: string;
  offset: number;
  timeLeft: number;
  visibleAfter: number;
  position: "center" | "top-left" | "bottom-right";
  desktopOnly?: boolean;
}): ReactNode {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, visibleAfter);

    return () => clearTimeout(timeout);
  }, [isVisible, visibleAfter]);

  const variants = {
    center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
    "top-left": "top-4 left-4",
    "bottom-right": "bottom-4 right-4"
  };

  return (
    isVisible && (
      <div
        className={twMerge(
          desktopOnly && "hidden desktop:block",
          "absolute w-3/4 desktop:w-[40%]",
          variants[position],
          className
        )}
      >
        <Window
          title="Error"
          outerStyle={{ translate: `${offset}rem ${offset}rem` }}
          outerClassName="w-full"
          innerClassName="size-full"
        >
          <div className="flex flex-col items-center justify-center gap-2 overflow-auto p-4 text-center">
            <div>
              <Icwdial101 className="h-16 w-16" variant="32x32_4" />
            </div>
            <div>
              <p className="text-md font-bold">{GLITCH_SCREEN_TITLE}</p>
              <p className="text-base">{GLITCH_SCREEN_TEXT}</p>
              <p className="text-[0.8rem] text-black-light">
                Closing this message in {timeLeft}s
              </p>
            </div>
            <div>
              <Button onClick={() => close()}>Okay</Button>
            </div>
          </div>
        </Window>
      </div>
    )
  );
}
