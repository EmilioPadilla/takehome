import { DirectoryInfo, FileInfo, Item } from '../types/index';

function searchByProperty(
  jsonData: DirectoryInfo | undefined,
  searchValue: string | null,
  propertyName: 'size' | 'name' | undefined, 
  contentTypeFilter?: string, 
  ): DirectoryInfo | undefined {
  if (!jsonData) {
    return undefined; // Return an empty array if jsonData is not iterable
  }

  const results: Item[] = [];

  function traverse(data: Item[] | undefined) {
    for (const item of data!) {
      
      if (
        propertyName === 'name' && 
        searchValue && 
        item[propertyName].toString().toLowerCase().includes(searchValue.toLowerCase())) {
        results.push(item);
      } else if (propertyName === 'size' && searchValue) {
        const size = item.size as number;
        if (size < parseInt(searchValue, 10)) {
          results.push(item);
        }
      } else if (contentTypeFilter !== 'default' && item?.contentType && contentTypeFilter === item?.contentType) {
        results.push(item);
      } else if (!searchValue && (contentTypeFilter === 'default' || contentTypeFilter === undefined)) {
        results.push(item);
      }

      if (item.contents && item.contents.length > 0) {
        // Only continue traversing if a match hasn't been found
        if (!results.includes(item)) {
          traverse(item.contents);
        }
      }
    }
  }

  traverse(jsonData.contents);
  return { 
    name: jsonData.name, 
    size: jsonData.size, 
    contents: results as (DirectoryInfo | FileInfo)[],
    isDir: true
  }; // Turn search back to DirectoryInfo type
}

// Export function as a property of utils object
export const utils = {
  searchByProperty,
};