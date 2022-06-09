import VideoChat from "./components/VideoConference/VideoChat";
import { Button, Container, Nav, Navbar } from "react-bootstrap";

function App() {
    let isLoggedIn = true;
    let component = "";

    isLoggedIn
        ? (component = (
              <>
                  <Navbar variant="light" className="shadow p-3 mb-5 bg-light">
                      <Container fluid>
                          <Navbar.Brand href="/">Laravel & Twilio</Navbar.Brand>
                          <Nav>
                              <Nav.Link href="#features">Features</Nav.Link>
                              <Button
                                  variant="light"
                                  className="btn btn-outline-danger"
                              >
                                  Logout
                              </Button>
                          </Nav>
                      </Container>
                  </Navbar>
                  <Container>
                      <VideoChat />
                  </Container>
              </>
          ))
        : (component = <Container>Login Page</Container>);

    return component;
}

export default App;
