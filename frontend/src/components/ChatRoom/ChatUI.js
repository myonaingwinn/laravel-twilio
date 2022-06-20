import React from "react";
import "./Side.css";

const TwilioChat = require("twilio-chat");

class ChatUI extends React.Component {
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
        // const ChatList = document.getElementById("ChatList");
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
        // var $user = $('<span class="username">').text(fromUser + ':');
        // if (fromUser === username) {
        //   $user.addClass('me');
        // }
        // var $message = $('<span class="message">').text(message);
        // var $container = $('<div class="message-container">');
        // $container.append($user).append($message);
        // $chatWindow.append($container);
        // $chatWindow.scrollTop($chatWindow[0].scrollHeight);

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
                        // console.log(channel);
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
        console.log("Hello");
        // console.log(this.state.generalChannel);
        // Join the general channel
        this.state.generalChannel.on("channelJoined", function (channel) {
            console.log("You Join Channel. ");
        });

        this.state.generalChannel.on("messageAdded", function (message) {
            one.printMessage(message.author, message.body);
            // console.log(message.author);
            // console.log( message.body);
        });
    }
    handleInput = (event) => {
        this.setState({ inputValue: event.target.value });
    };
    sendMessage = () => {
        console.log(this.state.inputValue);
        this.state.generalChannel.sendMessage(this.state.inputValue);
    };

    render() {
        return (
            <>
                <div className="Sidebar">
                    <div className="TextList" id="ChatList"></div>
                    <div className="col">
                        <input
                            type="text"
                            autoFocus={true}
                            value={this.state.inputValue}
                            placeholder="Type Messages"
                            onChange={this.handleInput}
                        />
                        <button className="sendBtn" onClick={this.sendMessage}>
                            Send
                        </button>
                    </div>
                </div>
            </>
        );
    }
}

export default ChatUI;
