"use client";

import type { ReactNode } from "react";
import { useState, useContext } from "react";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// Internal dependencies
import NavContext from "@/app/contexts/NavContext";

const transition = {
  duration: 0.5,
  ease: "easeInOut"
};

interface Link {
  name: string;
  href: string;
}

export default function Header({ navLinks }: { navLinks: Link[] }): ReactNode {
  const [isNavBarOpen, setIsNavBarOpen] = useState(false);
  const { currentSection } = useContext(NavContext);

  return (
    <>
      <header className="fixed left-1/2 top-8 z-[999] min-h-[150px] w-full max-w-view -translate-x-1/2 px-4">
        <div className="relative z-0 mx-auto">
          <motion.div
            className="absolute left-0 top-0 -z-10 size-full origin-left rounded-lg bg-black-dark"
            initial={{ scaleX: 0.1, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={transition}
          ></motion.div>
          <motion.div
            className="flex size-full items-center justify-between px-6 py-4 desktop:px-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ...transition, delay: 0.5 }}
          >
            <Image
              src="/logo.png"
              alt="Ordinateur Logo"
              width={100}
              height={100}
              className="absolute h-full w-auto scale-150"
            />
            <div aria-hidden></div> {/* Empty dummy element */}
            {/* Only display on mobile devices */}
            <div className="desktop:hidden">
              <MenuButton
                isNavBarOpen={isNavBarOpen}
                onClick={() => setIsNavBarOpen(true)}
              />
            </div>
            {/* Only display on non-mobile devices */}
            <NavLinks links={navLinks} currentLink={currentSection} />
          </motion.div>
        </div>
      </header>
      {/* Only display on mobile devices */}
      <NavBar
        links={navLinks}
        currentLink={currentSection}
        isOpen={isNavBarOpen}
        closeMenu={() => setIsNavBarOpen(false)}
      />
    </>
  );
}

interface NavBarProps {
  links: Link[];
  currentLink: string;
  isOpen: boolean;
  closeMenu: () => void;
}

function NavBar({
  links,
  currentLink,
  isOpen,
  closeMenu
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
      transition={transition}
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
            onClick={() => closeMenu()}
            className={twMerge(
              "font-mono text-lg",
              href == currentLink && "text-red"
            )}
          >
            {name}
          </Link>
        ))}
      </div>
    </motion.nav>
  );
}

interface MenuButtonProps {
  isNavBarOpen: boolean;
  onClick: () => void;
  className?: string;
}

function MenuButton({
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

interface NavLinksProps {
  links: Link[];
  currentLink: string;
}

function NavLinks({ links, currentLink }: NavLinksProps): ReactNode {
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
          className={twMerge(href == currentLink && "text-red")}
        >
          {name}
        </Link>
      ))}
    </div>
  );
}
