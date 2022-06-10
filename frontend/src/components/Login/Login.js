import React, { useState, useCallback, useEffect } from "react";
import { Form, Button } from "react-bootstrap";

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = useCallback(async (event) => {
        event.preventDefault();
        const data = await fetch("http://127.0.0.1:8000/api/v1/login", {
            method: "POST",
            body: JSON.stringify({
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
    });

    const handleEmailChange = useCallback((event) => {
        setEmail(event.target.value);
    }, []);

    const handlePasswordChange = useCallback((event) => {
        setPassword(event.target.value);
    }, []);

    
        return ( 
            <Form>
            <Form.Group className="mb-3">
            <h2>Login</h2>
                <Form.Label htmlFor="email">Email:</Form.Label>
                <Form.Control
                    type="text"
                    id="email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label htmlFor="pwd">Password:</Form.Label>
                <Form.Control
                    type="password"
                    id="pwd"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                />
            </Form.Group>
            <Button
            onClick={handleSubmit}
                type="submit"
                className="btn btn-primary"
            >
                Login
            </Button>
        </Form>
        );
};

export default Login;
