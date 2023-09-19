"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs-extra"));
const path = __importStar(require("path"));
const mime = __importStar(require("mime-types"));
async function indexDirectory(baseDir) {
    async function traverseDir(dir) {
        const items = await fs.promises.readdir(dir);
        const directoryInfo = {
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
                directoryInfo.size += subdirectoryInfo.size || 0;
                directoryInfo.contentTypes = [...new Set([...directoryInfo.contentTypes, ...subdirectoryInfo.contentTypes || []])];
            }
            else {
                // If the item is a file, add its info to the directory info
                const contentType = mime.lookup(itemPath) || 'unknown';
                const fileInfo = { isDir: false, name: item, size: stats.size, contentType };
                directoryInfo.contents?.push(fileInfo);
                directoryInfo.size += stats.size;
                directoryInfo.contentTypes?.push(contentType);
            }
        }
        return directoryInfo;
    }
    return await traverseDir(baseDir);
}
exports.default = indexDirectory;
