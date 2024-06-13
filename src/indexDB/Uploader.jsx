// src/components/Uploader.js

import React , { useEffect } from 'react';
import { useIndexedDB } from './useIndexedDB';
import { v4 as uuidv4 } from 'uuid';


const Uploader = () => {
  const { saveToFileDB, error, getFilesCount, filesCount , getAllIds, keys , deleteItemInDB, clearDB } = useIndexedDB();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const id = uuidv4()
    saveToFileDB(file,id);
    getFilesCount();
    getAllIds();
  };
  
  useEffect(()=>{
    getFilesCount()
    getAllIds()
  },[])
  


  return (
    <div>

      <h2>files count in dB : {filesCount}</h2>
      <p>____________</p>
      <h1>Upload a File</h1>
      <input type="file" onChange={handleFileChange} />
      <p>____________</p>
      <h1>Files ids : </h1>
      {keys.map(id => (
        <div>
          <li>id : {id} 
          <button className="bg-red-500 p-2 m-1" onClick={()=>{
            deleteItemInDB(id)
            getFilesCount()
            getAllIds()
          }}>del</button>
          </li>
        </div>
      ))}
      <p>____________</p>
      <button className="bg-red-600 p-2 m-1" onClick={()=>{
        clearDB()
        getFilesCount()
        getAllIds()
      }}>clear dB</button>
      {error && 
        <div>
          <p>____________</p>
          <p>Error: {error}</p>
        </div>
      }
    </div>
  );
};

export default Uploader;
