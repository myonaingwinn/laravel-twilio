import { useState, useEffect, useRef } from "react";
import { Card } from "react-bootstrap";

const Participant = ({ participant, local }) => {
    const [videoTracks, setVideoTracks] = useState([]);
    const [audioTracks, setAudioTracks] = useState([]);

    const videoRef = useRef();
    const audioRef = useRef();

    const trackpubsToTracks = (trackMap) =>
        Array.from(trackMap.values())
            .map((publication) => publication.track)
            .filter((track) => track !== null);

    useEffect(() => {
        setVideoTracks(trackpubsToTracks(participant.videoTracks));
        setAudioTracks(trackpubsToTracks(participant.audioTracks));

        const trackSubscribed = (track) => {
            if (track.kind === "video") {
                setVideoTracks((videoTracks) => [...videoTracks, track]);
            } else if (track.kind === "audio") {
                setAudioTracks((audioTracks) => [...audioTracks, track]);
            }
        };

        const trackUnsubscribed = (track) => {
            if (track.kind === "video") {
                setVideoTracks((videoTracks) =>
                    videoTracks.filter((v) => v !== track)
                );
            } else if (track.kind === "audio") {
                setAudioTracks((audioTracks) =>
                    audioTracks.filter((a) => a !== track)
                );
            }
        };

        participant.on("trackSubscribed", trackSubscribed);
        participant.on("trackUnsubscribed", trackUnsubscribed);

        return () => {
            setVideoTracks([]);
            setAudioTracks([]);
            participant.removeAllListeners();
        };
    }, [participant]);

    useEffect(() => {
        const videoTrack = videoTracks[0];
        if (videoTrack) {
            videoTrack.attach(videoRef.current);
            return () => {
                videoTrack.detach();
            };
        }
    }, [videoTracks]);

    useEffect(() => {
        const audioTrack = audioTracks[0];
        if (audioTrack) {
            audioTrack.attach(audioRef.current);
            return () => {
                audioTrack.detach();
            };
        }
    }, [audioTracks]);

    return (
        <Card className="m-1">
            <Card.Header>
                {participant.identity} {local && " (You)"}
            </Card.Header>
            <Card.Body>
                <video
                    ref={videoRef}
                    autoPlay={true}
                    className={local && "local"}
                    style={{ width: "100%", maxWidth: "432px" }}
                />
                <audio ref={audioRef} autoPlay={true} muted={true} />
            </Card.Body>
        </Card>
    );
};

export default Participant;
