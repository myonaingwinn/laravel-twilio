import { Form, Button, Row, Col, Card } from "react-bootstrap";

const JoinRoom = ({
    username,
    handleUsernameChange,
    roomName,
    handleRoomNameChange,
    handleSubmit,
    connecting,
    validated,
}) => {
    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="d-flex justify-content-center mt-5">
                <Col lg={4}>
                    <Card>
                        <Card.Header>
                            <h2>Join the room</h2>
                        </Card.Header>
                        <Card.Body>
                            <Form.Group className="mb-3" controlId="username">
                                <Form.Label>Name :</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={username}
                                    onChange={handleUsernameChange}
                                    readOnly={connecting}
                                    placeholder="Enter your name"
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter your name
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="room">
                                <Form.Label>Room name :</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={roomName}
                                    onChange={handleRoomNameChange}
                                    readOnly={connecting}
                                    placeholder="Enter room name"
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter room name
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Card.Body>
                        <Card.Footer>
                            <Form.Group controlId="submit">
                                <Button
                                    type="submit"
                                    onClick={handleSubmit}
                                    className="btn btn-primary"
                                    disabled={connecting}
                                >
                                    {connecting ? "Connecting" : "Join"}
                                </Button>
                            </Form.Group>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </Form>
    );
};

export default JoinRoom;
