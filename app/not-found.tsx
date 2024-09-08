import { type ReactNode } from "react";
import Image from "next/image";

// Internal dependencies
import { getContent } from "@/utils/getContent";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import type { NavLink } from "@/app/types";

export default async function _404(): Promise<ReactNode> {
  const content = await getContent();

  const navLinks: NavLink[] = [
    { name: "Home", href: "/" },
    { name: "Events", href: "/events" },
    { name: "Dept", href: "/department" }
  ];

  return (
    <div className="size-full bg-black-medium">
      <Header navLinks={navLinks} />
      <div className="mx-auto flex min-h-screen max-w-view flex-col items-center justify-center gap-2 bg-gpt-darker p-8 text-white">
        <h1 className="font-mono text-lg text-red">404</h1>
        <h2 className="font-mono text-heading text-gray-400">Page Not Found</h2>
        <Image
          src="/404.gif"
          alt="John Travolta confused"
          width={400}
          height={400}
          className="rounded-lg"
        />
      </div>
      {content && <Footer content={content} />}
    </div>
  );
}
