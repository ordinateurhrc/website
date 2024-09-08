"use client";

import React, { ReactNode, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaCircle } from "react-icons/fa";
import Image from "next/image";

// Internal dependencies
import { type Content, type NavLink } from "@/app/types";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

interface TimelineEntry {
  name: string;
  description: string;
  date: string;
  images: string[];
}

export default function Events({ content }: { content: Content }): ReactNode {
  const navLinks: NavLink[] = [
    { name: "Home", href: "/" },
    { name: "Dept", href: "/department" }
  ];
  return (
    <>
      <Header navLinks={navLinks} />
      <div className="mx-auto mt-12 max-w-[640px] px-4 py-12">
        <div className="space-y-6">
          {content.sections.events.map((entry, index) => (
            <TimelineEntry key={index} entry={entry} />
          ))}
        </div>
      </div>
      <Footer content={content} />
    </>
  );
}

function ImageCarousel({ images }: { images: string[] }): ReactNode {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex(
      prevIndex => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className="md:h-64 lg:h-80 relative h-48 w-full">
      <Image
        height={100}
        width={150}
        src={images[currentIndex]}
        alt={`Image ${currentIndex + 1}`}
        className="h-full w-full rounded-lg object-cover"
      />
      <button
        onClick={prevImage}
        className="bg-black absolute left-2 top-1/2 -translate-y-1/2 transform rounded-full bg-opacity-50 p-2 text-white"
        aria-label="Previous image"
      >
        <FaChevronLeft />
      </button>
      <button
        onClick={nextImage}
        className="bg-black absolute right-2 top-1/2 -translate-y-1/2 transform rounded-full bg-opacity-50 p-2 text-white"
        aria-label="Next image"
      >
        <FaChevronRight />
      </button>
      <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 transform space-x-2">
        {images.map((_, index) => (
          <FaCircle
            key={index}
            className={`text-xs ${
              index === currentIndex ? "text-white" : "text-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function TimelineEntry({ entry }: { entry: TimelineEntry }): ReactNode {
  return (
    <div className="flex">
      <div className="mr-4 flex flex-col items-center">
        <div className="h-3 w-3 rounded-full bg-teal-600"></div>
        <div className="h-full w-0.5 bg-teal-600"></div>
      </div>
      <div className="w-full pb-8">
        <div className="mb-2 flex flex-col items-start justify-between desktop:flex-row desktop:items-center">
          <h3 className="text-heading font-bold text-gray-900">{entry.name}</h3>
          <time className="text-gray-500">{entry.date}</time>
        </div>
        <p className="mb-4 text-gray-700">{entry.description}</p>
        <ImageCarousel images={entry.images} />
      </div>
    </div>
  );
}
