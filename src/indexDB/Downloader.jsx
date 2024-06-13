// src/components/Downloader.js

import React, { useEffect, useState } from 'react';
import { useIndexedDB } from './useIndexedDB';

const Downloader = () => {
  const { fetchFromFileDB, fileContent, error, getAllIds } = useIndexedDB();
  

  const downloadFile = async () => {
    {/*
    const response = await fetch(fileContent);
    const totalSizeInMB = parseInt(response.headers.get('content-length'),10)/(1024*1024);
    */}

    const link = document.createElement('a');
    link.href = fileContent; //blobUrl
    link.download = `downloaded_file${new Date().getSeconds()}`
    document.body.appendChild(link);
    link.click();
    link.remove();
    
  };

  useEffect(() => {
    const id = "fileData"
    fetchFromFileDB(id);
  }, [fetchFromFileDB]);

  return (
    <div>
      <h1>Download the File</h1>
      {fileContent ? (
      <div>
        <button className="bg-blue-500 p-2 m-1" onClick={()=>{
          downloadFile()
        }}>download </button>
      </div>
      ) : (
        <p>No file available.</p>
      )}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default Downloader;
