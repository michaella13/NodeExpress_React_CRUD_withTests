import { Navigate, Route } from "react-router-dom"
import React from "react";


const ProtectedRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props}  />
        ) : (
          <Navigate to="/signup" replace />
        )
      }
    />
  );
};

export default ProtectedRoute;