// Message.js
import React from 'react';
import '../css/Message.css'; // Make sure this path is correct
import { Container, Row, Col } from 'react-bootstrap';

const Message = ({ text, isUserMessage }) => {
  // Define message prefix and apply formatting
  const messagePrefix = isUserMessage ? <strong>You</strong> : <strong>ChatGBG</strong>;
  // Add a line break between the prefix and the message text
  const formattedMessage = (
    <>
      {messagePrefix}
      <br />
      {text}
    </>
  );

  // Apply conditional class for styling
  const messageClass = isUserMessage ? 'user-message' : 'bot-message';
  
  return (
    <div className={`message ${messageClass}`}>
      <p>{formattedMessage}</p>
    </div>
  );
};

export default Message;
