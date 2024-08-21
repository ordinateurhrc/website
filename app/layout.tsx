import type { Metadata } from "next";

// Fonts
import { Roboto, Roboto_Mono } from "next/font/google";

// Internal dependencies
import { getContent } from "@/utils/getContent";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const { metadata } = await getContent();

  return {
    title: `${metadata.name} | ${metadata.description}`,
    description: metadata.description
  };
}

const roboto = Roboto({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
  fallback: ["sans-serif"]
});

const roboto_mono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto-mono",
  fallback: ["monospace"]
});

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} ${roboto_mono.variable}`}>
        {children}
      </body>
    </html>
  );
}
