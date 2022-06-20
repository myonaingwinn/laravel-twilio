import React, { Component } from "react";
import { Card, Col, Row, Button } from "react-bootstrap";
import "./paginate.css";
import ReactPaginate from "react-paginate";

class RoomList extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            roomList: [],
            perPage: 6,
            page: 0,
            pages: 0,
            results: {},
            loading: false,
            message: '',
        };
    }

    componentDidMount() {
        fetch("http://localhost:8000/api/v1/get_room_list")
            .then((response) => response.json())
            .then((res) => {
                console.log(res["Room Data"]["Room List"]);
                this.setState({ roomList: res["Room Data"]["Room List"] });
                this.setState({
                    pages: Math.floor(
                        this.state.roomList.length / this.state.perPage
                    ),
                });
            })
            .catch((err) => console.log(err));
    }


    handlePageClick = (event) => {
        let page = event.selected;
        this.setState({ page });
    };


    

    render() {
        const { page, perPage, pages } = this.state;
 
        console.warn(this.state)
     
        let items = this.state.roomList.slice(
            page * perPage,
            (page + 1) * perPage
        );
       

        return (
            <div>
                <div className="mt-4 mb-4" style={{ textAlign: "center" }}>
                    <h1>All Rooms</h1>
                </div>
                
                <br/>
                <Row xs={1} md={3} className="g-4">
                    {items.map((value, i) => {
                        return (
                            <Col md={4} key={i}>
                                <Card key={i} className="op-widget-pd mb-2 ">
                                    <div className="card-size">
                                        <Card.Header className="tt-bg">
                                            <div className="row">
                                                <div className="col-8">
                                                    <Card.Title
                                                        id="jb-rlt"
                                                        className="col-15 text-truncate"
                                                    >
                                                        <b>{value.name}</b>
                                                    </Card.Title>
                                                </div>
                                                <div className="col-1 offset-1 badge text-black text-center ">
                                                    {(() => {
                                                        if (
                                                            value.participant <
                                                            value.maxParticipant
                                                        ) {
                                                            return (
                                                                <i
                                                                    style={{
                                                                        color: "green",
                                                                    }}
                                                                >
                                                                    {" "}
                                                                    Available
                                                                </i>
                                                            );
                                                        } else {
                                                            return (
                                                                <i
                                                                    style={{
                                                                        color: "red",
                                                                    }}
                                                                >
                                                                    {" "}
                                                                    Not
                                                                    Available
                                                                </i>
                                                            );
                                                        }
                                                    })()}
                                                </div>
                                            </div>
                                        </Card.Header>
                                        <Card.Body>
                                            <div className="row text-start">
                                                <Card.Text className="col-8 pt-txt">
                                                    <i className="fa fa-map-marker-alt main-theme-color" />
                                                    <i className="fa fa-map-marker" />{" "}
                                                    Members&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;
                                                    {value.participant}/
                                                    {value.maxParticipant}
                                                </Card.Text>

                                                <Card.Text className="col-8 pt-txt">
                                                    <i className="fa fa-map-marker-alt main-theme-color" />
                                                    <i className="fa fa-map-marker" />{" "}
                                                    Description&nbsp;:&nbsp;
                                                </Card.Text>
                                            </div>
                                            <br />

                                            <Button className="btn btn-sm">
                                                Join
                                            </Button>
                                        </Card.Body>
                                    </div>
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
            </div>
        );
    }
}

export default RoomList;