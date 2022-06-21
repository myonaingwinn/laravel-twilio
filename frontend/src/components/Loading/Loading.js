import React, { forwardRef, useImperativeHandle, useState } from "react";
import "./loading.css";

const Loading = forwardRef((props, ref) => {
    const [isLoading, setIsLoading] = useState(false);

    useImperativeHandle(ref, () => ({
        handleLoading() {
            setIsLoading(!isLoading);
        },
    }));

    return (
        <>
            {isLoading && (
                <div className="loading-box">
                    <div className="filter">
                        <div
                            className="spinner-border text-primary loading"
                            role="status"
                        ></div>
                    </div>
                </div>
            )}
            {props.children}
        </>
    );
});

export default Loading;
