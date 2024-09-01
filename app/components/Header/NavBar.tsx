import { type ReactNode } from "react";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import Link from "next/link";

// Internal dependencies
import { type NavBarProps } from "@/app/types";
import MenuButton from "./MenuButton";

// Constant dependencies
import { TRANSITION } from "@/app/constants";

export default function NavBar({
  links,
  currentLink,
  isOpen,
  closeMenu,
  updateCurrentLink
}: NavBarProps): ReactNode {
  return (
    <motion.nav
      className={twMerge(
        "desktop:hidden", // Only display on mobile devices
        "pointer-events-none fixed left-0 top-0 z-[10000] h-[100svh] w-full p-8 opacity-0 backdrop-blur-md",
        isOpen && "pointer-events-auto opacity-100"
      )}
      variants={{
        closed: { opacity: 0 },
        open: { opacity: 0.95 }
      }}
      initial="closed"
      animate={isOpen ? "open" : "closed"}
      transition={TRANSITION}
    >
      <div className="relative z-0 flex size-full flex-col justify-center overflow-hidden rounded-lg bg-black-medium p-16 text-white">
        {/* Border for the menu */}
        <motion.div
          className="absolute left-0 top-0 -z-20 size-full rounded-lg bg-gradient-to-b from-red to-cyan"
          variants={{
            closed: {
              opacity: 0,
              rotate: 45,
              transition: { duration: 0 }
            },
            open: {
              opacity: 1,
              rotate: 60,
              transition: { ease: "linear", duration: 0.5, delay: 0.5 }
            }
          }}
          initial="closed"
          animate={isOpen ? "open" : "closed"}
        />

        {/* Background for the menu */}
        <motion.div className="absolute left-0 top-0 -z-10 size-full p-[4px]">
          <div className="size-full rounded-lg border-[1px] border-black-light bg-black-dark"></div>
        </motion.div>

        <MenuButton
          isNavBarOpen={isOpen}
          onClick={() => closeMenu()}
          className="opacity-1 absolute right-0 top-0 m-8"
        />
        {links.map(({ name, href }, index) => (
          <Link
            key={index}
            href={href}
            onClick={() => {
              updateCurrentLink(name);
              closeMenu();
            }}
            className={twMerge(
              "font-mono text-lg",
              name == currentLink && "text-red"
            )}
          >
            {name}
          </Link>
        ))}
      </div>
    </motion.nav>
  );
}
