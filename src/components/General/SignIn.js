import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

//redux
import { useDispatch } from "react-redux";

//img
import sc from "./img/sc.webp";
//function
import { login } from "./../../functions/users";
//toast
import { toast } from "react-toastify";
//css
import "./../../styles/SignUp.css";

const SignIn = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await login(user);
      if (res.data.status === "error") {
        toast.error(res.data.message);
      } else {
        localStorage.setItem("access_token", res.data.token);
        localStorage.setItem("userid", res.data.user.iduser);

        dispatch({
          type: "LOGIN",
          user: {
            token: res.data.token,
            id: res.data.user.iduser,
            username: res.data.user.username,
            role: res.data.user.role,
          },
        });
        navigate("/" + res.data.user.role, { replace: true });
      }
    } catch (err) {
      toast.error("Username or password not Correct !");
      console.log(err);
    }
  };
  return (
    <div className="center_screen container">
      <div className="d-flex justify-content-center">
        <div className=" m-3  shadow-lg p-3 mb-5 bg-body rounded w-50">
          <h3>Sign In</h3>
          <div className="row row-cols-2">
            <div className="col">
              <img src={sc} width="100%" height="100%" alt="" />
            </div>
            <div className="col">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    onChange={handleChange}
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    className="form-control"
                    id="exampleInputPassword1"
                    required
                  />
                </div>
                <div className="row">
                  <div className="col">
                    <button type="submit" className="btn btn-primary">
                      Login
                    </button>
                  </div>
                  <div className="col">
                    <a href="/register">
                      <button type="button" className="btn btn-success">
                        Register
                      </button>
                    </a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
