import { ReactNode } from "react";
import { List } from "@react95/core";
import { FolderExe2, HelpBook, LoaderBat, FileFind } from "@react95/icons";
import { twMerge } from "tailwind-merge";
import Link from "next/link";

// Internal dependencies
import { type NavBarProps } from "@/app/types";

export default function RetroNavBar({
  links,
  currentLink,
  isOpen,
  closeMenu,
  updateCurrentLink
}: NavBarProps): ReactNode {
  const icons = [
    <FileFind key="msdos" variant="32x32_4" />,
    <FolderExe2 key="folderexe" variant="32x32_4" />,
    <LoaderBat key="loaderbat" variant="32x32_4" />,
    <HelpBook key="helpbook" variant="32x32_4" />
  ];

  return (
    <List
      className={twMerge(
        "desktop:hidden", // Only display on mobile devices
        "pointer-events-none absolute right-0 top-full z-[10000] w-full p-8 opacity-0 backdrop-blur-md",
        isOpen && "pointer-events-auto opacity-100"
      )}
      width={"200px"}
    >
      {links.map(({ name, href }, index) => (
        <List.Item
          key={index}
          icon={icons[index % icons.length]}
          onClick={() => {
            updateCurrentLink(name);
            closeMenu();
          }}
          className={twMerge(
            name == currentLink && "bg-retro-blue !text-white"
          )}
        >
          <Link href={href}>{name}</Link>
        </List.Item>
      ))}
    </List>
  );
}
