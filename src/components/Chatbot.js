import React, { useState } from 'react';
import MessageList from './MessageList';
import InputBox from './InputBox';
import logo from '../assets/gbgLogga.svg';
import skyline from '../assets/Skyline.png';
import { Container, Button } from 'react-bootstrap';
import '../css/Chatbot.css'; // Adjust the path based on your structure

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const url = 'https://flaskapp-002ep-ai-xjob.apps.ocpext.gbgpaas.se/ask'; // Your Flask route

  // Modified to send user's message to the Flask app and receive a response
  const getLlmResponse = async (userMessage) => {
    const postData = {
      question: userMessage // Your user's question
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.text();
      return data; // The response from the server
    } catch (error) {
      console.error('There was a problem with the POST request:', error);
      return "Sorry, I couldn't fetch a response. Please try again later."; // Error handling response
    }
  };

  const handleSendMessage = async (newMessage) => {
    const llmResponse = await getLlmResponse(newMessage); // Wait for the LLM response
    setMessages(messages => [
      ...messages,
      { id: messages.length + 1, text: newMessage, isUserMessage: true },
      { id: messages.length + 2, text: llmResponse, isUserMessage: false }
    ]);
  };

  const handlePresetMessage = (message) => {
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
          <Button onClick={() => handlePresetMessage("Suggest three activities I can do with my family in Gothenburg.")} variant="primary" className="preset-message">Suggest three activities I can do with my family in Gothenburg.</Button>
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
