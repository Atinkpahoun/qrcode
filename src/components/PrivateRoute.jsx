import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="loader-spinner"></div>
      </div>
    );
  }
  

  if (!user) {
    return <Navigate to="/connexion" />;
  }

  return children;
};

export default PrivateRoute;
