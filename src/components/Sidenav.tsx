'use client';
import { useRef, useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import ChatWindow from './ChatWindow';
import { FaInfoCircle } from 'react-icons/fa';
import { Tooltip as ReactTooltip } from 'react-tooltip';

const fileTypes = ['JPEG', 'PNG', 'GIF', 'PDF'];

const SideNav = () => {
  const [files, setFiles] = useState<File[]>([]);
  const clearChatRef = useRef<() => void>(() => {});
  const handleChange = (file: File[]) => {
    setFiles((prev: File[]) => [...prev, ...file]);
  };

  const handleClearChat = (clearMessages: () => void) => {
    clearChatRef.current = clearMessages;
  };

  const clearChat = () => {
    clearChatRef.current();
    setFiles([]);
  };

  return (
    <div className="h-full py-4">
      <h1 className="text-gray-800 font-bold text-xl mb-2 px-2">Drag & Drop Files</h1>
      <div className="px-2">
        <FileUploader
          multiple={true}
          handleChange={handleChange}
          name="file"
          types={fileTypes}
          filOrFiles={files}
        />
      </div>
      <div className="flex text-gray-800 mt-1 px-2 items-center">
        {files.length !== 0 ? 'Files uploaded:' : 'no files uploaded yet'}
        <span className="ml-1">{files.length > 0 ? files.length : ''}</span>
        {files.length > 0 && (
          <>
            <FaInfoCircle
              className="ml-2 text-blue-500 cursor-pointer"
              id="my-anchor-element"
            />
            <ReactTooltip
              id="my-tooltip"
              place="right"
              anchorSelect="#my-anchor-element"
              clickable
            >
              <ul>
                {files.map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            </ReactTooltip>
          </>
        )}
      </div>
      <div className="px-2 mt-2">
        <div className="h-px bg-gray-400" />
      </div>
      <div className="px-2">
        <button
          onClick={clearChat}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors duration-300 text-xs"
        >
          Clear Chat
        </button>
      </div>
      <ChatWindow onClearChat={handleClearChat} />
    </div>
  );
};

export default SideNav;
