import React, { useEffect, useState } from 'react';
import { WebViewerInstance } from '@pdftron/webviewer';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

const ChatWindow = ({
  onClearChat,
  clearChat,
  files,
  instance,
}: {
  onClearChat: (clearMessages: () => void) => void;
  clearChat: () => void;
  files: File[];
  instance: WebViewerInstance | null;
}) => {
  const [messages, setMessages] = useState<{ text: string; username: string; avatar: string }[]>(
    []
  );
  const [processedFilePath, setProcessedFilePath] = useState<string | undefined>(undefined);

  async function sendFileData({fileList, message, filePath}: {fileList: File[]; message: string; filePath?: string}) {
    try {
      const formData = new FormData();
      formData.append('json', JSON.stringify({ message, filePath }));
      for (let i = 0; i < fileList.length; i++) {
        formData.append('pdfs', fileList[i]);
      }

      const res = await fetch('http://localhost:3001/actions', {
        method: 'POST',
        body: formData,
      });
      return res.json();
    } catch (err) {
      console.error(err);
      return;
    }
  }

  const handleSendMessage = (text: string) => {
    const newMessage = {
      text,
      username: 'User',
      avatar: '/user-avatar.png',
    };
    setMessages([...messages, newMessage]);

    // Add loading message
    const loadingMessage = {
      text: '...',
      username: 'AI Bot',
      avatar: '/robot-avatar.png',
      isTypingText: false,
    };
    setMessages((prevMessages) => [...prevMessages, loadingMessage]);

    // Simulate AI response
    setTimeout(async () => {
      const aiMessage = {
        text: 'Yes, I can help you process your PDF files. Please wait a moment while I convert your files...',
        username: 'AI Bot',
        avatar: '/robot-avatar.png',
        isTypingText: true,
      };
      setMessages((prevMessages) => {
        // Remove the loading message and add the AI response
        const updatedMessages = prevMessages.slice(0, -1);
        return [...updatedMessages, aiMessage];
      });
      setTimeout(async () => {
        const res = await sendFileData({fileList: files, message: text, filePath: processedFilePath});
        console.log("🚀 -> setTimeout -> res:", res)
        const convertedFileName = res.processedFile;
        setProcessedFilePath(convertedFileName);
        const finishMessage = {
          text: 'Here is your converted file:',
          username: 'AI Bot',
          avatar: '/robot-avatar.png',
          isTypingText: true,
          pdfUrl: `${convertedFileName}`,
          pdfName: convertedFileName,
        };
        setMessages((prevMessages) => [...prevMessages, finishMessage]);
        if (instance) {
          instance.UI.loadDocument(convertedFileName, {
            extension: 'doc',
          });
        }
      }, 10000);
    }, 1000);
  };

  const clearMessages = () => {
    setMessages([]);
  };

  // Pass the clearMessages function to the parent component
  onClearChat(clearMessages);

  return (
    <div className="flex flex-col h-[calc(100vh-185px)] bg-white">
      <MessageList messages={messages} />
      <MessageInput
        onSendMessage={handleSendMessage}
        clearChat={clearChat}
      />
    </div>
  );
};

export default ChatWindow;
