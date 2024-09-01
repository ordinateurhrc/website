import { type ReactNode } from "react";
import { Button } from "@react95/core";

// Internal dependencies
import { type MenuButtonProps } from "@/app/types";

export default function RetroMenuButton({
  isNavBarOpen,
  onClick,
  className
}: MenuButtonProps): ReactNode {
  return (
    <Button className={className} onClick={onClick}>
      {isNavBarOpen ? "Close" : "Menu"}
    </Button>
  );
}
