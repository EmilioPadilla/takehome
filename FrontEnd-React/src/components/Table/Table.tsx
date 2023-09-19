import React from 'react';
import { FileInfo, DirectoryInfo } from '../../types/index';
import './Table.css';

interface TableProps {
  fileDirectory: DirectoryInfo | undefined;
}

const Table = ({ fileDirectory }: TableProps) => {
  const renderContent = (fileDirectory: (FileInfo | DirectoryInfo)[] | undefined) => {
    if (!fileDirectory || fileDirectory.length === 0) {
      return (<><h6>No Files Found</h6></>);
    }

    return (
      <ul>
        {fileDirectory.map((entry, index) => (
          <li key={index}>
            {entry.isDir ? (
              <>
                <p><strong>{entry.name}</strong></p>
                <p>Size: {entry.size} bytes</p>
                {renderContent(entry.contents)}
              </>
            ) : (
              <>
                <p><strong>{entry.name}</strong></p>
                <p>Size: {entry.size} bytes</p>
                <p>ContentType: {entry.contentType}</p>
              </>
            )}
          </li>
        ))}
      </ul>
    );
  };

  return !fileDirectory ? (<div className='main-list'><h3>No information found</h3></div>) : (
    <div className='main-list'>
      <div className='main-list-header'>
        <p>Folder <strong>{fileDirectory?.name}</strong></p>
        <p>Size: <strong>{fileDirectory?.size} bytes</strong></p>
      </div>
      {renderContent(fileDirectory?.contents)}
    </div>
  );
}

export default Table;