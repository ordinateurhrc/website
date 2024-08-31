import { type ReactNode } from "react";
import { notFound } from "next/navigation";

// Internal dependencies
import type { SectionRoute } from "@/app/types";
import Header from "@/app/components/Header";
import { getContent } from "@/utils/getContent";
import Sections from "@/app/components/Sections";
import IntroSection from "@/app/sections/IntroSection";
import AboutSection from "@/app/sections/AboutSection";
import TeamSection from "./sections/TeamSection";
import MagSection from "./sections/MagSection";

const sectionRoutes = [
  { name: "Home", href: "#home", component: IntroSection },
  { name: "About", href: "#about", component: AboutSection },
  { name: "Team", href: "#team", component: TeamSection },
  { name: "Mag", href: "#magazine", component: MagSection }
] as SectionRoute[];

const navLinks = sectionRoutes.map(({ name, href }) => ({ name, href }));

export default async function Home(): Promise<ReactNode> {
  const content = await getContent();

  if (content === null) {
    return notFound();
  }

  return (
    <>
      <Header navLinks={navLinks} />
      <Sections sectionRoutes={sectionRoutes} content={content} />
    </>
  );
}
