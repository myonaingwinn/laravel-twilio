import React, { useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { baseUrl } from "../../Utilities";

export const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async () => {
        await fetch(baseUrl + "/register", {
            method: "POST",
            body: JSON.stringify({
                name,
                email,
                password,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => {
            console.log(res);
            return res;
        });
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    return (
        <Row className="d-flex justify-content-center mt-5">
            <Col lg={5}>
                <Card className="mt-5 shadow-sm">
                    <Card.Header>
                        <p className="h2">Register</p>
                    </Card.Header>
                    <Card.Body>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="name">Name</Form.Label>
                            <Form.Control
                                type="text"
                                id="name"
                                value={name}
                                onChange={handleNameChange}
                                placeholder="Enter your Name"
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="email">Email</Form.Label>
                            <Form.Control
                                type="email"
                                id="email"
                                value={email}
                                onChange={handleEmailChange}
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
                        >
                            Register
                        </Button>
                    </Card.Footer>
                </Card>
                <div className="mt-5">
                    Already a user? <Link to="/login">Login</Link>
                </div>
            </Col>
        </Row>
    );
};
export default Register;
