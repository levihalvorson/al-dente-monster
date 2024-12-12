import useInterval from '@/util/useInterval';
import React, { useState } from 'react';

interface TypingTextProps {
  text: string;
  speed?: number; // Speed in milliseconds
}

const TypingText: React.FC<TypingTextProps> = ({ text, speed = 50 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);

  useInterval(() => {
    if (index < text.length) {
      if (index < text.length) {
        setDisplayedText((prev) => prev + text.charAt(index));
        setIndex((prevIndex) => prevIndex + 1);
      }
    }
  }, speed);

  return <p className="text-gray-900">{displayedText}</p>;
};

export default TypingText;
