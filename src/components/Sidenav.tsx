'use client';
import { useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import ChatWindow from './ChatWindow';

const fileTypes = ['JPEG', 'PNG', 'GIF', 'PDF'];

const SideNav = () => {
  const [files, setFiles] = useState<File[]>([]);
  const handleChange = (file: File[]) => {
    setFiles((prev: File[]) => [...prev, ...file]);
  };

  console.log('file', files);

  return (
    <div className="h-full py-4">
      <h1 className="text-gray-800 font-bold text-xl mb-2">Drag & Drop Files</h1>
      <div className="px-2">
        <FileUploader
          multiple={true}
          handleChange={handleChange}
          name="file"
          types={fileTypes}
        />
      </div>
      <p className="text-gray-800 mt-1">
        {files.length !== 0 ? 'Files uploaded:' : 'no files uploaded yet'}
        {files.map((file: File, index: number) => (
          <span key={index} className="block">
            {file.name}
          </span>
        ))}
     
      </p>
      <div className="px-2 mt-2">
        <div className="h-px bg-gray-400" />
      </div>
      <ChatWindow />
    </div>
  );
};

export default SideNav;
