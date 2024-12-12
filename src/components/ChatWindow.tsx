import React, { useState } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
const ChatWindow = ({
  onClearChat,
  clearChat,
}: {
  onClearChat: (clearMessages: () => void) => void;
  clearChat: () => void;
}) => {
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

    // Add loading message
    const loadingMessage = {
      text: '',
      username: 'AI Bot',
      avatar: '/robot-avatar.png',
      isTypingText: false,
    };
    setMessages((prevMessages) => [...prevMessages, loadingMessage]);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage = {
        text: 'This is an AI response.',
        username: 'AI Bot',
        avatar: '/robot-avatar.png',
        isTypingText: true,
        pdfUrl: '/converted.pdf',
        pdfName: 'converted.pdf',
      };
      setMessages((prevMessages) => {
        // Remove the loading message and add the AI response
        const updatedMessages = prevMessages.slice(0, -1);
        return [...updatedMessages, aiMessage];
      });
    }, 1000);
  };

  const clearMessages = () => {
    setMessages([]);
  };

  // Pass the clearMessages function to the parent component
  onClearChat(clearMessages);

  return (
    <div className="flex flex-col h-[calc(100vh-185px)] bg-gray-300 rounded">
      <MessageList messages={messages} />
      <MessageInput
        onSendMessage={handleSendMessage}
        clearChat={clearChat}
      />
    </div>
  );
};

export default ChatWindow;
