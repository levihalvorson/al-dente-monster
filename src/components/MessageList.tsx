import React from 'react';

interface MessageListProps {
  messages: string[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  return (
    <div className="flex-1 overflow-y-auto p-4">
      {messages.map((message, index) => (
        <div
          key={index}
          className="mb-2 text-gray-900"
        >
          {message}
        </div>
      ))}
    </div>
  );
};

export default MessageList;
