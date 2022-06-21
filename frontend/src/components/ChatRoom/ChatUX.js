import Card from "react-bootstrap/Card";
import React from "react";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import "./SlideX.css";

const TwilioChat = require("twilio-chat");

class ChatUX extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: "",
            inputValue: "",
            name: "Hello1",
            identity: "",
            chatClient: "",
            generalChannel: "",
        };
        this.onKeyUp = this.onKeyUp.bind(this);
    }
    componentDidMount = async () => {
        const data = await fetch("http://127.0.0.1:8000/api/v1/chat", {
            method: "POST",
            body: JSON.stringify({
                identity: this.state.name,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => res.json());
        this.setState({ token: data.token });
        this.setState({ identity: data.identity });
        console.log(this.state.token);
        console.log(this.state.identity);
        this.createChannel();
    };
    printMessage(fromUser, message) {
        const parr = document.createElement("p");
        parr.setAttribute("class", "message");
        parr.innerHTML = message;
        let ChatList = document.getElementById("ChatList");
        ChatList.appendChild(parr);
        this.setState({ inputValue: "" });
    }
    createChannel() {
        TwilioChat.Client.create(this.state.token).then((client) => {
            console.log("Created chat client");
            this.setState({ chatClient: client });
            client
                .getSubscribedChannels()
                .then(this.createOrJoinGeneralChannel());
            client.on("connectionStateChanged", (state) => {
                if (state === "connecting")
                    console.log("Connecting to Twilio…");
                if (state === "connected") {
                    console.log("You are connected.");
                }
                if (state === "disconnecting")
                    console.log("Disconnecting from Twilio…");
                if (state === "disconnected") console.log("Disconnected.");
                if (state === "denied") console.log("Failed to connect.");
            });
        });
    }
    createOrJoinGeneralChannel() {
        var state = this;
        this.state.chatClient
            .getChannelByUniqueName("general")
            .then(function (channel) {
                state.setState({ generalChannel: channel });
                console.log("Found general channel:");
                console.log(state.state.generalChannel);
                state.setupChannel();
            })
            .catch(function () {
                // If it doesn't exist, let's create it
                console.log("Creating general channel");
                state.state.chatClient
                    .createChannel({
                        uniqueName: "general",
                        friendlyName: "General Chat Channel",
                    })
                    .then(function (channel) {
                        console.log("Created general channel:");
                        state.setState({ generalChannel: channel });
                        console.log("General Channel balarbalarbalar");
                        this.setupChannel();
                    })
                    .catch(function (channel) {
                        console.log("Channel could not be created:");
                        console.log(channel);
                    });
            });
    }
    setupChannel() {
        var one = this;
        this.state.generalChannel.on("channelJoined", function (channel) {
            console.log("You Join Channel. ");
        });

        this.state.generalChannel.on("messageAdded", function (message) {
            one.printMessage(message.author, message.body);
        });
    }
    handleInput = (event) => {
        this.setState({ inputValue: event.target.value });
    };

    onKeyUp(event) {
        if (event.charCode === 13) {
            console.log("Press Enter");
            this.setState({ inputValue: event.target.value });
            if (this.state.inputValue) {
                this.state.generalChannel.sendMessage(this.state.inputValue);
            }
        }
    }

    sendMessage = () => {
        if (this.state.inputValue) {
            this.state.generalChannel.sendMessage(this.state.inputValue);
        }
    };

    render() {
        return (
            <Card
                border="primary"
                style={{
                    width: "18rem",
                    height: "25rem",
                    position: "fixed",
                    display: "flex",
                    right: "10px",
                    bottom: "10px",
                }}
            >
                <Card.Body>
                    <div id="ChatList" className="TextList"></div>
                </Card.Body>
                <InputGroup
                    style={{
                        display: "flex",
                    }}
                    className="mb-4"
                >
                    <FormControl
                        type="text"
                        value={this.state.inputValue}
                        onChange={this.handleInput}
                        placeholder="Type messages"
                        onKeyPress={this.onKeyUp}
                    />
                    <Button variant="info" onClick={this.sendMessage}>
                        Send
                    </Button>
                </InputGroup>
            </Card>
        );
    }
}

export default ChatUX;
