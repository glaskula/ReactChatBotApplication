import React, { useEffect, useState } from 'react';
import '../css/Message.css';
import blackLogo from '../assets/BlackLogo.svg';

const Message = ({ text, isUserMessage, isLoading }) => {
  // Using a single state to manage the displayed text ensures we don't skip characters.
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    // Directly setting the text for user messages or when loading to avoid animation.
    if (isUserMessage || isLoading) {
      setDisplayedText(text);
    } else {
      // Ensure we start with a clean slate for bot messages.
      setDisplayedText('');

      // Define a function to display text character by character.
      const displayTextCharacterByCharacter = (index = 0) => {
        if (index < text.length) {
          setDisplayedText((currText) => currText + text.charAt(index));
          // Queue the next character.
          setTimeout(() => displayTextCharacterByCharacter(index + 1), 25);
        }
      };

      // Start displaying the bot's message character by character.
      displayTextCharacterByCharacter();
    }
  }, [text, isUserMessage, isLoading]); // React to changes in these props.

  const formatMessage = (message) => {
    return message.split('\n').map((part, index) => (
      <span key={index}>
        {part}
        <br />
      </span>
    ));
  };

  // Choose what to display based on the loading state.
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
    <div className={`message ${isUserMessage ? 'user-message' : 'bot-message'}`}>
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
