import { Form, Button, Row, Col, Card } from "react-bootstrap";

const JoinRoom = ({
    username,
    roomName,
    connecting,
    handleUsernameChange,
    handleRoomNameChange,
    handleSubmit,
}) => {
    return (
        <Row className="d-flex justify-content-center mt-5">
            <Col lg={4}>
                <Card>
                    <Card.Header>
                        <h2>Join the room</h2>
                    </Card.Header>
                    <Card.Body>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="name">Name :</Form.Label>
                            <Form.Control
                                type="text"
                                id="field"
                                value={username}
                                onChange={handleUsernameChange}
                                readOnly={username}
                                placeholder="Enter your name"
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="room">Room name :</Form.Label>
                            <Form.Control
                                type="text"
                                id="room"
                                value={roomName}
                                onChange={handleRoomNameChange}
                                readOnly={roomName}
                                placeholder="Enter room name"
                                required
                            />
                        </Form.Group>
                    </Card.Body>
                    <Card.Footer>
                        <Button
                            type="submit"
                            onClick={handleSubmit}
                            className="btn btn-primary"
                            disabled={connecting || !(roomName && username)}
                        >
                            Join
                        </Button>
                    </Card.Footer>
                </Card>
            </Col>
        </Row>
    );
};

export default JoinRoom;
