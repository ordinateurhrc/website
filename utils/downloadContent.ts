import { Dropbox } from "dropbox";
import { configDotenv } from "dotenv";
import fetch from "node-fetch";
import { mkdir, writeFile } from "fs/promises";
import { join, normalize, dirname, basename } from "path";
import { fileURLToPath } from "url";

async function downloadFile(filePath: string, localPath: string, dbx: Dropbox) {
  try {
    const filename = basename(filePath);

    const response = await dbx.filesDownload({ path: filePath });
    // @ts-ignore because fileBinary does exist on FileMetadata, but the type definition is incorrect
    const fileData = await response.result.fileBinary;
    const fileBuffer = Buffer.from(fileData);

    const localFilePath = join(localPath, filename);
    await writeFile(localFilePath, fileBuffer);

    console.log(`Downloaded file: ${localFilePath}`);
  } catch (error) {
    console.error(`Error downloading file: ${filePath}`, error);
  }
}

async function downloadFolder(
  folderPath: string,
  localPath: string,
  dbx: Dropbox
) {
  try {
    const response = await dbx.filesListFolder({ path: folderPath });
    const entries = response.result.entries;
    for (const entry of entries) {
      if (typeof entry.path_lower !== "undefined") {
        if (entry[".tag"] === "file") {
          await downloadFile(entry.path_lower, localPath, dbx);
        } else if (entry[".tag"] === "folder") {
          const subFolderPath = entry.path_lower;
          const subLocalPath = join(localPath, basename(subFolderPath));
          await mkdir(subLocalPath, { recursive: true });
          await downloadFolder(subFolderPath, subLocalPath, dbx);
        }
      }
    }
  } catch (error) {
    console.error(`Error downloading folder: ${folderPath}`, error);
  }
}

/**
 * Read DROPBOX_FOLDER_PATH environment variable and download that folder recursively to populate /content
 */
export async function downloadContent() {
  // Do not download anything if not in production
  if (process.env.NODE_ENV !== "production") return;

  configDotenv();

  const DROPBOX_FOLDER_PATH = process.env.DROPBOX_FOLDER_PATH;
  const DROPBOX_CLIENT_ID = process.env.DROPBOX_CLIENT_ID;
  const DROPBOX_CLIENT_SECRET = process.env.DROPBOX_CLIENT_SECRET;
  const DROPBOX_REFRESH_TOKEN = process.env.DROPBOX_REFRESH_TOKEN;
  const LOCAL_PATH = normalize(
    join(dirname(fileURLToPath(import.meta.url)), "..", "content")
  );

  const dbx = new Dropbox({
    clientId: DROPBOX_CLIENT_ID,
    clientSecret: DROPBOX_CLIENT_SECRET,
    refreshToken: DROPBOX_REFRESH_TOKEN,
    fetch
  });

  if (typeof DROPBOX_FOLDER_PATH !== "undefined") {
    await mkdir(LOCAL_PATH, { recursive: true });
    await downloadFolder(DROPBOX_FOLDER_PATH, LOCAL_PATH, dbx);
  } else {
    throw new Error("DROPBOX_FOLDER_PATH environment variable is not set.");
  }
}
