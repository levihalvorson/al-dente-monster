import React, { useEffect, useState } from 'react';

interface TypingTextProps {
  text: string;
  speed?: number; // Speed in milliseconds
}

const TypingText: React.FC<TypingTextProps> = ({ text, speed = 50 }) => {
  const [displayedText, setDisplayedText] = useState(text.charAt(0));

  useEffect(() => {
    let index = 1;
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText((prev) => {
          //   console.log('index', text.charAt(index));
          //   console.log('prev', prev);
          const newStr = prev + text.charAt(index);
          console.log('newStr', newStr);
          return newStr;
        });
        index++;
      }
      //   if (index === text.length) {
      //     clearInterval(interval);
      //   }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return <span>{displayedText}</span>;
};

export default TypingText;
