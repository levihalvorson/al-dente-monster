import useInterval from '@/util/useInterval';
import React, { useState } from 'react';

interface TypingTextProps {
  text: string;
  speed?: number; // Speed in milliseconds
  onComplete?: () => void;
}

const TypingText: React.FC<TypingTextProps> = ({ text, speed = 50, onComplete }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);

  useInterval(() => {
    if (index < text.length) {
      setDisplayedText((prev) => prev + text.charAt(index));
      setIndex((prevIndex) => prevIndex + 1);
    } else if (onComplete) {
      onComplete();
    }
  }, speed);

  return <p className="text-gray-900 p-2">{displayedText}</p>;
};

export default TypingText;
