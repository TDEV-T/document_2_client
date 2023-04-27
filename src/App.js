import { Route, Routes } from "react-router-dom";
import React from "react";

//Page
import SignUp from "./components/General/SignUp";
import SignIn from "./components/General/SignIn";
//--User
import Homepage from "./components/Admin/Homepage";
//function
import { currentUser } from "./functions/auth";
//Routes
import AdminRoute from "./routes/AdminRoute";
import UserRoute from "./routes/UserRoute";
//redux
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const id = localStorage.getItem("access_token");

  if (id) {
    currentUser(id)
      .then((res) => {
        console.log(res);
        dispatch({
          type: "LOGIN",
          user: {
            token: id,
            id: res.data.user.iduser,
            username: res.data.user.username,
            role: res.data.user.role,
          },
        });
      })
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <Routes>
        <Route path="/" element={<SignIn />}></Route>
        <Route path="/register" element={<SignUp />}></Route>

        {/* User Route */}
        <Route
          path="/user"
          element={
            <UserRoute>
              <Homepage />
            </UserRoute>
          }
        ></Route>

        {/* Admin Route */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <Homepage />
            </AdminRoute>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
