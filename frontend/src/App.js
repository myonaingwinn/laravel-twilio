import VideoChat from "./components/VideoConference/VideoChat";
import { Container } from "react-bootstrap";
import Login from "./components/Login/Login";
import { useRef, useState } from "react";
import Loading from "./components/Loading/Loading";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(
        localStorage.getItem("isLoggedIn")
    );

    let component = "";

    const loadingRef = useRef();

    const handleLogin = () => {
        localStorage.getItem("isLoggedIn")
            ? setIsLoggedIn(true)
            : setIsLoggedIn(false);
    };

    const handleLoading = () => {
        loadingRef.current.handleLoading();
    };

    isLoggedIn
        ? (component = (
              <Container fluid>
                  <Loading ref={loadingRef}>
                      <VideoChat handleLoading={handleLoading} />
                  </Loading>
              </Container>
          ))
        : (component = (
              <Container>
                  <Loading ref={loadingRef}>
                      <Login
                          handleLogin={handleLogin}
                          handleLoading={handleLoading}
                      />
                  </Loading>
              </Container>
          ));

    return component;
}

export default App;
