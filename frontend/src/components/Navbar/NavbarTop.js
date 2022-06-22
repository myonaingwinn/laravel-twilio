import { Button, Container, Nav, Navbar } from "react-bootstrap";
import React, { useState } from "react";
import Collapse from "react-bootstrap/Collapse";
import ChatUX from "../ChatRoom/ChatUX";
import { Link } from "react-router-dom";

const Nvbar = ({ handleLogout }) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Navbar className="shadow p-3">
                <Container fluid>
                    <Link to={"/"} style={{ textDecoration: "none" }}>
                        <Navbar.Brand>Laravel Twilio</Navbar.Brand>
                    </Link>
                    <Button
                        onClick={() => setOpen(!open)}
                        aria-controls="example-collapse-text"
                        aria-expanded={open}
                    >
                        click
                    </Button>
                    <Nav>
                        <Button
                            variant="white"
                            className="btn btn-outline-danger"
                            onClick={handleLogout}
                        >
                            Logout
                        </Button>
                    </Nav>
                </Container>
            </Navbar>

            <div style={{ minHeight: "150px" }}>
                <Collapse in={open} dimension="width">
                    <div id="example-collapse-text">
                        {/* <Card body style={{ width: "400px" }}>
                            Anim pariatur cliche reprehenderit, enim eiusmod
                            high life accusamus terry richardson ad squid. Nihil
                            anim keffiyeh helvetica, craft beer labore wes
                            anderson cred nesciunt sapiente ea proident.
                        </Card> */}
                        <ChatUX />
                    </div>
                </Collapse>
            </div>
        </>
    );
};

export default Nvbar;
