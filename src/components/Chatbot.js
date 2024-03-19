import React, { useState } from 'react';
import MessageList from './MessageList';
import InputBox from './InputBox';
import logo from '../assets/gbgLogga.svg';
import skyline from '../assets/Skyline.png';
import { Container, Button } from 'react-bootstrap';
import '../css/Chatbot.css'; // Adjust the path based on your structure

const Chatbot = () => {
  const [messages, setMessages] = useState([]);

  const getLlmResponse = (userMessage) => {
    return `LLM response to: "${userMessage}"`;
  };

  const handleSendMessage = (newMessage) => {
    const llmResponse = getLlmResponse(newMessage);
    setMessages(messages => [
      ...messages,
      { id: messages.length + 1, text: newMessage, isUserMessage: true },
      { id: messages.length + 2, text: llmResponse, isUserMessage: false }
    ]);
  };

  const handlePresetMessage = (message) => {
    // Function to handle sending preset messages
    handleSendMessage(message);
  };

  const messLength = messages.length === 0;

  return (
    <Container className="chat-container">

      <img src={skyline} alt="Skyline" className={`skyline-image ${messages.length > 0 ? 'with-messages' : ''}`} />
      <div className={`logo-container ${messLength ? 'centered-logo' : ''}`}>
        <div className="logo-text">Chat<span className="logo-bold">GBG</span></div>
        <img src={logo} alt="Logo" className="logo-image" />
        <div className="logo-desc">Your personal AI assistant for Gothenburg</div>
      </div>
      <div className="messages-container">
        <MessageList messages={messages} />
      </div>
      {messLength && (
        <div className="preset-messages-container">
          <Button onClick={() => handlePresetMessage("Example 1")} variant="primary" className="preset-message">Example 1</Button>
          <Button onClick={() => handlePresetMessage("Example 2")} variant="primary" className="preset-message">Example 2</Button>
          <Button onClick={() => handlePresetMessage("Example 3")} variant="primary" className="preset-message">Example 3</Button>
        </div>
      )}
      <div className="input-container">
        <InputBox onSendMessage={handleSendMessage} />
      </div>
    </Container>
  );
};

export default Chatbot;
