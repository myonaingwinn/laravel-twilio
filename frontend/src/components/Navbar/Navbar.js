import { Button, Container, Nav, Navbar } from "react-bootstrap";

const Nvbar = ({ roomName, room, handleLeave }) => {
    return (
        <Navbar
            className="shadow-lg p-3 fixed-bottom"
            style={{ background: "#ced4da" }}
        >
            <Container fluid>
                <Navbar.Brand>Room : {roomName}</Navbar.Brand>
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
    );
};

export default Nvbar;
