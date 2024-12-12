import React from 'react';
import TypingText from './TypingText';

interface Message {
  text: string;
  username: string;
  avatar: any;
  isTypingText?: boolean;
}

interface MessageListProps {
  messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
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
              speed={150}
            />
          ) : (
            <div className="p-2 rounded text-gray-900">{message.text}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MessageList;
