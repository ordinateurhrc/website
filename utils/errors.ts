export class DownloadError extends Error {
  /**
   * Error class for when a file or folder could not be downloaded
   */
  constructor() {
    super();
    this.name = "DownloadError";
  }
}

export class FileDownloadError extends DownloadError {
  path: string;
  /**
   * Error class for when a file could not be downloaded
   * @param path - The path of the file that could not be downloaded
   */
  constructor(path: string) {
    super();
    this.name = "FileDownloadError";
    this.path = path;
  }
}

export class FolderDownloadError extends DownloadError {
  path: string;
  /**
   * Error class for when a folder could not be downloaded
   * @param path - The path of the folder that could not be downloaded
   */
  constructor(path: string) {
    super();
    this.name = "FolderDownloadError";
    this.path = path;
  }
}

export class DropboxAuthError extends Error {
  /**
   * Error class for when the Dropbox authentication fails
   */
  constructor() {
    super();
    this.name = "DropboxAuthError";
  }
}

export class DropboxFolderPathError extends Error {
  /**
   * Error class for when the Dropbox remote folder path is not set
   */
  constructor() {
    super();
    this.name = "FolderPathError";
  }
}

export class CopyContentError extends Error {
  /**
   * Error class for when the content could not be copied to the public folder
   */
  srcPath: string;
  destPath: string;
  constructor(srcPath: string, destPath: string) {
    super();
    this.name = "CopyContentError";
    this.srcPath = srcPath;
    this.destPath = destPath;
  }
}
