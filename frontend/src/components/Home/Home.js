import { Container } from "react-bootstrap";
import Navbar from "../Navbar/NavbarTop";

const Home = ({ handleLogout }) => {
    return (
        <>
            <Navbar handleLogout={handleLogout} />
            <Container className="d-flex justify-content-center">
                <p className="h1 mt-3">Home Page</p>
            </Container>
        </>
    );
};

export default Home;
