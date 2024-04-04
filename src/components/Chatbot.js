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
  const [isLoading, setIsLoading] = useState(false); // New state for loading indicator

  // Modified to send user's message to the Flask app and receive a response
  const getLlmResponse = async (userMessage) => {
    setIsLoading(true); // Start loading
    // Create a conversation history from the current messages state
    const conversationHistory = messages.map(message => ({
      text: message.text,
      isUserMessage: message.isUserMessage,
    }));
    const postData = {
      question: userMessage, // Your user's question
      history: conversationHistory, // Include the conversation history
    };
    console.log(postData);
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
  
      const data = await response.json();
      setIsLoading(false); // Stop loading
      return data.response;
    } catch (error) {
      console.error('There was a problem with the POST request:', error);
      setIsLoading(false); // Stop loading even on error
      return "Sorry, I couldn't fetch a response. Please try again later.";
    }
  };
  

  const handleSendMessage = async (newMessage) => {
    // Add user message
    setMessages(messages => [
      ...messages,
      { id: messages.length + 1, text: newMessage, isUserMessage: true },
    ]);
    
    // Add temporary loading message for the bot response
    const tempMessageId = messages.length + 2;
    setMessages(messages => [
      ...messages,
      { id: tempMessageId, text: "", isUserMessage: false, isLoading: true },
    ]);
  
    // Fetch the actual response
    const llmResponse = await getLlmResponse(newMessage);
    
    // Update the temporary message with the actual response and remove loading state
    setMessages(messages => messages.map(message => {
      if (message.id === tempMessageId) {
        return { ...message, text: llmResponse, isLoading: false };
      }
      return message;
    }));
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
