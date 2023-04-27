import React, { Component, useRef } from "react";

//Redux
import { useDispatch, useSelector } from "react-redux";

//Icon
import { FaBars, FaTimes } from "react-icons/fa";
import { MenuDataadmin, MenuDatauser } from "./navbarData/MenuData";

//css
import "./../../styles/navbar.css";
import { useNavigate } from "react-router-dom";

const NavbarCom = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userReducer } = useSelector((state) => ({ ...state }));
  const navRef = useRef();

  const logout = () => {
    dispatch({
      type: "LOGOUT",
      user: null,
    });
    navigate("/");
  };

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };
  return (
    <header>
      <nav className="navbarLayout" ref={navRef}>
        <h3>Website</h3>
        {userReducer.role === "user"
          ? MenuDatauser.map((item, index) => {
              return (
                <a key={index} href={item.url}>
                  {item.title}
                </a>
              );
            })
          : MenuDataadmin.map((item, index) => {
              return (
                <a key={index} href={item.url}>
                  {item.title}
                </a>
              );
            })}

        <a onClick={logout}>Logout</a>
        {/* {MenuDatauser.map((item, index) => {
          return (
            <a key={index} href={item.url}>
              {item.title}
            </a>
          );
        })} */}
        <button className="nav-btn nav-close-btn" onClick={showNavbar}>
          <FaTimes />
        </button>
      </nav>
      <button className="nav-btn nav-close-btn" onClick={showNavbar}>
        <FaBars />
      </button>
    </header>
  );
};

export default NavbarCom;
