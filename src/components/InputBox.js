import React, { useState } from 'react';
import { Row, Col, InputGroup, Form, Button } from 'react-bootstrap';
import '../css/InputBox.css'; // Adjust the path based on your structure

const InputBox = ({ onSendMessage }) => {
    const [input, setInput] = useState('');

    const handleSend = () => {
        if (input.trim()) {
            onSendMessage(input);
            setInput('');
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSend();
        }
    };

    return (
        <div className="fixed-bottom-container">
            <Row className="justify-content-center m-0">
                <Col xs={12} sm={10} md={8} lg={10} xl={6}>
                    <InputGroup className="mb-3">
                        <Form.Control
                            className="custom-form-control"
                            placeholder="Type a message..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(event) => event.key === 'Enter' && handleSend()}
                        />
                        <Button
                            className="custom-send-button"
                            onClick={handleSend}
                        >
                            Send
                        </Button>
                    </InputGroup>
                    <div className="disclaimer">
                        ChatGBG can make mistakes. Consider checking important information.
                        <br />
                        Please note, this chatbot stores data from conversations to improve future interactions.
                    </div>
                </Col>
            </Row>
        </div>

    );
};

export default InputBox;
