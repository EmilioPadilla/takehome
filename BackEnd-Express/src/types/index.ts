export interface FileInfo {
  isDir: false;
  name: string;
  size: number;
  contentType: string;
}

export interface DirectoryInfo {
  isDir: true;
  name: string;
  contents?: (FileInfo | DirectoryInfo)[];
  size?: number; // Cumulative size of contents
  contentTypes?: string[]; // Array of content types
}