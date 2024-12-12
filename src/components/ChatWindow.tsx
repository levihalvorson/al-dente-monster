import React, { useState } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
const ChatWindow = () => {
  const [messages, setMessages] = useState<{ text: string; username: string; avatar: string }[]>(
    []
  );

  const handleSendMessage = (text: string) => {
    const newMessage = {
      text,
      username: 'User',
      avatar: '/user-avatar.png',
    };
    setMessages([...messages, newMessage]);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage = {
        text: 'This is an AI response.',
        username: 'AI Bot',
        avatar: '/robot-avatar.png',
        isTypingText: true,
      };
      setMessages((prevMessages) => [...prevMessages, aiMessage]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-130px)] bg-gray-300 rounded">
      <MessageList messages={messages} />
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatWindow;
