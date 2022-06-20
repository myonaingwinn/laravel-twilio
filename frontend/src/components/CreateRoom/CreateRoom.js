import { useState } from "react";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import { baseUrl } from "../../Utilities";

const CreateRoom = () => {
    const [roomName, setRoomName] = useState("");
    const [connecting, setConnecting] = useState(false);
    const [validated, setValidated] = useState(false);

    const handleRoomNameChange = (e) => {
        setRoomName(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }
        setValidated(true);
        setConnecting(true);
        await fetch(baseUrl + "/create_room", {
            method: "POST",
            body: JSON.stringify({
                room: roomName,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => res.json());
        console.log(roomName);
    };

    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="d-flex justify-content-center mt-5">
                <Col lg={4}>
                    <Card>
                        <Card.Header>
                            <h2>Create the room</h2>
                        </Card.Header>
                        <Card.Body>
                            <Form.Group className="mb-3" controlId="roomName">
                                <Form.Label>Room Name :</Form.Label>
                                <Form.Control
                                    type="roomName"
                                    value={roomName}
                                    onChange={handleRoomNameChange}
                                    readOnly={connecting}
                                    placeholder="Enter your room name"
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter your room name
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Card.Body>
                        <Card.Footer>
                            <Button
                                type="submit"
                                onClick={handleSubmit}
                                className="btn btn-primary"
                                disabled={connecting}
                            >
                                {connecting ? "Connecting" : "Create"}
                            </Button>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </Form>
    );
};

export default CreateRoom;
