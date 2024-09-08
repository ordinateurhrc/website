"use client";

import { type ReactNode } from "react";
import {
  FaFacebook,
  FaEnvelope,
  FaInstagram,
  FaLinkedin,
  FaChevronUp
} from "react-icons/fa";
import Link from "next/link";

// Internal dependencies
import { type Content } from "@/app/types";

export default function Footer({ content }: { content: Content }): ReactNode {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative mt-auto bg-gray-800 py-8 text-center text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-between">
          <div className="mb-6 w-full">
            <div className="flex items-center justify-center gap-4">
              <Link
                href={content.contact.facebook}
                className="transition-colors duration-300 hover:text-gray-400"
              >
                <FaFacebook size={24} />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href={content.contact.instagram}
                className="transition-colors duration-300 hover:text-gray-400"
              >
                <FaInstagram size={24} />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href={content.contact.linkedin}
                className="transition-colors duration-300 hover:text-gray-400"
              >
                <FaLinkedin size={24} />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link
                href={`mailto:${content.contact.mail}`}
                className="transition-colors duration-300 hover:text-gray-400"
              >
                <FaEnvelope size={24} />
                <span className="sr-only">Mail</span>
              </Link>
            </div>
          </div>
          <div className="right w-full text-center">
            <p>
              &copy; {new Date().getFullYear()} {content.metadata.name}. All
              rights reserved.
            </p>
          </div>
        </div>
      </div>
      <button
        className="absolute bottom-4 right-4 size-8 rounded-full bg-gray-700 p-2 text-white hover:bg-gray-600 desktop:bottom-8 desktop:right-8"
        onClick={() => scrollToTop()}
        aria-label="Back to top"
      >
        <FaChevronUp />
      </button>
    </footer>
  );
}
