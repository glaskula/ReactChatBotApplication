import React, { useEffect, useState, useRef } from 'react';
import '../css/Message.css';
import blackLogo from '../assets/BlackLogo.svg';

const Message = ({ text, isUserMessage, isLoading }) => {
  const [displayedText, setDisplayedText] = useState('');
  const messageRef = useRef(null);  // Reference to the message div

  useEffect(() => {
    if (isUserMessage || isLoading) {
      setDisplayedText(text);
      scrollToBottom();
    } else {
      setDisplayedText('');
      const displayTextCharacterByCharacter = (index = 0) => {
        if (index < text.length) {
          setDisplayedText((currText) => currText + text.charAt(index));
          if (index % 5 === 0) {  // Adjust scroll every 5 characters to reduce overhead
            scrollToBottom();
          }
          setTimeout(() => displayTextCharacterByCharacter(index + 1), 15);
        } else {
          scrollToBottom();  // Ensure we scroll to the bottom at the end of the animation
        }
      };
      displayTextCharacterByCharacter();
    }
  }, [text, isUserMessage, isLoading]);

  // Define a function to scroll to the bottom of the message element
  const scrollToBottom = () => {
    messageRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const formatMessage = (message) => {
    return message.split('\n').map((part, index) => (
      <span key={index}>
        {part}
        <br />
      </span>
    ));
  };

  const messageContent = isLoading ? (
    <span className="loading-dots">
      <span className="dot"></span>
      <span className="dot"></span>
      <span className="dot"></span>
    </span>
  ) : (
    formatMessage(displayedText)
  );

  return (
    <div ref={messageRef} className={`message ${isUserMessage ? 'user-message' : 'bot-message'}`}>
      <div className="message-flex-container">
        {!isUserMessage && (
          <>
            <img src={blackLogo} alt="Logo" className="message-logo" />
            <strong>ChatGBG</strong>
          </>
        )}
        {isUserMessage && <strong>You</strong>}
        <div className="message-text">{messageContent}</div>
      </div>
    </div>
  );
};

export default Message;
