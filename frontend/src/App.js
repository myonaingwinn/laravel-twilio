import VideoChat from "./components/Conference/VideoChat";
import Login from "./components/Login/Login";
import { useRef } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Loading from "./components/Loading/Loading";
import Error from "./components/Error/404";
import Register from "./components/Login/Register";
import PrivateRoute from "./helpers/PrivateRoute";
import Home from "./components/Home/Home";
import { localStorageRemove } from "./Utilities";
import CreateRoom from "./components/Conference/Room/CreateRoom";

function App() {
    const loadingRef = useRef();
    const navigator = useNavigate();

    const handleLoading = () => {
        if (loadingRef.current) loadingRef.current.handleLoading();
    };

    const handleLogout = async () => {
        handleLoading();
        await localStorageRemove("user");
        navigator("login");
        handleLoading();
    };

    return (
        <Loading ref={loadingRef}>
            <Routes>
                <Route
                    path={"/"}
                    element={
                        <PrivateRoute>
                            <Home handleLogout={handleLogout} />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/login"
                    element={<Login handleLoading={handleLoading} />}
                />
                <Route
                    path="/register"
                    element={<Register handleLoading={handleLoading} />}
                />
                <Route
                    VideoChat
                    path="/conference"
                    element={
                        <PrivateRoute>
                            <VideoChat
                                handleLoading={handleLoading}
                                handleLogout={handleLogout}
                            />
                        </PrivateRoute>
                    }
                />
                <Route
                    path={"/create_room"}
                    element={
                        <PrivateRoute>
                            <CreateRoom
                                handleLoading={handleLoading}
                                handleLogout={handleLogout}
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
