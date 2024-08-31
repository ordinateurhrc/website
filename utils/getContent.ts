/*
    Look for /content/content.json to get the metadata JSON file
    Fallback to /content.example/content.json

    Populate /content by downloading the content folder from Dropbox
    Copy all files from /content to /public/content
*/

import { readFile, access } from "fs/promises";
import { normalize, join, dirname } from "path";
import { fileURLToPath } from "url";

// Internal dependencies
import { logError, logInfo, logSuccess } from "./log";
import { downloadContent } from "./downloadContent";
import { type Content } from "@/app/types";
import { copyContentToPublic } from "./copyContentToPublic";
import {
  CopyContentError,
  DownloadError,
  DropboxAuthError,
  DropboxFolderPathError,
  FileDownloadError,
  FolderDownloadError
} from "./errors";

const currentDir = dirname(fileURLToPath(import.meta.url)); // Get the directory of this file on disk
const contentDir = normalize(join(currentDir, "..", "content"));
const contentExampleDir = normalize(join(currentDir, "..", "content.example"));

/**
 * Get the metadata JSON file for the content, as a JS object
 * @returns {Promise<Content>} - The metadata JSON file as a JS object
 */
export async function getContent(): Promise<Content | null> {
  const contentFilePath = normalize(join(contentDir, "content.json"));
  const contentExampleFilePath = normalize(
    join(contentExampleDir, "content.json")
  );

  let isUsingExample = true;
  if (process.env.NODE_ENV === "production") {
    try {
      await downloadContent();
      isUsingExample = false;
    } catch (error) {
      if (error instanceof DropboxAuthError)
        logError(
          "Could not authenticate with Dropbox. Make sure you have all the environment variables set correctly (refer to .env.example)."
        );
      else if (error instanceof DropboxFolderPathError)
        logError("DROPBOX_FOLDER_PATH not set.");
      else if (error instanceof DownloadError) {
        if (error instanceof FileDownloadError)
          logError(`Could not download file ${error.path}`);
        else if (error instanceof FolderDownloadError)
          logError(`Could not download folder ${error.path}`);
      } else
        logError(
          "An unexpected error occured while downloading content from Dropbox."
        );
      logInfo(`Falling back to ${contentExampleFilePath}`);
    }
  }

  if (!isUsingExample) {
    try {
      await access(contentFilePath);
    } catch (error) {
      isUsingExample = true;
      logError(`Could not access ${contentFilePath}`);
      logInfo(`Falling back to ${contentExampleFilePath}`);
    }
  }

  try {
    await copyContentToPublic(isUsingExample);
  } catch (error) {
    logError(
      `Could not copy content to the /public folder. Received an error while copying ${(error as CopyContentError).srcPath} to ${(error as CopyContentError).destPath}.`
    );
    return null;
  }

  try {
    const content = await readFile(
      isUsingExample ? contentExampleFilePath : contentFilePath,
      { encoding: "utf-8" }
    );
    const JSONContent = JSON.parse(content) as Content;
    logSuccess(
      `Copied ${isUsingExample ? "example " : ""}content to /public and read ${isUsingExample ? "example " : ""}content.json.`
    );
    return JSONContent;
  } catch (error) {
    logError(
      `Could not read ${isUsingExample ? contentExampleFilePath : contentFilePath}.`
    );
    return null;
  }
}
