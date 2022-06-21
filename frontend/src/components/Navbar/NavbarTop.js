import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const Nvbar = ({ handleLogout }) => {
    return (
        <Navbar className="shadow p-3">
            <Container fluid>
                <Link to={"/"} style={{ textDecoration: "none" }}>
                    <Navbar.Brand>Laravel Twilio</Navbar.Brand>
                </Link>
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
    );
};

export default Nvbar;
