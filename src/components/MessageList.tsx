import React, { useState } from 'react';
import TypingText from './TypingText';
import { FaDownload } from 'react-icons/fa';
import LoadingDots from './LoadingsDots';
interface Message {
  text: string;
  username: string;
  avatar: any;
  isTypingText?: boolean;
  pdfUrl?: string;
  pdfName?: string;
}

interface MessageListProps {
  messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  const [completedMessages, setCompletedMessages] = useState<number[]>([]);

  const handleTypingComplete = (index: number) => {
    setCompletedMessages((prev) => [...prev, index]);
  };

  return (
    <div className="flex-1 overflow-y-auto p-4">
      {messages.map((message, index) => (
        <div
          key={index}
          className="mb-4"
        >
          <div className="flex items-center mb-1">
            <img
              src={message.avatar}
              alt={message.username}
              className="w-8 h-8 rounded-full mr-2"
            />
            <span className="font-bold text-gray-700">{message.username}</span>
          </div>
          {message.isTypingText ? (
            <TypingText
              text={message.text}
              speed={50}
              onComplete={() => handleTypingComplete(index)}
            />
          ) : message.text ? (
            <div className="p-2 rounded text-gray-900">{message.text}</div>
          ) : (
            <div className="ml-2 mt-4">
              <LoadingDots />
            </div>
          )}
          {completedMessages.includes(index) && message.pdfUrl && (
            <div className="mt-2">
              <a
                href={message.pdfUrl}
                download={message.pdfName}
                className="inline-flex items-center px-4 py-2 border border-gray-500 text-gray-800 rounded hover:bg-gray-800 hover:text-white transition-colors duration-300"
              >
                <FaDownload className="mr-2" />
                {message.pdfName}
              </a>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MessageList;
