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
      <div className='flex gap-40 w-full'>
      <button
        onClick={handleSend}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Send
      </button>
      <div className="px-2">
        <button
          onClick={clearChat}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors duration-300 text-xs"
        >
          Clear Chat
        </button>
      </div>
      </div>
    </div>
  );
};

export default MessageInput;
