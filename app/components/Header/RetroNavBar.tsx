import { ReactNode } from "react";
import { List } from "@react95/core";
import {
  FolderExe,
  FolderExe2,
  FolderFile,
  Settings,
  FolderSettings,
  FolderPrint,
  FileFind,
  HelpBook,
  LoaderBat,
  Computer3,
  MicrosoftExchange,
  MsDos,
  MicrosoftNetwork,
  WindowsExplorer
} from "@react95/icons";
import { twMerge } from "tailwind-merge";

// Internal dependencies
import { type NavBarProps } from "@/app/types";

export default function RetroNavBar(_props: NavBarProps): ReactNode {
  return (
    <List
      className={twMerge(
        "desktop:hidden", // Only display on mobile devices
        "absolute right-0 top-full z-[10000] w-full p-8 opacity-100 backdrop-blur-md"
      )}
      width={"200px"}
    >
      <List.Item icon={<FolderExe2 variant="32x32_4" />}>
        <List width={"200px"}>
          <List.Item icon={<FolderExe variant="16x16_4" />}>
            Accessories
          </List.Item>
          <List.Item icon={<FolderExe variant="16x16_4" />}>StartUp</List.Item>
          <List.Item icon={<MicrosoftExchange variant="16x16_4" />}>
            Microsoft Exchange
          </List.Item>
          <List.Item icon={<MsDos variant="16x16_32" />}>
            MS-DOS Prompt
          </List.Item>
          <List.Item icon={<MicrosoftNetwork variant="16x16_4" />}>
            The Microsoft Network
          </List.Item>
          <List.Item icon={<WindowsExplorer variant="16x16_4" />}>
            Windows Explorer
          </List.Item>
        </List>
        Programs
      </List.Item>
      <List.Item icon={<FolderFile variant="32x32_4" />}>Documents</List.Item>
      <List.Item icon={<Settings variant="32x32_4" />}>
        <List width={"200px"}>
          <List.Item icon={<FolderSettings variant="16x16_4" />}>
            Control Panel
          </List.Item>
          <List.Item icon={<FolderPrint variant="16x16_4" />}>
            Printers
          </List.Item>
        </List>
        Settings
      </List.Item>
      <List.Item icon={<FileFind variant="32x32_4" />}>Find</List.Item>
      <List.Item icon={<HelpBook variant="32x32_4" />}>Help</List.Item>
      <List.Item icon={<LoaderBat variant="32x32_4" />}>Run...</List.Item>
      <List.Divider />
      <List.Item icon={<Computer3 variant="32x32_4" />}>Shut Down...</List.Item>
    </List>
  );
}
