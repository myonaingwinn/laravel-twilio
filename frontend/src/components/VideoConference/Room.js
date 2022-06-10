import { useEffect, useState } from "react";
import Participant from "./Participant";
import Navbar from "../Navbar/Navbar";

const Room = ({ roomName, room, handleLeave }) => {
    const [participants, setParticipants] = useState([]);

    useEffect(() => {
        const participantConnected = (participant) => {
            setParticipants((prevParticipants) => [
                ...prevParticipants,
                participant,
            ]);
        };

        const participantDisconnected = (participant) => {
            setParticipants((prevParticipants) =>
                prevParticipants.filter((p) => p !== participant)
            );
        };

        room.on("participantConnected", participantConnected);
        room.on("participantDisconnected", participantDisconnected);
        room.participants.forEach(participantConnected);
        return () => {
            room.off("participantConnected", participantConnected);
            room.off("participantDisconnected", participantDisconnected);
        };
    }, [room]);

    const remoteParticipants = participants.map((participant) => (
        <Participant
            key={participant.sid}
            participant={participant}
            local={false}
        />
    ));

    return (
        <div className="d-flex align-content-center flex-wrap">
            {remoteParticipants}
            <Participant
                key={room.localParticipant.sid}
                participant={room.localParticipant}
                local={true}
            />

            <Navbar roomName={roomName} room={room} handleLeave={handleLeave} />
        </div>
    );
};

export default Room;
