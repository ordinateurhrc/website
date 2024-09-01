import { type ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import Link from "next/link";

// Internal dependencies
import { type NavLink } from "@/app/types";

interface NavLinksProps {
  links: NavLink[];
  currentLink: string;
  updateCurrentLink: (_link: string) => void;
}

/**
 * Navigation links component (that are displayed only on desktops). On mobile devices, the links are displayed using a collapsible navbar.
 */
export default function NavLinks({
  links,
  currentLink,
  updateCurrentLink
}: NavLinksProps): ReactNode {
  return (
    <div
      className={twMerge(
        "hidden desktop:flex", // Only display on non-mobile devices
        "gap-8 font-mono text-md text-white"
      )}
    >
      {links.map(({ name, href }, index) => (
        <Link
          key={index}
          href={href}
          onClick={() => updateCurrentLink(name)}
          className={twMerge(name == currentLink && "text-red")}
        >
          {name}
        </Link>
      ))}
    </div>
  );
}
