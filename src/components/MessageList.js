import React, { useEffect, useRef } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Message from './Message';
import '../css/MessageList.css';

const MessageList = ({ messages }) => {
  const containerRef = useRef(null); // Ref for the container, if needed for overflow adjustments

  useEffect(() => {
    // Ensure the last message is always in view
    containerRef.current?.lastChild?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Container ref={containerRef}>
      {messages.map((message) => (
        <Row key={message.id} className="justify-content-center mb-0">
          <Col xs={12} md={8} lg={8}>
            <Message
              text={message.text}
              isUserMessage={message.isUserMessage}
              isLoading={message.isLoading}
            />
          </Col>
        </Row>
      ))}
    </Container>
  );
};

export default MessageList;
