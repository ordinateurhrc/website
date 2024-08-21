import { createContext } from "react";

// TODO: Change these values to meaningful defaults
export default createContext({
  currentSection: "",
  updateCurrentSection: (section: string) => {
    console.log(section);
  }
});
