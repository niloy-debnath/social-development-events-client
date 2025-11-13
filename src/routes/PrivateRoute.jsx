// src/Routes/PrivateRoute.jsx
import React, { useContext } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "../Context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>; // optional loading

  if (!user) return <Navigate to="/login" />;

  return children;
};

export default PrivateRoute;
