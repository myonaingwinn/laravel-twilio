import VideoChat from "./components/VideoConference/VideoChat";
import { Container } from "react-bootstrap";

function App() {
    let isLoggedIn = true;
    let component = "";

    isLoggedIn
        ? (component = (
              <>
                  <Container fluid>
                      <VideoChat />
                  </Container>
              </>
          ))
        : (component = <Container>Login Page</Container>);

    return component;
}

export default App;
