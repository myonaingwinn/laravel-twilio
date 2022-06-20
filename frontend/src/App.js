import VideoChat from "./components/VideoConference/VideoChat";
import Login from "./components/Login/Login";
import { useRef } from "react";
import { Route, Routes } from "react-router-dom";
import Loading from "./components/Loading/Loading";
import Error from "./components/Error/404";
import Register from "./components/Login/Register";
import PrivateRoute from "./helpers/PrivateRoute";
import RoomList from "./components/RoomList/RoomList";

function App() {
    const loadingRef = useRef();

    const handleLoading = () => {
        if (loadingRef.current) loadingRef.current.handleLoading();
    };

    return (
        <Loading ref={loadingRef}>
            <Routes>
                <Route
                    path={"/"}
                    element={
                        <PrivateRoute>
                            <RoomList
                                handleLoading={() => loadingRef.handleLoading}
                            />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/login"
                    element={<Login handleLoading={handleLoading} />}
                />
                <Route
                    path="/register"
                    element={
                        <Register
                            handleLoading={() => loadingRef.handleLoading}
                        />
                    }
                />
                <Route
                    VideoChat
                    path="/video-chat"
                    element={
                        <PrivateRoute>
                            <VideoChat
                                handleLoading={() => loadingRef.handleLoading}
                            />
                        </PrivateRoute>
                    }
                />
                <Route path="*" element={<Error />} />
            </Routes>
        </Loading>
    );
}

export default App;
