import { type ReactNode } from "react";
import { twMerge } from "tailwind-merge";

// Internal dependencies
import { type MenuButtonProps } from "@/app/types";

export default function MenuButton({
  isNavBarOpen,
  onClick,
  className
}: MenuButtonProps): ReactNode {
  return (
    <button
      className={twMerge(
        "flex",
        isNavBarOpen && "opacity-0", // Hide the button when the menu is open
        isNavBarOpen && "gap-0", // Remove the gap between bars when the menu is open in order to make the cross
        className
      )}
      onClick={onClick}
    >
      <div className="relative inline-block size-full">
        <div
          className={twMerge(
            "flex size-full flex-col items-center justify-center gap-[4px]",
            isNavBarOpen && "opacity-0"
          )}
        >
          <div className="h-[3px] w-6 rounded-lg bg-white"></div>
          <div className="h-[3px] w-6 rounded-lg bg-white"></div>
          <div className="h-[3px] w-6 rounded-lg bg-white"></div>
        </div>
        <div
          className={twMerge(
            "absolute left-0 top-0 flex size-full flex-col items-center justify-center",
            !isNavBarOpen && "opacity-0"
          )}
        >
          <div className="h-[3px] w-6 translate-y-1/2 rotate-45 rounded-lg bg-white"></div>
          <div className="h-[3px] w-6 -translate-y-1/2 -rotate-45 rounded-lg bg-white"></div>
        </div>
      </div>
    </button>
  );
}
