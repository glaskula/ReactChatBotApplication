import React, { useEffect, useRef } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Message from './Message';
import '../css/MessageList.css';

const MessageList = ({ messages }) => {
  const messagesEndRef = useRef(null); // Ref for the latest message / scrolling target
  const containerRef = useRef(null); // Ref for the container, if needed for overflow adjustments

  useEffect(() => {
    // Function to adjust overflow, if necessary
    const adjustOverflow = () => {
      const container = containerRef.current;
      if (container) {
        container.style.overflowX = container.scrollWidth <= container.clientWidth ? 'hidden' : 'auto';
      }
    };

    window.addEventListener('resize', adjustOverflow);
    adjustOverflow(); // Initial adjustment

    return () => window.removeEventListener('resize', adjustOverflow);
  }, []); // Empty dependency array means this runs once on mount

  useEffect(() => {
    // Auto-scroll to the latest message
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]); // Dependency on messages ensures this runs when messages update

  return (
    <Container ref={containerRef}>
      {messages.map((message) => (
        <Row key={message.id} className="justify-content-center mb-2">
          <Col xs={12} md={8} lg={8}>
            <Message text={message.text} isUserMessage={message.isUserMessage} />
          </Col>
        </Row>
      ))}
      {/* Invisible element at the bottom for auto-scrolling */}
      <div ref={messagesEndRef} />
    </Container>
  );
};

export default MessageList;
