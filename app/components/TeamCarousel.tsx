import {
  type ReactNode,
  useState,
  useEffect,
  useCallback,
  useMemo
} from "react";
import { Button } from "@react95/core";
import Image from "next/image";

// Internal dependencies
import { type Content } from "@/app/types";
import Window from "@/app/components/Window";

export default function TeamCarousel({
  content
}: {
  content: Content;
}): ReactNode {
  const totalMembers = content.sections.team.length;
  const [currentMemberIndex, setCurrentMemberIndex] = useState(0);

  const prev = useCallback(
    () =>
      setCurrentMemberIndex(curr => {
        const nextIndex = curr - 1;
        return nextIndex < 0 ? totalMembers - 1 : nextIndex;
      }),
    [totalMembers]
  );
  const next = useCallback(
    () =>
      setCurrentMemberIndex(curr => {
        const nextIndex = curr + 1;
        return nextIndex >= totalMembers ? 0 : nextIndex;
      }),
    [totalMembers]
  );

  useEffect(() => {
    // const interval = setInterval(() => {
    //   next();
    // }, 1000);
    // return () => clearInterval(interval);
  }, [next]);

  const currentMember = useMemo(
    () => content.sections.team[currentMemberIndex],
    [currentMemberIndex, content.sections.team]
  );

  return (
    <div className="flex size-full flex-col items-center justify-center gap-4">
      <Window title="Paint" outerClassName="w-[80%] desktop:w-1/2">
        <div className="flex items-center justify-center p-4">
          <Image
            src={`content/${currentMember.image}`}
            alt={currentMember.name}
            width={100}
            height={100}
          />
        </div>
      </Window>
      <Window title="Notepad" outerClassName="-mt-4 w-full desktop:w-[60%]">
        <div className="p-6">
          <p>{currentMember.description}</p>
          <ul
            style={{ listStyleType: "'- '" }}
            className="mt-4 list-inside text-black-dark"
          >
            {currentMember.points.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col items-center">
            <h2 className="text-md text-black-medium">{currentMember.name}</h2>
            <h3 className="text-black-light">{currentMember.role}</h3>
          </div>
        </div>
      </Window>
      <div>
        <Button onClick={() => prev()}>Prev</Button>
        <span className="mx-2 text-black-light">
          &lt; {currentMemberIndex + 1}/{totalMembers} &gt;
        </span>
        <Button onClick={() => next()}>Next</Button>
      </div>
    </div>
  );
}
