import "./App.css";
import VideoChat from "./components/VideoConference/VideoChat";
import Login from "./components/Login/Login";
import Register from "./components/Login/Register";
import { Container } from "react-bootstrap";

function App() {
    return (
        <Container>
            {/* <VideoChat /> */}
            {/* <Login /> */}
            <Register />
        </Container>
    );
}

export default App;
