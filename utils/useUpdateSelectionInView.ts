import { useEffect, useContext } from "react";
import { useInView } from "framer-motion";
import NavContext from "@/app/contexts/NavContext";

const useUpdateSelectionInView = (
  ref: React.RefObject<HTMLElement>,
  sectionName: string,
  once?: boolean
) => {
  const { updateCurrentSection } = useContext(NavContext);

  const inView = useInView(ref, { amount: 0.75, once: once });

  useEffect(() => {
    if (inView) {
      updateCurrentSection(sectionName);
    }
  }, [inView, updateCurrentSection, sectionName]);

  return inView;
};

export default useUpdateSelectionInView;
