import React, { useState } from 'react';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  clearChat: () => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage, clearChat }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className="p-4 border-t ">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full p-2 border rounded text-gray-700"
        placeholder="Type a message..."
      />
      <div className="flex gap-5 w-full justify-evenly">
        <button
          onClick={handleSend}
          className="mt-2 px-4 py-2 w-full bg-[#0206A8] text-white rounded hover:bg-blue-700 transition-colors duration-300"
        >
          Send
        </button>
        <div className="w-full">
          <button
            onClick={clearChat}
            className="mt-2 px-4 py-2 w-full bg-[#0206A8] text-white rounded hover:bg-blue-700 transition-colors duration-300"
          >
            Clear Chat
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageInput;
