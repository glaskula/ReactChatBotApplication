import React, { useState } from 'react';
import MessageList from './MessageList';
import InputBox from './InputBox';
import logo from '../assets/gbgLogga.svg';
import { Row, Col, Container, InputGroup, Form, Button } from 'react-bootstrap';
import '../css/Chatbot.css'; // Adjust the path based on your structure

const Chatbot = () => {
  const [messages, setMessages] = useState([]);

  // Simulate LLM response
  const getLlmResponse = (userMessage) => {
    // Placeholder response logic, replace with actual API call if needed
    return `LLM response to: "${userMessage}"`;
  };

  const handleSendMessage = (newMessage) => {
    const llmResponse = getLlmResponse(newMessage);

    // Add user message with isUserMessage set to true
    setMessages(messages => [
      ...messages,
      { id: messages.length + 1, text: newMessage, isUserMessage: true },
      // Simulate adding LLM response with isUserMessage set to false
      { id: messages.length + 2, text: llmResponse, isUserMessage: false }
    ]);
  };

  return (
    <Container className="chat-container">
      <div className="logo-container">
        <div className="logo-text">Chat<span className="logo-bold">GBG</span></div>
        <img src={logo} alt="Logo" className="logo-image" />
        <div className="logo-desc">Your personal AI assistant for Gothenburg</div>
      </div>
      <div className="messages-container">
        <MessageList messages={messages} />
      </div>
      <div className="input-container">
        <InputBox onSendMessage={handleSendMessage} />
      </div>
    </Container>

  );
};

export default Chatbot;

