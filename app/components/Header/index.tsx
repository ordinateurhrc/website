"use client";

import type { ReactNode } from "react";
import { useState, useContext } from "react";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";
import Image from "next/image";

// Internal dependencies
import { type NavLink } from "@/app/types";
import NavContext from "@/app/contexts/NavContext";
import MenuButton from "./MenuButton";
import RetroMenuButton from "./RetroMenuButton";
import NavBar from "./NavBar";
import RetroNavBar from "./RetroNavBar";
import NavLinks from "./NavLinks";

// Constants dependencies
import { TRANSITION } from "@/app/constants";

export default function Header({
  navLinks
}: {
  navLinks: NavLink[];
}): ReactNode {
  const [isNavBarOpen, setIsNavBarOpen] = useState(false);
  const { currentSection, updateCurrentSection } = useContext(NavContext);
  const isRetro = currentSection == "Team";

  return (
    <>
      <header className="fixed left-1/2 top-8 z-[999] w-full max-w-view -translate-x-1/2 px-4">
        <div className="relative z-0 mx-auto">
          <motion.div
            className={twMerge(
              `absolute left-0 top-0 -z-10 size-full origin-left`,
              isRetro ? "bg-retro-blue" : "rounded-lg bg-black-dark"
            )}
            initial={{ scaleX: 0.1, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={TRANSITION}
          ></motion.div>
          <motion.div
            className="flex size-full items-center justify-between px-6 py-4 desktop:px-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ...TRANSITION, delay: 0.5 }}
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
              {!isRetro ? (
                <MenuButton
                  isNavBarOpen={isNavBarOpen}
                  onClick={() => setIsNavBarOpen(true)}
                />
              ) : (
                <RetroMenuButton
                  isNavBarOpen={isNavBarOpen}
                  onClick={() => setIsNavBarOpen(prev => !prev)}
                />
              )}
            </div>
            {/* Only display on non-mobile devices */}
            <NavLinks
              links={navLinks}
              currentLink={currentSection}
              updateCurrentLink={updateCurrentSection}
            />
          </motion.div>
          {isRetro && (
            <RetroNavBar
              links={navLinks}
              currentLink={currentSection}
              isOpen={isNavBarOpen}
              closeMenu={() => setIsNavBarOpen(false)}
              updateCurrentLink={updateCurrentSection}
            />
          )}
        </div>
      </header>
      {/* Only display on mobile devices */}
      {!isRetro && (
        <NavBar
          links={navLinks}
          currentLink={currentSection}
          isOpen={isNavBarOpen}
          closeMenu={() => setIsNavBarOpen(false)}
          updateCurrentLink={updateCurrentSection}
        />
      )}
    </>
  );
}
