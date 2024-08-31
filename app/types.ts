import { type FC } from "react";

// Typescript interface representing the contents of the metadata JSON file
export interface Content {
  metadata: {
    name: string;
    description: string;
  };
  sections: {
    about: {
      prompt: string;
      answer: string;
    };
  };
}

/* Section types */
export interface SectionProps {
  containerID: string;
  content: Content;
}

export interface SectionRoute {
  name: string;
  href: string;
  component: FC<SectionProps>;
}
