import React, { Component } from "react";
import { Card, Col, Row, Button, Container } from "react-bootstrap";
import "./paginate.css";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import { baseUrl } from "../../Utilities";
import Navbar from "../Navbar/NavbarTop";

class RoomList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            roomList: [],
            perPage: 6,
            page: 0,
            pages: 0,
        };
    }

    componentDidMount() {
        this.props.handleLoading();
        fetch(baseUrl + "/get_room_list")
            .then((response) => response.json())
            .then((res) => {
                // console.log(res["roomList"]);
                this.setState({ roomList: res["roomList"] });
                this.setState({
                    pages: Math.floor(
                        this.state.roomList.length / this.state.perPage
                    ),
                });
            })
            .catch((err) => console.log(err));
        this.props.handleLoading();
    }

    handlePageClick = (event) => {
        let page = event.selected;
        this.setState({ page });
    };

    render() {
        const { page, perPage, pages } = this.state;

        // console.log(this.state);

        let items = this.state.roomList.slice(
            page * perPage,
            (page + 1) * perPage
        );

        return (
            <>
                <Navbar handleLogout={this.props.handleLogout} />
                <Container fluid className="mt-5">
                    <p style={{ textAlign: "right" }}>
                        <Link
                            className="btn btn-primary mx-3"
                            to="/create_room"
                        >
                            Create Room
                        </Link>
                    </p>
                    {this.state.roomList.length > 0 ? (
                        <Row>
                            <Row xs={1} md={3}>
                                {items.map((value, i) => {
                                    return (
                                        <Col md={3} key={i}>
                                            <Card key={i} className="my-2">
                                                <Card.Header>
                                                    <Card.Title>
                                                        {value.name}
                                                    </Card.Title>
                                                </Card.Header>
                                                <Card.Body>
                                                    <Card.Text>
                                                        {value.description}
                                                    </Card.Text>

                                                    <Button className="btn btn-primary">
                                                        Join
                                                    </Button>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    );
                                })}
                            </Row>

                            <Row style={{ marginTop: "20px" }}>
                                <div className="float-end">
                                    <ReactPaginate
                                        previousLabel={"<<"}
                                        nextLabel={">>"}
                                        pageCount={pages}
                                        onPageChange={this.handlePageClick}
                                        containerClassName={"pagination"}
                                        activeClassName={"active"}
                                    />
                                </div>
                            </Row>
                        </Row>
                    ) : null}
                </Container>
            </>
        );
    }
}

export default RoomList;
