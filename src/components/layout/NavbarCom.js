import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//Icon
import { faCoffee, faHouse } from "@fortawesome/free-solid-svg-icons";

class NavbarCom extends Component {
  render() {
    return (
      <nav className="NavbarItem">
        <h1>
          React <FontAwesomeIcon icon={faHouse} />
        </h1>
      </nav>
    );
  }
}

export default NavbarCom;
