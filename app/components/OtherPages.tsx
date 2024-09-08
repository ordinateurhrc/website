import { type ReactNode } from "react";
import Link from "next/link";

export default function OtherPages(): ReactNode {
  return (
    <div className="mx-auto flex h-12 max-w-view items-center bg-black-medium text-white">
      <div className="group relative flex h-full w-full items-center justify-end bg-black-medium">
        <div className="absolute left-0 top-0 z-10 h-full w-8 origin-left bg-red transition-transform group-hover:scale-x-[2]"></div>
        <div className="relative z-20 px-8 py-2 font-mono text-base desktop:text-[1.5rem]">
          <Link href="/events">Events</Link>
        </div>
      </div>
      <span className="inline-block h-[80%] w-[2px] border border-white"></span>
      <div className="group relative flex h-full w-full items-center justify-start bg-black-medium">
        <div className="absolute right-0 top-0 z-10 h-full w-8 origin-right bg-cyan transition-transform group-hover:scale-x-[2]"></div>
        <div className="relative z-20 px-4 py-2 font-mono text-base desktop:text-[1.5rem]">
          <Link href="/department">Department</Link>
        </div>
      </div>
    </div>
  );
}
