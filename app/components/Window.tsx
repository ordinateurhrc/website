import { type ReactNode, type CSSProperties } from "react";
import { TitleBar, Frame } from "@react95/core";
import { Computer, Help, Close } from "@react95/icons";

interface WindowProps {
  title: string;
  children: ReactNode;
  outerClassName?: string;
  innerClassName?: string;
  outerStyle?: CSSProperties;
  onClose?: () => void;
}

export default function Window({
  title,
  children,
  outerClassName,
  innerClassName,
  outerStyle,
  onClose
}: WindowProps): ReactNode {
  return (
    <Frame
      boxShadow="$out"
      bgColor="$material"
      padding="$4"
      className={outerClassName}
      style={outerStyle}
    >
      <TitleBar icon={<Computer />} title={title}>
        <TitleBar.OptionsBox>
          <TitleBar.Option>
            <Help />
          </TitleBar.Option>
          <TitleBar.Option>
            <Close onClick={onClose ? () => onClose() : undefined} />
          </TitleBar.Option>
        </TitleBar.OptionsBox>
      </TitleBar>
      <Frame
        bgColor="white"
        boxShadow="$in"
        padding="$2"
        className={innerClassName}
      >
        <Frame
          height="100%"
          width="100%"
          padding="$2"
          className={"overflow-auto text-black-dark"}
        >
          {children}
        </Frame>
      </Frame>
    </Frame>
  );
}
