import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import PropTypes from "prop-types";

function PrivateRoute({ children }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
