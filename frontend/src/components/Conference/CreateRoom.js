import { useEffect, useState } from "react";
import { Button, Card, Col, Form, FormSelect, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { baseUrl, localStorageGet, RoomTypes } from "../../Utilities";
import Navbar from "../Navbar/NavbarTop";

const CreateRoom = ({ handleLoading, handleLogout }) => {
    const [roomName, setRoomName] = useState("");
    const [roomType, setRoomType] = useState(RoomTypes.Group);
    const [maxParticipants, setMaxParticipants] = useState(0);
    const [description, setDescription] = useState("");
    const [timeout, setTimeout] = useState(1);
    // const [join, setJoin] = useState(true);
    const [connecting, setConnecting] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const navigator = useNavigate();

    const handleRoomNameChange = (e) => {
        setRoomName(e.target.value);
    };

    const handleRoomTypeChange = (e) => {
        setRoomType(e.target.value);
    };

    const handleMaxParticipantsChange = (e) => {
        let result = e.target.value.replace(/\D/g, "");
        if (result.length > 0) {
            if (result >= 50 && roomType === RoomTypes.Group) result = 50;
            else if (result <= 11 && roomType === RoomTypes.Group) result = 11;
            else if (result >= 10 && roomType === RoomTypes.PeerToPeer)
                result = 10;
            else if (result <= 2 && roomType === RoomTypes.PeerToPeer)
                result = 2;
            setMaxParticipants(result);
        } else {
            if (roomType === RoomTypes.Group) setMaxParticipants(50);
            else if (roomType === RoomTypes.PeerToPeer) setMaxParticipants(10);
        }
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleTimeoutChange = (e) => {
        let result = e.target.value.replace(/\D/g, "");
        if (result.length > 0) {
            if (result >= 60) setTimeout(60);
            else if (result <= 1) setTimeout(1);
            else if (result >= 1 && result <= 60) setTimeout(result);
        } else setTimeout(60);
    };

    /*     const handleJoinChange = () => {
        setJoin(!join);
    }; */

    const handleSubmit = async () => {
        setConnecting(true);
        handleLoading();

        const { name } = localStorageGet("user");
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                identity: name,
                room: roomName,
                description: description,
                roomType: roomType === 0 ? null : roomType,
                maxParticipants: maxParticipants,
                emptyRoomTimeout: timeout,
            }),
        };

        const data = await fetch(baseUrl + "/create_room", requestOptions)
            .then((response) => response.json())
            .catch((error) => console.log(error));

        setConnecting(false);
        handleLoading();
        data.token ? navigator("/") : navigator("/create_room");
    };

    useEffect(() => {
        roomName && description ? setIsReady(true) : setIsReady(false);
        setMaxParticipants(roomType === RoomTypes.Group ? 50 : 10);
    }, [roomName, description, isReady, roomType]);

    return (
        <>
            <Navbar handleLogout={handleLogout} />
            <Row className="d-flex justify-content-center mt-5">
                <Col xxl={4} xl={5} lg={4} md={6} sm={6} xs={6}>
                    <Card>
                        <Card.Header>
                            <p className="h2">Create Room</p>
                        </Card.Header>
                        <Card.Body>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="room">
                                    Room name
                                </Form.Label>
                                <Form.Control
                                    id="room"
                                    type="text"
                                    value={roomName}
                                    onChange={handleRoomNameChange}
                                    readOnly={connecting}
                                    placeholder="Enter room name"
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="description">
                                    Description
                                </Form.Label>
                                <Form.Control
                                    id="description"
                                    as="textarea"
                                    placeholder="Enter description for this room"
                                    value={description}
                                    onChange={handleDescriptionChange}
                                    disabled={connecting}
                                    style={{ height: "100px" }}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="roomType">
                                    Select room type
                                </Form.Label>
                                <FormSelect
                                    id="roomType"
                                    defaultValue={roomType}
                                    onChange={handleRoomTypeChange}
                                    disabled={connecting}
                                >
                                    <option value="" disabled>
                                        Select room type
                                    </option>
                                    <option value={RoomTypes.PeerToPeer}>
                                        Peer to Peer
                                    </option>
                                    <option value={RoomTypes.Group}>
                                        Group (default)
                                    </option>
                                </FormSelect>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="maxParticipants">
                                    Maximum participants
                                </Form.Label>
                                <Form.Control
                                    id="maxParticipants"
                                    type="number"
                                    value={maxParticipants}
                                    max={roomType === RoomTypes.Group ? 50 : 10}
                                    min={roomType === RoomTypes.Group ? 11 : 2}
                                    onChange={handleMaxParticipantsChange}
                                    readOnly={connecting}
                                    placeholder="Enter maximum participants"
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="timeout">
                                    Timeout (minutes)
                                </Form.Label>
                                <Form.Control
                                    id="maxParticipants"
                                    type="number"
                                    value={`${timeout}`}
                                    min="1"
                                    max="60"
                                    onChange={handleTimeoutChange}
                                    readOnly={connecting}
                                    placeholder="Enter timeout"
                                    required
                                />
                            </Form.Group>
                            {/* <Form.Group className="mb-3">
                                <Form.Check
                                    id="join"
                                    type={"checkbox"}
                                    checked={join}
                                    onChange={handleJoinChange}
                                    label="Join me to this room"
                                />
                            </Form.Group> */}
                        </Card.Body>
                        <Card.Footer>
                            <Button
                                type="submit"
                                onClick={handleSubmit}
                                className="btn btn-primary"
                                disabled={connecting || !isReady}
                            >
                                Create Room
                            </Button>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default CreateRoom;
