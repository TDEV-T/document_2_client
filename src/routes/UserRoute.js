import React from "react";
import { useSelector } from "react-redux";
import LoadingToRedirect from "./LoadingToRidirect";

const UserRoute = ({ children }) => {
  const { userReducer } = useSelector((state) => ({ ...state }));
  return userReducer && userReducer.token && userReducer.role === "user" ? (
    children
  ) : (
    <LoadingToRedirect />
  );
};

export default UserRoute;
