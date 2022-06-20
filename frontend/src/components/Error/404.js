import { HomeIcon } from "@primer/octicons-react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const Error = () => {
    const useStyle = {
        content: {
            marginTop: "70%",
        },
    };
    return (
        <Container className="d-flex justify-content-center">
            <Row>
                <Col style={useStyle.content}>
                    <p className="h1">Oops!</p>
                    <p className="h2 mt-4">404 Error</p>
                    <div>Requested page not found!</div>
                    <Link to={"/"} className="btn btn-primary mt-4">
                        <HomeIcon verticalAlign="middle" />
                        <span className="mx-2">Take me home</span>
                    </Link>
                </Col>
            </Row>
        </Container>
    );
};

export default Error;
