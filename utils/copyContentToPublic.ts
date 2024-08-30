import { copyFile, mkdir, readdir, stat as fileStat } from "fs/promises";
import { join, normalize, dirname } from "path";
import { fileURLToPath } from "url";
import { CopyContentError } from "./errors";

const currentDir = dirname(fileURLToPath(import.meta.url)); // Get the directory of this file on disk
const contentDir = normalize(join(currentDir, "..", "content"));
const contentExampleDir = normalize(join(currentDir, "..", "content.example"));
const publicContentDir = normalize(join(currentDir, "..", "public", "content"));

/**
 *
 * Copy the content from /content to /public/content
 * @param isUsingExample - If true, copy the content into /public/content from the /content.example directory
 */
export async function copyContentToPublic(isUsingExample = false) {
  if (!isUsingExample) await copyFileOrDirectory(contentDir, publicContentDir);
  else await copyFileOrDirectory(contentExampleDir, publicContentDir);
}

async function copyFileOrDirectory(source: string, destination: string) {
  try {
    const stat = await fileStat(source);

    if (stat.isDirectory()) {
      // Create the directory if it doesn't exist
      await mkdir(destination, { recursive: true });

      const items = await readdir(source);
      for (const item of items) {
        const srcPath = join(source, item);
        const destPath = join(destination, item);
        await copyFileOrDirectory(srcPath, destPath);
      }
    } else {
      await copyFile(source, destination);
    }
  } catch (_error) {
    throw new CopyContentError(source, destination);
  }
}
