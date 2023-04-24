import React from "react";
import { useSelector } from "react-redux";
import LoadingToRedirect from "./LoadingToRidirect";

const AdminRoute = ({ children }) => {
  const { userReducer } = useSelector((state) => ({ ...state }));
  return userReducer && userReducer.token && userReducer.role === "admin" ? (
    children
  ) : (
    <LoadingToRedirect />
  );
};

export default AdminRoute;
