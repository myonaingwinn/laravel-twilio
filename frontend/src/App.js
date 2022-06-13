import VideoChat from "./components/VideoConference/VideoChat";
import { Container } from "react-bootstrap";
import Login from "./components/Login/Login";
import { useState } from "react";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(
        localStorage.getItem("isLoggedIn")
    );
    let component = "";

    const handleLogin = () => {
        localStorage.getItem("isLoggedIn")
            ? setIsLoggedIn(true)
            : setIsLoggedIn(false);
    };

    isLoggedIn
        ? (component = (
              <>
                  <Container fluid>
                      <VideoChat />
                  </Container>
              </>
          ))
        : (component = (
              <Container>
                  <Login handleLogin={handleLogin} />
              </Container>
          ));

    return component;
}

export default App;
