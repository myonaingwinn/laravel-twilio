import React, { Component } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { baseUrl, regExp } from "../../Utilities";

const formValid = ({ isError, ...rest }) => {
    let isValid = false;

    Object.values(isError).forEach((val) => {
        if (val.length > 0) {
            isValid = false;
        } else {
            isValid = true;
        }
    });

    Object.values(rest).forEach((val) => {
        if (val === null) {
            isValid = false;
        } else {
            isValid = true;
        }
    });

    return isValid;
};

export class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            email: "",
            password: "",
            isError: {
                name: "",
                email: "",
                password: "",
            },
        };
    }
    onSubmit = (e) => {
        e.preventDefault();

        if (formValid(this.state)) {
            console.log(this.state);
        } else {
            console.log("Form is invalid!");
        }
    };

    handleSubmit = async (e) => {
        const { name, value } = e.target;
        let isError = { ...this.state.isError };
        switch (name) {
            case "name":
                isError.name =
                    value.length < 4 ? "Atleast 4 characters required" : "";
                break;
            case "email":
                isError.email = regExp.test(value)
                    ? ""
                    : "Email address is invalid";
                break;
            case "password":
                isError.password =
                    value.length < 6 ? "Atleast 6 characters required" : "";
                break;
            default:
                break;
        }

        this.setState({
            isError,
            [name]: value,
        });

        await fetch(baseUrl + "/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => {
            console.log(res);
            return res;
        });
    };

    render() {
        const { isError } = this.state;
        const { name, email, password } = this.state;
        const enabled =
            name.length > 0 && email.length > 0 && password.length > 0;
        return (
            <Form onSubmit={this.onSubmit} noValidate>
                <Row className="d-flex justify-content-center mt-5">
                    <Col lg={5}>
                        <Card className="mt-5 shadow-sm">
                            <Card.Header>
                                <p className="h2">Register</p>
                            </Card.Header>
                            <Card.Body>
                                <Form.Group className="mb-3">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        onChange={this.handleSubmit}
                                        value={this.state.name}
                                        className={
                                            isError.name.length > 0
                                                ? "is-invalid form-control"
                                                : "form-control"
                                        }
                                        placeholder="Enter your Name"
                                        required
                                    />
                                    {isError.name.length > 0 && (
                                        <span className="invalid-feedback">
                                            {isError.name}
                                        </span>
                                    )}
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        onChange={this.handleSubmit}
                                        value={this.state.email}
                                        className={
                                            isError.email.length > 0
                                                ? "is-invalid form-control"
                                                : "form-control"
                                        }
                                        placeholder="Enter your email"
                                        required
                                    />
                                    {isError.email.length > 0 && (
                                        <span className="invalid-feedback">
                                            {isError.email}
                                        </span>
                                    )}
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        id="password"
                                        name="password"
                                        onChange={this.handleSubmit}
                                        value={this.state.password}
                                        className={
                                            isError.password.length > 0
                                                ? "is-invalid form-control"
                                                : "form-control"
                                        }
                                        placeholder="Enter your password"
                                        required
                                    />
                                    {isError.password.length > 0 && (
                                        <span className="invalid-feedback">
                                            {isError.password}
                                        </span>
                                    )}
                                </Form.Group>
                            </Card.Body>
                            <Card.Footer>
                                <Button
                                    type="submit"
                                    className="btn btn-primary"
                                    disabled={!enabled}
                                >
                                    Register
                                </Button>
                            </Card.Footer>
                        </Card>
                    </Col>
                </Row>
            </Form>
        );
    }
}
export default Register;
