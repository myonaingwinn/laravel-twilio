import { Button, Container, Nav, Navbar } from "react-bootstrap";
import React, { useState } from "react";
import ChatUI from "../ChatRoom/ChatUI";

const Nvbar = ({ roomName, room, handleLeave }) => {
    const [visibleA, setVisibleA] = useState(false);

    const clickEventFunction = () => {
        setVisibleA(!visibleA);
    };
    return (
        <>
            <Navbar
                className="shadow-lg p-3 fixed-bottom"
                style={{ background: "#ced4da" }}
            >
                <Container fluid>
                    <Navbar.Brand>Room : {roomName}</Navbar.Brand>
                    <Button onClick={clickEventFunction}>Chat</Button>
                    <Nav>
                        {/* <Nav.Link href="#features">Features</Nav.Link> */}
                        {room && (
                            <Button
                                className="btn btn-danger"
                                onClick={handleLeave}
                            >
                                Leave
                            </Button>
                        )}
                    </Nav>
                </Container>
            </Navbar>
            <div
                style={visibleA ? { display: "block" } : { display: "none" }}
                className={"collapse navbar-collapse"}
            >
                <ChatUI />
            </div>
        </>
    );
};

export default Nvbar;
