import { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import {
    baseUrl,
    isLoggedIn,
    localStorageRemove,
    localStorageSet,
} from "../../Utilities";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ handleLoading }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [connecting, setConnecting] = useState(false);
    let navigator = useNavigate();

    useEffect(() => {
        if (isLoggedIn()) return navigator("/");
    });

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async () => {
        setConnecting(true);
        handleLoading();
        const data = await fetch(baseUrl + "/login", {
            method: "POST",
            body: JSON.stringify({
                email: email,
                password: password,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .catch((err) => console.log(err));

        data.id ? localStorageSet("user", data) : localStorageRemove("user");

        setConnecting(false);
        handleLoading();
    };

    return (
        <Row className="d-flex justify-content-center mt-5">
            <Col lg={5}>
                <Card className="mt-5 shadow-sm">
                    <Card.Header>
                        <p className="h2">Login</p>
                    </Card.Header>
                    <Card.Body>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="email">Email</Form.Label>
                            <Form.Control
                                type="email"
                                id="email"
                                value={email}
                                onChange={handleEmailChange}
                                readOnly={connecting}
                                placeholder="Enter your email"
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="password">Password</Form.Label>
                            <Form.Control
                                type="password"
                                id="password"
                                value={password}
                                onChange={handlePasswordChange}
                                readOnly={connecting}
                                placeholder="Enter your password"
                                required
                            />
                        </Form.Group>
                    </Card.Body>
                    <Card.Footer>
                        <Button
                            type="submit"
                            onClick={handleSubmit}
                            className="btn btn-primary"
                            disabled={connecting || !(email && password)}
                        >
                            Login
                        </Button>
                    </Card.Footer>
                </Card>
                <div className="mt-5">
                    Don't have an account?{" "}
                    <Link to={"/register"}>Register</Link>
                </div>
            </Col>
        </Row>
    );
};

export default Login;
