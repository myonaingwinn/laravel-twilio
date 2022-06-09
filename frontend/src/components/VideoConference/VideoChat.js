import React, { useState, useCallback, useEffect } from "react";
import Video from "twilio-video";
import JoinRoom from "./JoinRoom";
import Room from "./Room";

const VideoChat = () => {
    const [username, setUsername] = useState("");
    const [roomName, setRoomName] = useState("");
    const [room, setRoom] = useState(null);
    const [connecting, setConnecting] = useState(false);

    const handleUsernameChange = useCallback((event) => {
        setUsername(event.target.value);
    }, []);

    const handleRoomNameChange = useCallback((event) => {
        setRoomName(event.target.value);
    }, []);

    const handleSubmit = useCallback(
        async (event) => {
            event.preventDefault();
            setConnecting(true);
            const data = await fetch("http://127.0.0.1:8000/api/v1/token", {
                method: "POST",
                body: JSON.stringify({
                    identity: username,
                    room: roomName,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            }).then((res) => res.json());
            Video.connect(data.token, {
                name: roomName,
            })
                .then((room) => {
                    setConnecting(false);
                    setRoom(room);
                })
                .catch((err) => {
                    console.error(err);
                    setConnecting(false);
                });
        },
        [roomName, username]
    );

    const handleLeave = useCallback(() => {
        setRoom((prevRoom) => {
            if (prevRoom) {
                prevRoom.localParticipant.tracks.forEach((trackPub) => {
                    trackPub.track.stop();
                });
                prevRoom.disconnect();
            }
            return null;
        });
    }, []);

    useEffect(() => {
        if (room) {
            const tidyUp = (event) => {
                if (event.persisted) {
                    return;
                }
                if (room) {
                    handleLeave();
                }
            };
            window.addEventListener("pagehide", tidyUp);
            window.addEventListener("beforeunload", tidyUp);
            return () => {
                window.removeEventListener("pagehide", tidyUp);
                window.removeEventListener("beforeunload", tidyUp);
            };
        }
    }, [room, handleLeave]);

    let render;
    if (room) {
        render = (
            <Room roomName={roomName} room={room} handleLeave={handleLeave} />
        );
    } else {
        render = (
            <JoinRoom
                username={username}
                roomName={roomName}
                handleUsernameChange={handleUsernameChange}
                handleRoomNameChange={handleRoomNameChange}
                handleSubmit={handleSubmit}
                connecting={connecting}
            />
        );
    }
    return render;
};

export default VideoChat;
