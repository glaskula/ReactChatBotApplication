import React from 'react';
import '../css/Message.css';
import blackLogo from '../assets/BlackLogo.svg';

const Message = ({ text, isUserMessage, isLoading }) => {
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
    formatMessage(text)
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
