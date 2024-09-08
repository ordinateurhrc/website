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
    team: [
      {
        name: string;
        role: string;
        image: string;
        description: string;
        points: string[];
      }
    ];
    magazine: {
      tagline: string;
      currentVolume: string;
      pastVolumes: [string];
    };
    events: [
      {
        name: string;
        date: string;
        description: string;
        images: [string];
      }
    ];
  };
  contact: {
    facebook: string;
    instagram: string;
    linkedin: string;
    mail: string;
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

/* Header types */
export interface NavLink {
  name: string;
  href: string;
}

export interface MenuButtonProps {
  isNavBarOpen: boolean;
  onClick: () => void;
  className?: string;
}

export interface NavBarProps {
  links: NavLink[];
  currentLink: string;
  isOpen: boolean;
  closeMenu: () => void;
  updateCurrentLink: (_link: string) => void;
}
