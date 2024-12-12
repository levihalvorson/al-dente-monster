'use client';
import { useRef, useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import ChatWindow from './ChatWindow';
import { FaInfoCircle } from 'react-icons/fa';
import { Tooltip as ReactTooltip } from 'react-tooltip';

const fileTypes = ['JPEG', 'PNG', 'GIF', 'PDF'];

async function sendFileData(fileList: File[]) {
  try {
    const formData = new FormData();
    formData.append('json', JSON.stringify({ actions: ['merge', 'pdfToWord', 'toPdf'] }));
    for (let i = 0; i < fileList.length; i++) {
      formData.append('pdfs', fileList[i]);
    }

    await fetch('http://localhost:3001/actions', {
      method: 'POST',
      body: formData,
    });
  } catch (err) {
    console.error(err);
    return;
  }
}

const SideNav = () => {
  const [files, setFiles] = useState<File[]>([]);
  const handleChange = async (files: File[]) => {
    setFiles((prev: File[]) => [...prev, ...files]);
  };
  const clearChatRef = useRef<() => void>(() => {});

  const handleClearChat = (clearMessages: () => void) => {
    clearChatRef.current = clearMessages;
  };

  const clearChat = () => {
    clearChatRef.current();
    setFiles([]);
  };
  const onClick = async () => {
    await sendFileData(files);
  };
  console.log('file', files);

  return (
    <div className="h-full py-4">
      <div className="h-[425px]">
        <h1 className="text-gray-800 font-bold text-xl mb-2 ml-2">Drag & Drop Files</h1>
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
        {files.length > 0 && (
          <button
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
            onClick={onClick}
          >
            Finished Uploading
          </button>
        )}
        <div className="px-2 mt-2">
          <div className="h-px bg-gray-400" />
        </div>
      </div>

      <ChatWindow
        onClearChat={handleClearChat}
        clearChat={clearChat}
      />
    </div>
  );
};

export default SideNav;
