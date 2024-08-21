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
import { downloadContent } from "./downloadContent";
import { copyContentToPublic } from "./copyContentToPublic";

// Typescript interface representing the contents of the metadata JSON file
export interface Content {
  metadata: {
    name: string;
    description: string;
  };
}

const currentDir = dirname(fileURLToPath(import.meta.url)); // Get the directory of this file on disk
const contentDir = normalize(join(currentDir, "..", "content"));
const contentExampleDir = normalize(join(currentDir, "..", "content.example"));

/**
 * Get the metadata JSON file for the content, as a JS object
 * @returns {Promise<Content>} - The metadata JSON file as a JS object
 */
export async function getContent(): Promise<Content> {
  const contentFilePath = normalize(join(contentDir, "content.json"));
  const contentExampleFilePath = normalize(
    join(contentExampleDir, "content.json")
  );

  let isUsingExample = false;
  if (process.env.NODE_ENV === "production") await downloadContent();
  else isUsingExample = true;

  try {
    await access(contentFilePath);
    isUsingExample = false;
  } catch (error) {
    console.error(`Error accessing ${contentFilePath}: ${error}`);
    console.error(`Falling back to ${contentExampleFilePath}`);
  }

  await copyContentToPublic(isUsingExample);

  try {
    const content = await readFile(
      isUsingExample ? contentExampleFilePath : contentFilePath,
      { encoding: "utf-8" }
    );
    return JSON.parse(content) as Content;
  } catch (error) {
    throw new Error(
      "Could neither read /content/content.json nor /content.example/content.json"
    );
  }
}
