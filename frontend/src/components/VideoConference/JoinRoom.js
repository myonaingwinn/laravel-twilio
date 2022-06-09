import React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

const JoinRoom = ({
    username,
    handleUsernameChange,
    roomName,
    handleRoomNameChange,
    handleSubmit,
    connecting,
}) => {
    return (
        <Row>
            <Col></Col>
            <Col lg={6}>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <h2>Join the room</h2>
                        <Form.Label htmlFor="name">Name:</Form.Label>
                        <Form.Control
                            type="text"
                            id="field"
                            value={username}
                            onChange={handleUsernameChange}
                            readOnly={connecting}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="room">Room name:</Form.Label>
                        <Form.Control
                            type="text"
                            id="room"
                            value={roomName}
                            onChange={handleRoomNameChange}
                            readOnly={connecting}
                            required
                        />
                    </Form.Group>
                    <Button
                        type="submit"
                        className="btn btn-primary"
                        disabled={connecting}
                    >
                        {connecting ? "Connecting" : "Join"}
                    </Button>
                </Form>
            </Col>
            <Col></Col>
        </Row>
    );
};

export default JoinRoom;
