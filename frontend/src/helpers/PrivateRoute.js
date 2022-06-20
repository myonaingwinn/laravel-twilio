import { Navigate } from "react-router-dom";
import { isLoggedIn } from "../Utilities";

const PrivateRoute = ({ children }) => {
    return isLoggedIn() ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
