'use client';
import { useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import ChatWindow from './ChatWindow';

const fileTypes = ['JPEG', 'PNG', 'GIF', 'PDF'];

const SideNav = () => {
  const [file, setFile] = useState<File[]>([]);
  const handleChange = (file: File[]) => {
    setFile(file);
  };

  console.log('file', file);

  return (
    <div className="h-full px-2 py-4">
      <h1 className="text-gray-800 font-bold text-xl mb-2">Drag & Drop Files</h1>
      <FileUploader
        multiple={true}
        handleChange={handleChange}
        name="file"
        types={fileTypes}
        classes="w-[300px]"
      />
      <p className="text-gray-800 mt-1">
        {file ? `File name: ${file[0]?.name}` : 'no files uploaded yet'}
      </p>
      <ChatWindow />
    </div>
  );
};

export default SideNav;
