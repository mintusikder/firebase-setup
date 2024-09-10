import { useContext } from "react";
import { AuthContext } from "../authProvider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { loading } = useContext(AuthContext);
  const location = useLocation();
  console.log(location);
  const { user } = useContext(AuthContext);
  if (user) {
    return children;
  }
  if (loading) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }

  return <Navigate state={location.pathname} to="/login"></Navigate>;
};

export default PrivateRoute;
