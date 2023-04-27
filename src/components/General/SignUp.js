import React, { useState } from "react";
import sys from "./img/sys.png";
//function
import { register } from "./../../functions/users";

import { toast } from "react-toastify";

const SignUp = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
    repeatpassword: "",
    role: "users",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (user.password !== user.repeatpassword) {
      toast.error("Password and Password confirm not match !");
    } else {
      console.log(user);
      register(user)
        .then((res) => {
          toast.success("Register Success !");
          document.getElementById("registerform").reset();
        })
        .catch((err) => {
          toast.error("Username already to use !");
        });
    }
  };
  return (
    <div className="center_screen container">
      <div className="d-flex justify-content-center">
        <div className=" m-3  shadow-lg p-3 mb-5 bg-body rounded w-50">
          <h3 className="">Sign Up</h3>
          <div className="row row-cols-2">
            <div className="col">
              <img src={sys} width="100%" height="100%" alt="" />
            </div>
            <div className="col">
              <form id="registerform" onSubmit={handleSubmit}>
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
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Repeat Password
                  </label>
                  <input
                    type="password"
                    name="repeatpassword"
                    onChange={handleChange}
                    className="form-control"
                    id="exampleInputPassword1"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Register
                </button>{" "}
                <br />
                <br />
                <a className="link" href="/">
                  Sign In !
                </a>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
