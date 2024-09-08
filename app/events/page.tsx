import { type ReactNode } from "react";
import { notFound } from "next/navigation";

// Internal dependencies
import { getContent } from "@/utils/getContent";
import Events from "@/app/events/Events";

export default async function EventsPage(): Promise<ReactNode> {
  const content = await getContent();

  if (content === null) {
    return notFound();
  }

  return <Events content={content} />;
}
