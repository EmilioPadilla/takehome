import * as fs from 'fs-extra';
import * as path from 'path';
import * as mime from 'mime-types';
import { FileInfo, DirectoryInfo } from '../types';


async function indexDirectory(baseDir: string): Promise<DirectoryInfo> {
  async function traverseDir(dir: string): Promise<DirectoryInfo> {
    const items = await fs.promises.readdir(dir);

    const directoryInfo: DirectoryInfo = {
      isDir: true,
      name: path.basename(dir),
      contents: [],
      size: 0,
      contentTypes: [], // This saves us from having to traverse the directory again on the front end
    };

    for (const item of items) {
      const itemPath = path.join(dir, item);
      // Get the stats of the item
      const stats = await fs.promises.stat(itemPath);

      // If the item is a directory, traverse it and add its contents to the directory info
      if (stats.isDirectory()) {
        const subdirectoryInfo = await traverseDir(itemPath);
        directoryInfo.contents?.push(subdirectoryInfo);
        directoryInfo.size! += subdirectoryInfo.size || 0;
        directoryInfo.contentTypes = [...new Set([...directoryInfo.contentTypes!, ...subdirectoryInfo.contentTypes || []])];
      } else {
        // If the item is a file, add its info to the directory info
        const contentType = mime.lookup(itemPath) || 'unknown';
        const fileInfo: FileInfo = { isDir: false, name: item, size: stats.size, contentType };
        directoryInfo.contents?.push(fileInfo);
        directoryInfo.size! += stats.size;
        directoryInfo.contentTypes?.push(contentType);
      }
    }

    return directoryInfo;
  }

  return await traverseDir(baseDir);
}

export default indexDirectory;