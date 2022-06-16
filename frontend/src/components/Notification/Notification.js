import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import { CheckCircleFillIcon, XCircleFillIcon } from "@primer/octicons-react";

const Notification = forwardRef((props, ref) => {
    const [showMsg, setShowMsg] = useState(false);

    useImperativeHandle(ref, () => ({
        handleShowMsg,
    }));

    const handleShowMsg = () => setShowMsg(!showMsg);

    return (
        <>
            <ToastContainer className="p-3" position="top-end">
                <Toast
                    show={showMsg}
                    onClose={handleShowMsg}
                    delay={3000}
                    autohide
                >
                    <Toast.Header>
                        {props.successOrError && (
                            <CheckCircleFillIcon fill="#198754" />
                        )}
                        {!props.successOrError && (
                            <XCircleFillIcon fill="#dc3545" />
                        )}
                        <strong className="me-auto px-2">{props.title}</strong>
                    </Toast.Header>
                    <Toast.Body>{props.body}</Toast.Body>
                </Toast>
            </ToastContainer>
        </>
    );
});

export default Notification;
